import { useState } from 'react';
import Landing from './pages/Landing.jsx';
import Chat from './pages/Chat.jsx';
import Derivacion from './pages/Derivacion.jsx';

export default function App() {
  const [page, setPage] = useState('landing');
  const [derivarFlowId, setDerivarFlowId] = useState(null);

  const handleNavigate = (target) => {
    if (target === 'landing') {
      setDerivarFlowId(null);
    }
    setPage(target);
  };

  const handleDerivar = (flowId) => {
    setDerivarFlowId(flowId);
    setPage('derivacion');
  };

  const handleBack = () => {
    setPage('chat');
  };

  if (page === 'landing') {
    return <Landing onNavigate={handleNavigate} />;
  }

  if (page === 'chat') {
    return <Chat onNavigate={handleNavigate} onDerivar={handleDerivar} />;
  }

  if (page === 'derivacion') {
    return <Derivacion onNavigate={handleNavigate} onBack={handleBack} flowId={derivarFlowId} />;
  }

  return null;
}
