// ============================================================
// CÓDIGO CUERPO — App Logic v2
// ============================================================

// ── STATE ──
const S = {
  zone: null, zoneLabel: null,
  sensation: null, intensity: null,
  emotion: null, subEmotion: null,
  contextChips: [],
  reconect: { zone:null, sensation:null, time:null, emotion:null, subEmotion:null, need:null, repair:null },
  diary: { exerciseId:null, stepIdx:0, answers:[] },
  userName: '',
};

// ── ACCESO ──
function checkAccess() {
  // Poblar textos desde data.js
  const s = document.getElementById('access-screen');
  if (!s) return;
  document.getElementById('access-subtitle').textContent = ACCESS_MSG.subtitle;
  document.getElementById('access-prompt').textContent   = ACCESS_MSG.prompt;
  document.getElementById('access-hint').textContent     = ACCESS_MSG.hint;

  const unlocked = localStorage.getItem('cc_access');
  if (unlocked === '1') {
    // Ya tiene acceso
    s.classList.add('hidden');
    return true;
  }
  // Mostrar pantalla de acceso
  s.classList.remove('hidden');
  return false;
}

function verifyCode() {
  const input = document.getElementById('access-code-input');
  const code  = (input?.value || '').trim().toUpperCase();
  const valid = VALID_CODES.map(c => c.toUpperCase());
  const errEl = document.getElementById('access-error');

  if (valid.includes(code)) {
    localStorage.setItem('cc_access', '1');
    localStorage.setItem('cc_used_code', code);
    showToast(ACCESS_MSG.success);
    // Recargar la página para que todo inicialice limpiamente
    setTimeout(() => window.location.reload(), 900);
  } else {
    errEl.textContent = ACCESS_MSG.error;
    errEl.classList.remove('hidden');
    input.value = '';
    input.focus();
    // Pequeño shake visual
    input.style.borderColor = '#c45a5a';
    setTimeout(() => { input.style.borderColor = ''; }, 1500);
  }
}


// ── LINE ICON SYSTEM ──
const ICON_MAP = {
  head:'◯', throat:'⌁', chest:'♡', shoulders:'⌒', belly:'◎', pelvis:'◐', lumbar:'∿', hips:'◇', legs:'⌇', skin:'✦', energy:'◒', cycle:'◎',
  opresion:'↓', ardor:'△', punzada:'ϟ', inflamacion:'≈', tension:'⌁', nudo:'∞', picor:'✦', peso:'◆', vacio:'○', hormigueo:'∿', contractura:'⌒', palpitaciones:'♡',
  diary:'≡', challenge:'✓', meditation:'◌', records:'▤', dictionary:'▤', repair:'✚', voiceOn:'◉', voiceOff:'○'
};
const EMOTION_ICON_MAP = { MIEDO:'△', RABIA:'!', TRISTEZA:'∿', ALEGRÍA:'✦', ASCO:'×', VERGÜENZA:'◒', AMOR:'♡', SOLEDAD:'○', AGOTAMIENTO:'⌇', CULPA:'◇', CONFUSIÓN:'?' };
const RAW_ICON_MAP = { '🌕':'◯','🌿':'⌁','♡':'♡','🌊':'⌒','🌸':'◎','☽':'◐','🌱':'∿','🌺':'◇','✨':'✦','🌙':'◒','⬇️':'↓','🔥':'△','⚡':'ϟ','💧':'≈','〰️':'⌁','🪢':'∞','🪨':'◆','○':'○','〜':'∿','💪':'⌒','💓':'♡','🌀':'◌','😴':'◒','💔':'♡','🌬️':'∿','🌑':'○','🌪️':'◌','💜':'◇','🗺️':'▤','💫':'✦','🏡':'⌂','📓':'≡','📋':'▤','🔊':'◉','🔇':'○' };
function lineIcon(value, fallback = '◎') {
  return ICON_MAP[value] || EMOTION_ICON_MAP[value] || RAW_ICON_MAP[value] || fallback;
}
function iconSvg(value) {
  const rawKey = {
    '🌕':'head','🌀':'energy','😴':'energy','🌿':'throat','♡':'chest','💔':'chest','💓':'palpitaciones','🌊':'shoulders','🌸':'belly','☽':'pelvis','🌱':'lumbar','🌺':'hips','✨':'skin','🌙':'energy','💜':'pelvis',
    '⬇️':'opresion','🔥':'ardor','⚡':'punzada','💧':'inflamacion','〰️':'tension','🪢':'nudo','🪨':'peso','○':'vacio','〜':'hormigueo','💪':'contractura','🌬️':'hormigueo','🌑':'vacio','🌪️':'confusion'
  };
  const key = ICON_MAP[value] ? value : (EMOTION_ICON_MAP[value] ? value : (rawKey[value] || 'dictionary'));
  const shapes = {
    brand:'<path class="icon-soft-fill" d="M12 20c-4.9-2.6-8.1-6.3-8.1-9.8 0-2.5 1.7-4.4 4.1-4.4 1.6 0 3 .9 4 2.4 1-1.5 2.4-2.4 4-2.4 2.4 0 4.1 1.9 4.1 4.4 0 3.5-3.2 7.2-8.1 9.8Z"/><path d="M12 8.3v10.4"/><path d="M8.1 12.8c2.5 1 5.3 1 7.8 0"/>',
    diary:'<path class="icon-soft-fill" d="M6.2 4.2h9.9c1.5 0 2.7 1.2 2.7 2.7v11.8H8.2a3.2 3.2 0 0 1-3.2-3.2V5.4c0-.7.5-1.2 1.2-1.2Z"/><path d="M8.4 4.3v14.2"/><path d="M11.4 8.5h4.6M11.4 12h3.8"/><path d="M17 5.4l1.8-1.8 1.6 1.6-1.8 1.8"/>',
    challenge:'<path class="icon-soft-fill" d="M5 18.4h14v1.8H5z"/><path d="M5.2 12.2l3.5 3.5 9.8-10.1"/><path d="M5.2 6.8h5.5M13.5 17.8h5.3"/>',
    meditation:'<path class="icon-soft-fill" d="M12 19.4c-4.6-1.4-7.2-4.1-7.2-7.2 3.2-.1 5.6 1.2 7.2 3.8 1.6-2.6 4-3.9 7.2-3.8 0 3.1-2.6 5.8-7.2 7.2Z"/><path d="M12 5.2c2.1 2 3.2 4 3.2 6.1 0 2-1.1 3.6-3.2 4.8-2.1-1.2-3.2-2.8-3.2-4.8 0-2.1 1.1-4.1 3.2-6.1Z"/><path d="M6.2 9.2c1.7 0 3.1.5 4.1 1.5M17.8 9.2c-1.7 0-3.1.5-4.1 1.5"/>',
    records:'<path class="icon-soft-fill" d="M5 4.8h14v14.4H5z"/><path d="M8.2 15.6V12M12 15.6V8.2M15.8 15.6v-5.1"/><path d="M7.8 18.8h8.8M8.2 7.2h2.5"/>',
    dictionary:'<path class="icon-soft-fill" d="M5.2 4.8h6.2c2.2 0 4 1.8 4 4v10.4H9.2c-2.2 0-4 1.8-4 4V4.8Z"/><path d="M15.4 6.7h3.4v12.5h-3.4"/><path d="M8.3 8.6h4M8.3 12.1h3.4"/><path d="M18.8 6.7l1.1 1.1 1.1-1.1"/>',
    head:'<path class="icon-soft-fill" d="M12 3.8a5 5 0 0 1 5 5c0 2.2-1.2 4.1-3 4.8v2.1h-4v-2.1a5.1 5.1 0 0 1 2-9.8Z"/><path d="M9 18h6M10 21h4"/><path d="M9.1 9.5h5.8M12 6.6v5.8"/>',
    throat:'<path class="icon-soft-fill" d="M8 5.8c1.4 1.3 2.7 1.9 4 1.9s2.6-.6 4-1.9v4.4c0 2.4-1.6 4.3-4 4.3s-4-1.9-4-4.3V5.8Z"/><path d="M12 7.8v9.4"/><path d="M8.4 17.2h7.2M10 20h4"/>',
    chest:'<path class="icon-soft-fill" d="M12 19.2c-4.4-2.5-7.2-5.4-7.2-8.5a3.8 3.8 0 0 1 6.6-2.6 3.8 3.8 0 0 1 6.6 2.6c0 3.1-2.8 6-6 8.5Z"/><path d="M7.2 12h3l1.5-3.1 2.8 6.2 1.3-3.1h2.9"/>',
    shoulders:'<path class="icon-soft-fill" d="M4.6 16.8c1.9-5.2 4.4-7.8 7.4-7.8s5.5 2.6 7.4 7.8H4.6Z"/><path d="M7 18.4h10M8.2 14.6c1-1.2 2.3-1.8 3.8-1.8s2.8.6 3.8 1.8"/>',
    belly:'<path class="icon-soft-fill" d="M12 5.2a6.8 6.8 0 0 1 6.8 6.8A6.8 6.8 0 0 1 12 18.8 6.8 6.8 0 0 1 5.2 12 6.8 6.8 0 0 1 12 5.2Z"/><path d="M12 7.8v8.4M8.7 12h6.6"/><path d="M9.6 9.6c1.4.9 3.4.9 4.8 0"/>',
    pelvis:'<path class="icon-soft-fill" d="M7 6.7c1.9 4.7 3.5 8.4 5 11 1.5-2.6 3.1-6.3 5-11H7Z"/><path d="M8.8 13.1h6.4M12 17.7v3"/><path d="M9.2 7.6c.5 1.5 1.4 2.4 2.8 2.4s2.3-.9 2.8-2.4"/>',
    lumbar:'<path class="icon-soft-fill" d="M11.8 4c-2.1 3.1-2 5.7.2 8 2.1 2.3 2.2 4.9 0 8"/><path d="M8 7.6h8M8 12h8M8 16.4h8"/><path d="M15.3 5.4c1.2 4.4 1.2 8.8 0 13.2"/>',
    hips:'<path class="icon-soft-fill" d="M7.6 7.2c-.9 4.5.5 8.1 4.4 10.9 3.9-2.8 5.3-6.4 4.4-10.9H7.6Z"/><path d="M5.8 11.3h12.4M9.1 8.2c.7 1.8 1.7 2.8 2.9 2.8s2.2-1 2.9-2.8"/>',
    legs:'<path class="icon-soft-fill" d="M8.5 4.2h3l-.3 15.1H7.8l.7-15.1ZM12.5 4.2h3l.7 15.1h-3.4l-.3-15.1Z"/><path d="M7.3 20.2h4.4M12.3 20.2h4.4"/><path d="M10.8 7h2.4"/>',
    skin:'<path d="M12 3l2.2 5.2L20 10l-5.2 2.2L12 18l-2.2-5.8L4 10l5.8-1.8L12 3Z"/>',
    energy:'<path class="icon-soft-fill" d="M13 2.8 5.8 13h5l-1 8.2L18.2 9.5h-5L13 2.8Z"/><path d="M7 17.4c1.3 1.2 3 1.9 5 1.9 2.6 0 4.7-1.1 6.1-3.1"/>',
    cycle:'<path d="M12 4a8 8 0 1 1-7.4 5"/><path d="M4 4v5h5"/><path d="M12 8v4l3 2"/>',
    opresion:'<path d="M12 4v14"/><path d="M7 13l5 5 5-5"/><path d="M7 5h10"/>',
    ardor:'<path d="M12 3c3 3 5 5.6 5 9a5 5 0 0 1-10 0c0-2.1 1.1-3.5 2.6-5.1"/><path d="M12 12c1.4 1.2 2 2.2 2 3.3a2 2 0 0 1-4 0c0-1 .5-1.9 2-3.3Z"/>',
    punzada:'<path d="M13 2L6 13h5l-1 9 8-13h-5l0-7Z"/>',
    inflamacion:'<path d="M12 3c4 4.3 6 7.2 6 10.7a6 6 0 0 1-12 0C6 10.2 8 7.3 12 3Z"/>',
    tension:'<path d="M4 14c2.2-3 4.5-3 7 0s4.8 3 9 0"/><path d="M4 9c2.2-3 4.5-3 7 0s4.8 3 9 0"/>',
    nudo:'<path d="M8 8c2.6-2.6 5.4 5.4 8 2.8S10.6 5.4 8 8Z"/><path d="M16 16c-2.6 2.6-5.4-5.4-8-2.8S13.4 18.6 16 16Z"/>',
    picor:'<path d="M12 3l2.1 5.4L20 10l-5 2.8L12 20l-3-7.2L4 10l5.9-1.6L12 3Z"/>',
    peso:'<path d="M8 9h8l2 10H6L8 9Z"/><path d="M10 9a2 2 0 0 1 4 0"/>',
    vacio:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>',
    hormigueo:'<path d="M5 16c2-2 3-2 5 0s3 2 5 0 3-2 4 0"/><path d="M5 10c2-2 3-2 5 0s3 2 5 0 3-2 4 0"/>',
    contractura:'<path d="M7 15c2.5-5 7.5-5 10 0"/><path d="M8 18h8"/><path d="M9 12l-2-3M15 12l2-3"/>',
    palpitaciones:'<path d="M4 13h4l2-5 4 10 2-5h4"/><path d="M6 8c1-2 4-2 6 1 2-3 5-3 6-1"/>',
    MIEDO:'<path d="M12 4l8 14H4L12 4Z"/><path d="M12 9v4M12 16h.01"/>',
    RABIA:'<path d="M7 17l10-10"/><path d="M8 7h9v9"/>',
    TRISTEZA:'<path d="M12 3c4 4.3 6 7.2 6 10.7a6 6 0 0 1-12 0C6 10.2 8 7.3 12 3Z"/>',
    ALEGRÍA:'<circle cx="12" cy="12" r="6"/><path d="M9 13c1.8 1.6 4.2 1.6 6 0"/>',
    ASCO:'<path d="M7 7l10 10M17 7L7 17"/>',
    VERGÜENZA:'<path d="M8 6h8l2 6-6 7-6-7 2-6Z"/>',
    AMOR:'<path d="M12 18c-4-2.3-7-5-7-8a3.5 3.5 0 0 1 6-2.4A3.5 3.5 0 0 1 17 10c0 3-3 5.7-5 8Z"/>',
    SOLEDAD:'<circle cx="12" cy="8" r="3"/><path d="M7 19c1.2-3 2.8-4.5 5-4.5s3.8 1.5 5 4.5"/>',
    AGOTAMIENTO:'<path d="M13 2L6 13h5l-1 9 8-13h-5l0-7Z"/>',
    CULPA:'<path d="M12 3l7 4v5c0 4-2.8 7-7 9-4.2-2-7-5-7-9V7l7-4Z"/>',
    CONFUSIÓN:'<path d="M9 9a3 3 0 1 1 4 2.8c-.8.3-1 1-1 2.2"/><path d="M12 18h.01"/>'
  };
  const premiumShapes = {
    brand:'<path class="icon-shadow" d="M16 28C9.2 24.5 4.5 19.4 4.5 14.2c0-3.8 2.6-6.7 6.2-6.7 2.2 0 4.1 1.1 5.3 3 1.2-1.9 3.1-3 5.3-3 3.6 0 6.2 2.9 6.2 6.7C27.5 19.4 22.8 24.5 16 28Z"/><path class="icon-cut" d="M16 11.2v13.5M10.8 16.7c3.3 1.3 7.1 1.3 10.4 0"/>',
    diary:'<path class="icon-shadow" d="M7 5.5h15.2a3.2 3.2 0 0 1 3.2 3.2v18H10.2A4.2 4.2 0 0 1 6 22.5V6.5c0-.6.4-1 1-1Z"/><path class="icon-accent" d="M9.8 5.5h3.4v21.2H9.8z"/><path class="icon-cut" d="M16.2 11h5.5M16.2 15.6h4.3"/><path class="icon-accent" d="m22.7 6.2 3.1-3.1 2.5 2.5-3.1 3.1Z"/>',
    challenge:'<path class="icon-shadow" d="M16 4.5 20 9l6 .6-3.8 4.6 1.1 6-5.5-2.4-5.5 2.4 1.1-6L9.6 9.6l6-.6L16 4.5Z"/><path class="icon-accent" d="M8 23.5h16v3.2H8z"/><path class="icon-cut" d="m11.2 14.8 3.1 3.1 6.6-7.2"/>',
    meditation:'<path class="icon-shadow" d="M16 27.2c-6.5-2-10.4-5.7-10.4-10.3 4.7-.2 8.2 1.6 10.4 5.4 2.2-3.8 5.7-5.6 10.4-5.4 0 4.6-3.9 8.3-10.4 10.3Z"/><path class="icon-accent" d="M16 6c3.3 3 5 6 5 8.9 0 2.8-1.7 5.1-5 6.9-3.3-1.8-5-4.1-5-6.9 0-2.9 1.7-5.9 5-8.9Z"/><path class="icon-cut" d="M10.3 13.2c2.2.2 4 .9 5.7 2.2M21.7 13.2c-2.2.2-4 .9-5.7 2.2"/>',
    records:'<path class="icon-shadow" d="M6.4 5.6h19.2v20.8H6.4z"/><path class="icon-accent" d="M10 20.8h3.2v-7.2H10zm5.2 0h3.2V9.4h-3.2zm5.2 0h3.2v-9h-3.2z"/><path class="icon-cut" d="M10 9.1h4.8M10 24h12"/>',
    dictionary:'<path class="icon-shadow" d="M5.6 6.2h8.1c2.5 0 4.6 2 4.6 4.6v16.1h-8.1c-2.5 0-4.6 2-4.6 4.6V6.2Z"/><path class="icon-accent" d="M18.3 8.1h8.1v18.8h-8.1z"/><path class="icon-cut" d="M9.5 12h5M9.5 16.5h4.2M21.2 12h2.1M21.2 16.5h2.1"/><path class="icon-spark" d="M25.2 3.4 26.5 6l2.7 1.2-2.7 1.2-1.3 2.6L24 8.4l-2.7-1.2L24 6l1.2-2.6Z"/>',
    head:'<path class="icon-shadow" d="M16 4.7a7.6 7.6 0 0 1 7.6 7.6c0 3.4-2.2 6.3-5.2 7.3v2.8h-4.8v-2.8a7.6 7.6 0 0 1 2.4-14.9Z"/><path class="icon-accent" d="M12.2 24.3h7.6v3.2h-7.6z"/><path class="icon-cut" d="M11.4 13.2h9.2M16 8.8v8.8"/>',
    throat:'<path class="icon-shadow" d="M10.2 6.6c2.1 1.8 4 2.7 5.8 2.7s3.7-.9 5.8-2.7v7.2c0 3.7-2.4 6.5-5.8 6.5s-5.8-2.8-5.8-6.5V6.6Z"/><path class="icon-accent" d="M13.2 20.1h5.6v6.8h-5.6z"/><path class="icon-cut" d="M16 9.6v13.8M11.8 23.4h8.4"/>',
    chest:'<path class="icon-shadow" d="M16 27.5C9.6 24 5.4 19.7 5.4 15.2c0-3.3 2.4-5.8 5.6-5.8 2 0 3.7 1 5 2.8 1.3-1.8 3-2.8 5-2.8 3.2 0 5.6 2.5 5.6 5.8 0 4.5-4.2 8.8-10.6 12.3Z"/><path class="icon-cut" d="M8.7 16.6h4.1l2.1-4.8 4 10.1 1.8-5.3h4.6"/>',
    shoulders:'<path class="icon-shadow" d="M4.8 23.2c2.7-8.1 6.5-12.1 11.2-12.1s8.5 4 11.2 12.1H4.8Z"/><path class="icon-accent" d="M10.4 12.6c1.2-2.4 3.1-3.7 5.6-3.7s4.4 1.3 5.6 3.7c-1.7 1.3-3.6 2-5.6 2s-3.9-.7-5.6-2Z"/><path class="icon-cut" d="M8.8 24.7h14.4"/>',
    belly:'<path class="icon-shadow" d="M16 6.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19Z"/><path class="icon-accent" d="M16 10.1a5.9 5.9 0 1 1 0 11.8 5.9 5.9 0 0 1 0-11.8Z"/><path class="icon-cut" d="M16 10.7v10.6M11.1 16h9.8"/>',
    pelvis:'<path class="icon-shadow" d="M8 8.4h16c-2.5 7-5.2 12.7-8 17.1-2.8-4.4-5.5-10.1-8-17.1Z"/><path class="icon-accent" d="M11.8 9.8c.9 2.4 2.3 3.7 4.2 3.7s3.3-1.3 4.2-3.7H11.8Z"/><path class="icon-cut" d="M11 18.2h10M16 22.3v4.2"/>',
    lumbar:'<path class="icon-shadow" d="M16 4.4c-3 4.5-2.9 8.4.2 11.7 3 3.2 3 7.1-.2 11.5h5.1c2.4-7.5 2.3-15.2-.2-23.2H16Z"/><path class="icon-accent" d="M10.8 6.6h7.8v3.2h-7.8zm-.7 7.8h9.1v3.2h-9.1zm.7 7.8h7.8v3.2h-7.8z"/>',
    hips:'<path class="icon-shadow" d="M8.3 8.6h15.4c1.1 7-1.5 12.8-7.7 17.2-6.2-4.4-8.8-10.2-7.7-17.2Z"/><path class="icon-accent" d="M11.5 9.8c.9 2.9 2.4 4.4 4.5 4.4s3.6-1.5 4.5-4.4h-9Z"/><path class="icon-cut" d="M7.4 15.1h17.2"/>',
    legs:'<path class="icon-shadow" d="M10 5.2h4.7l-.5 20.4H8.8L10 5.2Zm7.3 0H22l1.2 20.4h-5.4L17.3 5.2Z"/><path class="icon-accent" d="M8 26.4h6.9v2.5H8zm9.1 0H24v2.5h-6.9z"/><path class="icon-cut" d="M14.8 8.6h2.4"/>',
    skin:'<path class="icon-shadow" d="M16 4.8 19.1 12l7.7 2.6-7.1 3.2L16 27.2l-3.7-9.4-7.1-3.2 7.7-2.6L16 4.8Z"/><path class="icon-cut" d="M16 10.6v10.8M10.7 16h10.6"/>',
    energy:'<path class="icon-shadow" d="M17.3 3.8 7.8 17.1h6.5l-1.5 11.1 11.4-16.1h-6.5l-.4-8.3Z"/><path class="icon-accent" d="M9.2 22.4c2 2 4.4 3 7.1 3 3.5 0 6.4-1.5 8.5-4.5"/>',
    cycle:'<path class="icon-shadow" d="M16 6.1a9.9 9.9 0 1 1-9.1 6h4.3A5.9 5.9 0 1 0 16 10V6.1Z"/><path class="icon-accent" d="M6.3 5.4v7.1h7.1L10.9 10a6 6 0 0 1 5.1-2.8V3.4c-4.1 0-7.6 2.1-9.7 5.2Z"/>',
    opresion:'<path class="icon-shadow" d="M13.2 4.6h5.6v13.1h4L16 27.4 9.2 17.7h4V4.6Z"/><path class="icon-accent" d="M8.3 5.4h15.4v3.2H8.3z"/>',
    ardor:'<path class="icon-shadow" d="M16.4 3.8c4.4 4.2 6.7 8.1 6.7 11.9 0 5-3.1 8.5-7.1 8.5s-7.1-3.5-7.1-8.5c0-3 1.5-5.4 4.5-8.3-.1 2.6.8 4.6 3 6.1.9-2.8.9-5.9 0-9.7Z"/><path class="icon-accent" d="M16 15.7c2.1 1.8 3.1 3.3 3.1 4.7a3.1 3.1 0 0 1-6.2 0c0-1.4 1-2.9 3.1-4.7Z"/>',
    punzada:'<path class="icon-shadow" d="M18.1 3.7 7.6 17.3h6.5l-1.1 11 11.4-16.7h-6.2l-.1-7.9Z"/><path class="icon-accent" d="M7 23.4h9.8v3H7z"/>',
    inflamacion:'<path class="icon-shadow" d="M16 4.2c5.1 5.5 7.6 9.8 7.6 13.1a7.6 7.6 0 1 1-15.2 0c0-3.3 2.5-7.6 7.6-13.1Z"/><path class="icon-cut" d="M12.2 18.3c1.8 1.5 5.1 1.5 6.9 0"/>',
    tension:'<path class="icon-shadow" d="M5 11.1c3.7-4.5 7.3-4.5 11 0s7.3 4.5 11 0v5.3c-3.7 4.5-7.3 4.5-11 0s-7.3-4.5-11 0v-5.3Z"/><path class="icon-cut" d="M5.5 22.2c3.5-3.4 7-3.4 10.5 0s7 3.4 10.5 0"/>',
    nudo:'<path class="icon-shadow" d="M11.1 8.8c3.6-3.6 7.4 7.4 10.9 3.8 1.8-1.8 1.4-4.5-.5-6.4 3.6.7 5.9 3.5 5.6 6.7-.4 4.6-5.3 6.1-9.1 2.4l-4-4c-2.1-2-4.1.1-2.2 2l8.2 8.2c-3.6 3.6-7.4-7.4-10.9-3.8-1.8 1.8-1.4 4.5.5 6.4-3.6-.7-5.9-3.5-5.6-6.7.4-4.6 5.3-6.1 9.1-2.4l4 4c2.1 2 4.1-.1 2.2-2l-8.2-8.2Z"/>',
    picor:'<path class="icon-shadow" d="M16 4.8 19.1 12l7.7 2.6-7.1 3.2L16 27.2l-3.7-9.4-7.1-3.2 7.7-2.6L16 4.8Z"/><path class="icon-accent" d="M7.4 7.6h2.8v2.8H7.4zm14.4 0h2.8v2.8h-2.8zM5.8 21.8h2.8v2.8H5.8zm17.6 0h2.8v2.8h-2.8z"/>',
    peso:'<path class="icon-shadow" d="M10.2 12h11.6l3 14.4H7.2L10.2 12Z"/><path class="icon-accent" d="M12.6 12a3.4 3.4 0 0 1 6.8 0h-2.7a.7.7 0 0 0-1.4 0h-2.7Z"/><path class="icon-cut" d="M12.1 18.3h7.8"/>',
    vacio:'<path class="icon-shadow" d="M16 5.4a10.6 10.6 0 1 1 0 21.2 10.6 10.6 0 0 1 0-21.2Zm0 6.1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"/>',
    hormigueo:'<path class="icon-shadow" d="M6 18.8c3-3 5.4-3 8.4 0s5.4 3 8.4 0c1.2-1.2 2.3-1.9 3.2-2.1v5.1c-.7.4-1.4.9-2.1 1.6-3 3-5.4 3-8.4 0s-5.4-3-8.4 0c-.4.4-.8.7-1.1.9v-5.5Z"/><path class="icon-accent" d="M8.2 7.4h3.2v3.2H8.2zm6.2 3.2h3.2v3.2h-3.2zm6.2-3.2h3.2v3.2h-3.2z"/>',
    contractura:'<path class="icon-shadow" d="M6.4 22.2c3.1-7.8 9.5-10.8 19.2-9-2.2 6.9-8.6 9.9-19.2 9Z"/><path class="icon-accent" d="M9.3 24.3h12.9v3.2H9.3z"/><path class="icon-cut" d="m10.6 15.6-2.8-4.1M21.4 15.6l2.8-4.1"/>',
    palpitaciones:'<path class="icon-shadow" d="M16 26.5C9.6 23 5.4 18.8 5.4 14.5c0-3.1 2.2-5.4 5.2-5.4 2.1 0 3.9 1.2 5.4 3.5 1.5-2.3 3.3-3.5 5.4-3.5 3 0 5.2 2.3 5.2 5.4 0 4.3-4.2 8.5-10.6 12Z"/><path class="icon-cut" d="M6.9 16.3h5.2l2-5.1 4.2 10.8 1.8-5.7h5"/>',
    MIEDO:'<path class="icon-shadow" d="M16 5.1 27.1 25.6H4.9L16 5.1Z"/><path class="icon-cut" d="M16 12.5v6.6M16 23h.01"/>',
    RABIA:'<path class="icon-shadow" d="M8.4 24.6 23.8 9.2h-9V5.6h15.1v15.1h-3.6v-9L10.9 27.1 8.4 24.6Z"/>',
    TRISTEZA:'<path class="icon-shadow" d="M16 4.2c5.1 5.5 7.6 9.8 7.6 13.1a7.6 7.6 0 1 1-15.2 0c0-3.3 2.5-7.6 7.6-13.1Z"/><path class="icon-cut" d="M12.4 19.4c2-1.4 5.2-1.4 7.2 0"/>',
    ALEGRÍA:'<path class="icon-shadow" d="M16 5.6a10.4 10.4 0 1 1 0 20.8 10.4 10.4 0 0 1 0-20.8Z"/><path class="icon-cut" d="M11.2 17.6c2.8 3.1 6.8 3.1 9.6 0M12.2 13h.01M19.8 13h.01"/>',
    ASCO:'<path class="icon-shadow" d="M16 5.6a10.4 10.4 0 1 1 0 20.8 10.4 10.4 0 0 1 0-20.8Z"/><path class="icon-cut" d="m11.4 12 9.2 9.2M20.6 12l-9.2 9.2"/>',
    VERGÜENZA:'<path class="icon-shadow" d="M10.2 6h11.6l3.7 8.7L16 26.9 6.5 14.7 10.2 6Z"/><path class="icon-accent" d="M11.8 14.1h8.4L16 20l-4.2-5.9Z"/>',
    AMOR:'<path class="icon-shadow" d="M16 27.5C9.6 24 5.4 19.7 5.4 15.2c0-3.3 2.4-5.8 5.6-5.8 2 0 3.7 1 5 2.8 1.3-1.8 3-2.8 5-2.8 3.2 0 5.6 2.5 5.6 5.8 0 4.5-4.2 8.8-10.6 12.3Z"/>',
    SOLEDAD:'<path class="icon-shadow" d="M16 6.2a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Z"/><path class="icon-accent" d="M7.3 27c1.5-5.3 4.4-8 8.7-8s7.2 2.7 8.7 8H7.3Z"/>',
    AGOTAMIENTO:'<path class="icon-shadow" d="M17.3 3.8 7.8 17.1h6.5l-1.5 11.1 11.4-16.1h-6.5l-.4-8.3Z"/><path class="icon-accent" d="M7.1 7.2h5.1v3.1H7.1z"/>',
    CULPA:'<path class="icon-shadow" d="M16 4.4 26 8v7.8c0 5.6-3.8 9.8-10 12-6.2-2.2-10-6.4-10-12V8l10-3.6Z"/><path class="icon-cut" d="m11.7 16.2 3 3 6-7"/>',
    CONFUSIÓN:'<path class="icon-shadow" d="M16 5.5c4.5 0 7.5 2.6 7.5 6.2 0 3.1-2 4.9-4.8 6-.9.4-1.2 1.1-1.2 2.6h-4.1c-.1-2.9.9-4.6 3.1-5.5 1.7-.7 2.7-1.5 2.7-3 0-1.6-1.3-2.7-3.3-2.7-2.1 0-3.6 1.2-4.5 3.2L7.6 11c1.4-3.5 4.2-5.5 8.4-5.5Z"/><path class="icon-accent" d="M13.4 23.1h4.4v4.1h-4.4z"/>',
    breath:'<path class="icon-shadow" d="M6 13.2c3.8-3.8 7.2-3.8 10.2 0 2.3 2.9 4.8 3.1 7.4.5 2.1-2.1 1-5.3-2-5.3-1.5 0-2.7.7-3.7 2.1l-3.1-1.8c1.7-2.9 4.1-4.3 7-4.3 5.5 0 8.1 6.6 4.2 10.7-3.9 4.1-8.3 3.9-12.4-1.1-1.5-1.9-3.2-1.6-5.4.6L6 13.2Z"/><path class="icon-accent" d="M5 21.1c3.4-2.5 6.4-2.3 9 .6 1.9 2.1 4.1 2.1 6.6 0 1.8-1.5 3.7-2.2 5.4-2v4.1c-1 .1-2 .6-3.1 1.5-4.2 3.5-8.3 3.2-12.1-.7-1.4-1.5-3.4-1.3-5.8.4v-3.9Z"/>',
    home:'<path class="icon-shadow" d="M5.5 15.1 16 6.1l10.5 9v12.4h-7v-7.8h-7v7.8h-7V15.1Z"/><path class="icon-accent" d="M3.8 15.7 16 5.2l12.2 10.5-2.4 2.7L16 10 6.2 18.4l-2.4-2.7Z"/><path class="icon-cut" d="M13.1 16.3h5.8"/>',
    guilt:'<path class="icon-shadow" d="M16 4.4 26 8v7.8c0 5.6-3.8 9.8-10 12-6.2-2.2-10-6.4-10-12V8l10-3.6Z"/><path class="icon-accent" d="M12.3 12.1c.9-1.3 2.1-2 3.7-2s2.8.7 3.7 2c.9 1.3.9 2.8 0 4.3L16 22.2l-3.7-5.8c-.9-1.5-.9-3 0-4.3Z"/><path class="icon-cut" d="M12 15.8h8"/>',
    boundary:'<path class="icon-shadow" d="M6 7.2h20v8.6c0 5.4-3.8 9.7-10 12-6.2-2.3-10-6.6-10-12V7.2Z"/><path class="icon-accent" d="M10 11.2h12v4H10z"/><path class="icon-cut" d="M10.5 20.5h11"/>',
    child:'<path class="icon-shadow" d="M16 5.4a5.9 5.9 0 1 1 0 11.8 5.9 5.9 0 0 1 0-11.8Z"/><path class="icon-accent" d="M7.7 27.1c1.5-5.3 4.3-8 8.3-8s6.8 2.7 8.3 8H7.7Z"/><path class="icon-cut" d="M12.7 12.3h.01M19.3 12.3h.01M13.3 15.2c1.7 1 3.7 1 5.4 0"/>',
    voice:'<path class="icon-shadow" d="M7 8.5h12.8a5.2 5.2 0 0 1 0 10.4h-5.1L8.5 24v-5.1H7A5.2 5.2 0 0 1 7 8.5Z"/><path class="icon-accent" d="M21.5 13.7h4.8v3h-4.8z"/><path class="icon-cut" d="M10.8 13.7h6.6"/>',
    release:'<path class="icon-shadow" d="M10.5 22.6c5.1-.3 9.1-2.9 12-7.9 1.7-3 2.4-6.4 2.1-10.2-4.4.5-8 1.9-10.8 4.2-3.8 3.2-5.4 7.8-4.8 13.9h1.5Z"/><path class="icon-accent" d="M6.5 24.6c5.4-4.8 10-8.2 13.8-10.2-2.5 3.7-5.8 7.3-9.9 10.8l-3.9-.6Z"/>',
    ritual:'<path class="icon-shadow" d="M16 4.8 19.1 12l7.7 2.6-7.1 3.2L16 27.2l-3.7-9.4-7.1-3.2 7.7-2.6L16 4.8Z"/><path class="icon-accent" d="M24.6 5.4 26 8.2l3 1.4-3 1.4-1.4 2.8-1.4-2.8-3-1.4 3-1.4 1.4-2.8Z"/><path class="icon-cut" d="M16 11.2v9.6M11.2 16h9.6"/>',
    body:'<path class="icon-shadow" d="M16 5.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Z"/><path class="icon-accent" d="M10.2 15.5h11.6l2.6 12H19l-1.2-6.2h-3.6L13 27.5H7.6l2.6-12Z"/><path class="icon-cut" d="M12.2 18.7h7.6"/>'
  };
  const fallback = '<path d="M12 4l7 8-7 8-7-8 7-8Z"/><path d="M9 12h6"/>';
  return `<svg class="premium-pictogram" viewBox="0 0 32 32" aria-hidden="true">${premiumShapes[key] || shapes[key] || fallback}</svg>`;
}function iconBadge(value, extraClass = '') {
  const safeIcon = String(value || 'dictionary').replace(/[^a-zA-Z0-9_-]/g, '');
  return `<span class="icon-badge ${extraClass}" data-icon="${safeIcon}">${iconSvg(value)}</span>`;
}
function uiIcon(value, extraClass = '') {
  return `<span class="icon-line ${extraClass}">${iconSvg(value)}</span>`;
}
function dictionaryEntryIconKey(d) {
  const text = `${d.name || ''} ${d.preview || ''} ${d.message || ''}`.toLowerCase();
  if (/mareo|vértigo|vertigo|confusi|desorient/.test(text)) return 'CONFUSIÓN';
  if (/hormigueo|cosquilleo|adormec/.test(text)) return 'hormigueo';
  if (/nudo|bruxismo|mandíbula|mandibula|apret/.test(text)) return 'nudo';
  if (/ansiedad|respira|aire|ahogo|suspiro|pecho cerrado/.test(text)) return 'breath';
  if (/culpa|vergüenza|perdón|perdon/.test(text)) return 'guilt';
  if (/miedo|amenaza|alerta|pánico|panico/.test(text)) return 'MIEDO';
  if (/cargar|peso|responsabilidad|no es mío|no es mio/.test(text)) return 'peso';
  if (/soltar|liberar|devolver/.test(text)) return 'release';
  if (/migra|punzada|dolor|jaqueca|pinchazo|calambre/.test(text)) return 'punzada';
  if (/ardor|quem|fuego|acidez/.test(text)) return 'ardor';
  if (/inflam|hincha|retenci|edema|pesadez/.test(text)) return 'inflamacion';
  if (/tensi|contract|rigidez/.test(text)) return 'tension';
  if (/palpita|corazón|pecho|respira|aire|ahogo/.test(text)) return 'palpitaciones';
  if (/vac[ií]o|cansancio|agot|fatiga|energ/.test(text)) return 'energy';
  if (/piel|picor|comez|granito|brote/.test(text)) return 'skin';
  if (/ciclo|menstru|ovario|útero|utero/.test(text)) return 'cycle';
  return d.zone || 'dictionary';
}
function themeIconKey(item, fallback = 'dictionary') {
  const text = `${item?.title || ''} ${item?.subtitle || ''} ${item?.description || ''} ${item?.type || ''} ${item?.inspiration || ''} ${item?.exercise || ''} ${item?.prompt || ''}`.toLowerCase();
  if (/volver a casa|casa|hogar|refugio/.test(text)) return 'home';
  if (/ansiedad|respira|respiración|respiracion|aire|calma/.test(text)) return 'breath';
  if (/culpa|perdón|perdon|vergüenza|verguenza/.test(text)) return 'guilt';
  if (/miedo|temor|cambio|pánico|panico/.test(text)) return 'MIEDO';
  if (/autoexigencia|crítica|critica|juzga|juzgar|voz/.test(text)) return 'voice';
  if (/niña interior|nina interior|infancia|origen/.test(text)) return 'child';
  if (/límite|limite|límites|limites|cuidan|proteger/.test(text)) return 'boundary';
  if (/soltar|devolver|no es tuyo|no es mío|no es mio|cargando|herencia/.test(text)) return 'release';
  if (/reconciliación|reconciliacion|ritual|honrar|honro/.test(text)) return 'ritual';
  if (/cuerpo|señal|senal|síntoma|sintoma|aliado|habitar/.test(text)) return 'body';
  if (/historial|patrón|patron|repite|registro|puntos/.test(text)) return 'records';
  if (/emoción|emocion|siento|sentir|verdad/.test(text)) return 'chest';
  if (/necesidad|necesito|pedir/.test(text)) return 'belly';
  if (/reparación|reparacion|reparar/.test(text)) return 'repair';
  if (/tapping/.test(text)) return 'energy';
  if (/meditación|meditacion/.test(text)) return 'meditation';
  return fallback;
}
// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  S.userName = localStorage.getItem('cc_name') || '';

  // Construir grids siempre (no dependen del acceso)
  buildSensGrid();
  buildEmoWheel('emotion-wheel', false);
  buildContextChips();
  buildDiary();
  buildChallenge();
  buildMeditations();
  buildReconectZonePills();
  buildReconectSensPills();
  buildEmoWheel('r-emotion-wheel', true);
  initPremiumInteractions();

  // 1. Verificar acceso primero
  const hasAccess = checkAccess();
  if (!hasAccess) return; // Espera a que introduzca el código

  // 2. Flujo normal
  const onboarded = localStorage.getItem('cc_onboarded');
  if (!onboarded) {
    document.getElementById('splash-screen').classList.remove('hidden');
  } else {
    document.getElementById('app').classList.remove('hidden');
    bootApp();
  }
});

function bootApp() {
  updateGreeting();
  document.getElementById('home-name').textContent = S.userName || 'hermosa';
  checkRecentHint();
  updateHomeDashboard();
  updateDailyValueCard();
}


function updateHomeDashboard() {
  const entries = getEntries();
  const today = new Date().toDateString();
  const todayCount = entries.filter(e => new Date(e.date).toDateString() === today).length;
  const challenge = getChallengeData();
  const challengePct = Math.round((Object.keys(challenge).length / 7) * 100);
  const todayEl = document.getElementById('home-today-count');
  const totalEl = document.getElementById('home-total-count');
  const challengeEl = document.getElementById('home-challenge-pct');
  if (todayEl) todayEl.textContent = todayCount;
  if (totalEl) totalEl.textContent = entries.length;
  if (challengeEl) challengeEl.textContent = `${challengePct}%`;
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getQuickCheckins() {
  try { return JSON.parse(localStorage.getItem('cc_quick_checkins') || '{}'); }
  catch { return {}; }
}

function saveQuickCheckin(value, btn) {
  const data = getQuickCheckins();
  data[todayKey()] = { value, date: new Date().toISOString() };
  localStorage.setItem('cc_quick_checkins', JSON.stringify(data));
  document.querySelectorAll('.quick-checkin-grid button').forEach(b => b.classList.remove('selected'));
  btn?.classList.add('selected');
  updateDailyValueCard();
  showToast('Check-in guardado');
}

function updateDailyValueCard() {
  const title = document.getElementById('home-rec-title');
  const text = document.getElementById('home-rec-text');
  const action = document.getElementById('home-rec-action');
  if (!title || !text || !action) return;

  const entries = getEntries();
  const latest = entries[0];
  const checkin = getQuickCheckins()[todayKey()]?.value || '';
  document.querySelectorAll('.quick-checkin-grid button').forEach(b => {
    b.classList.toggle('selected', b.dataset.checkin === checkin);
  });

  let rec = {
    title: 'Escucha tu cuerpo',
    text: 'Registra una señal para recibir una práctica sugerida según tu zona, emoción e intensidad.',
    label: 'Registrar señal',
    action: 'body'
  };

  if (latest) {
    if (latest.intensity >= 4) {
      rec = {
        title: 'Baja la intensidad primero',
        text: `Tu último registro fue ${latest.zoneLabel} con intensidad alta. Haz una pausa breve antes de analizar.`,
        label: 'Ir a Calma',
        action: 'meditations'
      };
    } else if (latest.emotion === 'MIEDO' || checkin === 'tension') {
      rec = {
        title: 'Respira antes de interpretar',
        text: 'Hoy conviene regular el sistema nervioso y luego escribir lo que tu cuerpo intenta proteger.',
        label: 'Meditaciones',
        action: 'meditations'
      };
    } else if (latest.emotion === 'CULPA' || latest.emotion === 'VERGÜENZA') {
      rec = {
        title: 'Suaviza la exigencia',
        text: 'Tu registro apunta a autojuicio. Una pregunta de diario puede ayudarte a separar culpa de necesidad.',
        label: 'Abrir diario',
        action: 'diary'
      };
    } else if (latest.zone === 'throat' || latest.sensation === 'nudo') {
      rec = {
        title: 'Dale voz a lo no dicho',
        text: 'La garganta suele pedir expresión segura. Prueba escribir una frase que todavía no has podido decir.',
        label: 'Abrir diario',
        action: 'diary'
      };
    } else {
      rec = {
        title: 'Observa el patrón',
        text: `Tu última señal fue en ${latest.zoneLabel}. Mira si se repite con una emoción, contexto o momento del día.`,
        label: 'Ver patrones',
        action: 'records'
      };
    }
  }

  if (checkin === 'cansancio') {
    rec = {
      title: 'Hoy tu cuerpo pide menos',
      text: 'Marca una práctica corta: respiración, pausa corporal o una sola pregunta de diario. Sin exigirte.',
      label: 'Ir a Calma',
      action: 'meditations'
    };
  } else if (checkin === 'calma' && latest) {
    rec = {
      title: 'Buen momento para mirar profundo',
      text: 'Como hoy hay más calma, puedes revisar tus patrones sin hacerlo desde urgencia.',
      label: 'Ver patrones',
      action: 'records'
    };
  }

  title.textContent = rec.title;
  text.textContent = rec.text;
  action.textContent = rec.label;
  action.dataset.action = rec.action;
}

function runDailyRecommendation() {
  const action = document.getElementById('home-rec-action')?.dataset.action || 'body';
  if (action === 'meditations') showScreen('meditations');
  else if (action === 'diary') showScreen('diary');
  else if (action === 'records') showScreen('records');
  else document.getElementById('body-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function completeSplash() {
  const v = document.getElementById('user-name-input').value.trim();
  S.userName = v;
  localStorage.setItem('cc_name', v);
  localStorage.setItem('cc_onboarded', '1');
  document.getElementById('splash-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  bootApp();
}

function updateGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Buenos días' : h < 18 ? 'Buenas tardes' : 'Buenas noches';
  const el = document.getElementById('header-greeting');
  if (el) el.textContent = g;
}

function checkRecentHint() {
  const hint = document.getElementById('recent-hint');
  if (hint) hint.classList.toggle('hidden', getEntries().length === 0);
}

// ── NAVIGATION ──
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
    n.removeAttribute('aria-current');
  });
  const s = document.getElementById('screen-' + name);
  if (s) s.classList.add('active');
  const n = document.getElementById('nav-' + name);
  if (n) {
    n.classList.add('active');
    n.setAttribute('aria-current', 'page');
  }
  if (name === 'records') renderRecords();
  if (name === 'challenge') refreshChallenge();
  if (name === 'reconect') renderReconectHistory();
}

// ── MODALS ──
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}
function overlayClose(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

// ── BODY MAP ──
function selectBodyZone(zoneId, label) {
  S.zone = zoneId; S.zoneLabel = label;
  document.querySelectorAll('.body-zone,.body-zone-hotspot').forEach(z => z.classList.remove('selected'));
  document.querySelectorAll(`[data-zone="${zoneId}"]`).forEach(z => z.classList.add('selected'));
  const banner = document.getElementById('selected-zone-banner');
  banner.classList.remove('hidden');
  document.getElementById('sz-icon').textContent = lineIcon(zoneId);
  document.getElementById('sz-text').textContent = label;
  setTimeout(() => openRegistration(), 350);
}
function clearZone() {
  S.zone = null; S.zoneLabel = null;
  document.querySelectorAll('.body-zone,.body-zone-hotspot').forEach(z => z.classList.remove('selected'));
  document.getElementById('selected-zone-banner').classList.add('hidden');
}

// ── REGISTRATION MODAL ──
function openRegistration() {
  resetRegState();
  const z = ZONES[S.zone] || { icon:'🌸' };
  document.getElementById('mreg-zone-icon').textContent = lineIcon(S.zone);
  document.getElementById('mreg-zone-title').textContent = S.zoneLabel;
  // Rebuild grid based on current zone
  buildSensGrid();
  // Update step question label
  const isZoneSpecific = S.zone && ZONE_SPECIFIC.includes(S.zone);
  const stepQ = document.getElementById('step-sensation-q');
  if (stepQ) stepQ.textContent = isZoneSpecific ? '¿Qué señal reconoces en ti?' : '¿Qué tipo de sensación sientes?';
  openModal('modal-register');
  goStep('sensation');
}

function resetRegState() {
  S.sensation = null; S.intensity = null; S.emotion = null; S.subEmotion = null; S.contextChips = [];
  document.querySelectorAll('.sens-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.int-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.emo-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.sub-chip').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('#context-chips .ctx-chip').forEach(b => b.classList.remove('selected'));
  document.getElementById('sub-emotions-area').classList.add('hidden');
  const note = document.getElementById('ctx-note'); if (note) note.value = '';
  ['btn-s1','btn-s2','btn-s3'].forEach(id => { const b=document.getElementById(id); if(b) b.disabled=true; });
}

const STEPS = ['sensation','intensity','emotion','context'];
function goStep(step) {
  document.querySelectorAll('.mstep').forEach(s => s.classList.remove('active'));
  document.getElementById('step-' + step)?.classList.add('active');
  const idx = STEPS.indexOf(step);
  document.querySelectorAll('.mdot').forEach((d, i) => {
    d.classList.remove('active','done');
    if (i < idx) d.classList.add('done');
    if (i === idx) d.classList.add('active');
  });
  document.getElementById('mreg-body')?.scrollTo(0, 0);
}

// ── FORM INTERACTIONS ──
const ZONE_SPECIFIC = ['skin', 'energy', 'cycle'];

function buildSensGrid() {
  const g = document.getElementById('sensation-grid');
  if (!g) return;
  if (S.zone && ZONE_SPECIFIC.includes(S.zone)) {
    // Show dictionary entries for this zone as selectable conditions
    g.classList.add('zone-cond-grid');
    const entries = DICTIONARY.filter(d => d.zone === S.zone);
    g.innerHTML = entries.map(d => {
      const safeName = d.name.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      return `<button class="sens-btn zone-cond-btn" onclick="pickSensation('${safeName}',this)">
        ${iconBadge(dictionaryEntryIconKey(d), 'sens-icon')}
        <span class="sens-name">${d.name}</span>
      </button>`;
    }).join('');
  } else {
    g.classList.remove('zone-cond-grid');
    g.innerHTML = SENSATIONS.map(s =>
      `<button class="sens-btn" onclick="pickSensation('${s.id}',this)">
        ${iconBadge(s.id, 'sens-icon')}
        <span class="sens-name">${s.name}</span>
      </button>`
    ).join('');
  }
}

function pickSensation(id, btn) {
  S.sensation = id;
  document.querySelectorAll('.sens-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const b = document.getElementById('btn-s1'); if(b) b.disabled = false;
}

function pickIntensity(v, btn) {
  S.intensity = v;
  document.querySelectorAll('.int-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const b = document.getElementById('btn-s2'); if(b) b.disabled = false;
}

function buildEmoWheel(containerId, isReconect) {
  const w = document.getElementById(containerId);
  if (!w) return;
  w.innerHTML = EMOTIONS.map(e =>
    `<button class="emo-btn emo-${e.color}" onclick="pickEmotion('${e.id}',this,'${containerId}','${isReconect}')">
      ${uiIcon(e.id, 'emo-emoji')}
      <span class="emo-name">${e.name}</span>
    </button>`
  ).join('');
}

function pickEmotion(id, btn, containerId, isReconect) {
  const rc = isReconect === 'true';
  S.emotion = id;
  if (rc) S.reconect.emotion = id;
  const wheel = document.getElementById(containerId);
  wheel.querySelectorAll('.emo-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  if (!rc) {
    const b = document.getElementById('btn-s3'); if(b) b.disabled = false;
  } else {
    const b = document.getElementById('r-btn-s3'); if(b) b.disabled = false;
  }
  const subAreaId = rc ? 'r-sub-emotions-area' : 'sub-emotions-area';
  const subGridId = rc ? 'r-sub-emotions-grid' : 'sub-emotions-grid';
  const emo = EMOTIONS.find(e => e.id === id);
  const subArea = document.getElementById(subAreaId);
  const subGrid = document.getElementById(subGridId);
  if (emo?.sub?.length && subArea && subGrid) {
    subGrid.innerHTML = emo.sub.map(s =>
      `<button class="sub-chip" onclick="pickSubEmo('${s}',this,'${rc}')">${s}</button>`
    ).join('');
    subArea.classList.remove('hidden');
  } else if (subArea) {
    subArea.classList.add('hidden');
  }
}

function pickSubEmo(name, btn, isReconect) {
  const rc = isReconect === 'true';
  if (rc) S.reconect.subEmotion = name;
  else S.subEmotion = name;
  const gridId = rc ? 'r-sub-emotions-grid' : 'sub-emotions-grid';
  document.getElementById(gridId)?.querySelectorAll('.sub-chip').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function buildContextChips() {
  const c = document.getElementById('context-chips');
  if (!c) return;
  c.innerHTML = CONTEXT_CHIPS.map(ch =>
    `<button class="ctx-chip" onclick="toggleCtx('${ch}',this)">${ch}</button>`
  ).join('');
}

function toggleCtx(label, btn) {
  const i = S.contextChips.indexOf(label);
  if (i > -1) { S.contextChips.splice(i, 1); btn.classList.remove('selected'); }
  else { S.contextChips.push(label); btn.classList.add('selected'); }
}

// ── SAVE ENTRY ──
function saveEntry() {
  if (!S.zone || !S.sensation || !S.intensity || !S.emotion) {
    showToast('Por favor completa todos los pasos'); return;
  }
  const note = document.getElementById('ctx-note')?.value.trim() || '';
  const zInfo = ZONES[S.zone];
  const eInfo = EMOTIONS.find(e => e.id === S.emotion);
  const isZoneSpecific = ZONE_SPECIFIC.includes(S.zone);
  let sensationLabel, sensationIcon, msg;
  if (isZoneSpecific) {
    // S.sensation = dictionary entry name (e.g. "Eccema y dermatitis")
    const dictEntry = DICTIONARY.find(d => d.zone === S.zone && d.name === S.sensation);
    sensationLabel = S.sensation;
    sensationIcon = lineIcon(dictEntry?.icon || S.zone);
    msg = dictEntry
      ? { message: dictEntry.message, reflections: dictEntry.reflections, repairs: dictEntry.repairs }
      : getSymbolicMessage(S.zone, S.sensation, S.emotion);
  } else {
    const sInfo = SENSATIONS.find(s => s.id === S.sensation);
    sensationLabel = sInfo?.name || S.sensation;
    sensationIcon = lineIcon(sInfo?.id || S.sensation, '');
    msg = getSymbolicMessage(S.zone, S.sensation, S.emotion);
  }
  const entry = {
    id: Date.now(), date: new Date().toISOString(),
    zone: S.zone, zoneLabel: S.zoneLabel, zoneIcon: lineIcon(S.zone),
    sensation: S.sensation, sensationLabel, sensationIcon,
    intensity: S.intensity,
    emotion: S.emotion, emotionLabel: eInfo?.name || S.emotion,
    subEmotion: S.subEmotion,
    contextChips: [...S.contextChips], note,
    message: msg.message, reflections: msg.reflections, repairs: msg.repairs,
  };
  const entries = getEntries(); entries.unshift(entry);
  localStorage.setItem('cc_entries', JSON.stringify(entries));
  closeModal('modal-register');
  checkRecentHint();
  updateHomeDashboard();
  updateDailyValueCard();
  showResult(entry);
}

function showResult(entry) {
  document.getElementById('res-zone-icon').textContent = entry.zoneIcon;
  document.getElementById('res-zone-name').textContent = entry.zoneLabel;
  document.getElementById('res-message').textContent = entry.message;
  document.getElementById('res-reflections').innerHTML =
    entry.reflections.map(r => `<div class="reflection-item">${r}</div>`).join('');
  document.getElementById('rep1').textContent = entry.repairs.n1;
  document.getElementById('rep2').textContent = entry.repairs.n2;
  document.getElementById('rep3').textContent = entry.repairs.n3;
  const w = document.getElementById('intensity-warning');
  w.classList.toggle('hidden', entry.intensity < 4);
  openModal('modal-result');
}

// ── DICTIONARY ──
function openDictionary() {
  buildDictionary('');
  const inp = document.getElementById('dict-search');
  if (inp) inp.value = '';
  openModal('modal-dictionary');
}

function buildDictionary(query) {
  const list = document.getElementById('dict-list');
  if (!list) return;
  const q = (query || '').toLowerCase().trim();
  const filtered = q.length < 2
    ? DICTIONARY
    : DICTIONARY.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.preview.toLowerCase().includes(q) ||
        (ZONES[d.zone]?.label || d.zone).toLowerCase().includes(q) ||
        d.message.toLowerCase().includes(q)
      );
  if (filtered.length === 0) {
    list.innerHTML = `<p class="dict-empty">No encontré esa señal, cariño.<br>Prueba con otra palabra</p>`;
    return;
  }
  // Agrupar por zona
  const grouped = {};
  filtered.forEach(d => {
    if (!grouped[d.zone]) grouped[d.zone] = [];
    grouped[d.zone].push(d);
  });
  list.innerHTML = Object.entries(grouped).map(([zone, items]) => {
    const zInfo = ZONES[zone] || { label: zone, icon: '🌸' };
    return `<div class="dict-zone-group">
      <div class="dict-zone-header dict-zone-${zone}" style="--zone-color:${zInfo.color || '#bd567d'}">${iconBadge(zone, 'dict-zone-icon')}<div class="dict-zone-copy"><strong>${zInfo.label}</strong><small>${items.length} señales corporales</small></div></div>
      ${items.map((d, i) => `
        <div class="dict-entry" style="--zone-color:${(ZONES[d.zone]?.color || '#bd567d')}" id="de-${d.name.replace(/\s/g,'-')}" onclick="toggleDictEntry(this)">
          <div class="dict-entry-header">
            ${iconBadge(dictionaryEntryIconKey(d), 'dict-entry-icon')}
            <div style="flex:1;min-width:0">
              <div class="dict-entry-name">${d.name}</div>
              <div class="dict-entry-preview">${d.preview}</div>
            </div>
            <span class="dict-entry-arrow">+</span>
          </div>
          <div class="dict-entry-body hidden">
            <p class="dict-message">${d.message}</p>
            <div class="dict-reflections">
              ${d.reflections.map(r => `<div class="reflection-item">${r}</div>`).join('')}
            </div>
            <div class="dict-repairs">
              <div class="repair-card repair-1"><div class="repair-badge rb1">Nivel 1 · Corporal</div><p>${d.repairs.n1}</p></div>
              <div class="repair-card repair-2"><div class="repair-badge rb2">Nivel 2 · Emocional</div><p>${d.repairs.n2}</p></div>
              <div class="repair-card repair-3"><div class="repair-badge rb3">Nivel 3 · Vida real</div><p>${d.repairs.n3}</p></div>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
  }).join('');
}

function searchDictionary(q) { buildDictionary(q); }

function toggleDictEntry(el) {
  const body = el.querySelector('.dict-entry-body');
  const arrow = el.querySelector('.dict-entry-arrow');
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden');
  arrow.textContent = isOpen ? '+' : '−';
  el.classList.toggle('open', !isOpen);
}

// ── DIARY ──
function buildDiary() {
  const list = document.getElementById('diary-list');
  if (!list) return;
  list.innerHTML = DIARY_EXERCISES.map(ex =>
    `<div class="diary-exercise-card" onclick="openDiary('${ex.id}')">
      ${iconBadge(themeIconKey(ex, 'diary'), 'diary-exercise-icon')}
      <div class="diary-exercise-info">
        <h4>${ex.title}</h4>
        <p>${ex.subtitle}</p>
      </div>
      <span class="diary-exercise-arrow">→</span>
    </div>`
  ).join('');
}

function openDiary(id) {
  const ex = DIARY_EXERCISES.find(e => e.id === id);
  if (!ex) return;
  S.diary = { exerciseId: id, stepIdx: 0, answers: new Array(ex.steps.length).fill('') };
  document.getElementById('dm-icon').textContent = lineIcon('diary');
  document.getElementById('dm-title').textContent = ex.title;
  document.getElementById('dm-subtitle').textContent = ex.subtitle;
  document.getElementById('dm-intro').textContent = ex.intro;
  renderDiaryStep(ex, 0);
  openModal('modal-diary');
}

function renderDiaryStep(ex, idx) {
  const stepsEl = document.getElementById('dm-steps');
  if (!stepsEl) return;
  stepsEl.innerHTML = ex.steps.map((st, i) =>
    `<div class="diary-step ${i === idx ? 'active' : ''}">
      <p class="diary-step-question">${st.prompt}</p>
      <textarea class="ctx-textarea" rows="4" maxlength="600"
        oninput="saveDiaryAnswer(${i}, this.value)"
        placeholder="Escribe aquí con total libertad...">${S.diary.answers[i] || ''}</textarea>
    </div>`
  ).join('');
  document.getElementById('dm-progress').textContent = `Paso ${idx + 1} de ${ex.steps.length}`;
  const prev = document.getElementById('dm-prev');
  const next = document.getElementById('dm-next');
  if (prev) prev.style.display = idx === 0 ? 'none' : '';
  if (next) next.textContent = idx === ex.steps.length - 1 ? 'Guardar ✓' : 'Siguiente →';
}

function saveDiaryAnswer(idx, val) {
  S.diary.answers[idx] = val;
}

function diaryNext() {
  const ex = DIARY_EXERCISES.find(e => e.id === S.diary.exerciseId);
  if (!ex) return;
  if (S.diary.stepIdx < ex.steps.length - 1) {
    S.diary.stepIdx++;
    renderDiaryStep(ex, S.diary.stepIdx);
  } else {
    saveDiaryEntry(ex);
    closeModal('modal-diary');
    showToast('Guardado en tu cuaderno. Gracias por este tiempo contigo.');
    // Navegar a Registros > Mi diario para que vea lo que acaba de escribir
    setTimeout(() => {
      showScreen('records');
      const btn = document.querySelector('[onclick*="switchRecordsTab(\'diary\'"]');
      if (btn) btn.click();
    }, 400);
  }
}

function diaryPrev() {
  const ex = DIARY_EXERCISES.find(e => e.id === S.diary.exerciseId);
  if (!ex || S.diary.stepIdx === 0) return;
  S.diary.stepIdx--;
  renderDiaryStep(ex, S.diary.stepIdx);
}

function saveDiaryEntry(ex) {
  const sessions = JSON.parse(localStorage.getItem('cc_diary') || '[]');
  sessions.unshift({ id: Date.now(), date: new Date().toISOString(), exerciseId: ex.id, title: ex.title, answers: S.diary.answers });
  localStorage.setItem('cc_diary', JSON.stringify(sessions));
}

// ── CHALLENGE ──
function buildChallenge() {
  renderChallengeCards();
}

function getChallengeData() {
  return JSON.parse(localStorage.getItem('cc_challenge') || '{}');
}

function renderChallengeCards() {
  const list = document.getElementById('challenge-days-list');
  if (!list) return;
  const data = getChallengeData();
  const round = parseInt(localStorage.getItem('cc_challenge_round') || '1');
  const badge = document.getElementById('challenge-round-badge');
  if (badge) badge.textContent = round > 1 ? `· Ronda ${round}` : '';
  list.innerHTML = _getCurrentRoundDays().map(day => {
    const isDone = !!data[day.day];
    const note = data[day.day]?.note || '';
    return `
    <div class="challenge-day-card ${isDone ? 'done' : ''}" id="cday-${day.day}">
      <div class="challenge-day-header">
        <div class="challenge-day-num">${isDone ? '✓' : day.day}</div>
        ${iconBadge(themeIconKey(day, 'challenge'), 'challenge-day-icon')}
        <span class="challenge-day-title">${day.title}</span>
      </div>
      <div class="challenge-inspiration">${day.inspiration}</div>
      <div class="challenge-exercise">${day.exercise}</div>
      ${isDone
        ? `<div class="challenge-done-badge">✓ Completado</div>
           ${note ? `<div style="margin-top:8px;font-size:.8rem;color:var(--text-mid);font-style:italic;">"${note}"</div>` : ''}`
        : `<div class="challenge-textarea-wrap">
             <textarea class="ctx-textarea" id="cnote-${day.day}" rows="3" placeholder="${day.prompt}..." maxlength="500"></textarea>
           </div>
           <button class="btn-primary" style="margin-top:0" onclick="completeDay(${day.day})">Marcar como completado ✓</button>`
      }
    </div>`;
  }).join('');
  updateChallengeProgress();
  updateHomeDashboard();
}

function completeDay(dayNum) {
  const note = document.getElementById(`cnote-${dayNum}`)?.value.trim() || '';
  const data = getChallengeData();
  data[dayNum] = { date: new Date().toISOString(), note };
  localStorage.setItem('cc_challenge', JSON.stringify(data));
  renderChallengeCards();
  showToast(`Día ${dayNum} completado.`);
}

function updateChallengeProgress() {
  const data = getChallengeData();
  const done = Object.keys(data).length;
  const pct = (done / 7) * 100;
  const fill = document.getElementById('challenge-fill');
  if (fill) fill.style.width = pct + '%';
}

function refreshChallenge() { renderChallengeCards(); }

// ── RE-CONECT ──
function buildReconectZonePills() {
  const c = document.getElementById('r-zone-pills');
  if (!c) return;
  c.innerHTML = Object.entries(ZONES).map(([id, z]) =>
    `<button class="r-zone-pill ctx-chip" onclick="pickRZone('${id}','${z.label}',this)">${uiIcon(id)} ${z.label}</button>`
  ).join('');
}

function buildReconectSensPills() {
  const c = document.getElementById('r-sensation-pills');
  if (!c) return;
  c.innerHTML = SENSATIONS.map(s =>
    `<button class="r-sens-pill ctx-chip" onclick="pickRSens('${s.id}',this)">${uiIcon(s.id)} ${s.name}</button>`
  ).join('');
}

function pickRZone(id, label, btn) {
  S.reconect.zone = id; S.reconect.zoneLabel = label;
  document.querySelectorAll('#r-zone-pills .ctx-chip').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function pickRSens(id, btn) {
  S.reconect.sensation = id;
  document.querySelectorAll('#r-sensation-pills .ctx-chip').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function pickRTime(val, btn) {
  S.reconect.time = val;
  document.querySelectorAll('.r-time-pills .ctx-chip').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function openReconect() {
  S.reconect = { zone:null, zoneLabel:null, sensation:null, time:null, emotion:null, subEmotion:null, need:null, repair:null };
  document.querySelectorAll('.rstep').forEach(s => s.classList.remove('active'));
  document.getElementById('rstep-1').classList.add('active');
  updateRDots(1);
  // Clear inputs
  ['r-q1','r-q2','r-q3','r-q4','r-need-note','r-repair-note'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.querySelectorAll('#reconect-body .ctx-chip').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('#r-emotion-wheel .emo-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('r-sub-emotions-area')?.classList.add('hidden');
  openModal('modal-reconect');
}

function goRStep(n) {
  if (n === 4) {
    buildNeedsStep();
  }
  if (n === 5) {
    buildRepairsStep();
  }
  document.querySelectorAll('.rstep').forEach(s => s.classList.remove('active'));
  document.getElementById('rstep-' + n).classList.add('active');
  updateRDots(n);
  document.getElementById('reconect-body')?.scrollTo(0, 0);
}

function updateRDots(active) {
  for (let i = 1; i <= 5; i++) {
    const d = document.getElementById('rsd' + i);
    if (!d) continue;
    d.classList.remove('active','done');
    if (i < active) d.classList.add('done');
    if (i === active) d.classList.add('active');
  }
}

function buildNeedsStep() {
  const emo = S.reconect.emotion || S.emotion;
  const needData = EMOTION_NEEDS[emo];
  const c = document.getElementById('r-needs-container');
  if (!c) return;
  if (needData) {
    c.innerHTML = `<div class="need-tip">${needData.tip}</div>` +
      needData.needs.map(n =>
        `<button class="need-option" onclick="pickNeed('${n.replace(/'/g,"\\'")}',this)">${n}</button>`
      ).join('');
  } else {
    c.innerHTML = '<p style="color:var(--text-light);font-size:.84rem;">Explora qué necesitas realmente en este momento.</p>';
  }
}

function pickNeed(val, btn) {
  S.reconect.need = val;
  document.querySelectorAll('.need-option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function buildRepairsStep() {
  const zone = S.reconect.zone || S.zone;
  const sensation = S.reconect.sensation || S.sensation;
  const emotion = S.reconect.emotion || S.emotion;
  const msg = getSymbolicMessage(zone || 'belly', sensation || 'tension', emotion || 'MIEDO');
  const c = document.getElementById('r-repairs-container');
  if (!c) return;
  c.innerHTML = `
    <div class="repair-card repair-1"><div class="repair-badge rb1">Nivel 1 · Corporal</div><p>${msg.repairs.n1}</p></div>
    <div class="repair-card repair-2"><div class="repair-badge rb2">Nivel 2 · Emocional</div><p>${msg.repairs.n2}</p></div>
    <div class="repair-card repair-3"><div class="repair-badge rb3">Nivel 3 · Vida real</div><p>${msg.repairs.n3}</p></div>`;
}

function saveReconect() {
  const zone = S.reconect.zone || S.zone;
  const emotion = S.reconect.emotion || S.emotion;
  const eInfo = EMOTIONS.find(e => e.id === emotion);
  const zInfo = ZONES[zone];
  const session = {
    id: Date.now(), date: new Date().toISOString(),
    zone, zoneLabel: S.reconect.zoneLabel || S.zoneLabel || zInfo?.label || zone,
    zoneIcon: lineIcon(zone),
    sensation: S.reconect.sensation,
    time: S.reconect.time,
    emotion, emotionLabel: eInfo?.name || emotion,
    q1: document.getElementById('r-q1')?.value || '',
    q2: document.getElementById('r-q2')?.value || '',
    q3: document.getElementById('r-q3')?.value || '',
    q4: document.getElementById('r-q4')?.value || '',
    need: S.reconect.need || document.getElementById('r-need-note')?.value || '',
    repair: document.getElementById('r-repair-note')?.value || '',
  };
  const sessions = JSON.parse(localStorage.getItem('cc_reconect') || '[]');
  sessions.unshift(session);
  localStorage.setItem('cc_reconect', JSON.stringify(sessions));
  closeModal('modal-reconect');
  renderReconectHistory();
  showToast('Mapa RE-CONECT guardado.');
}

function renderReconectHistory() {
  const c = document.getElementById('reconect-history');
  if (!c) return;
  const sessions = JSON.parse(localStorage.getItem('cc_reconect') || '[]');
  if (sessions.length === 0) {
    c.innerHTML = '<p style="font-size:.82rem;color:var(--text-light);padding:0 14px;">Tus mapas completados aparecerán aquí.</p>';
    return;
  }
  c.innerHTML = sessions.map(s => {
    const d = new Date(s.date);
    const ds = d.toLocaleDateString('es-ES', { day:'numeric', month:'short' });
    return `<div class="reconect-session-card">
      <div class="session-date">${ds}</div>
      <div class="session-zone">${s.zoneIcon} ${s.zoneLabel} · ${s.emotionLabel || s.emotion}</div>
      ${s.need ? `<div class="session-summary">Necesidad: ${s.need}</div>` : ''}
      ${s.repair ? `<div class="session-summary">Reparación: ${s.repair}</div>` : ''}
    </div>`;
  }).join('');
}

// ── MEDITATIONS ──
function buildMeditations() {
  const list = document.getElementById('meditations-list');
  if (!list) return;
  list.innerHTML = MEDITATIONS.map(m =>
    `<div class="meditation-card" onclick="openMeditation('${m.id}')">
      ${iconBadge(themeIconKey(m, 'meditation'), 'med-card-icon')}
      <div class="med-card-info">
        <h4>${m.title}</h4>
        <p>${m.description}</p>
        <div class="med-card-meta">
          <span class="med-type-badge med-type-${m.type}">${m.type}</span>
          <span class="med-duration-text">${m.duration}</span>
        </div>
      </div>
      <span class="med-card-arrow">→</span>
    </div>`
  ).join('');
}

// openMeditation está definida más abajo con el temporizador

// ── RECORDS ──
function getEntries() {
  try { return JSON.parse(localStorage.getItem('cc_entries') || '[]'); } catch { return []; }
}

function renderRecords() {
  renderTimeline();
  renderDiaryHistory();
  renderPatterns();
  renderCharts();
}

function switchRecordsTab(tab, btn) {
  document.querySelectorAll('.records-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.records-pane').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('records-' + tab).classList.add('active');
}

function renderDiaryHistory() {
  const c = document.getElementById('records-diary');
  if (!c) return;
  const sessions = JSON.parse(localStorage.getItem('cc_diary') || '[]');
  if (sessions.length === 0) {
    c.innerHTML = `<div class="records-empty">
      <div class="ei">≡</div>
      <h3>Tu cuaderno está vacío</h3>
      <p>Cuando completes un ejercicio del diario aparecerá aquí para que puedas releerlo cuando quieras.</p>
    </div>`;
    return;
  }
  c.innerHTML = sessions.map((s, i) => {
    const ex = DIARY_EXERCISES.find(e => e.id === s.exerciseId) || {};
    const d = new Date(s.date);
    const ds = d.toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' });
    const ts = d.toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' });
    const answersHtml = (ex.steps || []).map((st, idx) => {
      const ans = (s.answers || [])[idx];
      if (!ans || !ans.trim()) return '';
      return `<div class="dh-answer">
        <p class="dh-question">${st.prompt}</p>
        <p class="dh-response">${ans}</p>
      </div>`;
    }).join('');
    return `<div class="dh-card" onclick="toggleDHEntry(this)">
      <div class="dh-card-header">
        ${iconBadge(themeIconKey(ex || s, 'diary'), 'dh-icon')}
        <div class="dh-card-info">
          <h4>${ex.title || s.title}</h4>
          <span class="dh-date">${ds} · ${ts}</span>
        </div>
        <span class="dh-arrow">+</span>
      </div>
      <div class="dh-body hidden">${answersHtml || '<p style="color:var(--text-light);font-size:.82rem">Sin respuestas guardadas.</p>'}</div>
    </div>`;
  }).join('');
}

function toggleDHEntry(el) {
  const body = el.querySelector('.dh-body');
  const arrow = el.querySelector('.dh-arrow');
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden');
  arrow.textContent = isOpen ? '+' : '−';
  el.classList.toggle('open', !isOpen);
}

function renderTimeline() {
  const c = document.getElementById('records-timeline');
  if (!c) return;
  const entries = getEntries();
  const reconect = JSON.parse(localStorage.getItem('cc_reconect') || '[]');
  const diary = JSON.parse(localStorage.getItem('cc_diary') || '[]');
  if (entries.length === 0 && reconect.length === 0 && diary.length === 0) {
    c.innerHTML = `<div class="records-empty"><div class="ei">◎</div><h3>Tu diario está vacío</h3><p>Cuando registres tu primera señal desde la pantalla de Inicio, aparecerá aquí.</p></div>`;
    return;
  }
  const intLabels = ['','Leve','Poco','Medio','Fuerte','Muy intenso'];
  c.innerHTML = entries.map(e => {
    const d = new Date(e.date);
    const ds = d.toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' });
    const ts = d.toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' });
    return `<div class="record-card" onclick="toggleRcExpand(this)">
      <div class="rc-header">
        <div class="rc-date">${ds} · ${ts}</div>
        <div class="rc-zone-badge"><span>${e.zoneIcon}</span><span>${e.zoneLabel}</span></div>
      </div>
      <div class="rc-tags">
        <span class="rc-tag rc-tag-s">${e.sensationIcon} ${e.sensationLabel}</span>
        <span class="rc-tag rc-tag-e">${e.emotionLabel}${e.subEmotion ? ' · '+e.subEmotion : ''}</span>
        <span class="rc-tag rc-tag-i">${intLabels[e.intensity]||e.intensity}</span>
      </div>
      <div class="rc-preview">${e.message}</div>
      <div class="rc-expanded hidden">
        <div class="result-message-card" style="margin-bottom:12px">
          <span class="result-quote">❝</span>
          <p class="res-message-text">${e.message}</p>
        </div>
        ${e.reflections.map(r=>`<div class="reflection-item">${r}</div>`).join('')}
        <div style="margin-top:12px">
          <div class="repair-card repair-1"><div class="repair-badge rb1">Nivel 1 · Corporal</div><p>${e.repairs.n1}</p></div>
          <div class="repair-card repair-2"><div class="repair-badge rb2">Nivel 2 · Emocional</div><p>${e.repairs.n2}</p></div>
          <div class="repair-card repair-3"><div class="repair-badge rb3">Nivel 3 · Vida real</div><p>${e.repairs.n3}</p></div>
        </div>
        ${e.contextChips?.length ? `<div style="margin-top:10px;font-size:.78rem;color:var(--text-light)">Contexto: ${e.contextChips.join(', ')}</div>` : ''}
        ${e.note ? `<div style="margin-top:8px;font-size:.8rem;color:var(--text-mid);font-style:italic">"${e.note}"</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

function toggleRcExpand(card) {
  card.querySelector('.rc-expanded')?.classList.toggle('hidden');
}

function renderPatterns() {
  const c = document.getElementById('records-patterns');
  if (!c) return;
  const entries = getEntries();
  if (entries.length < 3) {
    c.innerHTML = `<div class="records-empty"><div class="ei">🔍</div><h3>Necesito más datos</h3><p>Registra al menos 3 señales para que pueda detectar patrones en tu cuerpo.</p></div>`;
    return;
  }
  const patterns = [];
  // Zona más frecuente
  const zoneCounts = {};
  entries.forEach(e => { zoneCounts[e.zoneLabel] = (zoneCounts[e.zoneLabel] || 0) + 1; });
  const topZone = Object.entries(zoneCounts).sort((a,b)=>b[1]-a[1])[0];
  if (topZone && topZone[1] >= 2) {
    patterns.push({ title:'Zona frecuente', text:`He notado que la zona de "${topZone[0]}" aparece con frecuencia en tus registros (${topZone[1]} veces). ¿Quieres explorar qué hay detrás de esta zona?` });
  }
  // Emoción más frecuente
  const emoCounts = {};
  entries.forEach(e => { emoCounts[e.emotionLabel] = (emoCounts[e.emotionLabel] || 0) + 1; });
  const topEmo = Object.entries(emoCounts).sort((a,b)=>b[1]-a[1])[0];
  if (topEmo && topEmo[1] >= 2) {
    patterns.push({ title:'Emoción recurrente', text:`La emoción "${topEmo[0]}" aparece repetidamente en tus registros. Puede que haya algo importante que esta emoción quiere decirte.` });
  }
  // Intensidades altas
  const highInt = entries.filter(e => e.intensity >= 4);
  if (highInt.length >= 2) {
    patterns.push({ title:'Señales de alta intensidad', text:`Has registrado ${highInt.length} señales de intensidad alta (4-5). Cariño, tu cuerpo está hablando fuerte. ¿Has podido explorar qué hay detrás?` });
  }
  // Día de la semana
  const dayCounts = {};
  entries.forEach(e => {
    const day = new Date(e.date).toLocaleDateString('es-ES', { weekday:'long' });
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });
  const topDay = Object.entries(dayCounts).sort((a,b)=>b[1]-a[1])[0];
  if (topDay && topDay[1] >= 2) {
    patterns.push({ title:'Patrón semanal', text:`He notado que los ${topDay[0]}s sueles tener más señales. ¿Qué pasa ese día de tu semana que activa a tu cuerpo?` });
  }
  if (patterns.length === 0) {
    c.innerHTML = `<div class="records-empty"><div class="ei">⌁</div><h3>Siguiendo tu huella...</h3><p>Sigue registrando y pronto podré darte insights sobre tus patrones.</p></div>`;
    return;
  }
  c.innerHTML = patterns.map(p =>
    `<div class="pattern-card"><div class="pc-title">🔍 ${p.title}</div><p>${p.text}</p></div>`
  ).join('');
}

function renderCharts() {
  const c = document.getElementById('records-charts');
  if (!c) return;
  const entries = getEntries();
  if (entries.length === 0) {
    c.innerHTML = `<div class="records-empty"><div class="ei">📊</div><h3>Sin datos aún</h3><p>Tus gráficos aparecerán aquí cuando tengas registros.</p></div>`;
    return;
  }
  // Zonas
  const zoneCounts = {};
  entries.forEach(e => { zoneCounts[e.zoneLabel] = (zoneCounts[e.zoneLabel] || 0) + 1; });
  const maxZ = Math.max(...Object.values(zoneCounts));
  const zoneChart = Object.entries(zoneCounts).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([label,count]) =>
    `<div class="chart-bar-row">
      <span class="chart-bar-label">${label}</span>
      <div class="chart-bar-track">
        <div class="chart-bar-fill" style="width:${(count/maxZ)*100}%">
          <span>${count}</span>
        </div>
      </div>
    </div>`
  ).join('');
  // Emociones
  const emoCounts = {};
  entries.forEach(e => { emoCounts[e.emotionLabel] = (emoCounts[e.emotionLabel] || 0) + 1; });
  const maxE = Math.max(...Object.values(emoCounts));
  const emoChart = Object.entries(emoCounts).sort((a,b)=>b[1]-a[1]).map(([label,count]) =>
    `<div class="chart-bar-row">
      <span class="chart-bar-label">${label}</span>
      <div class="chart-bar-track">
        <div class="chart-bar-fill" style="width:${(count/maxE)*100}%;background:linear-gradient(90deg,var(--rose-deep),var(--rose))">
          <span>${count}</span>
        </div>
      </div>
    </div>`
  ).join('');
  // Mapa de calor corporal
  const heatZoneCounts = {};
  entries.forEach(e => { heatZoneCounts[e.zone] = (heatZoneCounts[e.zone] || 0) + 1; });
  const heatMax = Math.max(...Object.values(heatZoneCounts), 1);
  const heatZonePos = {
    head:      { cx:100, cy:45,  r:28 },
    throat:    { cx:100, cy:80,  r:14 },
    chest:     { cx:100, cy:120, r:24 },
    shoulders: { cx:100, cy:105, r:42 },
    belly:     { cx:100, cy:192, r:24 },
    lumbar:    { cx:100, cy:158, r:18 },
    pelvis:    { cx:100, cy:262, r:26 },
    hips:      { cx:100, cy:282, r:36 },
    legs:      { cx:100, cy:370, r:20 },
  };
  const heatCircles = Object.entries(heatZoneCounts)
    .filter(([z]) => heatZonePos[z])
    .sort((a,b) => b[1]-a[1])
    .map(([z, count]) => {
      const pos = heatZonePos[z];
      const alpha = 0.18 + (count / heatMax) * 0.65;
      const color = ZONES[z]?.color || '#c4705a';
      return `<ellipse cx="${pos.cx}" cy="${pos.cy}" rx="${pos.r+6}" ry="${pos.r+4}" fill="${color}" opacity="${alpha.toFixed(2)}"/>`;
    }).join('');
  const heatLegend = Object.entries(heatZoneCounts).sort((a,b)=>b[1]-a[1]).map(([z, count]) => {
    const zInfo = ZONES[z] || { label: z, icon: '🌸', color: '#c4705a' };
    const alpha = Math.round((0.35 + (count / heatMax) * 0.65) * 100);
    return `<div class="heatmap-legend-item">
      <div class="heatmap-dot" style="background:${zInfo.color};opacity:${alpha}%"></div>
      <span class="heatmap-label">${zInfo.icon} ${zInfo.label}</span>
      <span class="heatmap-count">${count}</span>
    </div>`;
  }).join('');

  c.innerHTML = `
    <div class="heatmap-section">
      <div class="heatmap-title">🌡 Mapa de calor corporal</div>
      <div class="heatmap-wrap">
        <svg class="heatmap-svg" viewBox="0 0 200 470" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="45" rx="28" ry="33" fill="#f0e8e4" stroke="#d4a898" stroke-width="1.5"/>
          <rect x="88" y="76" width="24" height="18" rx="5" fill="#f0e8e4" stroke="#d4a898" stroke-width="1"/>
          <path d="M68,94 Q55,102 55,120 L58,155 Q60,165 68,170 L75,200 Q78,215 80,230 L120,230 Q122,215 125,200 L132,170 Q140,165 142,155 L145,120 Q145,102 132,94 Q118,88 100,88 Q82,88 68,94Z" fill="#f0e8e4" stroke="#d4a898" stroke-width="1.5"/>
          <path d="M75,228 Q65,235 62,255 Q60,270 65,285 L72,300 Q85,308 100,309 Q115,308 128,300 L135,285 Q140,270 138,255 Q135,235 125,228Z" fill="#f0e8e4" stroke="#d4a898" stroke-width="1.5"/>
          <path d="M72,300 Q65,315 63,340 L62,380 Q62,400 65,420 Q68,435 72,445 L85,445 Q88,435 88,420 L90,380 L92,340 Q92,315 88,300Z" fill="#f0e8e4" stroke="#d4a898" stroke-width="1.5"/>
          <path d="M128,300 Q135,315 137,340 L138,380 Q138,400 135,420 Q132,435 128,445 L115,445 Q112,435 112,420 L110,380 L108,340 Q108,315 112,300Z" fill="#f0e8e4" stroke="#d4a898" stroke-width="1.5"/>
          <ellipse cx="75" cy="452" rx="13" ry="7" fill="#f0e8e4" stroke="#d4a898" stroke-width="1"/>
          <ellipse cx="125" cy="452" rx="13" ry="7" fill="#f0e8e4" stroke="#d4a898" stroke-width="1"/>
          <path d="M68,94 Q50,105 42,130 L38,165 Q38,180 45,185 L52,185 Q58,180 60,165 L62,135 Q65,115 72,105Z" fill="#f0e8e4" stroke="#d4a898" stroke-width="1.5"/>
          <path d="M132,94 Q150,105 158,130 L162,165 Q162,180 155,185 L148,185 Q142,180 140,165 L138,135 Q135,115 128,105Z" fill="#f0e8e4" stroke="#d4a898" stroke-width="1.5"/>
          ${heatCircles}
        </svg>
        <div class="heatmap-legend">${heatLegend}</div>
      </div>
    </div>
    <div class="chart-section">
      <div class="chart-title">Zonas más registradas</div>
      ${zoneChart}
    </div>
    <div class="chart-section">
      <div class="chart-title">Emociones más frecuentes</div>
      ${emoChart}
    </div>
    <div class="chart-section">
      <div class="chart-title">Total de registros: ${entries.length}</div>
      <p style="font-size:.82rem;color:var(--text-mid);line-height:1.6">
        Llevas ${entries.length} ${entries.length===1?'registro':'registros'} en tu diario del cuerpo.
        ${entries.length >= 7 ? 'Estás construyendo un autoconocimiento precioso.' : 'Sigue registrando para ver más patrones.'}
      </p>
    </div>`;
}

// ── REINICIAR RETO ──
function resetChallenge() {
  if (!confirm('¿Segura que quieres reiniciar el Reto 7 Días?\nSe borrarán los días marcados y empezarás la siguiente ronda 🌱')) return;
  const currentRound = parseInt(localStorage.getItem('cc_challenge_round') || '1');
  const allRounds = typeof CHALLENGE_ROUNDS !== 'undefined' ? CHALLENGE_ROUNDS : [CHALLENGE_7_DAYS];
  const nextRound = currentRound >= allRounds.length ? 1 : currentRound + 1;
  localStorage.setItem('cc_challenge_round', nextRound);
  localStorage.removeItem('cc_challenge');
  renderChallengeCards();
  showToast(`Ronda ${nextRound} comenzada. Profundizamos.`);
}

function _getCurrentRoundDays() {
  const round = parseInt(localStorage.getItem('cc_challenge_round') || '1');
  const allRounds = typeof CHALLENGE_ROUNDS !== 'undefined' ? CHALLENGE_ROUNDS : [CHALLENGE_7_DAYS];
  return allRounds[(round - 1) % allRounds.length] || CHALLENGE_7_DAYS;
}

// ── DICCIONARIO POR ZONA (Piel, Energía, Ciclo) ──
function openZoneDictionary(zoneId) {
  const zInfo = ZONES[zoneId] || {};
  const inp = document.getElementById('dict-search');
  if (inp) inp.value = zInfo.label || '';
  buildDictionary(zInfo.label || '');
  openModal('modal-dictionary');
}

// ── CERRAR SESIÓN ──
function logOut() {
  if (!confirm('¿Quieres cerrar sesión?\nTus datos guardados no se borran')) return;
  localStorage.removeItem('cc_access');
  localStorage.removeItem('cc_used_code');
  window.location.reload();
}

// ══════════════════════════════════════════════════════════════
// MEDITACIONES — AUDIO (voz guiada + campana)
// ══════════════════════════════════════════════════════════════
// PARA AÑADIR TU VOZ GRABADA:
//   1. Crea una carpeta "audio" dentro de codigo-cuerpo/
//   2. Guarda tu grabación como: audio/{id-meditacion}.mp3
//      Ejemplo: audio/respiracion.mp3, audio/tapping-culpa.mp3
//   3. La app usará tu voz automáticamente si el archivo existe.
//      Si no existe, usará la voz sintetizada.
// ══════════════════════════════════════════════════════════════
let _voiceOn    = true;   // voz guiada activada por defecto
let _medScript  = '';     // texto de la meditación actual
let _medId      = '';     // id de la meditación actual
let _customAudio = null;  // elemento <audio> para grabaciones propias

// ── Abrir meditación ──
function openMeditation(id) {
  const m = MEDITATIONS.find(x => x.id === id);
  if (!m) return;
  _medId = id;
  _medScript = m.script;
  document.getElementById('med-icon').textContent        = lineIcon('meditation');
  document.getElementById('med-title').textContent       = m.title;
  document.getElementById('med-duration').textContent    = `${m.type.charAt(0).toUpperCase()+m.type.slice(1)} · ${m.duration}`;
  document.getElementById('med-description').textContent = m.description;
  document.getElementById('med-script').textContent      = m.script;
  stopMedTimer();
  // Sincronizar estado del toggle de voz
  _syncVoiceToggle();
  openModal('modal-meditation');
}

// ── Toggle voz guiada ──
function toggleVoiceGuide(el) {
  _voiceOn = !_voiceOn;
  _syncVoiceToggle();
  if (!_voiceOn) stopVoice();
}
function _syncVoiceToggle() {
  const toggle = document.getElementById('med-voice-toggle');
  const label  = document.getElementById('med-voice-label');
  const status = document.getElementById('med-voice-status');
  const icon   = document.getElementById('med-voice-icon');
  if (!toggle) return;
  toggle.classList.toggle('off', !_voiceOn);
  if (label)  label.textContent  = _voiceOn ? 'Voz guiada: ON' : 'Voz guiada: OFF';
  if (icon)   icon.textContent   = _voiceOn ? lineIcon('voiceOn') : lineIcon('voiceOff');
  if (status) { status.className = 'med-voice-status ' + (_voiceOn ? 'on' : 'off'); }
}

// ── Iniciar ──
function startMedTimer() {
  // 1. Campana de inicio
  playBell(440, 2.5);

  // 2. Intentar audio grabado (carpeta audio/{id}.mp3)
  //    play() devuelve una Promesa: si resuelve → hay audio; si rechaza → usar voz
  if (_customAudio) { _customAudio.pause(); _customAudio = null; }

  const audio = new Audio(`./audio/${_medId}.mp3`);
  let audioStarted = false;

  const fallbackToVoice = () => {
    if (audioStarted) return;
    audioStarted = true;
    _customAudio = null;
    if (_voiceOn) startVoice(_medScript);
  };

  audio.onerror = fallbackToVoice;

  audio.play()
    .then(() => {
      // ✅ Audio grabado encontrado y reproduciendo
      audioStarted = true;
      _customAudio = audio;
      setSpeakingIndicator(true);
      showToast('Reproduciendo tu audio grabado');
      audio.onended = () => {
        _customAudio = null;
        setSpeakingIndicator(false);
        _showPlayBtn(true);
        showToast('Práctica completada. Gracias por este tiempo contigo.');
      };
    })
    .catch(fallbackToVoice); // ❌ Archivo no existe → voz sintetizada

  _showPlayBtn(false);
}

// ── Pausa ──
function pauseMedTimer() {
  if (_customAudio) _customAudio.pause();
  pauseVoice();
  _showPlayBtn(true);
  setSpeakingIndicator(false);
}

// ── Detener ──
function stopMedTimer() {
  if (_customAudio) { _customAudio.pause(); _customAudio.currentTime = 0; _customAudio = null; }
  stopVoice();
  _showPlayBtn(true);
  setSpeakingIndicator(false);
}

function _showPlayBtn(show) {
  document.getElementById('med-timer-play')?.classList.toggle('hidden', !show);
  document.getElementById('med-timer-pause')?.classList.toggle('hidden', show);
}

function setSpeakingIndicator(on) {
  document.getElementById('med-speaking-indicator')?.classList.toggle('hidden', !on);
}

// ══════════════════════════════════════
// CAMPANA — Web Audio API (fix Chrome)
// ══════════════════════════════════════
let _audioCtx = null;

function _getAudioCtx() {
  try {
    if (!_audioCtx) {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // FIX 1: Chrome suspende el contexto por política de autoplay.
    // Como estamos dentro de un click, resume() lo desbloquea.
    if (_audioCtx.state === 'suspended') {
      _audioCtx.resume();
    }
    return _audioCtx;
  } catch(e) {
    console.log('AudioContext no disponible:', e.message);
    return null;
  }
}

function playBell(freq, duration) {
  const ctx = _getAudioCtx();
  if (!ctx) return;

  // FIX PC: resume() es async — esperar a que el contexto esté activo
  const _doPlay = () => {
    const now = ctx.currentTime;
    // Oscilador principal
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.start(now);
    osc.stop(now + duration);
    // Armónico suave (enriquece el timbre)
    const osc2  = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.01, now);
    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.75);
    osc2.start(now);
    osc2.stop(now + duration);
  };

  if (ctx.state === 'suspended') {
    ctx.resume().then(_doPlay).catch(() => {});
  } else {
    _doPlay();
  }
}

// ══════════════════════════════════════════════════════════
// VOZ GUIADA — versión robusta con chunks + mejor calidad
// FIX principal: Chrome corta textos largos → leer por párrafos
// ══════════════════════════════════════════════════════════
let _utterance   = null;
let _voiceQueue  = [];   // lista de fragmentos a leer
let _voiceIdx    = 0;
let _voicePaused = false;
let _voiceStopped = true;

// Precargar voces (Chrome las carga de forma asíncrona)
let _voicesList  = [];
function _loadVoices() {
  _voicesList = window.speechSynthesis?.getVoices() || [];
}
if (window.speechSynthesis) {
  _loadVoices();
  window.speechSynthesis.onvoiceschanged = _loadVoices;
}

// Limpia el texto antes de leerlo (evita que el TTS lea símbolos)
function _cleanScript(text) {
  return text
    .replace(/\((\d+)\)/g, '$1')      // (1) → 1, (2) → 2 (numeración de puntos)
    .replace(/[()[\]{}]/g, '')         // quita paréntesis restantes
    .replace(/[—–]{1,}/g, ', ')        // guiones largos → pausa
    .replace(/\.{2,}/g, ', ')          // ... o .. → pausa
    .replace(/_{2,}/g, '')             // guiones bajos
    .replace(/\*+/g, '')               // asteriscos
    .replace(/\s{2,}/g, ' ')           // espacios múltiples
    .trim();
}

// Divide el texto en fragmentos cortos (por párrafos y frases)
// Chrome solo lee fiablemente ~200 caracteres seguidos
function _splitText(text) {
  return text
    .split(/\n+/)                          // separar por saltos de línea
    .flatMap(line => {
      line = _cleanScript(line.trim());    // limpiar símbolos antes de leer
      if (!line) return [];
      if (line.length <= 220) return [line];
      // Si la línea es larga, partir por puntuación
      return line
        .split(/(?<=[.!?…,])\s+/)
        .filter(s => s.trim().length > 0);
    });
}

// Elegir la mejor voz española disponible (optimizado para móvil)
function _bestSpanishVoice() {
  const all = window.speechSynthesis?.getVoices() || [];
  if (!all.length) return null;

  // Imprimir voces disponibles para diagnóstico (solo en desarrollo)
  // console.log('Voces:', all.filter(v=>v.lang.startsWith('es')).map(v=>v.name+'|'+v.lang+'|local:'+v.localService));

  const esVoices = all.filter(v => v.lang.startsWith('es'));
  if (!esVoices.length) return null;

  // 1. Voces neurales / premium (Microsoft Edge, iOS, Android)
  const neural = esVoices.find(v => /natural|neural|enhanced|premium/i.test(v.name));
  if (neural) return neural;

  // 2. Google español (Android/Samsung Chrome — suena bien, puede ser localService:true)
  const google = esVoices.find(v => /google/i.test(v.name));
  if (google) return google;

  // 3. Voces online no locales (mejor calidad en PC/Edge)
  const online = esVoices.find(v => v.localService === false);
  if (online) return online;

  // 4. Mónica, Lucía o Jorge (iOS — suenan bien)
  const apple = esVoices.find(v => /mónica|monica|lucía|lucia|jorge/i.test(v.name));
  if (apple) return apple;

  // 5. Cualquier español España → México → cualquier español
  return esVoices.find(v => v.lang === 'es-ES')
      || esVoices.find(v => v.lang === 'es-MX')
      || esVoices[0];
}

function startVoice(text) {
  if (!window.speechSynthesis) {
    showToast('Activa el audio en Chrome o Edge.');
    return;
  }
  stopVoice();
  _voiceQueue   = _splitText(text);
  _voiceIdx     = 0;
  _voiceStopped = false;
  _voicePaused  = false;

  const begin = () => {
    setSpeakingIndicator(true);
    _speakNext();
  };

  // Esperar si las voces aún no cargaron
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = () => _loadVoices();
      _loadVoices();
      begin();
    };
  } else {
    begin();
  }
}

function _speakNext() {
  if (_voiceStopped || _voicePaused) return;
  if (_voiceIdx >= _voiceQueue.length) {
    setSpeakingIndicator(false);
    return;
  }

  const chunk  = _voiceQueue[_voiceIdx++];
  _utterance   = new SpeechSynthesisUtterance(chunk);
  _utterance.lang   = 'es-ES';
  _utterance.rate   = 0.78;   // lento y calmado — ideal para meditación
  _utterance.pitch  = 1.0;    // natural, sin artificios
  _utterance.volume = 1;

  const best = _bestSpanishVoice();
  if (best) _utterance.voice = best;

  // Pausa corta entre fragmentos para que suene natural
  _utterance.onend = () => {
    if (!_voiceStopped && !_voicePaused) {
      setTimeout(_speakNext, 380);
    }
  };
  _utterance.onerror = (e) => {
    if (e.error === 'interrupted') return; // stop() voluntario
    setTimeout(_speakNext, 200);           // reintenta el siguiente
  };

  window.speechSynthesis.speak(_utterance);
}

function pauseVoice() {
  _voicePaused = true;
  if (window.speechSynthesis?.speaking) window.speechSynthesis.pause();
}

function stopVoice() {
  _voiceStopped = true;
  _voicePaused  = false;
  _voiceQueue   = [];
  _voiceIdx     = 0;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  setSpeakingIndicator(false);
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2800);
}

// ── SERVICE WORKER (PWA — funciona sin internet) ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('✓ CÓDIGO CUERPO — PWA activa'))
      .catch(e => console.log('SW no disponible (normal en local):', e.message));
  });
}

// ── PREMIUM INTERACTIONS ──
function initPremiumInteractions() {
  if (window.__ccPremiumInteractions) return;
  window.__ccPremiumInteractions = true;

  const interactiveSelector = [
    'button', '.diary-exercise-card', '.challenge-day-card', '.meditation-card',
    '.record-card', '.dh-card', '.dict-entry-header', '.need-option', '.sens-btn',
    '.emo-btn', '.int-btn', '.ctx-chip', '.sub-chip'
  ].join(',');

  document.addEventListener('pointerdown', e => {
    if (!(e.target instanceof Element)) return;
    const target = e.target.closest(interactiveSelector);
    if (!target || target.disabled) return;
    target.classList.add('is-pressing');
    createPremiumRipple(target, e);
    if (navigator.vibrate && target.matches('button,.nav-item,.sens-btn,.emo-btn,.int-btn')) {
      navigator.vibrate(8);
    }
  }, { passive: true });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt => {
    document.addEventListener(evt, e => {
      if (!(e.target instanceof Element)) return;
      const target = e.target.closest(interactiveSelector);
      if (target) target.classList.remove('is-pressing');
    }, { passive: true });
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const openModal = [...document.querySelectorAll('.modal-overlay:not(.hidden)')].pop();
    if (openModal?.id) {
      if (openModal.id === 'modal-meditation') stopMedTimer();
      closeModal(openModal.id);
    }
  });

  document.querySelectorAll('.nav-item.active').forEach(item => item.setAttribute('aria-current', 'page'));
}

function createPremiumRipple(target, event) {
  if (!target || target.closest('.body-svg')) return;
  const rect = target.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const ripple = document.createElement('span');
  ripple.className = 'premium-ripple';
  const size = Math.max(rect.width, rect.height) * 0.34;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}











