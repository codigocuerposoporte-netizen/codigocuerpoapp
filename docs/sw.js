// ── SERVICE WORKER — CÓDIGO CUERPO v5 ──
// Sin caché: siempre carga desde red (soluciona problemas en iPhone y Samsung)

self.addEventListener('install', e => {
  self.skipWaiting(); // Activa inmediatamente sin esperar
});

self.addEventListener('activate', e => {
  // Borrar TODAS las cachés anteriores
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim(); // Toma control de todas las pestañas abiertas
});

// Sin fetch handler = todas las peticiones van directo a la red
// Esto elimina el problema de que iOS sirva versiones antiguas