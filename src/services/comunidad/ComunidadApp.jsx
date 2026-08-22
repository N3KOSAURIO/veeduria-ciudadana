import { useState, useCallback, useEffect } from 'react';
import { useUser } from '../../context/UserContext.jsx';
import Header from '../../components/Header.jsx';
import { comunidadApi } from './comunidad.api.js';

/**
 * ComunidadApp — servicio "Comunidades" (estilo Reddit).
 * Módulo aislado del shell (norte: cada servicio en src/services/<id>/).
 * Sub-vistas gestionadas por estado local (KISS) y autenticadas por la
 * identidad central (cookies httpOnly → /api/auth/me).
 *
 * Views: 'lista' | 'comunidad' | 'post' | 'crear'
 */
export default function ComunidadApp() {
  const { isAuthenticated } = useUser();
  const [view, setView] = useState('lista');
  const [comunidades, setComunidades] = useState([]);
  const [comunidad, setComunidad] = useState(null);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadComunidades = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await comunidadApi.listComunidades();
      setComunidades(data.comunidades || []);
    } catch (e) {
      setError(e.message || 'No se pudieron cargar las comunidades');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar la lista de comunidades al montar (si está autenticado).
  useEffect(() => {
    if (isAuthenticated && view === 'lista') {
      loadComunidades();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const goLista = useCallback(async () => {
    setView('lista');
    await loadComunidades();
  }, [loadComunidades]);

  const openComunidad = useCallback(async (c) => {
    setComunidad(c);
    setView('comunidad');
    setLoading(true);
    setError('');
    try {
      const data = await comunidadApi.listPosts(c.id);
      setPosts(data.posts || []);
    } catch (e) {
      setPosts([]);
      setError(e.message || 'No se pudieron cargar los posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const openPost = useCallback(async (p) => {
    setPost(p);
    setView('post');
    setLoading(true);
    setError('');
    try {
      const data = await comunidadApi.listComments(p.id);
      setComments(data.comments || []);
    } catch (e) {
      setComments([]);
      setError(e.message || 'No se pudieron cargar los comentarios');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVote = useCallback(async (p, value) => {
    try {
      const res = await comunidadApi.votePost(p.id, value);
      setPosts((prev) => prev.map((x) => (x.id === p.id ? { ...x, votes: res.votes } : x)));
      if (post && post.id === p.id) setPost((prev) => (prev ? { ...prev, votes: res.votes } : prev));
    } catch (e) {
      setError(e.message || 'Error al votar');
    }
  }, [post]);

  const handleCreateComunidad = useCallback(async (data) => {
    setError('');
    try {
      const created = await comunidadApi.createComunidad(data);
      await goLista();
      return { ok: true, comunidad: created };
    } catch (e) {
      return { ok: false, error: e.message || 'No se pudo crear la comunidad' };
    }
  }, [goLista]);

  const handleCreatePost = useCallback(async (data) => {
    setError('');
    try {
      await comunidadApi.createPost(comunidad.id, data);
      await openComunidad(comunidad);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message || 'No se pudo crear el post' };
    }
  }, [comunidad, openComunidad]);

  const handleAddComment = useCallback(async (body) => {
    setError('');
    try {
      await comunidadApi.addComment(post.id, body);
      await openPost(post);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message || 'No se pudo comentar' };
    }
  }, [post, openPost]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-6xl mb-4" aria-hidden="true">🤝</span>
          <h2 className="text-2xl font-extrabold text-azul-oscuro dark:text-white mb-2">Comunidades</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-4">
            Necesitas iniciar sesión para ver y participar en las comunidades.
          </p>
          <a href="/login" className="px-6 py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl shadow-md transition-all">
            Iniciar sesión
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}
        {view === 'lista' && <ListaComunidades comunidades={comunidades} loading={loading} onOpen={openComunidad} onCreate={() => setView('crear')} />}
        {view === 'crear' && <CrearComunidad onSubmit={handleCreateComunidad} onBack={goLista} />}
        {view === 'comunidad' && (
          <DetalleComunidad comunidad={comunidad} posts={posts} loading={loading} onBack={goLista} onVote={handleVote} onOpenPost={openPost} onCreatePost={() => setView('crearPost')} />
        )}
        {view === 'crearPost' && <CrearPost comunidad={comunidad} onSubmit={handleCreatePost} onBack={() => openComunidad(comunidad)} />}
        {view === 'post' && (
          <DetallePost post={post} comments={comments} loading={loading} onBack={() => openComunidad(comunidad)} onVote={handleVote} onComment={handleAddComment} />
        )}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  VISTA: Lista de comunidades                                   */
/* ═══════════════════════════════════════════════════════════════ */
function ListaComunidades({ comunidades, loading, onOpen, onCreate }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-azul-oscuro dark:text-white">Comunidades</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Grupos donde ciudadanos se organizan y piden ayuda colectiva.</p>
        </div>
        <button onClick={onCreate} className="px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-bold rounded-lg transition-colors">
          + Crear comunidad
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Cargando...</p>
      ) : comunidades.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl">🤝</span>
          <p className="mt-3 text-gray-500 dark:text-gray-400">Todavía no hay comunidades. ¡Crea la primera!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {comunidades.map((c) => (
            <button
              key={c.id}
              onClick={() => onOpen(c)}
              className="w-full text-left rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">{c.icon || '🤝'}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{c.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">/{c.slug}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-azul-medio dark:text-blue-400">{c.members_count}</p>
                  <p className="text-[11px] text-gray-400">miembros</p>
                </div>
              </div>
              {c.descripcion && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{c.descripcion}</p>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  VISTA: Crear comunidad                                        */
/* ═══════════════════════════════════════════════════════════════ */
function CrearComunidad({ onSubmit, onBack }) {
  const [form, setForm] = useState({ name: '', slug: '', descripcion: '', icon: '🤝' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const slugFromName = (name) =>
    name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) return;
    setSubmitting(true);
    const res = await onSubmit({
      name: form.name.trim(),
      slug: form.slug.trim(),
      descripcion: form.descripcion.trim(),
      icon: form.icon,
    });
    setSubmitting(false);
    if (!res.ok) setError(res.error || 'Error al crear');
  };

  return (
    <div className="max-w-xl mx-auto">
      <button onClick={onBack} className="mb-4 text-sm text-azul-medio hover:underline">← Volver</button>
      <h1 className="text-2xl font-extrabold text-azul-oscuro dark:text-white mb-6">Crear comunidad</h1>
      {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Nombre *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value, slug: !form.slug ? slugFromName(e.target.value) : form.slug })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. Denuncia de huecos en la vía"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Identificador (/c/slug) *</label>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <span>/c/</span>
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: slugFromName(e.target.value) })}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="huecos-en-la-via"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="¿Para qué sirve esta comunidad?"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Icono</label>
          <input
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={4}
          />
        </div>
        <button type="submit" disabled={submitting} className="w-full px-4 py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50">
          {submitting ? 'Creando...' : 'Crear comunidad'}
        </button>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  VISTA: Detalle de comunidad (lista de posts)                 */
/* ═══════════════════════════════════════════════════════════════ */
function DetalleComunidad({ comunidad, posts, loading, onBack, onVote, onOpenPost, onCreatePost }) {
  return (
    <div>
      <button onClick={onBack} className="mb-4 text-sm text-azul-medio hover:underline">← Todas las comunidades</button>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">{comunidad?.icon || '🤝'}</span>
          <div>
            <h1 className="text-2xl font-extrabold text-azul-oscuro dark:text-white">{comunidad?.name}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">/{comunidad?.slug} · {comunidad?.members_count} miembros</p>
          </div>
        </div>
        <button onClick={onCreatePost} className="shrink-0 px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-bold rounded-lg transition-colors">
          + Nuevo post
        </button>
      </div>
      {comunidad?.descripcion && <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">{comunidad.descripcion}</p>}

      {loading ? (
        <p className="text-gray-400">Cargando posts...</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-14 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">Aún no hay publicaciones en esta comunidad.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex gap-3">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <button onClick={() => onVote(p, 1)} className="w-7 h-7 rounded hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 font-bold" title="Votar +">▲</button>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{p.votes}</span>
                <button onClick={() => onVote(p, -1)} className="w-7 h-7 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 font-bold" title="Votar -">▼</button>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                {p.body && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{p.body}</p>}
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                  <span>{p.author || 'ciudadano'}</span>
                  <button onClick={() => onOpenPost(p)} className="text-azul-medio hover:underline">💬 {p.comments} comentarios</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  VISTA: Crear post                                             */
/* ═══════════════════════════════════════════════════════════════ */
function CrearPost({ comunidad, onSubmit, onBack }) {
  const [form, setForm] = useState({ title: '', body: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    const res = await onSubmit({ title: form.title.trim(), body: form.body.trim() });
    setSubmitting(false);
    if (!res.ok) setError(res.error || 'Error al publicar');
  };

  return (
    <div className="max-w-xl mx-auto">
      <button onClick={onBack} className="mb-4 text-sm text-azul-medio hover:underline">← Volver</button>
      <h1 className="text-2xl font-extrabold text-azul-oscuro dark:text-white mb-1">Nuevo post en {comunidad?.name}</h1>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">/{comunidad?.slug}</p>
      {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Título *</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="¿Qué quieres reportar o pedir?"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Contenido</label>
          <textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Detalla tu reporte o pedido de ayuda colectiva..."
          />
        </div>
        <button type="submit" disabled={submitting} className="w-full px-4 py-3 bg-dorado hover:bg-dorado-hover text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50">
          {submitting ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  VISTA: Detalle de post (con comentarios)                     */
/* ═══════════════════════════════════════════════════════════════ */
function DetallePost({ post, comments, loading, onBack, onVote, onComment }) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    const res = await onComment(text.trim());
    setSubmitting(false);
    if (res.ok) {
      setText('');
    } else {
      setError(res.error || 'Error al comentar');
    }
  };

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-sm text-azul-medio hover:underline">← Volver a la comunidad</button>
      {post && (
        <article className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
          <div className="flex gap-3">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <button onClick={() => onVote(post, 1)} className="w-7 h-7 rounded hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 font-bold">▲</button>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{post.votes}</span>
              <button onClick={() => onVote(post, -1)} className="w-7 h-7 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 font-bold">▼</button>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">{post.title}</h1>
              {post.body && <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{post.body}</p>}
              <p className="mt-3 text-xs text-gray-400">Publicado por {post.author || 'ciudadano'}</p>
            </div>
          </div>
        </article>
      )}

      <h2 className="mt-6 mb-3 text-lg font-bold text-azul-oscuro dark:text-white">Comentarios ({comments.length})</h2>
      {error && <div className="mb-3 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">{error}</div>}
      <form onSubmit={handleComment} className="mb-6 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe un comentario..."
        />
        <button type="submit" disabled={submitting || !text.trim()} className="px-4 py-2 bg-azul-oscuro hover:bg-azul-medio text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50">
          Comentar
        </button>
      </form>

      {loading ? (
        <p className="text-gray-400">Cargando comentarios...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Sin comentarios todavía.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 p-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">{c.body}</p>
              <p className="mt-1 text-[11px] text-gray-400">{c.author || 'ciudadano'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
