// ── SERVICE WORKER — CÓDIGO CUERPO v5 ──
// Importar desde archivo externo

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(e => console.log('SW error:', e));
}

// Estado global simplificado para /docs
const S = {
  user: { name: '', code: '' },
  contextChips: [],
  currentSignal: null,
  signals: []
};

// Cargar datos de localStorage
function initApp() {
  const saved = localStorage.getItem('cc_user');
  if (saved) {
    try {
      S.user = JSON.parse(saved);
      showApp();
    } catch (e) {
      console.log('Error loading user:', e);
      showAccess();
    }
  } else {
    showAccess();
  }
}

// Pantalla de acceso
function verifyCode() {
  const code = document.getElementById('access-code-input').value.trim().toUpperCase();
  if (!code) return;
  
  S.user.code = code;
  S.user.name = document.getElementById('user-name-input')?.value || 'hermosa';
  localStorage.setItem('cc_user', JSON.stringify(S.user));
  showSplash();
}

function showAccess() {
  document.getElementById('access-screen').classList.remove('hidden');
  document.getElementById('splash-screen').classList.add('hidden');
  document.getElementById('app').classList.add('hidden');
}

function showSplash() {
  document.getElementById('access-screen').classList.add('hidden');
  document.getElementById('splash-screen').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}

function completeSplash() {
  showApp();
}

function showApp() {
  document.getElementById('access-screen').classList.add('hidden');
  document.getElementById('splash-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('header-greeting').textContent = `Hola, ${S.user.name}`;
}

function logOut() {
  localStorage.removeItem('cc_user');
  S.user = { name: '', code: '' };
  showAccess();
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initApp);
