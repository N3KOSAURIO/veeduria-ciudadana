/**
 * Servicio ciudadano — datos y acciones del usuario normal.
 */

import PLANES from '../data/plans.js';

/**
 * Retorna todos los planes disponibles.
 */
export function getPlans() {
  return PLANES;
}

/**
 * Retorna un plan por ID.
 */
export function getPlanById(id) {
  return PLANES[id] || null;
}
