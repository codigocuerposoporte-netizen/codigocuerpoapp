// ============================================================
// CÓDIGO CUERPO — Base de datos completa v2
// ============================================================

// ── CÓDIGOS DE ACCESO ──────────────────────────────────────
// Añade o elimina códigos aquí para gestionar el acceso.
// Cada código corresponde a una compra del libro.
// Formato recomendado: PALABRA-NÚMERO (ej: ROSA-1234)
const VALID_CODES = [
  // ── Códigos de ejemplo (cámbialos por los tuyos) ──
  'BIODESCODIFICA-2025',   // Código general de lanzamiento
  'ROSA-1001',
  'ROSA-1002',
  'ROSA-1003',
  'FLOR-2001',
  'FLOR-2002',
  'FLOR-2003',
  'LUNA-3001',
  'LUNA-3002',
  'LUNA-3003',
  // ── Añade más debajo de esta línea ──
];

// Mensaje que verá la clienta en la pantalla de acceso
const ACCESS_MSG = {
  title:    'Bienvenida a CÓDIGO CUERPO',
  subtitle: 'Tu espacio seguro para escuchar lo que tu cuerpo dice',
  prompt:   'Introduce tu código de acceso',
  hint:     'Encontrarás tu código en el email de confirmación de tu compra o en las páginas finales del libro.',
  error:    'Ese código no es válido, cariño. Revísalo e inténtalo de nuevo. Si crees que hay un error, escríbeme.',
  success:  '¡Bienvenida! Tu acceso está activado. 🌸',
};

const ZONES = {
  head:      { label: 'Cabeza',                 icon: '🌕', color: '#e8c44a' },
  throat:    { label: 'Garganta y cuello',      icon: '🌿', color: '#8fb8b0' },
  chest:     { label: 'Pecho y corazón',        icon: '♡',  color: '#e8a0a0' },
  shoulders: { label: 'Hombros y espalda alta', icon: '🌊', color: '#8b9dc3' },
  belly:     { label: 'Vientre y digestivo',    icon: '🌸', color: '#c4705a' },
  pelvis:    { label: 'Pelvis y útero',         icon: '☽',  color: '#9a7ab0' },
  lumbar:    { label: 'Espalda lumbar',         icon: '🌱', color: '#7ab08a' },
  hips:      { label: 'Caderas',                icon: '🌺', color: '#c4a478' },
  legs:      { label: 'Piernas y rodillas',     icon: '🌿', color: '#a0b898' },
  skin:      { label: 'Piel',                   icon: '✨', color: '#e8c4a0' },
  energy:    { label: 'Energía y sueño',        icon: '🌙', color: '#b0a0c8' },
  cycle:     { label: 'Ciclo femenino',         icon: '🌸', color: '#d4a0b0' },
};

const SENSATIONS = [
  { id: 'opresion',      name: 'Opresión',      icon: '⬇️' },
  { id: 'ardor',         name: 'Ardor',         icon: '🔥' },
  { id: 'punzada',       name: 'Punzada',       icon: '⚡' },
  { id: 'inflamacion',   name: 'Inflamación',   icon: '💧' },
  { id: 'tension',       name: 'Tensión',       icon: '〰️' },
  { id: 'nudo',          name: 'Nudo',          icon: '🪢' },
  { id: 'picor',         name: 'Picor',         icon: '✨' },
  { id: 'peso',          name: 'Peso',          icon: '🪨' },
  { id: 'vacio',         name: 'Vacío',         icon: '○'  },
  { id: 'hormigueo',     name: 'Hormigueo',     icon: '〜' },
  { id: 'contractura',   name: 'Contractura',   icon: '💪' },
  { id: 'palpitaciones', name: 'Palpitaciones', icon: '💓' },
];

const EMOTIONS = [
  { id: 'MIEDO',        name: 'Miedo',        emoji: '😰', color: 'MIEDO',
    sub: ['Ansiedad','Inseguridad','Pánico','Preocupación','Incertidumbre','Pavor'] },
  { id: 'RABIA',        name: 'Rabia',        emoji: '😡', color: 'RABIA',
    sub: ['Frustración','Irritación','Indignación','Enfado','Resentimiento','Impotencia'] },
  { id: 'TRISTEZA',     name: 'Tristeza',     emoji: '😢', color: 'TRISTEZA',
    sub: ['Pena','Duelo','Melancolía','Nostalgia','Desilusión','Soledad'] },
  { id: 'ALEGRÍA',      name: 'Alegría',      emoji: '😊', color: 'ALEGRÍA',
    sub: ['Gratitud','Entusiasmo','Alivio','Esperanza','Amor','Satisfacción'] },
  { id: 'ASCO',         name: 'Asco',         emoji: '🤢', color: 'ASCO',
    sub: ['Rechazo','Repulsión','Hastío','Repugnancia','Incomodidad'] },
  { id: 'VERGÜENZA',    name: 'Vergüenza',    emoji: '😳', color: 'VERGÜENZA',
    sub: ['Culpa','Humillación','Timidez','Pudor','Inadecuación'] },
  { id: 'AMOR',         name: 'Amor',         emoji: '💗', color: 'AMOR',
    sub: ['Ternura','Conexión','Compasión','Devoción','Sentirme amada','Amor propio'] },
  { id: 'SOLEDAD',      name: 'Soledad',      emoji: '🌑', color: 'SOLEDAD',
    sub: ['Abandono','Desconexión','Aislamiento','Invisibilidad','No comprendida','Incomprendida'] },
  { id: 'AGOTAMIENTO',  name: 'Agotamiento',  emoji: '🪫', color: 'AGOTAMIENTO',
    sub: ['Burnout','Saturación','Extenuación','Vacío interior','Sin fuerzas','Sobrecarga'] },
  { id: 'CULPA',        name: 'Culpa',        emoji: '🌧', color: 'CULPA',
    sub: ['Remordimiento','Autocrítica','Arrepentimiento','Responsabilidad excesiva','Autocastigo','No ser suficiente'] },
  { id: 'CONFUSIÓN',    name: 'Confusión',    emoji: '🌀', color: 'CONFUSIÓN',
    sub: ['Desorientación','No saber','Pérdida de rumbo','Duda','Indecisión','Sin claridad'] },
];

const CONTEXT_CHIPS = [
  'Discusión','Noticias malas','Mucho trabajo','Soledad',
  'Reunión familiar','Comida pesada','Mal sueño',
  'Estrés económico','Problema en pareja','Nada en especial',
  'Jornada muy larga','Preocupación por salud','Redes sociales',
];

// ---- EMOCIÓN → NECESIDAD (Paso 4 RE-CONECT) ----
const EMOTION_NEEDS = {
  MIEDO:     {
    needs: ['Seguridad y protección','Información clara','Apoyo y contención','Saber que no estás sola','Reducir la incertidumbre'],
    tip: 'El miedo necesita que te acerques a lo que te da seguridad. No tienes que resolver el miedo, solo necesitas sentirte sostenida.'
  },
  RABIA:     {
    needs: ['Poner un límite claro','Que algo o alguien pare','Ser respetada','Justicia','Expresar lo que te molesta sin explosionar'],
    tip: 'La rabia es una señal de que algo importante para ti está siendo violado. Escúchala: te está diciendo dónde necesitas un límite.'
  },
  TRISTEZA:  {
    needs: ['Consuelo y compañía','Descanso sin culpa','Tiempo para el duelo','Ser abrazada o escuchada','Llorar lo que necesitas llorar'],
    tip: 'La tristeza necesita espacio, no soluciones. Date permiso de estar triste. Lo que se llora, se suelta.'
  },
  ALEGRÍA:   {
    needs: ['Celebrar y compartir','Más momentos así','Gratitud consciente','Conexión con lo que te da vida','Cultivar esto activamente'],
    tip: 'La alegría también es una señal importante. Tu cuerpo te dice qué te hace bien. ¿Cómo puedes tener más de esto?'
  },
  ASCO:      {
    needs: ['Alejarte de lo que te repele','Proteger tu espacio','Decir "esto no lo quiero"','Poner distancia','Confiar en tu instinto'],
    tip: 'El asco es un sistema de protección. Si algo te produce rechazo, tu cuerpo tiene una razón. No lo ignores.'
  },
  VERGÜENZA: {
    needs: ['Aceptación propia primero','Sentirte suficiente tal como eres','Ser vista con amor sin juicio','Liberarte de culpas impuestas','Hablarlo con alguien de confianza'],
    tip: 'La vergüenza crece en la oscuridad y se disuelve con la compasión. Lo que se nombra, pierde poder. No estás rota, cariño.'
  },
  AMOR: {
    needs: ['Dar y recibir afecto libremente','Conexión real con alguien','Sentirme amada sin condiciones','Amor propio antes que nada','Expresar lo que siento sin miedo'],
    tip: 'El amor es tu naturaleza. Cuando sientes que no recibes suficiente, tu corazón te pide que empieces por ti misma. Lo que no te das, difícilmente puedes recibirlo de otros.'
  },
  SOLEDAD: {
    needs: ['Conexión real y profunda','Ser vista y comprendida','No estar sola con esto','Crear momentos de comunidad','Abrirme a recibir presencia'],
    tip: 'La soledad no siempre es ausencia de personas. A veces es ausencia de conexión real. Tu cuerpo pide ser vista, escuchada, comprendida. ¿Hay alguien con quien puedas bajar la guardia?'
  },
  AGOTAMIENTO: {
    needs: ['Descanso sin culpa','Ayuda y apoyo concreto','Poner límites a lo que me agota','Tiempo solo para mí','Reducir la lista de lo que "debo"'],
    tip: 'El agotamiento es el cuerpo diciéndote "basta". No es debilidad, es honestidad. Necesitas descanso real, no más esfuerzo. ¿Qué de tu lista podrías soltar esta semana?'
  },
  CULPA: {
    needs: ['Perdonarme a mí misma','Separar responsabilidad real de autocrítica','Ver mis errores con compasión','Reparar lo que puedo y soltar lo que no','Salir del loop de autocastigo'],
    tip: 'La culpa constructiva repara. La culpa crónica destruye. Si ya hiciste lo que pudiste, seguir castigándote no ayuda a nadie. Mereces el mismo perdón que le darías a alguien que amas.'
  },
  CONFUSIÓN: {
    needs: ['Claridad y tiempo para pensar','Reducir el ruido externo','Alguien que me ayude a ordenar ideas','No tener que decidir ahora','Confiar en que la claridad llegará'],
    tip: 'La confusión es señal de que estás en transición. No tienes que tener todo claro ahora. A veces la mejor respuesta es "no sé todavía, y está bien." Deja que la mente se asiente.'
  },
};

// ============================================================
// DICCIONARIO — 60 SEÑALES
// ============================================================
const DICTIONARY = [
  // ── CABEZA (5) ──────────────────────────────────────────
  {
    zone:'head', icon:'🌀', name:'Tensión craneal (sensación de casco)',
    preview:'La presión de querer controlarlo todo',
    message:'Estás pensando demasiado. Tu mente está trabajando a destajo, intentando controlarlo todo. Esa presión es la metáfora perfecta de "no me caben más cosas en la cabeza". Tu cuerpo es inteligente: te avisa antes de que la olla explote. También puede indicar que te sientes aprisionada por alguna situación o expectativa que no elegiste.',
    reflections:['¿Hay algo que no dejo de darle vueltas?','¿Estoy intentando resolver algo solo con la mente, ignorando mi cuerpo?','¿Me siento presionada por algo o alguien que no puedo controlar?'],
    repairs:{ n1:'Masajea tus sienes y nuca con movimientos circulares lentos. Respira hondo 5 veces, como si el aire llegara hasta la coronilla.', n2:'Haz una descarga mental: escribe durante 10 minutos todo lo que tienes en la cabeza, sin parar ni corregir.', n3:'Identifica UNA cosa que estás intentando controlar y no puedes. Escríbela. Luego escribe: "Suelto mi control sobre esto."' }
  },
  {
    zone:'head', icon:'⚡', name:'Migraña y jaqueca',
    preview:'Cuando la presión interna llega al límite',
    message:'La migraña suele ser el resultado de una presión interna que ha llegado a su umbral. Hay pensamientos que no encuentran salida, emociones que empujan desde adentro y un sistema nervioso que ha dicho "basta". Tu cuerpo no se estropea al azar, cariño. Esta señal lleva tiempo gestándose. Es el último aviso antes de parar.',
    reflections:['¿Cuánto tiempo llevas sin descansar de verdad?','¿Hay algo que llevas semanas "aguantando" sin decir?','¿Qué estaba pasando en tu vida justo antes de que empezara?'],
    repairs:{ n1:'Oscuridad, silencio y frío. Paño frío en la frente. Nada de pantallas. Solo tú y el silencio.', n2:'Cuando pase, escribe qué estaba pasando emocionalmente antes de que comenzara. Busca el patrón.', n3:'Revisa tu ritmo de vida. Si las migrañas son frecuentes, algo en tu cotidianidad necesita cambiar. ¿Qué es?' }
  },
  {
    zone:'head', icon:'🌊', name:'Mareos y vértigo',
    preview:'Cuando el mundo da vueltas y falta suelo firme',
    message:'El mareo puede ser la forma en que tu cuerpo dice "para, estás dando demasiadas vueltas". La mente gira en bucles de ansiedad e incertidumbre, y el cuerpo lo reproduce literalmente. El vértigo aparece cuando el suelo de tu vida se siente inestable. Deja de preguntarte cómo hacer que se pase, y empieza a preguntarte: ¿qué me está diciendo esto?',
    reflections:['¿Hay una situación en tu vida que se siente completamente fuera de control?','¿Estás dando demasiadas vueltas a algo sin llegar a ningún lugar?','¿Sientes que el suelo es firme bajo tus pies ahora mismo?'],
    repairs:{ n1:'Siéntate, busca un punto fijo con la vista y respira despacio. Pon los pies bien apoyados en el suelo. Vuelve al presente.', n2:'Escribe las situaciones que te hacen sentir que "pierdes el piso". ¿Qué necesitarías para sentirte más estable?', n3:'Busca estructuras y rutinas pequeñas que te den sensación de tierra. Un horario, una práctica diaria, algo que se repita y sea tuyo.' }
  },
  {
    zone:'head', icon:'😴', name:'Insomnio y mente activa',
    preview:'La conversación que pospones de día',
    message:'El insomnio es la conversación que tu mente intenta tener contigo cuando no le das espacio de día. Todo lo que pospones, todo lo que no has procesado, regresa en la almohada. La noche se convierte en el único momento en que el ruido exterior se calla y las emociones encuentran un hueco. Tu mente no es tu enemiga; es insistente porque lo que guarda es importante.',
    reflections:['¿Qué pensamientos aparecen cuando te acuestas?','¿Hay algo que evitas pensar de día?','¿Cuándo fue la última vez que descansaste sin culpa?'],
    repairs:{ n1:'Técnica 4-7-8: inhala 4 segundos, sostén 7, exhala 8. Repite 4 veces. Activa el sistema nervioso parasimpático.', n2:'Antes de dormir, escribe: "Hoy pasó esto, sentí esto, necesito esto." Tres frases. Saca la mente al papel.', n3:'Crea un ritual nocturno de desconexión: sin pantallas 30 minutos antes, temperatura fresca, oscuridad. Señales de seguridad para tu sistema nervioso.' }
  },
  {
    zone:'head', icon:'🌕', name:'Hormigueo en cuero cabelludo',
    preview:'La tensión acumulada que busca salida',
    message:'El hormigueo en el cuero cabelludo suele aparecer en momentos de tensión extrema o cuando llevamos demasiado tiempo en un estado de alerta. Tu sistema nervioso está sobrecargado. Es como si los cables estuvieran en cortocircuito porque has estado "enchufada" demasiado tiempo sin descanso.',
    reflections:['¿Cuánto tiempo llevas sin descansar de verdad?','¿Hay una situación que te tiene en tensión constante?','¿Estás cuidando de todos menos de ti misma?'],
    repairs:{ n1:'Masajea el cuero cabelludo con las yemas de los dedos durante 2 minutos. Mueve el cuero cabelludo, no solo frotes el cabello.', n2:'Identifica qué situación te tiene en alerta permanente. Escríbela.', n3:'Esta semana, regálate una mañana o tarde sin obligaciones. No para ser productiva. Solo para ser.' }
  },

  // ── GARGANTA (5) ─────────────────────────────────────────
  {
    zone:'throat', icon:'🪢', name:'Nudo en la garganta',
    preview:'Palabras que no encuentran salida',
    message:'Hay algo que no puedes o no te permites decir. Hay palabras, emociones, una verdad atascada. Puede ser un "te quiero", un "no", una queja, un grito. El nudo es la emoción que se queda ahí porque no encuentra salida. Este ejercicio es el primer paso para que tu garganta deje de tener nudos. Lo que se dice, se libera.',
    reflections:['¿Qué es lo que necesito decir y no me atrevo?','¿A quién necesito decirle algo importante?','¿De qué tengo miedo si lo digo? ¿Al rechazo, al conflicto, a decepcionar?'],
    repairs:{ n1:'Pon la mano en tu garganta y respira suavemente hacia esa zona. Dile: "Puedes soltar lo que guardas."', n2:'Escribe una carta a esa persona diciéndole todo lo que necesitas decir. No la envíes. El acto de escribir ya libera.', n3:'Practica decir la frase en voz alta, a solas. Luego valora si puedes decirla en la vida real, o si hay otra forma de expresar lo que necesitas.' }
  },
  {
    zone:'throat', icon:'🌿', name:'Ronquera y afonía',
    preview:'Cuando la voz desaparece porque ya no sabe qué decir',
    message:'Perder la voz, más allá de un resfriado, puede ser señal de que algo en ti quiere silencio, o de que has estado hablando demasiado en el lenguaje de los demás y olvidando el tuyo propio. También puede ser que hayas estado callando tanto que la voz ya no sabe cómo salir. ¿Te sientes escuchada en tu vida?',
    reflections:['¿Te sientes escuchada en tu vida?','¿Hay momentos en que hablas pero nadie oye realmente lo que dices?','¿Necesitas un período de silencio y recogimiento?'],
    repairs:{ n1:'Infusiones de jengibre, miel y limón. Silencio real durante unas horas. No fuerces la voz.', n2:'Escribe en lugar de hablar. Deja que las palabras salgan por otro canal.', n3:'Evalúa si hay relaciones donde sientes que tu voz no tiene peso. ¿Qué necesitas cambiar?' }
  },
  {
    zone:'throat', icon:'😬', name:'Tensión en mandíbula / bruxismo',
    preview:'La rabia que no encontró voz',
    message:'La mandíbula tensa y el bruxismo son la rabia que no encontró voz. Literal: estamos "apretando los dientes" para no decir lo que sentimos. La mandíbula guarda mucha rabia contenida, muchos "me callo aunque no quiera". La rabia que no expresas se convierte en tensión en los hombros y la mandíbula. No la reprimas: encuéntrale un canal.',
    reflections:['¿Qué estás callando sistemáticamente?','¿Con quién o en qué situación aprietas los dientes metafóricamente?','¿Cuántas veces al día dices "sí" cuando quieres decir "no"?'],
    repairs:{ n1:'Masajea los músculos de la mandíbula (justo delante de las orejas). Abre la boca exageradamente y relaja. Repite 5 veces.', n2:'Escribe todo lo que estás "apretando" sin decir. La rabia contenida en papel ya es un alivio.', n3:'Practica decir "no" a algo esta semana. Empieza pequeño si es difícil. La mandíbula te lo agradecerá.' }
  },
  {
    zone:'throat', icon:'🌊', name:'Tos seca persistente',
    preview:'Algo que irrita y no puedes sacar',
    message:'Una tos seca que no tiene causa médica clara suele aparecer cuando hay algo que nos "irrita" y no podemos "sacar". Como si el cuerpo intentara expulsar algo que no puede nombrar. ¿Hay algo en tu entorno, en tu vida, que te irrita constantemente y no encuentras forma de resolver?',
    reflections:['¿Qué situación o persona te está "irritando" de forma persistente?','¿Hay algo que intentas "sacar" de tu vida y no puedes?','¿Te estás tragando algo que debería salir?'],
    repairs:{ n1:'Vapor con eucalipto. Infusión de tomillo. Aire fresco. Dale al cuerpo lo que necesita físicamente.', n2:'Escribe qué te irrita de forma constante. Sin filtro.', n3:'Identifica UNA cosa que puedas cambiar para reducir esa irritación crónica. Solo una.' }
  },
  {
    zone:'throat', icon:'✨', name:'Dolor al tragar',
    preview:'Dificultad para aceptar lo que la vida te ofrece',
    message:'El dolor al tragar sin causa orgánica puede hablar de dificultad para "aceptar" algo. Para "tragarte" una situación, una noticia, una realidad. También puede ser resistencia: no quieres incorporar algo que te están dando (una crítica, una responsabilidad, un cambio).',
    reflections:['¿Hay algo que no puedes "aceptar" o "digerir" emocionalmente?','¿Qué estás "tragando" sin querer?','¿Hay una situación que te cuesta aceptar tal como es?'],
    repairs:{ n1:'Agua tibia con miel. Calor en la garganta. Reposo de voz.', n2:'Escribe qué es lo que no quieres "tragarte". Sácalo.', n3:'Identifica qué necesitas para poder aceptar esa situación, o qué acción necesitas tomar.' }
  },

  // ── PECHO Y CORAZÓN (5) ──────────────────────────────────
  {
    zone:'chest', icon:'💔', name:'Opresión en el pecho',
    preview:'El peso de lo que el corazón guarda',
    message:'La opresión en el pecho suele hablar de tristeza contenida, de algo que pesa en el corazón. ¿Hay alguna pena que no te has permitido llorar? A veces guardamos tanto dentro que el pecho literalmente se comprime para contenerlo todo. La tristeza que no lloras se convierte en opresión en el pecho. Deja que lo que pesa, fluya.',
    reflections:['¿Qué pesa en tu corazón ahora mismo?','¿Hay una pérdida o una pena que no has llorado del todo?','¿A quién o qué extrañas?'],
    repairs:{ n1:'Mano izquierda sobre el corazón. Siente su latido. Respira profundo 5 veces. Dite: "Me permito sentir esto."', n2:'Escribe una carta a lo que extrañas o has perdido. Sin censura.', n3:'Crea un ritual de cierre para lo que necesitas soltar. Una vela, un papel quemado, una despedida consciente.' }
  },
  {
    zone:'chest', icon:'💓', name:'Palpitaciones y taquicardia',
    preview:'El corazón que avisa antes que la mente',
    message:'Las palpitaciones son el lenguaje del miedo y la ansiedad. Tu corazón está en modo alerta porque tu sistema nervioso ha detectado un "peligro". A veces la mente no ha procesado el miedo conscientemente, pero el cuerpo ya lo siente. No estás en peligro. Tu sistema nervioso está en modo alarma, pero puedes ayudarle a calmarse.',
    reflections:['¿En qué escenario futuro está metida tu mente ahora mismo?','¿Qué es lo peor que temes que pase?','¿Hay algo que evitas sentir o pensar?'],
    repairs:{ n1:'Técnica del agua fría: sumerge la cara en agua fría 30 segundos o pon hielo en las muñecas. Activa el nervio vago y calma las palpitaciones.', n2:'Escribe los miedos que tienes. Sacarlos de la mente los hace más manejables.', n3:'Si las palpitaciones son frecuentes, visita a tu médico. El corazón necesita también cuidado físico.' }
  },
  {
    zone:'chest', icon:'🌬️', name:'Dificultad para respirar',
    preview:'Cuando no hay espacio suficiente para ser tú',
    message:'La dificultad respiratoria sin causa médica suele ser ansiedad que se ha instalado en el pecho. Respiramos superficialmente cuando estamos en modo supervivencia, cuando el cuerpo siente que no hay suficiente espacio para existir. ¿Sientes que tienes espacio para ser tú misma en tu vida?',
    reflections:['¿Sientes que tienes espacio para ser tú misma?','¿Hay algo que te está "ahogando" en tu vida cotidiana?','¿Estás pidiendo permiso para ocupar espacio?'],
    repairs:{ n1:'Respiración diafragmática: mano en el vientre, inhala enviando el aire hacia tu mano. El vientre sube. Exhala lento. Repite 10 veces.', n2:'Reflexiona: ¿en qué áreas de tu vida te sientes sin espacio?', n3:'Esta semana, ocupa espacio conscientemente: habla primero, elige el plan, di lo que necesitas.' }
  },
  {
    zone:'chest', icon:'🌸', name:'Sensación de vacío en el pecho',
    preview:'Cuando el corazón ha perdido la conexión',
    message:'El vacío en el pecho suele hablar de desconexión: de una misma, de los demás, de lo que da sentido. A veces viene después de una pérdida, de un período de mucho dar sin recibir, o de haber estado tan ocupada que te olvidaste de ti. El vacío no es ausencia: es una llamada a llenarte de lo que importa.',
    reflections:['¿Cuándo fue la última vez que te sentiste plena?','¿De qué o de quién te sientes desconectada?','¿Qué era lo que te llenaba antes y ya no está?'],
    repairs:{ n1:'Pon la mano en el pecho. Respira despacio. Pregúntate: ¿qué necesita mi corazón ahora mismo?', n2:'Escribe una lista de cosas que alguna vez te llenaron. ¿Cuál podrías recuperar?', n3:'Esta semana, haz una cosa que nutría tu corazón y que llevas tiempo sin hacer.' }
  },
  {
    zone:'chest', icon:'🔥', name:'Ardor en el pecho / acidez emocional',
    preview:'Lo que arde porque no se ha dicho',
    message:'El ardor en el pecho que no es puramente digestivo puede hablar de emociones que "queman" por dentro: la rabia que no se expresa, la injusticia que se traga, la frustración crónica. Algo está "ardiendo" en ti que necesita encontrar una salida que no sea tu cuerpo.',
    reflections:['¿Qué situación te "quema" por dentro?','¿Hay una injusticia que estás soportando en silencio?','¿Cuánto tiempo llevas con esa rabia dentro?'],
    repairs:{ n1:'Agua fría a sorbos lentos. Postura erguida. Respira profundo enviando el aire al vientre.', n2:'Escribe todo lo que te quema. Sin filtro. La rabia en papel ya no quema igual.', n3:'Identifica la fuente de ese ardor emocional. ¿Qué necesita cambiar?' }
  },

  // ── HOMBROS (5) ──────────────────────────────────────────
  {
    zone:'shoulders', icon:'🪨', name:'Contracturas en hombros',
    preview:'El peso que no nos corresponde cargar',
    message:'Los hombros son el lugar donde las mujeres cargamos con todo: responsabilidades, cuidados, expectativas propias y ajenas. Cuando se contracturan, es señal de que llevamos demasiado, o de que estamos sosteniendo cosas que no nos corresponden. ¿Qué estás cargando que podría cargar otra persona?',
    reflections:['¿Qué estás cargando que no es tuyo?','¿Cuándo fue la última vez que pediste ayuda?','¿Le has dado permiso a alguien de cuidarte?'],
    repairs:{ n1:'Encoge hombros hasta las orejas, sostén 5 segundos, suelta con un "Aaah" en voz alta. Repite 8 veces.', n2:'Haz el ejercicio "Lo que cargo / Lo que devuelvo": escribe dos columnas. En la primera, todo lo que cargas. En la segunda, lo que devolverías si pudieras.', n3:'Esta semana, devuelve UNA responsabilidad que le corresponde a otra persona.' }
  },
  {
    zone:'shoulders', icon:'🌊', name:'Dolor de cuello y nuca',
    preview:'La rigidez de quien no puede ver otras perspectivas',
    message:'El cuello conecta la cabeza con el corazón. Cuando duele y se pone rígido, puede hablar de inflexibilidad, de dificultad para "girar la cabeza" y ver otras perspectivas. También puede ser el peso de sostener la cabeza cuando la mente no para. A veces hay tanto ruido mental que el cuello carga con toda esa tensión.',
    reflections:['¿Hay una situación en la que me estoy poniendo muy rígida?','¿Estoy atascada en mi perspectiva y me cuesta ver la de otros?','¿Qué es lo que mi cabeza no quiere ver?'],
    repairs:{ n1:'Rotaciones lentas de cuello: 5 hacia la derecha, 5 hacia la izquierda. Calor en la nuca.', n2:'Escribe sobre una situación donde podrías estar siendo inflexible. ¿Qué pasaría si vieras la situación desde otro ángulo?', n3:'Practica esta semana decir: "No lo había visto así." Una sola vez, en una situación real.' }
  },
  {
    zone:'shoulders', icon:'🌸', name:'Rigidez en la nuca',
    preview:'La tensión de quien sostiene todo sola',
    message:'La rigidez en la nuca es una de las manifestaciones más claras del estrés crónico y de llevar demasiado tiempo "en tensión". El cuerpo se prepara para un golpe que nunca llega, endureciéndose. También puede hablar de orgullo que impide pedir ayuda: "yo puedo sola."',
    reflections:['¿Cuánto tiempo llevas "en tensión" sin poder relajarte?','¿Hay alguien que te tense sistemáticamente?','¿Te cuesta pedir ayuda porque sientes que deberías poder sola?'],
    repairs:{ n1:'Masaje en la base del cráneo con los pulgares. Presión suave en los puntos de tensión. Calor.', n2:'Escribe: ¿qué es lo que más te tensa ahora mismo?', n3:'Pide ayuda con algo concreto esta semana. Aunque sea pequeño. El cuerpo necesita aprender que no está solo.' }
  },
  {
    zone:'shoulders', icon:'💙', name:'Tensión en espalda alta',
    preview:'El escudo que construimos para protegernos',
    message:'La tensión en la espalda alta, especialmente entre los omóplatos, suele hablar del "escudo" que construimos para proteger el corazón. Hay algo de lo que te estás protegiendo, alguien a quien no dejas entrar, o una vulnerabilidad que no te permites mostrar.',
    reflections:['¿De qué o de quién me estoy protegiendo?','¿Hay alguien a quien no dejo entrar en mi corazón?','¿Me permito ser vulnerable con las personas que quiero?'],
    repairs:{ n1:'Estiramiento de pecho: entrelaza las manos detrás, abre el pecho al máximo, respira profundo. El opuesto al "escudo".', n2:'Escribe sobre alguien con quien te cuesta bajar la guardia. ¿Qué temes si lo haces?', n3:'Haz un pequeño gesto de apertura esta semana: comparte algo real con alguien de confianza.' }
  },
  {
    zone:'shoulders', icon:'⚡', name:'Dolor de brazo y mano',
    preview:'La acción que no nos atrevemos a tomar',
    message:'Los brazos son nuestros instrumentos de acción, de dar y recibir. El dolor en brazo o mano puede hablar de acciones que no tomamos por miedo, de dar demasiado sin recibir, o de retener algo que deberíamos soltar (o soltar algo que deberíamos sostener).',
    reflections:['¿Hay una acción que sabes que debes tomar y no tomas?','¿Estás dando más de lo que recibes en alguna relación?','¿Hay algo que necesitas soltar o algo que necesitas sostener?'],
    repairs:{ n1:'Sacude los brazos y las manos vigorosamente durante 30 segundos. Libera la energía estancada.', n2:'Escribe qué acción pendiente está "esperando" en tus manos.', n3:'Toma UNA acción concreta esta semana que llevas posponiendo.' }
  },

  // ── VIENTRE Y DIGESTIVO (6) ───────────────────────────────
  {
    zone:'belly', icon:'🔥', name:'Gastritis y ardor de estómago',
    preview:'Lo que nos corroe por dentro',
    message:'La gastritis y el ardor de estómago recurrentes suelen hablar de ansiedad crónica, de situaciones que "nos corroen por dentro". El ácido gástrico aumenta con el estrés porque el cuerpo prepara la digestión para "huir" del peligro. Hay algo en tu vida que lleva tiempo "comiéndote por dentro" y no has podido resolver.',
    reflections:['¿Qué situación te está "comiendo por dentro"?','¿Hay ansiedades que no estás procesando?','¿Tu ritmo de vida te permite relajarte de verdad?'],
    repairs:{ n1:'Come despacio, en silencio, sin pantallas. El acto consciente de comer también calma el sistema nervioso.', n2:'Identifica el "ácido" de tu vida: ¿qué situación o persona te corroe? Escríbelo.', n3:'Busca una forma de reducir ese estresor crónico. Si no puedes eliminarlo, busca apoyo.' }
  },
  {
    zone:'belly', icon:'💧', name:'Hinchazón abdominal',
    preview:'Hinchada de emociones no procesadas',
    message:'La hinchazón que no tiene causa alimentaria suele aparecer cuando algo o alguien literalmente "nos hincha". Es la acumulación de lo que tragamos sin digerir: palabras, situaciones, emociones que van fermentando dentro. Algo me está "sentando mal" y no lo he podido expresar.',
    reflections:['¿Hay algo o alguien que literalmente te está "hinchando"?','¿Estás tragando más de lo que puedes digerir?','¿Dónde estás acumulando lo que deberías soltar?'],
    repairs:{ n1:'Masaje abdominal en sentido horario. Infusión de menta o hinojo. Calor en el vientre.', n2:'Escribe todo lo que estás "tragando" y "acumulando". Vaciarlo al papel ya alivia.', n3:'Identifica una cosa que puedes "soltar" o "expulsar" de tu vida esta semana.' }
  },
  {
    zone:'belly', icon:'🌪️', name:'Colon irritable / Diarrea por estrés',
    preview:'El sistema digestivo en modo huida',
    message:'El intestino es tan sensible al estrés que los especialistas lo llaman el "segundo cerebro". Cuando el sistema nervioso está en alerta, el intestino lo refleja. La urgencia intestinal puede ser la urgencia que tu vida te genera pero que no puedes expresar de otra manera. Tu cuerpo es inteligente: más de lo que jamás te han contado.',
    reflections:['¿Hay situaciones que te generan urgencia y presión constante?','¿Sientes que no tienes tiempo de procesar nada?','¿Va tu vida demasiado rápido para ti?'],
    repairs:{ n1:'Respiración abdominal profunda antes de las comidas. Reduce el estado de alerta del sistema nervioso.', n2:'Lista todo lo que te genera urgencia. ¿Cuánto es real y cuánto es autopresión?', n3:'Introduce pausas reales en tu día: 5 minutos de no hacer nada, 3 veces al día.' }
  },
  {
    zone:'belly', icon:'🌸', name:'Náuseas sin causa médica',
    preview:'Lo que el cuerpo quiere rechazar',
    message:'Las náuseas que no tienen causa médica clara son una forma de rechazo. El cuerpo quiere "expulsar" algo: una situación que no quieres vivir, algo que te produce asco o angustia profunda, o una ansiedad anticipatoria ante algo que se acerca. ¿Hay algo que tu cuerpo quiere rechazar con fuerza?',
    reflections:['¿Hay algo que se acerca y que temes o rechazas?','¿Qué situación te provoca un rechazo físico?','¿Estás siendo forzada a hacer algo que no quieres?'],
    repairs:{ n1:'Aire fresco, jengibre, respiración lenta. No fuerces el cuerpo. Escucha su "no".', n2:'Escribe qué es lo que el cuerpo quiere rechazar.', n3:'Identifica si puedes cambiar la situación que genera el rechazo, o si necesitas hablar con alguien.' }
  },
  {
    zone:'belly', icon:'🌑', name:'Pérdida de apetito',
    preview:'Cuando la vida pierde el sabor',
    message:'La pérdida de apetito prolongada suele acompañar a la tristeza, la depresión y la apatía. Cuando la vida pierde el sabor, la comida también lo pierde. El cuerpo refleja el estado interno: si algo está "apagado" dentro, el apetito se apaga también. ¿Hay algo en tu vida que ha perdido el sabor recientemente?',
    reflections:['¿Qué ha perdido el sabor en tu vida ahora mismo?','¿Hay algo por lo que no sientes entusiasmo?','¿Cuándo fue la última vez que algo te generó ganas genuinas?'],
    repairs:{ n1:'Comida sencilla, de colores, con olor. Involucra los sentidos para despertar el apetito.', n2:'Escribe tres cosas pequeñas que todavía te dan algo de placer o interés.', n3:'Si el desapetito persiste más de dos semanas, busca apoyo profesional. Puede ser el inicio de algo que merece atención.' }
  },
  {
    zone:'belly', icon:'🌊', name:'Atracones emocionales',
    preview:'Llenando con comida lo que pide otra cosa',
    message:'Los atracones emocionales son intentos de llenar con comida algo que pide otra cosa: amor, consuelo, estímulo, distracción del dolor. No eres "débil" ni estás "loca". Tu cuerpo busca una salida para algo que no sabe cómo procesar de otra manera. La pregunta no es "¿por qué como?" sino "¿qué necesito realmente?"',
    reflections:['¿Qué sientes justo antes de un atracón?','¿Qué necesitarías en ese momento si la comida no existiera?','¿Hay algo que estás intentando callar o adormecer?'],
    repairs:{ n1:'Cuando llegue el impulso, pon una mano en el vientre y otra en el corazón. Pregúntate: ¿qué necesito ahora mismo?', n2:'Lleva un diario de atracones: ¿qué pasó antes? ¿Qué sentías? El patrón tiene información.', n3:'Busca un apoyo especializado (psicóloga, nutricionista emocional). No tienes que resolverlo sola.' }
  },

  // ── PELVIS Y ÚTERO (5) ───────────────────────────────────
  {
    zone:'pelvis', icon:'☽', name:'Dolor menstrual intenso',
    preview:'El ciclo que habla cuando no escuchamos',
    message:'El dolor menstrual que va más allá de lo normal puede ser señal de emociones o memorias relacionadas con la femineidad, la maternidad o la sexualidad que no han sido procesadas. El útero es un órgano muy sensible a lo emocional. No es casualidad que tantas mujeres sientan más que ceden durante su ciclo.',
    reflections:['¿Cómo es tu relación con tu ciclo y tu femineidad?','¿Hay memorias dolorosas asociadas a tu sexualidad o cuerpo?','¿Te permites tu lado femenino y vulnerable?'],
    repairs:{ n1:'Calor local, descanso, infusiones calmantes. Date permiso de parar. Sin culpa.', n2:'Escribe sobre tu relación con tu ciclo y tu cuerpo femenino.', n3:'Empieza un diario menstrual para ver qué emociones aparecen en cada fase.' }
  },
  {
    zone:'pelvis', icon:'🌺', name:'Tensión pélvica crónica',
    preview:'El cuerpo que protege su espacio más íntimo',
    message:'La tensión pélvica es una forma en que el cuerpo dice "no", protegiendo un espacio íntimo que ha sentido que no fue del todo respetado. No siempre hay un trauma obvio; a veces es la acumulación de no sentirse escuchada, de haber aguantado demasiado, o de no tener permiso para decir que no.',
    reflections:['¿Sientes que tu espacio íntimo es respetado?','¿Puedes decir no en tu vida íntima?','¿Tu cuerpo y tu mente están de acuerdo en tus decisiones?'],
    repairs:{ n1:'Ejercicios de relajación pélvica consciente: tumbada, respira enviando el aire al bajo vientre, afloja conscientemente la zona.', n2:'Escribe sobre tu relación con tu sexualidad y tu intimidad.', n3:'Busca acompañamiento especializado (fisioterapeuta de suelo pélvico). Mereces apoyo.' }
  },
  {
    zone:'pelvis', icon:'🌙', name:'Síndrome premenstrual intenso',
    preview:'Lo que el ciclo amplifica para que lo veas',
    message:'El SPM intenso no es una maldición ni una debilidad. Es una ventana: los días antes de la menstruación, el filtro se cae y lo que normalmente aguantamos se vuelve insoportable. El ciclo no crea los problemas; los amplifica para que no puedas ignorarlos. ¿Qué es lo que el SPM te hace imposible ignorar?',
    reflections:['¿Qué situaciones se vuelven insoportables en los días previos?','¿Hay algo que "aguantas" habitualmente y el SPM te hace imposible aguantar?','¿Qué te dice el SPM que necesita cambiar?'],
    repairs:{ n1:'Reduce azúcar, alcohol y cafeína la semana previa. El cuerpo en fase lútea es más sensible.', n2:'Lleva un registro: ¿qué emociones aparecen cada mes antes de la regla? ¿Sobre qué temas?', n3:'Trátalo como información, no como debilidad. ¿Qué necesita cambiar en tu vida ordinaria?' }
  },
  {
    zone:'pelvis', icon:'✨', name:'Irregularidad menstrual',
    preview:'El ritmo que se pierde cuando todo va demasiado rápido',
    message:'El ciclo menstrual es el quinto signo vital de la salud femenina. Cuando se desregula sin causa médica aparente, suele ser señal de estrés crónico, de que el cuerpo no se siente seguro, o de que estamos viviendo en un ritmo que no es el nuestro. Tu cuerpo es inteligente: cuando algo no está bien, el ciclo lo refleja.',
    reflections:['¿Qué nivel de estrés crónico estás viviendo?','¿Tu ritmo de vida es sostenible?','¿Sientes que tu cuerpo tiene lo que necesita para estar bien?'],
    repairs:{ n1:'Descanso. Regularidad en el sueño y la alimentación. El ritmo circadiano influye directamente en el ciclo.', n2:'Lleva un registro del ciclo y del nivel de estrés. Busca la correlación.', n3:'Consulta con tu ginecóloga. Y también pregúntate: ¿qué necesito cambiar en mi ritmo de vida?' }
  },
  {
    zone:'pelvis', icon:'💜', name:'Cistitis de repetición',
    preview:'Lo que arde porque no puede expresarse',
    message:'La cistitis de repetición sin causa bacteriana suele asociarse con rabia retenida en la zona pélvica, con situaciones en las que nos sentimos "invadidas", o con emociones relacionadas con la sexualidad o las relaciones íntimas que no han encontrado expresión. Algo en esa zona arde porque no puede salir.',
    reflections:['¿Hay algo en tu vida íntima que te genera rabia o incomodidad?','¿Sientes que tu espacio personal ha sido invadido?','¿Hay algo relacionado con la sexualidad que no has podido expresar?'],
    repairs:{ n1:'Agua, agua y agua. Calor en el bajo vientre. Consulta a tu médica.', n2:'Escribe sobre qué situaciones preceden a cada episodio. ¿Hay un patrón emocional?', n3:'Si es recurrente, combina el tratamiento médico con exploración emocional.' }
  },

  // ── ESPALDA LUMBAR (5) ───────────────────────────────────
  {
    zone:'lumbar', icon:'🌱', name:'Dolor lumbar crónico',
    preview:'Cuando los cimientos de la vida tambalean',
    message:'La zona lumbar es el pilar de sustento del cuerpo. El dolor lumbar crónico casi siempre trae un mensaje sobre los apoyos de la vida: económicos, emocionales, relacionales. Algo que debería sostenerte no lo está haciendo, o tú estás intentando sostenerte sola sin apoyo. El suelo se construye de a un ladrillo.',
    reflections:['¿Qué debería sostenerte y no lo hace?','¿Hay miedos económicos o de seguridad presentes?','¿Tienes el apoyo que necesitas?'],
    repairs:{ n1:'Tumbada boca arriba, rodillas dobladas. Siente el suelo sosteniéndote. Respira profundo 10 veces.', n2:'Lista de recursos: ¿qué tienes? ¿Con qué cuentas? El miedo borra los recursos. El papel los devuelve.', n3:'Toma UNA medida esta semana que fortalezca tu red de apoyo.' }
  },
  {
    zone:'lumbar', icon:'⚡', name:'Ciática',
    preview:'La tensión que recorre toda la columna de la vida',
    message:'La ciática, ese dolor que baja desde la espalda baja por la pierna, suele asociarse con tensión acumulada sobre el miedo al futuro y la inseguridad. Es como si toda la carga bajara en cascada. Hay algo que llevas cargando durante tanto tiempo que ya ha "bajado" hasta las raíces.',
    reflections:['¿Cuánto tiempo llevas con esta tensión?','¿Hay algo que has estado "cargando" durante meses?','¿La inseguridad está afectando tu capacidad de moverte hacia adelante?'],
    repairs:{ n1:'Estiramiento del piriforme: tumbada, lleva la rodilla del lado afectado al pecho y luego al lado contrario. Sosténla 30 segundos.', n2:'Escribe qué carga llevas tanto tiempo que ya ha "calado" hasta los huesos.', n3:'Delega o pide ayuda con algo concreto. El cuerpo necesita sentir que no lo carga solo.' }
  },
  {
    zone:'lumbar', icon:'🌿', name:'Rigidez matutina',
    preview:'El cuerpo que se resiste a comenzar el día',
    message:'Despertar con rigidez lumbar puede hablar de resistencia a enfrentarse al día. Si hay algo en tu vida cotidiana que no quieres "levantarte a vivir", el cuerpo puede expresarlo en esa dificultad para ponerse en marcha. ¿Hay algo que te pesa cuando abres los ojos?',
    reflections:['¿Hay algo en tu vida diaria que te genera resistencia?','¿Te levantas con ganas o con peso?','¿Tu vida actual refleja lo que quieres para ti?'],
    repairs:{ n1:'Antes de levantarte, haz estiramientos en la cama: rodillas al pecho, giro suave de columna. Dale tiempo al cuerpo de despertar.', n2:'Escribe qué es lo que te pesa cuando suena el despertador.', n3:'Identifica qué parte de tu rutina te genera más resistencia. ¿Qué podrías cambiar?' }
  },
  {
    zone:'lumbar', icon:'🪨', name:'Tensión sacra',
    preview:'La memoria emocional guardada en la base',
    message:'El sacro es el hueso más "sagrado" del cuerpo (de ahí su nombre). Es la base de la columna, el anclaje. La tensión en esa zona puede hablar de memorias profundas, de emociones muy antiguas, de traumas que se han guardado en ese lugar donde termina la espalda y comienza la pelvis.',
    reflections:['¿Hay memorias del cuerpo que no has procesado?','¿Sientes que tienes raíces, que estás anclada en tu vida?','¿Hay algo muy antiguo que todavía pesa?'],
    repairs:{ n1:'Tumbada boca arriba, pon las manos debajo del sacro. Siente el calor de tus manos. Respira.', n2:'Muévete: baile, yoga, caminar descalza. El sacro se libera con el movimiento.', n3:'Si hay memorias muy antiguas que sientes que pesan, considera acompañamiento terapéutico.' }
  },
  {
    zone:'lumbar', icon:'🌊', name:'Contractura paravertebral',
    preview:'La tensión de quien no puede doblarse',
    message:'La contractura en los músculos que flanquean la columna suele aparecer cuando llevamos mucho tiempo en tensión sostenida, cuando no podemos "doblar", ni adaptarnos, ni ceder. La columna necesita flexibilidad para sostenerse. La rigidez es resistencia. ¿Ante qué te estás resistiendo?',
    reflections:['¿Ante qué situación o persona te estás poniendo rígida?','¿Hay algo que necesita que te adaptes pero no puedes o no quieres?','¿Cuánto tiempo llevas en tensión sostenida?'],
    repairs:{ n1:'Calor en la zona, masaje profesional si es posible. Estiramientos laterales suaves.', n2:'Escribe sobre la situación ante la que te sientes rígida.', n3:'Practica la flexibilidad: elige una cosa esta semana donde puedas ceder o adaptarte.' }
  },

  // ── CADERAS (4) ──────────────────────────────────────────
  {
    zone:'hips', icon:'🌺', name:'Dolor en las caderas',
    preview:'Memorias guardadas, avance bloqueado',
    message:'Las caderas guardan memorias emocionales profundas. Cuando duelen o se sienten rígidas, suele haber algo del pasado que no se ha soltado, o una resistencia al cambio y al movimiento hacia adelante. Las caderas son el centro del movimiento: ¿hay algo que te impide fluir?',
    reflections:['¿Qué del pasado no has podido soltar?','¿Hay algo que te impide avanzar?','¿Estás resistiendo un cambio necesario?'],
    repairs:{ n1:'Movimiento de caderas en círculos, salsa, cualquier baile. Las caderas se liberan con el movimiento.', n2:'Yoga restaurativo: postura del palomo. Sostener y respirar. Deja que salga lo que salga.', n3:'Identifica qué del pasado necesitas honrar y soltar para poder avanzar.' }
  },
  {
    zone:'hips', icon:'🌊', name:'Tensión en ingle y cadera interna',
    preview:'El miedo a avanzar o a soltar',
    message:'La tensión en la ingle y la cadera interna suele hablar del conflicto entre querer avanzar y el miedo a lo que viene. Es el punto de bisagra entre el estar y el moverse. Algo en ti quiere ir pero otra parte frena. ¿Cuál es el "pero" que te detiene?',
    reflections:['¿Qué quieres hacer pero temes las consecuencias?','¿Hay un "pero" que repites cuando imaginas un cambio?','¿Qué te da miedo de avanzar?'],
    repairs:{ n1:'Estiramiento de cadera en mariposa: sentada, plantas de los pies juntas. Respira profundo y suéltate.', n2:'Escribe el "pero" que te detiene. ¿Qué hay debajo de ese miedo?', n3:'Da un pequeño paso hacia eso que quieres, aunque sea mínimo. El movimiento genera más movimiento.' }
  },
  {
    zone:'hips', icon:'🌙', name:'Bursitis de cadera',
    preview:'La fricción de quien lleva demasiado tiempo resistiendo',
    message:'La bursitis habla de fricción, de rozamiento. Cuando hay una fricción crónica en la vida —conflictos no resueltos, relaciones que rasgan, situaciones que frotan— el cuerpo puede reproducirlo. Algo en tu vida está creando fricción y tú llevas tiempo soportándola en lugar de resolverla.',
    reflections:['¿Hay una fuente de fricción crónica en tu vida?','¿Hay alguien con quien el contacto siempre duele?','¿Cuánto tiempo llevas soportando algo que debería resolverse?'],
    repairs:{ n1:'Reposo, hielo o calor según la fase. No fuerces.', n2:'Escribe sobre la fuente de "fricción" en tu vida.', n3:'¿Qué necesita resolverse para que esa fricción desaparezca?' }
  },
  {
    zone:'hips', icon:'🌿', name:'Rigidez de caderas en reposo',
    preview:'Lo que se endurece cuando dejamos de movernos',
    message:'La rigidez de caderas después de estar sentada o en reposo puede hablar de apego a la zona de confort, de miedo al movimiento, de llevar demasiado tiempo en el mismo lugar (literal y metafóricamente). A veces el cuerpo se endurece cuando la vida también se ha endurecido y estancado.',
    reflections:['¿Llevas demasiado tiempo en el mismo lugar, la misma situación, el mismo patrón?','¿Tu vida tiene movimiento y cambio, o se ha estancado?','¿Qué necesitaría moverse para que tú también puedas moverte?'],
    repairs:{ n1:'Levántate cada hora y mueve las caderas. El movimiento frecuente es medicina.', n2:'Reflexiona: ¿qué área de tu vida lleva demasiado tiempo estancada?', n3:'Introduce UN cambio pequeño esta semana. Solo para que el movimiento empiece.' }
  },

  // ── PIERNAS Y RODILLAS (4) ───────────────────────────────
  {
    zone:'legs', icon:'🌿', name:'Piernas pesadas y cansancio',
    preview:'El cuerpo que ya no puede seguir a este ritmo',
    message:'Las piernas pesadas hablan de un agotamiento que va más allá de lo físico. Hay un cansancio de avanzar, de seguir adelante, de mantener el ritmo. A veces el cuerpo frena cuando la mente no se da permiso de parar. Date permiso de descansar. El descanso también es productivo.',
    reflections:['¿Estás caminando hacia donde quieres ir?','¿Hay algo en tu vida que sientes como una carga?','¿Cuándo fue la última vez que descansaste sin culpa?'],
    repairs:{ n1:'Eleva las piernas en la pared 10 minutos. Drenaje linfático y descanso profundo.', n2:'Pregúntate honestamente: ¿hacia dónde estoy caminando? ¿Lo quiero?', n3:'Date permiso de parar. Una tarde sin obligaciones esta semana.' }
  },
  {
    zone:'legs', icon:'⚡', name:'Dolor de rodillas',
    preview:'La flexibilidad ante lo que no podemos controlar',
    message:'Las rodillas son las articulaciones de la flexibilidad y la humildad. Duelen cuando nos resistimos a algo que necesita cambiar, cuando nos negamos a adaptarnos, o cuando tenemos miedo de avanzar en una nueva dirección. ¿Hay algo ante lo que te resistes a "doblar la rodilla"?',
    reflections:['¿Hay algo ante lo que te resistes a ceder o adaptarte?','¿Qué cambio temes?','¿Hay orgullo o rigidez en alguna situación de tu vida?'],
    repairs:{ n1:'Ejercicios suaves de movilidad. Calor o frío según el dolor. No fuerces.', n2:'Escribe sobre algo en tu vida donde necesitas más flexibilidad.', n3:'Elige UNA área donde practicar la adaptación esta semana.' }
  },
  {
    zone:'legs', icon:'🌱', name:'Calambres nocturnos',
    preview:'La tensión que se acumula y busca salida',
    message:'Los calambres nocturnos son la tensión acumulada durante el día que el cuerpo intenta soltar cuando por fin se relaja. Es como si todo lo que apretaste durante el día necesitara soltarse, pero el músculo ya no sabe cómo. ¿Qué tensión estás llevando al cuerpo durante el día?',
    reflections:['¿Qué tensión llevas acumulando durante el día?','¿Estás hidratada y nutrida? El cuerpo físico también importa.','¿Hay algo del día que no se "suelta" cuando te acuestas?'],
    repairs:{ n1:'Estira el músculo afectado inmediatamente. Camina unos pasos. Calor local.', n2:'Hidratación y magnesio. Rutina de estiramientos antes de dormir.', n3:'Revisa qué estás tensando durante el día que puedas relajar antes de ir a dormir.' }
  },
  {
    zone:'legs', icon:'🌊', name:'Varices y circulación pesada',
    preview:'Lo que se estanca cuando no fluimos',
    message:'Los problemas circulatorios en las piernas pueden hablar de energía estancada, de situaciones que no fluyen, de cosas que se acumulan porque no circulan. También puede ser señal de que llevas demasiado tiempo en el mismo lugar, física y metafóricamente.',
    reflections:['¿Hay algo en tu vida que no está fluyendo?','¿Llevas demasiado tiempo estática en la misma situación?','¿Hay algo que se está acumulando que debería circular?'],
    repairs:{ n1:'Caminar, nadar, elevar las piernas. El movimiento es la medicina de la circulación.', n2:'Reflexiona: ¿qué no está fluyendo en tu vida ahora mismo?', n3:'Introduce movimiento tanto físico como en las áreas de tu vida que están estancadas.' }
  },

  // ── PIEL (4) ─────────────────────────────────────────────
  {
    zone:'skin', icon:'✨', name:'Eccema y dermatitis',
    preview:'La piel que reacciona a lo que no puede procesar',
    message:'La piel es el órgano del límite y del contacto. Cuando se inflama con eccemas o dermatitis, suele haber una hipersensibilidad al entorno: algo en tu mundo (relaciones, situaciones, exigencias) te está "rozando" demasiado. También puede hablar de algo que te irrita y no puedes alejar.',
    reflections:['¿Hay algo o alguien que te está "irritando" la piel?','¿Sientes que algo en tu entorno te está agrediendo?','¿Te sientes hipersensible últimamente?'],
    repairs:{ n1:'Cuida la piel con delicadeza: productos suaves, ropa que no roce, agua templada.', n2:'Escribe qué o quién está "rozando" demasiado en tu vida.', n3:'¿Puedes poner distancia o un límite con eso que te irrita?' }
  },
  {
    zone:'skin', icon:'🌸', name:'Urticaria y picores sin causa',
    preview:'Lo que nos "saca de quicio" y no podemos rascar',
    message:'La urticaria y los picores sin causa médica clara suelen aparecer en momentos de estrés intenso o de irritación extrema. El cuerpo literalmente se "pica" cuando algo nos saca de quicio. ¿Qué situación te tiene en un estado de irritación que no encuentras cómo resolver?',
    reflections:['¿Hay algo que te tiene en un estado de irritación constante?','¿Qué situación te "pica" sin que puedas rascarte?','¿Estás en una situación de la que no puedes escapar y te tiene desesperada?'],
    repairs:{ n1:'Frío local, antihistamínico si es necesario. Consulta médica si persiste.', n2:'Identifica el estresor que desencadenó el episodio.', n3:'¿Qué cambio necesitas hacer para salir de ese estado de irritación crónica?' }
  },
  {
    zone:'skin', icon:'🔥', name:'Acné adulto',
    preview:'Lo que no digiere nuestra autoestima',
    message:'El acné en adultos, especialmente alrededor de la mandíbula y mentón, suele asociarse con desequilibrios hormonales relacionados con el estrés, pero también con dinámicas de vergüenza, autoexigencia y la sensación de no sentirse "presentable" o "suficiente". ¿Cómo te sientes contigo misma por dentro?',
    reflections:['¿Cómo te hablas a ti misma en el espejo?','¿Hay mucha autoexigencia sobre cómo debes ser o verte?','¿Estás viviendo bajo mucha presión o estrés crónico?'],
    repairs:{ n1:'Cuida la piel con rutina constante. Reduce el azúcar y el estrés oxidativo.', n2:'Trabaja la autocompasión: ¿qué le dirías a una amiga que tiene acné?', n3:'Examina el nivel de autoexigencia que manejas. ¿De dónde viene ese estándar imposible?' }
  },
  {
    zone:'skin', icon:'🌿', name:'Psoriasis',
    preview:'La piel que se renueva demasiado rápido',
    message:'La psoriasis, con su ciclo acelerado de renovación celular, puede ser la metáfora de alguien que quiere "cambiar de piel" urgentemente, que necesita renovarse pero no sabe cómo. También se asocia con autoagresión inconsciente, con una rabia que se vuelve hacia adentro. Mereces ternura, no dureza.',
    reflections:['¿Hay algo de ti misma que quieres cambiar con urgencia?','¿Estás siendo dura contigo misma?','¿Hay rabia que se dirige hacia adentro en lugar de hacia afuera?'],
    repairs:{ n1:'Tratamiento médico siempre. Además: hidratación abundante, sol moderado, reducir el estrés.', n2:'Escribe sobre cómo te tratas a ti misma cuando cometes errores.', n3:'Practica la autocompasión activa. Trátate como tratarías a alguien que amas.' }
  },

  // ── ENERGÍA Y SUEÑO (4) ──────────────────────────────────
  {
    zone:'energy', icon:'🌙', name:'Fatiga crónica',
    preview:'El agotamiento de quien lleva demasiado tiempo dando',
    message:'La fatiga crónica rara vez es solo física. Suele ser el resultado de un largo período dando más de lo que recibes, de vivir para los demás olvidándote de ti, de reprimir emociones que consumen energía al ser retenidas. Tu cuerpo no está roto: está agotado de hacer lo imposible. Es una señal de parar, no de seguir empujando.',
    reflections:['¿Llevas mucho tiempo dando más de lo que recibes?','¿Estás viviendo para los demás o también para ti?','¿Hay emociones que llevas tiempo reprimiendo?'],
    repairs:{ n1:'Descanso sin culpa. Una siesta no es debilidad. El sueño es medicina.', n2:'Haz una lista de lo que te da energía y lo que te la quita. ¿El balance está muy desequilibrado?', n3:'Busca apoyo médico para descartar causas físicas. Y también explora qué está pasando emocionalmente.' }
  },
  {
    zone:'energy', icon:'🌙', name:'Despertar entre 3 y 5 de la madrugada',
    preview:'La hora de la tristeza y el pulmón',
    message:'En la medicina china, entre las 3 y las 5 de la madrugada es la hora del pulmón, asociado a la tristeza y el duelo. Puede indicar una pena no procesada, o estrés crónico que genera un pico de cortisol en esas horas. Algo en tu vida te está despertando porque no lo has "dormido" todavía.',
    reflections:['¿Qué pena no te estás permitiendo llorar?','¿Qué te preocupa tanto que ni durmiendo puedes descansar?','¿Hay algo sobre lo que no estás hablando que necesita expresarse?'],
    repairs:{ n1:'Cuando te despiertes, no te quedes dando vueltas. Levántate, bebe agua, escribe lo que venga.', n2:'Antes de dormir: "Todo lo que necesito soltar hoy es...". Escríbelo y deja el papel fuera de la habitación.', n3:'Si el patrón persiste, explora qué está pidiendo atención en tu vida emocional.' }
  },
  {
    zone:'energy', icon:'🌿', name:'Hipersomnia / Dormir demasiado',
    preview:'El sueño como refugio del mundo',
    message:'Dormir en exceso suele ser la respuesta del cuerpo a una tristeza o depresión que no encuentra otra salida. El sueño se convierte en un refugio del mundo, una manera de "desaparecer" cuando estar despierta duele demasiado. No te juzgues: algo necesita atención y cuidado.',
    reflections:['¿Hay algo en tu vida despierta de lo que quieres escapar?','¿Hay una tristeza o un vacío que no estás mirando?','¿Cuándo fue la última vez que te sentiste con ganas de estar despierta?'],
    repairs:{ n1:'Exponte a la luz natural al despertar. El sol regula el ritmo circadiano y el ánimo.', n2:'Escribe: ¿de qué estoy escapando cuando duermo?', n3:'Si el patrón persiste más de dos semanas, busca apoyo profesional. Puede ser el inicio de una depresión.' }
  },
  {
    zone:'energy', icon:'✨', name:'Fibromialgia y dolor difuso',
    preview:'El cuerpo que lleva demasiado tiempo sin ser escuchado',
    message:'La fibromialgia suele aparecer en mujeres que han estado muchos años sin escuchar las señales de su cuerpo, o que han vivido bajo tensión crónica muy alta. Es como si el cuerpo, cansado de mandar señales ignoradas, hubiera decidido doler en todas partes para que no puedas seguir ignorándolo. Tu cuerpo no es tu enemigo. Es el guardián de tu verdad.',
    reflections:['¿Llevas mucho tiempo ignorando las señales de tu cuerpo?','¿Has vivido períodos prolongados de estrés muy alto?','¿Qué necesidades tuyas llevan mucho tiempo sin ser atendidas?'],
    repairs:{ n1:'Movimiento suave y constante: yoga suave, piscina, caminar. Nada brusco.', n2:'Lleva un diario de síntomas y emociones para ver la correlación.', n3:'Busca un equipo multidisciplinar (médica, psicóloga, fisioterapeuta). Mereces atención integral.' }
  },

  // ── CICLO FEMENINO (4) ───────────────────────────────────
  {
    zone:'cycle', icon:'🌸', name:'Miomas uterinos',
    preview:'Crecimientos que guardan lo que no se expresó',
    message:'Los miomas son crecimientos benignos que, desde la biodescodificación, se asocian con situaciones no resueltas relacionadas con la femineidad, la maternidad, las relaciones de pareja, o con emociones guardadas en la zona del útero durante mucho tiempo. No es una condena: es una invitación a mirar.',
    reflections:['¿Hay algo relacionado con la maternidad, la feminidad o las relaciones que llevas tiempo sin resolver?','¿Hay emociones que has guardado en el vientre durante años?','¿Qué necesita ser expresado o liberado en tu vida íntima?'],
    repairs:{ n1:'Tratamiento médico siempre. Además: calor en el vientre, movimiento suave, descanso.', n2:'Escribe sobre tu relación con la maternidad (propia o con tu madre) y con tu femineidad.', n3:'Considera acompañamiento terapéutico para explorar la dimensión emocional.' }
  },
  {
    zone:'cycle', icon:'☽', name:'Menopausia y perimenopause intensa',
    preview:'La gran transformación que merece ser honrada',
    message:'La menopausia no es una enfermedad ni una pérdida: es una iniciación. Es el momento en que el cuerpo cierra una etapa y abre otra de poder diferente. Los síntomas intensos suelen aparecer cuando hay resistencia a ese tránsito, o cuando hay mucho sin resolver del ciclo femenino anterior. Es la vida diciéndote: "Es hora de ser tú, completamente."',
    reflections:['¿Cómo estoy viviendo este tránsito: con resistencia o con apertura?','¿Hay algo de la etapa anterior que no he cerrado?','¿Qué mujer quiero ser en esta nueva etapa?'],
    repairs:{ n1:'Apoyo médico para gestionar los síntomas físicos. No tienes que sufrirlos.', n2:'Escribe una carta de despedida a la etapa anterior y una de bienvenida a la nueva.', n3:'Rodéate de mujeres que estén en el mismo momento o que ya lo hayan transitado con gracia.' }
  },
  {
    zone:'cycle', icon:'🌺', name:'Endometriosis',
    preview:'El tejido que crece donde no debería',
    message:'La endometriosis, desde una mirada integrativa, se asocia con una sensibilidad extrema del sistema femenino, con heridas relacionadas con la femineidad, la sexualidad o la maternidad, y con una tendencia a interiorizar el dolor en lugar de expresarlo. Tu sensibilidad no es una debilidad: es una de tus mayores dones, mal dirigido.',
    reflections:['¿Hay heridas relacionadas con tu femineidad que no has mirado?','¿Tiendes a guardarte el dolor en lugar de expresarlo?','¿Cómo es tu relación contigo misma como mujer?'],
    repairs:{ n1:'Tratamiento médico especializado. Esto es innegociable.', n2:'Escribe sobre tu historia con tu cuerpo femenino. Sin juicio.', n3:'Busca apoyo terapéutico especializado en salud femenina.' }
  },
  {
    zone:'cycle', icon:'💜', name:'Quistes ováricos',
    preview:'Lo que no se expresa busca otro lugar',
    message:'Los quistes ováricos, desde una perspectiva emocional, se asocian con ideas, proyectos o emociones que no han encontrado salida, con creatividad reprimida, o con decisiones que se han "enquistado" sin resolverse. Los ovarios son los órganos de la creatividad y la vida. ¿Qué está esperando nacer en ti?',
    reflections:['¿Hay algo que quieres crear, empezar o expresar y no puedes?','¿Hay una decisión enquistada que no te atreves a tomar?','¿Qué está esperando nacer en tu vida?'],
    repairs:{ n1:'Control médico siempre. Seguimiento con tu ginecóloga.', n2:'Escribe sobre qué proyectos, ideas o decisiones llevas tiempo "enquistadas".', n3:'Da un pequeño paso hacia algo que quieres crear o decidir. Desbloquea la energía creativa.' }
  },
];

// ============================================================
// MENSAJES SIMBÓLICOS (zona + sensación + emoción)
// ============================================================
function getSymbolicMessage(zone, sensation, emotion) {
  const specific = {
    'belly_inflamacion_RABIA': {
      message: 'La inflamación en el vientre suele aparecer cuando algo nos está "sentando mal" emocionalmente. Algo o alguien te está irritando por dentro, y esa rabia necesita ser expresada, no tragada. El vientre se inflama cuando nos "hincha" una situación que no podemos digerir.',
      reflections: ['¿Qué situación o persona estás "tragando" sin digerirla?','¿Hay algo que quieres decir y no estás pudiendo?','¿A quién o qué estás aguantando más de la cuenta?'],
      repairs: { n1:'Pon las manos en tu vientre. Respira profundo 5 veces diciéndote: "Suelto lo que me daña." Con cada exhalación, suelta.', n2:'Escribe todo lo que te enfada de esa situación. No lo mandes. Solo suéltalo en papel. Puedes romperlo después.', n3:'La próxima vez que estés en esa situación, practica decir "cuando eso pasa, me siento mal". O al menos, pon distancia.' }
    },
    'chest_opresion_TRISTEZA': {
      message: 'La opresión en el pecho suele hablar de tristeza contenida, de algo que pesa en el corazón. ¿Hay alguna pena que no te has permitido llorar? A veces guardamos tanto dentro que el pecho literalmente se comprime para contenerlo todo.',
      reflections: ['¿Qué o quién te pesa en el corazón ahora mismo?','¿Hay una pérdida que no has terminado de procesar?','¿A quién o qué extrañas?'],
      repairs: { n1:'Pon tu mano izquierda sobre tu corazón. Siente su latido. Respira hondo 5 veces. Dite: "Me permito sentir esto. No tengo que ser fuerte ahora."', n2:'Escribe una carta a lo que perdiste o extrañas. No la envíes. Solo di lo que necesitas decir.', n3:'Permítete un ritual de cierre. Una vela, un papel quemado, o visitar un lugar especial. El corazón necesita rituales para soltar.' }
    },
    'throat_nudo_MIEDO': {
      message: 'Ese nudo en la garganta... ¿qué es lo que necesitas decir y no te atreves? El miedo muchas veces se instala en la garganta cuando tenemos una conversación pendiente que nos aterra. Las palabras se quedan atascadas porque parte de ti cree que decirlas tiene un coste demasiado alto.',
      reflections: ['¿Qué conversación estás evitando?','¿Qué pasaría si dijeras lo que realmente piensas?','¿A quién o qué le tienes miedo al hablar?'],
      repairs: { n1:'Masajea suavemente los lados del cuello. Luego emite un zumbido suave con la boca cerrada durante 30 segundos.', n2:'Escribe o graba un audio con todo lo que necesitas decir, sin filtro. No lo envíes todavía.', n3:'Practica la conversación que evitas en voz alta, sola. El ensayo reduce el miedo.' }
    },
    'shoulders_tension_MIEDO': {
      message: 'Los hombros tensos son el primer signo de que estás cargando con demasiadas responsabilidades, o viviendo en modo supervivencia. El miedo se sube a los hombros: los encogemos para protegernos, como si esperáramos un golpe que no llega.',
      reflections: ['¿Qué estás cargando que no te corresponde cargar?','¿A qué le estás diciendo que sí cuando en realidad quieres decir que no?','¿Cuándo fue la última vez que pediste ayuda?'],
      repairs: { n1:'Lleva los hombros hacia las orejas todo lo que puedas. Sostén 5 segundos. Suelta con una exhalación fuerte. Repite 5 veces.', n2:'Haz una lista de todo lo que estás cargando. Marca: ¿qué de esto es realmente tuyo?', n3:'Esta semana, delega o pide ayuda para UNA cosa de la lista. Solo una.' }
    },
    'belly_nudo_MIEDO': {
      message: 'El nudo en el vientre es la forma en que tu cuerpo "digiere" el miedo. Hay algo en tu vida que te genera mucha incertidumbre. El miedo se instala en el centro de tu ser cuando sientes que el suelo no es firme bajo tus pies.',
      reflections: ['¿Qué es lo que más temes ahora mismo?','¿Qué parte de tu vida sientes que está fuera de tu control?','¿Hay una decisión pendiente que te genera angustia?'],
      repairs: { n1:'Pon tu mano derecha en el vientre y aplica una suave presión. Respira lento: 4 al inhalar, 6 al exhalar.', n2:'Escribe todas las cosas que SÍ están bajo tu control, por pequeñas que sean.', n3:'Identifica UNA cosa que podrías hacer esta semana para reducir esa incertidumbre.' }
    },
    'pelvis_inflamacion_RABIA': {
      message: 'La zona pélvica inflamada con rabia es muy significativa. La pelvis es tu centro de poder, tu creatividad, tu sexualidad. Cuando algo te "come por dentro" en este espacio tan íntimo, hay algo que sientes que ha invadido tu espacio, tu cuerpo o tu intimidad.',
      reflections: ['¿Hay algo que sientes que ha violado tu espacio personal o íntimo?','¿Estás en paz con tu sexualidad y tu cuerpo?','¿Hay alguien que te hace sentir que tu cuerpo no te pertenece?'],
      repairs: { n1:'Siéntate con las piernas cruzadas. Pon las manos en tu bajo vientre. Repite: "Este cuerpo es mío. Este espacio es sagrado."', n2:'Escribe sobre lo que sientes que ha invadido tu espacio.', n3:'Identifica qué límite en tu intimidad necesitas establecer.' }
    },
    'lumbar_peso_MIEDO': {
      message: 'El peso en la zona lumbar con miedo suele hablar de inseguridad económica, miedo al futuro, sensación de que el suelo va a ceder. La espalda baja es el pilar que nos sostiene, y cuando ese pilar tiene miedo, duele.',
      reflections: ['¿Qué sientes que sustenta (o no) tu vida ahora mismo?','¿Hay miedos económicos o de seguridad presentes?','¿Sientes que tienes apoyo en tu vida?'],
      repairs: { n1:'Túmbate boca arriba con las rodillas dobladas. Deja que la zona lumbar se hunda en el suelo. Respira profundo 10 veces.', n2:'Haz una lista de los recursos que SÍ tienes ahora mismo: personas, habilidades, pequeñas seguridades.', n3:'Busca UNA acción concreta para fortalecer tu sensación de seguridad esta semana.' }
    },
    'head_punzada_RABIA': {
      message: 'Las punzadas en la cabeza suelen hablar de pensamientos que nos taladran. Hay una situación que está ocupando toda tu cabeza, y tu rabia ante ella no está encontrando salida. La cabeza explota cuando la mente rumia y rumia sin resolver.',
      reflections: ['¿Qué pensamiento sigues repitiendo en bucle?','¿Hay una situación injusta que te ocupa la mente?','¿Estás intentando controlar algo que no puedes?'],
      repairs: { n1:'Masajea tus sienes con movimientos circulares. Luego pon los dedos en la base del cráneo y presiona suavemente.', n2:'Saca el pensamiento en bucle al papel. Luego escribe: "¿Puedo hacer algo al respecto?" Si sí, anota qué.', n3:'Busca movimiento físico: caminar, bailar, nadar. La rabia que no tiene voz encuentra salida en el cuerpo.' }
    },
    'chest_palpitaciones_MIEDO': {
      message: 'Las palpitaciones son el lenguaje del miedo. Tu corazón late rápido porque algo lo tiene en estado de alerta. A veces la mente no ha procesado el miedo conscientemente, pero el corazón ya lo siente. No estás en peligro. Tu sistema nervioso está en modo alarma, pero puedes ayudarle a calmarse.',
      reflections: ['¿En qué escenario futuro está metida tu mente?','¿Cuál es el peor escenario que estás imaginando?','¿Qué probabilidad real tiene ese escenario?'],
      repairs: { n1:'Técnica de anclaje: nombra 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles, 1 que saboreas. Vuelve al presente.', n2:'Escribe el miedo en un papel. El miedo crece en la mente y se reduce cuando sale.', n3:'Identifica si hay algo concreto que puedes hacer para reducir ese riesgo. Si no, practica soltar lo que no depende de ti.' }
    },
  };

  const key = `${zone}_${sensation}_${emotion}`;
  if (specific[key]) return specific[key];

  // Buscar por zona + emoción
  for (const k in specific) {
    if (k.startsWith(zone + '_') && k.endsWith('_' + emotion)) return specific[k];
  }
  // Buscar cualquiera de esa zona
  for (const k in specific) {
    if (k.startsWith(zone + '_')) return specific[k];
  }

  // Fallback por zona desde el diccionario
  const dictEntry = DICTIONARY.find(d => d.zone === zone);
  if (dictEntry) return { message: dictEntry.message, reflections: dictEntry.reflections, repairs: dictEntry.repairs };

  return {
    message: 'Tu cuerpo es inteligente. Más de lo que jamás te han contado. No es una máquina que se estropea al azar. Es un sistema viviente que reacciona a cada pensamiento, a cada emoción, a cada situación que vives. Escucha qué te quiere decir esta señal.',
    reflections: ['¿Cuándo empezó esta sensación?','¿Qué estaba pasando en tu vida en ese momento?','¿Qué emoción acompaña a esta sensación?'],
    repairs: { n1:'Pon una mano en la zona que sientes y respira profundo 5 veces. Dile: "Te escucho."', n2:'Escribe sobre lo que sientes, sin censura. Solo saca lo que hay dentro.', n3:'Identifica qué necesita cambiar en tu vida para que esta señal pueda descansar.' }
  };
}

// ============================================================
// DIARIO EMOCIONAL — 5 Ejercicios
// ============================================================
const DIARY_EXERCISES = [
  {
    id: 'historial',
    title: 'Mi historial de señales',
    subtitle: 'Conecta los puntos de tu historia',
    icon: '🗺️',
    intro: 'Cariño, a veces las señales que el cuerpo manda no son nuevas. Vienen de lejos. Este ejercicio es para que veas el patrón completo.',
    steps: [
      { prompt: '¿Cuál es la señal física que tienes con más frecuencia? (dolor de cabeza, tensión, vientre, garganta...)', type: 'textarea' },
      { prompt: '¿Desde cuándo está presente en tu vida? ¿Recuerdas la primera vez que la sentiste?', type: 'textarea' },
      { prompt: '¿Qué estaba pasando en tu vida cuando apareció por primera vez?', type: 'textarea' },
      { prompt: '¿En qué situaciones suele aparecer ahora? ¿Hay un patrón?', type: 'textarea' },
      { prompt: 'Si esta señal pudiera hablar, ¿qué crees que te diría?', type: 'textarea' },
    ]
  },
  {
    id: 'nodije',
    title: 'Lo que no dije',
    subtitle: 'Las palabras que se quedaron dentro',
    icon: '🌿',
    intro: 'Este ejercicio es para las palabras que se quedaron atascadas. Las que no dijiste por miedo, por no herir, por no ser "demasiado". Aquí puedes decirlas todas. Nadie va a leer esto excepto tú.',
    steps: [
      { prompt: '¿A quién le guardas algo que necesitas decirle? (puede ser una persona viva, fallecida, o incluso tú misma)', type: 'textarea' },
      { prompt: '¿Qué es lo que necesitas decirle? Escríbelo sin filtro. Nadie va a leer esto.', type: 'textarea' },
      { prompt: '¿Qué te ha impedido decírselo? (miedo al rechazo, al conflicto, a su reacción, a perderle...)', type: 'textarea' },
      { prompt: '¿Qué necesitarías para poder decirlo, o para dejar de necesitar decirlo?', type: 'textarea' },
      { prompt: 'Escribe una frase de cierre para ti misma sobre esto. Algo que te permita soltar un poco, aunque sea por hoy.', type: 'textarea' },
    ]
  },
  {
    id: 'verdad5',
    title: 'Mi verdad hoy en 5 frases',
    subtitle: 'Sin filtros, sin maquillaje',
    icon: '💫',
    intro: 'Hermosa, completa estas 5 frases con lo primero que te venga a la mente. Sin pensarlo demasiado. Sin corregirte. La primera respuesta suele ser la verdadera.',
    steps: [
      { prompt: 'Ahora mismo me siento...', type: 'textarea' },
      { prompt: 'Lo que más me pesa en este momento es...', type: 'textarea' },
      { prompt: 'Lo que más necesito y no me estoy dando es...', type: 'textarea' },
      { prompt: 'Si no tuviera miedo, yo...', type: 'textarea' },
      { prompt: 'Lo que mi cuerpo me está pidiendo hoy es...', type: 'textarea' },
    ]
  },
  {
    id: 'dosvoces',
    title: 'Mis dos voces',
    subtitle: 'La que juzga y la que sana',
    icon: '🌸',
    intro: 'Dentro de ti conviven dos voces: la que te exige, te juzga y te dice que no eres suficiente, y la que te cuida, te comprende y te abraza. Este ejercicio es para darle espacio a la segunda.',
    steps: [
      { prompt: '¿Qué te dice la voz crítica sobre ti últimamente? Escribe sus palabras exactas, sin suavizar.', type: 'textarea' },
      { prompt: '¿Reconoces de dónde viene esa voz? (¿te recuerda a alguien? ¿a qué edad empezaste a escucharla?)', type: 'textarea' },
      { prompt: 'Ahora imagina que una amiga muy querida está en tu lugar. ¿Qué le dirías tú a ella?', type: 'textarea' },
      { prompt: 'Escríbete a ti misma desde esa voz compasiva. Dite lo que necesitas escuchar.', type: 'textarea' },
      { prompt: 'Una frase que puedas repetirte cuando la voz crítica sube demasiado el volumen:', type: 'textarea' },
    ]
  },
  {
    id: 'nocargo',
    title: '¿Qué estoy cargando que no es mío?',
    subtitle: 'Devolver lo que no te pertenece',
    icon: '🌊',
    intro: 'Muchas de las cosas que cargamos no son nuestras. Son responsabilidades de otros, emociones ajenas, expectativas que nos pusieron encima. Este ejercicio es para ver el peso real y empezar a devolver lo que no te corresponde llevar.',
    steps: [
      { prompt: 'Haz una lista de todo lo que estás cargando ahora mismo (preocupaciones, responsabilidades, problemas...)', type: 'textarea' },
      { prompt: 'De esa lista, ¿qué cosas son realmente tuyas? ¿Cuáles le pertenecen a otra persona?', type: 'textarea' },
      { prompt: '¿Hay alguien cuyas emociones o problemas estás cargando como si fueran tuyos?', type: 'textarea' },
      { prompt: 'Escoge UNA cosa de la lista que puedas devolver o soltar hoy. ¿Qué necesitarías hacer para soltarla?', type: 'textarea' },
      { prompt: 'Completa esta frase: "Yo soy responsable de _______, pero no soy responsable de _______."', type: 'textarea' },
    ]
  },
];

// ============================================================
// RETO 7 DÍAS
// ============================================================
const CHALLENGE_7_DAYS = [
  {
    day: 1,
    title: 'Escuchar sin juzgar',
    icon: '🌸',
    inspiration: 'Hoy es el primer día de un viaje diferente: el viaje hacia adentro. Durante estos 7 días, vas a aprender a escuchar a tu cuerpo como nunca antes lo has hecho. No como un problema que resolver, sino como un aliado que habla. Tu cuerpo no es tu enemigo. Es el guardián de tu verdad.',
    exercise: 'Elige una parte de tu cuerpo que suela darte señales (la que más te molesta o la que más atención pide). Siéntate en silencio, pon la mano sobre esa zona, cierra los ojos y simplemente escucha. ¿Qué sensación sientes? ¿Qué imagen o emoción aparece? No tienes que resolver nada. Solo escucha.',
    prompt: 'Escribe lo que surgió cuando escuchaste a esa parte de tu cuerpo. Sin filtros, sin correcciones. ¿Qué te dijo?',
  },
  {
    day: 2,
    title: 'La emoción detrás del síntoma',
    icon: '🌿',
    inspiration: 'La rabia que no expresas se convierte en tensión en los hombros y la mandíbula. La tristeza que no lloras se convierte en opresión en el pecho. Lo que no te atreves a decir se convierte en un nudo en la garganta. Hoy vamos a explorar la emoción que se esconde detrás de tu señal más frecuente.',
    exercise: 'Piensa en la señal física que más se repite en tu vida. Cierra los ojos y pregúntate: si esta señal fuera una emoción, ¿cuál sería? No lo pienses, déjalo salir. Puede ser rabia, miedo, tristeza, vergüenza... Lo que sea que aparezca es correcto.',
    prompt: '¿Qué emoción encontraste detrás de tu señal? ¿Te sorprendió? ¿Tiene sentido? Escribe sobre la relación que ves entre esa emoción y tu síntoma.',
  },
  {
    day: 3,
    title: 'Lo que no dijiste',
    icon: '💫',
    inspiration: 'Este ejercicio es el primer paso para que tu garganta deje de tener nudos y tu pecho deje de oprimirse. Lo que se dice, se libera. No tienes que enviar nada ni confrontar a nadie. Solo necesitas sacar las palabras de adentro y ponerlas en algún lugar.',
    exercise: 'Escribe una carta a alguien con quien tengas algo pendiente de decir. Puede ser algo pequeño o algo enorme. No la envíes. Este ejercicio es solo para ti. Empieza con "Necesito decirte que..." y continúa sin parar durante al menos 10 minutos.',
    prompt: '¿Cómo te sientes después de escribir esa carta? ¿Tu cuerpo siente algo diferente? ¿Hay alivio, o queda algo más por decir?',
  },
  {
    day: 4,
    title: 'Tu necesidad real',
    icon: '🌺',
    inspiration: 'Detrás de cada síntoma hay una emoción. Y detrás de cada emoción, hay una necesidad. Una necesidad que no ha sido satisfecha. Hoy vamos a ir a esa raíz. No para encontrar culpables, sino para encontrar qué es lo que realmente necesitas y cómo puedes dártelo.',
    exercise: 'Piensa en una situación que te genera malestar físico o emocional con frecuencia. Pregúntate: ¿qué emoción hay aquí? Luego: ¿qué necesidad hay debajo de esa emoción? (seguridad, amor, reconocimiento, descanso, límites...). ¿Quién o qué podría satisfacer esa necesidad?',
    prompt: '¿Cuál es la necesidad que encontraste? ¿Llevas mucho tiempo sin satisfacerla? ¿Hay algo que puedas hacer esta semana para empezar a cubrirla?',
  },
  {
    day: 5,
    title: 'Una reparación real',
    icon: '🌊',
    inspiration: 'Una reparación no es una solución mágica. Es un acto simbólico y real que le dice a tu cuerpo: "Te he escuchado, y ahora voy a hacer algo para cuidarte." No tiene que ser grande. Tiene que ser honesta.',
    exercise: 'Basándote en lo que has descubierto estos días, elige UNA reparación concreta. Puede ser corporal (un baño, un masaje, un descanso), emocional (llorar, escribir, hablar con alguien) o de vida real (una conversación, un límite, un cambio). Hazla hoy.',
    prompt: '¿Qué reparación elegiste? ¿Cómo te sentiste antes y después de hacerla? ¿Tu cuerpo respondió de alguna manera?',
  },
  {
    day: 6,
    title: 'El patrón que se repite',
    icon: '🌙',
    inspiration: 'Las señales que se repiten son las más sabias. Son las que llevan más tiempo esperando que las escuches. Hoy vamos a mirar el patrón con curiosidad, no con juicio. No estás rota. Tienes un patrón aprendido que ya no te sirve. Y lo que se aprende, se puede desaprender.',
    exercise: 'Piensa en una situación que se repite en tu vida (el mismo tipo de relación, el mismo conflicto, la misma señal física). Escribe el patrón como si lo describieras desde fuera: "Siempre que X pasa, yo Y." ¿Cuándo crees que aprendiste ese patrón? ¿Qué lo mantiene?',
    prompt: '¿Cuál es el patrón que identificaste? ¿Lo reconociste fácilmente o te costó verlo? ¿Hay algo que puedas hacer diferente la próxima vez que aparezca?',
  },
  {
    day: 7,
    title: 'Mi cuerpo, mi aliado',
    icon: '🌸',
    inspiration: 'Llegaste al día 7. Siete días escuchándote, explorándote, mirándote sin juicio. Hoy es el día de la gratitud y del compromiso. Tu cuerpo no es tu enemigo. Es el guardián de tu verdad, el mensajero de tu alma. Durante demasiado tiempo, quizás le pediste que callara mientras tú sonreías. Hoy, lo reconoces.',
    exercise: 'Escribe una carta a tu cuerpo. Dale las gracias por todo lo que ha hecho por ti, por las señales que te mandó aunque no las escucharas, por seguir aquí a pesar de todo. Y dile qué tipo de relación quieres tener con él de ahora en adelante.',
    prompt: '¿Qué le dijiste a tu cuerpo? ¿Cómo te sentiste al escribirlo? ¿Hay algo que cambió en ti durante estos 7 días?',
  },
];

// ============================================================
// RETO 7 DÍAS — RONDA 2 (profundización)
// ============================================================
const CHALLENGE_7_DAYS_R2 = [
  {
    day: 1,
    title: 'El origen de la señal',
    icon: '🌱',
    inspiration: 'Tu cuerpo no inventó la señal de la nada. Cada síntoma tiene una historia, un momento en que aprendiste que sentir de esa manera era la respuesta a algo. Hoy vamos a buscar ese origen con amor, no con juicio. Entender de dónde viene una señal es el primer paso para que pueda transformarse.',
    exercise: 'Piensa en tu señal más frecuente. Cierra los ojos y pregúntate: ¿cuándo fue la primera vez que recuerdo haber sentido esto? Puede ser un recuerdo claro o vago. ¿Qué edad tenías? ¿Qué estaba pasando en tu vida en ese momento? No hace falta que sea exacto. Confía en lo que aparezca.',
    prompt: '¿Qué recuerdo o situación surgió? ¿Ves alguna conexión entre ese momento y el síntoma que tienes ahora? Escribe todo lo que salga, sin censura.',
  },
  {
    day: 2,
    title: 'Las voces que internalizaste',
    icon: '🌿',
    inspiration: 'Las palabras que escuchamos en la infancia sobre el cuerpo, la salud y las emociones se convierten en creencias que vivimos como verdades. "Eres muy sensible." "El dolor es normal." "No llores, eso no es para tanto." Hoy vamos a identificar qué voces ajenas viven dentro de ti y cómo influyen en cómo tratas a tu propio cuerpo.',
    exercise: 'Escribe las frases que escuchaste de niña sobre el cuerpo, la salud, las emociones o el dolor. Pueden ser de tu madre, padre, abuela, profesores... ¿Qué te decían cuando te quejabas? ¿Cómo respondían a tu dolor o tus síntomas? ¿Qué mensaje recibiste sobre lo que significaba estar enferma?',
    prompt: '¿Cuáles de esas voces siguen presentes en tu vida hoy? ¿Cuáles quieres conservar y cuáles ya no te sirven? ¿Qué voz nueva quieres cultivar sobre tu cuerpo?',
  },
  {
    day: 3,
    title: 'La carta a tu niña interior',
    icon: '💫',
    inspiration: 'Hay una versión más pequeña de ti que aprendió a sobrevivir de la mejor manera que supo. Que aprendió a aguantar, a callarse, a no sentir demasiado, a ser fuerte. Y esa niña sigue viviendo dentro de ti. Hoy vamos a hablarle. No para rescatarla, sino para reconocerla. Eso, a veces, es suficiente para que el cuerpo suelte algo que llevaba años sosteniendo.',
    exercise: 'Siéntate en un lugar tranquilo. Cierra los ojos e imagina a tu niña interior, la versión de ti de 6, 7, 8 años. Mírale a los ojos. ¿Cómo está? ¿Qué necesitó y no recibió? ¿Qué le habrías dicho si hubieras podido? Ahora escríbele una carta. Empieza con: "Pequeña mía..."',
    prompt: '¿Cómo fue el encuentro con tu niña interior? ¿Qué emociones surgieron? ¿Tu cuerpo respondió de alguna manera mientras escribías?',
  },
  {
    day: 4,
    title: 'Los límites que cuidan',
    icon: '🌺',
    inspiration: 'Muchos síntomas crónicos son el límite que el cuerpo pone cuando la persona no puede o no sabe ponerlo con palabras. La migraña que aparece cuando no puedes decir "no". El agotamiento que obliga a parar cuando tú no te das permiso. Hoy vamos a explorar tu relación con los límites, con el derecho a parar y a decir que no.',
    exercise: 'Piensa en las áreas de tu vida donde más te cuesta poner límites (trabajo, pareja, familia, amistades). ¿Hay alguna relación entre esas áreas y tus síntomas más frecuentes? Haz una lista de 3 situaciones en las que necesitas poner un límite que aún no has puesto. ¿Qué te impide ponerlo?',
    prompt: '¿Qué descubriste sobre tu relación con los límites? ¿Hay algún límite que puedas poner esta semana, aunque sea pequeño? ¿Qué sentiría tu cuerpo si lo pusieras?',
  },
  {
    day: 5,
    title: 'La herencia emocional',
    icon: '🌊',
    inspiration: 'No llegamos al mundo en blanco. Llegamos con historias, con patrones, con formas de sentir y de enfermar que aprendemos de nuestra familia. Tu madre, tu abuela, las mujeres de tu linaje... ¿Qué cargaron ellas? ¿Qué no pudieron expresar, sanar o soltar? A veces lo que sentimos en el cuerpo no es solo nuestro. Es también de ellas.',
    exercise: 'Piensa en las mujeres de tu familia (madre, abuelas, tías). ¿Qué síntomas o enfermedades eran frecuentes en ellas? ¿Qué emociones cargaban? ¿Había algo que no podían decir, sentir o hacer? ¿Ves algún patrón que se repita entre ellas y tú?',
    prompt: '¿Qué encontraste en tu herencia familiar? ¿Hay algo que estés cargando que no es solo tuyo? Si pudieras soltar esa herencia con amor, ¿qué le dirías a las mujeres que vinieron antes que tú?',
  },
  {
    day: 6,
    title: 'Soltar lo que no es tuyo',
    icon: '🌙',
    inspiration: 'Somos muy buenas cargando con lo ajeno. Las preocupaciones de los demás, sus dolores, sus problemas. Tenemos la espalda cargada de responsabilidades que nunca fueron nuestras. El cuerpo, a veces, lo expresa literalmente: cargas en los hombros, tensión en la espalda, peso en las piernas. Hoy es el día de soltar. No por egoísmo: por salud.',
    exercise: 'Escribe una lista de todo lo que estás cargando que no es tuyo: preocupaciones por otros, responsabilidades que tomaste sin pedirlas, el dolor de alguien más, expectativas ajenas... Luego, imagina que pones esa lista en una caja y la envías con amor a quien corresponde. ¿Cómo se siente tu cuerpo al imaginar soltar eso?',
    prompt: '¿Qué pusiste en la caja? ¿Fue difícil o alivió? ¿Hay algo que creías que era tuyo pero en realidad pertenece a otro? ¿Qué sientes en el cuerpo al imaginarlo suelto?',
  },
  {
    day: 7,
    title: 'La mujer que elijo ser',
    icon: '🌸',
    inspiration: 'Has llegado al final de la segunda ronda. Has cavado más hondo, has mirado lo que estaba debajo, has honrado tu historia y la de las mujeres que vinieron antes. Ahora es el momento de mirar hacia adelante. No de "sanar para poder hacer más", sino de sanarte porque te lo mereces. Porque tu bienestar importa. Porque tú importas.',
    exercise: 'Cierra los ojos e imagina a la versión de ti que ya ha integrado todo lo que has explorado en estas dos rondas. Esa mujer que escucha a su cuerpo, que pone límites, que suelta lo que no es suyo, que honra su historia sin quedar atrapada en ella. ¿Cómo se mueve por el mundo? ¿Cómo habla? ¿Cómo cuida de sí misma? ¿Cómo se relaciona?',
    prompt: '¿Cómo es esa mujer? Descríbela con detalle. ¿Qué necesitas para parecerte más a ella? ¿Cuál es el primer paso?',
  },
];

// ============================================================
// RETO 7 DÍAS — RONDA 3 (integración)
// ============================================================
const CHALLENGE_7_DAYS_R3 = [
  {
    day: 1,
    title: 'Mi cuerpo ahora',
    icon: '🌸',
    inspiration: 'Has completado dos rondas de escucha profunda. Este tercer ciclo es el de la integración: llevar lo aprendido a la vida cotidiana, convertir la escucha en un hábito, no en un esfuerzo puntual. Hoy observamos desde dónde partiste y dónde estás ahora.',
    exercise: 'Siéntate en silencio durante 5 minutos. Recorre tu cuerpo de pies a cabeza con atención. ¿Hay zonas que se sienten más libres? ¿Zonas que todavía piden atención? Sin juicio, solo observa la diferencia entre hoy y cuando empezaste.',
    prompt: '¿Cómo está tu cuerpo hoy, comparado con cuando empezaste este proceso? ¿Hay algo que ha mejorado, algo que sigue igual, algo nuevo que ha aparecido?',
  },
  {
    day: 2,
    title: 'La señal más fiel',
    icon: '🌿',
    inspiration: 'Hay una señal que sigue volviendo. Y no es mala señal: es la más leal. La que más pacientemente espera ser escuchada. Hoy le damos un espacio especial. No para resolverla, sino para honrarla y agradecerle su insistencia.',
    exercise: 'Piensa en la señal física que sigue apareciendo a pesar de todo el trabajo que has hecho. Escríbele una carta. Sí, a tu señal. Empieza con: "Querida [tensión/dolor/agotamiento...], llevas mucho tiempo intentando decirme algo..." Escucha qué te responde ella.',
    prompt: '¿Qué le dijiste a tu señal? ¿Qué te respondió? ¿Entiendes mejor ahora por qué sigue volviendo?',
  },
  {
    day: 3,
    title: 'Los cambios pequeños',
    icon: '💫',
    inspiration: 'El cambio real rara vez es dramático. A veces es no enviarte un mensaje de odio cuando te miras al espejo. A veces es decir que no sin disculparte cuatro veces. A veces es pedir ayuda sin sentirte un peso. Hoy celebramos los cambios pequeños, que son los que perduran.',
    exercise: 'Haz una lista de cambios que has notado en ti desde que empezaste a escuchar a tu cuerpo. Cambios de comportamiento, de pensamiento, de relación contigo misma o con los demás. Por pequeños que sean, escríbelos. Cada uno importa.',
    prompt: '¿Cuáles son esos cambios? ¿Cuál te sorprendió más? ¿Cuál te costó más trabajo? ¿Cuál quieres consolidar?',
  },
  {
    day: 4,
    title: 'El miedo al cambio',
    icon: '🌺',
    inspiration: 'A veces, cuando empezamos a sanar, aparece un miedo nuevo: ¿y si mis límites alejan a las personas? ¿Y si me cuido y los demás se molestan? ¿Y si dejo de ser útil y nadie me quiere? Ese miedo también es información importante. Hoy lo miramos a los ojos con compasión.',
    exercise: 'Escribe los miedos que tienes sobre cambiar y sanar. ¿Qué temes perder? ¿A quién temes decepcionar? ¿Qué parte de ti tiene miedo de ocupar más espacio en el mundo? Escríbelo todo sin filtro.',
    prompt: '¿Cuáles son esos miedos? ¿Qué hay debajo de ellos? ¿Qué necesitarías para seguir avanzando a pesar del miedo?',
  },
  {
    day: 5,
    title: 'Mi rutina de escucha',
    icon: '🌊',
    inspiration: 'El cuerpo no habla solo en crisis. Habla todo el tiempo: en la calidad del sueño, en la tensión de los hombros antes de una reunión difícil, en el nudo del estómago cuando contestas "bien" sin serlo. Hoy diseñamos una práctica cotidiana de escucha que puedas mantener.',
    exercise: 'Diseña una mini-rutina de escucha para incorporar a tu día. Puede ser 5 minutos al despertar, un chequeo corporal a mediodía, o 3 preguntas antes de dormir. Escribe qué harías, cuándo y cómo. Que sea tan sencilla que puedas hacerla aunque estés muy cansada.',
    prompt: '¿Cuál es tu mini-rutina de escucha? ¿La pusiste en práctica hoy? ¿Cómo te sentiste haciéndola?',
  },
  {
    day: 6,
    title: 'El cuerpo que merezco habitar',
    icon: '🌙',
    inspiration: 'Durante mucho tiempo, quizás viviste en tu cuerpo como si fuera un obstáculo o un problema que resolver. Hoy vamos a imaginar una relación diferente. No perfecta, no sin dolor, sino honesta, amable y presente. Una relación de alianza, no de guerra.',
    exercise: 'Escribe cómo quieres relacionarte con tu cuerpo de ahora en adelante. No lo que "deberías" hacer, sino cómo quieres que sea esa relación. ¿Cómo lo tratarías si lo amaras profundamente? ¿Qué cambiaría en tu día a día?',
    prompt: '¿Cómo es esa relación que quieres? ¿Qué cambiaría primero? ¿Qué necesitas soltar para que eso sea posible?',
  },
  {
    day: 7,
    title: 'Carta a la mujer que era',
    icon: '🌸',
    inspiration: 'Has completado tres rondas. Veintiún días de escucha, exploración y honestidad. No eres la misma que empezó. Y la que empezó merece ser reconocida: por haber llegado hasta aquí, por haber buscado, por haber tenido el valor de mirarse.',
    exercise: 'Escribe una carta a la versión de ti que empezó este proceso. Dile lo que has aprendido. Dile lo que ha cambiado. Dile lo que todavía te queda por caminar. Y dile que hizo muy bien en empezar.',
    prompt: '¿Qué le dijiste? ¿Qué sientes al leer esa carta? ¿Qué llevas contigo de estas tres rondas?',
  },
];

// Todas las rondas disponibles
const CHALLENGE_ROUNDS = [CHALLENGE_7_DAYS, CHALLENGE_7_DAYS_R2, CHALLENGE_7_DAYS_R3];

// ============================================================
// MEDITACIONES Y TAPPING — 5 Prácticas
// ============================================================
const MEDITATIONS = [
  {
    id: 'volver-casa',
    title: 'Volver a Casa',
    icon: '🏡',
    duration: '10 min',
    type: 'meditacion',
    description: 'Una meditación guiada para reconectar con tu cuerpo y volver a sentirte en casa en ti misma.',
    script: `Encuentra una posición cómoda. Puedes estar sentada o tumbada. Cierra los ojos suavemente.

Comienza por traer tu atención a tu respiración. No la cambies todavía. Solo obsérvala. Observa cómo el aire entra... y sale. Entra... y sale.

Ahora lleva la atención a tus pies. Siente el contacto con el suelo o con la superficie que te sostiene. Siente ese apoyo. El suelo está aquí. Te sostiene. No tienes que hacer nada para merecer ese apoyo. Simplemente está.

Sube lentamente por tus piernas. Siente el peso de tus muslos, de tus rodillas, de tus pantorrillas. Si hay tensión en algún lugar, no tienes que arreglarla. Solo obsérvala con curiosidad.

Llega a tu vientre. Ese centro tuyo, tan sabio. Con cada respiración, siente cómo se expande al inhalar y se relaja al exhalar. El vientre es tu segundo cerebro. ¿Qué siente ahora mismo?

Sube hasta tu pecho. Siente tu corazón latiendo. Ese latido que lleva contigo desde antes de que nacieras. Tu corazón nunca te ha abandonado. Ha estado aquí, latiendo, en tus mejores y peores momentos.

Lleva la atención a tus hombros. ¿Los llevas subidos hacia las orejas? Deja que caigan. Suelta el peso que no es tuyo. Con cada exhalación, un poco más abajo.

Sube por tu cuello, tu garganta. Si hay algo que necesitas decir, no lo digas ahora. Solo reconócelo. "Hay algo aquí que espera." Está bien.

Llega a tu cabeza. Siente el peso de tu cráneo. Deja que descanse completamente, sostenido.

Ahora imagina que toda tú eres una casa. Con sus habitaciones, sus rincones, sus luces y sus sombras. Y tú estás volviendo a ella después de mucho tiempo fuera. Estás volviendo a casa.

Recorre cada habitación con amor. No tienes que limpiarla ni ordenarla ahora. Solo entra. Solo di: "Hola. Estoy aquí. He vuelto."

Permanece unos momentos en ese espacio interior. Respira. Este es tu hogar. Tu cuerpo es tu hogar.

Cuando estés lista, comienza a traer suavemente la atención hacia afuera. Mueve los dedos de las manos y los pies. Respira un poco más profundo. Y cuando quieras, abre los ojos.

Bienvenida a casa, hermosa.`
  },
  {
    id: 'ansiedad-corporal',
    title: 'Para la ansiedad corporal',
    icon: '🌊',
    duration: '8 min',
    type: 'meditacion',
    description: 'Cuando el cuerpo está en modo alarma y necesitas ayudarle a calmarse. Para momentos de ansiedad intensa.',
    script: `No estás en peligro. Tu sistema nervioso está en modo alarma, pero puedes ayudarle a calmarse. Vamos a hacerlo juntas.

Primero, oriéntate en el espacio. Mira a tu alrededor. Nombra en voz alta o mentalmente 5 cosas que puedes ver ahora mismo. Tómate tu tiempo.

Ahora 4 cosas que puedes tocar. Toca cada una de ellas. Siente su textura, su temperatura.

3 cosas que puedes escuchar. Escucha con atención.

2 cosas que puedes oler.

1 cosa que puedes saborear.

Estás aquí. Estás presente. Esto es lo real.

Ahora lleva una mano al pecho y otra al vientre. Siente el calor de tus propias manos. Ese calor eres tú.

Comienza a respirar siguiendo este ritmo: inhala por la nariz contando 4. Sostén el aire contando 4. Exhala por la boca contando 6. Pausa contando 2.

Repite. Inhala 1, 2, 3, 4. Sostén 1, 2, 3, 4. Exhala 1, 2, 3, 4, 5, 6. Pausa 1, 2.

Siente cómo con cada exhalación el sistema nervioso recibe la señal: "Estamos bien. No hay peligro. Podemos calmarnos."

La ansiedad no es tu enemiga. Es tu sistema de protección trabajando demasiado. Está tratando de protegerte. Dile: "Gracias. Lo veo. Pero ahora estoy a salvo."

Continúa respirando. Con cada ciclo, un poco más suelta. Un poco más presente.

El cuerpo sabe cómo calmarse. Solo necesita señales de seguridad. Tu respiración es la señal más poderosa que puedes darle.

Quédate aquí, respirando, durante unos minutos más. No tienes que hacer nada. No tienes que resolver nada. Solo respira.

Cuando estés lista, vuelve al mundo exterior. Poco a poco. Sin prisa.`
  },
  {
    id: 'tapping-culpa',
    title: 'Tapping para la culpa',
    icon: '✨',
    duration: '12 min',
    type: 'tapping',
    description: 'EFT (Emotional Freedom Technique) para soltar la culpa. Toca suavemente los puntos mientras repites las frases en voz alta.',
    script: `El tapping o EFT (Técnica de Liberación Emocional) funciona estimulando puntos de acupresión mientras procesamos una emoción. Es sencillo y muy efectivo.

CÓMO HACERLO:
Toca suavemente (sin hacer daño) cada punto con los dedos índice y medio, dando pequeños golpecitos mientras repites las frases en voz alta o en voz baja.

PUNTOS: (1) Lado de la mano: el borde externo de la palma. (2) Ceja: inicio de la ceja. (3) Lado del ojo: hueso externo del ojo. (4) Bajo el ojo: hueso bajo el ojo. (5) Bajo la nariz. (6) Barbilla. (7) Clavícula. (8) Bajo el brazo: 10 cm bajo la axila. (9) Coronilla.

RONDA 1 — RECONOCER:
Punto de la mano: "Aunque me siento culpable por _______, me acepto y me quiero profundamente."

Repite en cada punto:
Ceja: "Esta culpa que siento..."
Lado del ojo: "Esta sensación de haber hecho algo mal..."
Bajo el ojo: "Me siento culpable por _______..."
Bajo la nariz: "Llevo cargando esta culpa..."
Barbilla: "Y no sé cómo soltarla..."
Clavícula: "Esta culpa en mi cuerpo..."
Bajo el brazo: "Esta culpa que me pesa..."
Coronilla: "Esta culpa que no me suelta..."

RONDA 2 — CUESTIONAR:
Ceja: "¿Es esta culpa completamente mía?"
Lado del ojo: "¿Hice lo mejor que pude con lo que tenía?"
Bajo el ojo: "¿Qué aprendí de esta situación?"
Bajo la nariz: "¿Sigo mereciendo castigo?"
Barbilla: "¿O puedo aprender y seguir adelante?"
Clavícula: "Hice lo que pude en ese momento..."
Bajo el brazo: "Y eso era suficiente con lo que sabía..."
Coronilla: "Puedo aprender y seguir..."

RONDA 3 — SOLTAR:
Ceja: "Elijo soltar esta culpa."
Lado del ojo: "Me doy permiso de aprender y seguir."
Bajo el ojo: "Merezco compasión, no condena."
Bajo la nariz: "Solto esta culpa de mi cuerpo."
Barbilla: "Solto esta culpa de mi mente."
Clavícula: "Me perdono por lo que hice o no hice."
Bajo el brazo: "Hice lo mejor que pude."
Coronilla: "Y eso es suficiente. Soy suficiente."

Respira profundo. ¿Cómo está la culpa ahora, del 1 al 10? Puedes repetir las rondas tantas veces como necesites.`
  },
  {
    id: 'tapping-miedo',
    title: 'Tapping para el miedo',
    icon: '🌙',
    duration: '12 min',
    type: 'tapping',
    description: 'EFT para trabajar el miedo y la ansiedad. Sigue el guión tocando suavemente los puntos de acupresión.',
    script: `Antes de comenzar, identifica el miedo específico que quieres trabajar. Ponle nombre. Puede ser: "miedo a que me abandonen", "miedo al fracaso", "miedo a enfermar", "miedo a no ser suficiente". Cuanto más específico, más efectivo.

Mide tu nivel de miedo del 1 al 10 ahora mismo.

CÓMO HACERLO:
Golpecitos suaves en cada punto mientras repites las frases en voz alta.

PUNTOS: (1) Lado de la mano, (2) Ceja, (3) Lado del ojo, (4) Bajo el ojo, (5) Bajo la nariz, (6) Barbilla, (7) Clavícula, (8) Bajo el brazo, (9) Coronilla.

RONDA 1 — RECONOCER EL MIEDO:
Punto de la mano: "Aunque tengo mucho miedo de _______, me acepto y me quiero profundamente."

Ceja: "Este miedo que siento..."
Lado del ojo: "Miedo a _______..."
Bajo el ojo: "Lo siento en mi cuerpo..."
Bajo la nariz: "Este miedo que me paraliza..."
Barbilla: "Este miedo que me acompaña..."
Clavícula: "Lleva tiempo aquí..."
Bajo el brazo: "Y no sé cómo soltarlo..."
Coronilla: "Este miedo tan real para mí..."

RONDA 2 — EXPLORAR EL MIEDO:
Ceja: "¿Qué es lo que más temo?"
Lado del ojo: "¿Qué pasaría si pasara lo que temo?"
Bajo el ojo: "¿Podría sobrevivir a eso?"
Bajo la nariz: "¿Tengo recursos para enfrentarlo?"
Barbilla: "He sobrevivido cosas difíciles antes..."
Clavícula: "Tengo más fuerza de la que creo..."
Bajo el brazo: "El miedo me dice que no puedo..."
Coronilla: "Pero yo he podido antes..."

RONDA 3 — TRANSFORMAR:
Ceja: "Elijo recordar mi fuerza."
Lado del ojo: "Elijo confiar en mí."
Bajo el ojo: "No estoy sola en esto."
Bajo la nariz: "Tengo recursos, tengo apoyo."
Barbilla: "Puedo con esto, aunque me asuste."
Clavícula: "Solto el miedo de mi cuerpo."
Bajo el brazo: "Traigo calma y confianza."
Coronilla: "Estoy a salvo. Estoy bien. Puedo."

Respira profundo. ¿Cómo está el miedo ahora del 1 al 10? Repite las rondas si necesitas.`
  },
  {
    id: 'reconciliacion',
    title: 'Ritual de reconciliación',
    icon: '🌸',
    duration: '15 min',
    type: 'ritual',
    description: 'Un ritual guiado para reconciliarte con tu cuerpo. Para cuando llevas mucho tiempo en guerra con él.',
    script: `Prepara un espacio tranquilo. Una vela si puedes. Tu libreta cerca.

Siéntate o túmbate cómodamente. Pon una mano en tu vientre y otra en tu corazón. Cierra los ojos. Respira profundamente hacia el vientre.

Agradece a tu cuerpo por todo lo que hace por ti cada día. Recorre mentalmente cada parte: los pies que te sostienen, las piernas que te mueven, el vientre que te da vida y sabiduría, el pecho que ama, los brazos que abrazan, la cabeza que piensa.

Ahora, en tu libreta, escribe una carta a tu cuerpo. Puede empezar así: "Querido cuerpo mío..." Escribe todo lo que sientes: disculpas por haberlo ignorado, agradecimientos por lo que ha aguantado, promesas de cuidado para el futuro.

Cuando termines, puedes quemar la carta como símbolo de liberación, o guardarla en un lugar especial.

Termina con esta afirmación en voz alta:

"Cuerpo mío, eres mi hogar. Te honro. Te escucho. Te cuido. Eres sabio, eres hermoso, eres mío. Hoy empiezo a reconciliarme contigo. Gracias."

Bebe agua. Tómate algo caliente. Descansa si lo necesitas.`
  },
  {
    id: 'tapping-autoexigencia',
    title: 'Tapping para la autoexigencia',
    icon: '💫',
    duration: '5 min',
    type: 'tapping',
    description: 'Para esa voz interna que nunca está contenta contigo. Libera la presión de ser perfecta.',
    script: `Este tapping es para las que nunca se sienten suficientes. Para la voz que dice "deberías haber hecho más", "no llega", "podrías haberlo hecho mejor". Para el agotamiento de intentar ser perfecta.

Antes de comenzar, pon una mano en el corazón. Respira. Dite: "Hoy elijo tratarme con amabilidad."

CÓMO HACERLO:
Golpecitos suaves con los dedos índice y medio en cada punto mientras repites las frases en voz alta o en susurro.

PUNTOS: (1) Lado de la mano, (2) Ceja, (3) Lado del ojo, (4) Bajo el ojo, (5) Bajo la nariz, (6) Barbilla, (7) Clavícula, (8) Bajo el brazo, (9) Coronilla.

PUNTO DE KARATE (repetir 3 veces):
"Aunque sienta que tengo que hacerlo todo perfecto, me acepto como soy, con mis errores incluidos. Aunque esta voz interna me presione sin parar, elijo tratarme con más suavidad."

RONDA 1 — RECONOCER:
Ceja: "Esta presión que me pongo a mí misma..."
Lado del ojo: "Este no llegar nunca a mi propia meta..."
Bajo el ojo: "El agotamiento de intentar ser perfecta..."
Bajo la nariz: "Esta voz que me dice 'tienes que'..."
Barbilla: "El miedo a fallar, a decepcionar..."
Clavícula: "La rigidez con la que me trato..."
Bajo el brazo: "Toda esta autoexigencia que me pesa..."
Coronilla: "Este agotamiento de nunca ser suficiente..."

RONDA 2 — CUESTIONAR:
Ceja: "¿De quién aprendí que tenía que ser perfecta?"
Lado del ojo: "¿Qué pasaría si me permitiera equivocarme?"
Bajo el ojo: "¿Le hablaría así a alguien que quiero?"
Bajo la nariz: "Los errores me hacen humana, no rota..."
Barbilla: "He hecho lo mejor que pude con lo que tenía..."
Clavícula: "Eso es suficiente. Soy suficiente."
Bajo el brazo: "No tengo que ganarme el derecho a descansar..."
Coronilla: "Puedo relajarme y seguir siendo valiosa..."

RONDA 3 — SOLTAR:
Ceja: "Elijo soltar la exigencia, aunque sea un poquito."
Lado del ojo: "Me permito ser humana."
Bajo el ojo: "Me permito descansar sin culpa."
Bajo la nariz: "Me permito equivocarme y seguir adelante."
Barbilla: "Me trato con la amabilidad que merezco."
Clavícula: "Soy suficiente tal como soy ahora."
Bajo el brazo: "Mi valor no depende de mi productividad."
Coronilla: "Soy suficiente. Estoy bien. Merezco amabilidad."

Respira profundo tres veces. ¿Cómo se siente ahora esa presión? Puedes repetir las rondas todas las veces que necesites.`
  },
  {
    id: 'honrar-cuerpo',
    title: 'Honrar mi cuerpo',
    icon: '🌺',
    duration: '15 min',
    type: 'ritual',
    description: 'Un ritual para honrar tu cuerpo y tu esencia femenina. Gratitud desde los pies hasta la cabeza.',
    script: `Este ritual es para las que llevan tiempo peleadas con su cuerpo. Para las que lo han criticado, ignorado, exigido, avergonzado. Para las que alguna vez quisieron que fuera diferente.

Hoy es el día de la tregua.

Encuentra un lugar tranquilo. Si puedes, ten cerca una vela encendida. Es un símbolo de presencia y de intención.

Siéntate cómodamente y cierra los ojos.

Respira profundo tres veces. Con cada exhalación, deja salir cualquier prisa, cualquier exigencia, cualquier juicio.

Ahora lleva la atención a tu cuerpo. Todo él. Sin seleccionar partes. Sin juzgar. Solo presente.

Empieza a recorrerlo mentalmente desde los pies hasta la cabeza. Y mientras lo recorres, repite mentalmente o en voz baja: "Gracias."

Gracias, pies, por llevarme a todos los lugares donde he necesitado ir.
Gracias, piernas, por sostenerme cuando el suelo se movía.
Gracias, caderas, por guardar mis memorias y mi historia.
Gracias, vientre, por procesar no solo la comida, sino las emociones.
Gracias, útero, por ser el centro de mi poder y mi creatividad. (Aunque no siempre te lo haya dicho.)
Gracias, espalda, por sostenerme aunque a veces te haya pedido demasiado.
Gracias, pecho y corazón, por seguir latiendo, por seguir amando, por seguir aquí.
Gracias, hombros, por cargar lo que has podido, aunque a veces fuera demasiado.
Gracias, brazos y manos, por abrazar, por crear, por dar.
Gracias, garganta, por guardar las palabras cuando no podía decirlas.
Gracias, boca, por las veces que sí pude decir lo que necesitaba.
Gracias, ojos, por mostrarme el mundo y también por llorar cuando hacía falta.
Gracias, cabeza, por pensar, por buscar, por intentar entender.
Gracias, cuerpo, por estar aquí. Por aguantar. Por seguir.

Ahora, si hay una parte de tu cuerpo con la que hayas estado especialmente en conflicto, lleva la atención hacia ella.

Pon la mano sobre esa parte. Siente su temperatura bajo tu palma.

Y dile: "Lo siento. He tardado en escucharte. Pero estoy aquí ahora. Y prometo que voy a intentarlo mejor."

No tienes que creerlo del todo todavía. Solo la intención ya es un inicio.

Permanece unos momentos en ese contacto. Respira.

Cuando estés lista, abre los ojos.

Este es el primer día de una nueva relación con tu cuerpo. No perfecta. Pero más honesta. Más amorosa. Más tuya.

Mi cuerpo no es mi enemigo. Es el guardián de mi verdad, el mensajero de mi alma.`
  },
];
