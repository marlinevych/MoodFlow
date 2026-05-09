/**
 * MoodFlow — quiz.js
 * Система тесту настрою: 8 питань, 5 емоційних шкал,
 * автоматичне застосування теми через існуючий setMood().
 *
 * Сумісно з script.js — нічого не перезаписує.
 * Щоб додати нові питання — просто додай об'єкт у масив QUESTIONS.
 */

/* ============================================================
   1. ПИТАННЯ ТА ВІДПОВІДІ
   ------------------------------------------------------------
   Структура питання:
   {
     id:       унікальний номер,
     text:     текст питання,
     answers:  масив відповідей [
       {
         emoji:  емодзі відповіді,
         text:   текст відповіді,
         scores: { joy, calm, energy, focus, stress }
                 — бали які додаються до шкал (0–10)
       }
     ]
   }
   ============================================================ */

const QUESTIONS = [
  {
    id: 1,
    text: 'Як ти почуваєшся, прокинувшись сьогодні вранці?',
    answers: [
      { emoji: '🌅', text: 'Бадьоро та з ентузіазмом',     scores: { joy: 8, calm: 4, energy: 9, focus: 6, stress: 1 } },
      { emoji: '😴', text: 'Спокійно, але трохи сонно',    scores: { joy: 4, calm: 8, energy: 3, focus: 5, stress: 2 } },
      { emoji: '😐', text: 'Нейтрально, як завжди',         scores: { joy: 4, calm: 5, energy: 4, focus: 5, stress: 3 } },
      { emoji: '😩', text: 'Втомлено та без натхнення',     scores: { joy: 1, calm: 2, energy: 2, focus: 2, stress: 8 } },
    ],
  },
  {
    id: 2,
    text: 'Наскільки добре ти можеш зосередитися прямо зараз?',
    answers: [
      { emoji: '🎯', text: 'Чудово — думки чіткі, концентрація висока', scores: { joy: 5, calm: 6, energy: 6, focus: 10, stress: 1 } },
      { emoji: '🌊', text: 'Непогано, якщо немає відволікань',           scores: { joy: 4, calm: 6, energy: 4, focus: 7,  stress: 3 } },
      { emoji: '🌀', text: 'Складно — думки розсіяні',                   scores: { joy: 2, calm: 3, energy: 3, focus: 3,  stress: 6 } },
      { emoji: '🤯', text: 'Зовсім не можу зосередитись',               scores: { joy: 1, calm: 1, energy: 2, focus: 1,  stress: 9 } },
    ],
  },
  {
    id: 3,
    text: 'Що краще описує твій рівень енергії зараз?',
    answers: [
      { emoji: '⚡', text: 'Заряджений та готовий до дій',   scores: { joy: 7, calm: 3, energy: 10, focus: 7, stress: 2 } },
      { emoji: '🔋', text: 'Достатньо енергії для роботи',   scores: { joy: 5, calm: 5, energy: 7,  focus: 6, stress: 3 } },
      { emoji: '🪫', text: 'Подекуди втомлений',             scores: { joy: 3, calm: 4, energy: 4,  focus: 4, stress: 5 } },
      { emoji: '😮‍💨', text: 'Виснажений, сил майже немає', scores: { joy: 1, calm: 2, energy: 1,  focus: 2, stress: 9 } },
    ],
  },
  {
    id: 4,
    text: 'Як ти ставишся до завдань, які чекають на тебе сьогодні?',
    answers: [
      { emoji: '🚀', text: 'З радістю та нетерпінням',              scores: { joy: 9, calm: 4, energy: 8, focus: 7, stress: 1 } },
      { emoji: '📋', text: 'Спокійно та методично',                 scores: { joy: 5, calm: 9, energy: 5, focus: 8, stress: 2 } },
      { emoji: '😬', text: 'Трохи тривожно, є багато невизначеного', scores: { joy: 2, calm: 2, energy: 4, focus: 4, stress: 7 } },
      { emoji: '😞', text: 'Пригнічено, не хочеться нічого',        scores: { joy: 1, calm: 1, energy: 1, focus: 1, stress: 9 } },
    ],
  },
  {
    id: 5,
    text: 'Чи є у тебе відчуття радості або задоволення прямо зараз?',
    answers: [
      { emoji: '😄', text: 'Так, я щасливий(-а) і натхненний(-а)',   scores: { joy: 10, calm: 5, energy: 8, focus: 6, stress: 1 } },
      { emoji: '🙂', text: 'Є легке задоволення від спокою',          scores: { joy: 6,  calm: 9, energy: 4, focus: 6, stress: 2 } },
      { emoji: '😶', text: 'Ні особливої радості, ні смутку',         scores: { joy: 3,  calm: 5, energy: 4, focus: 5, stress: 3 } },
      { emoji: '😟', text: 'Скоріше смуток або тривога',              scores: { joy: 1,  calm: 1, energy: 2, focus: 2, stress: 8 } },
    ],
  },
  {
    id: 6,
    text: 'Як твоє тіло почувається фізично?',
    answers: [
      { emoji: '💪', text: 'Легкість, хочеться рухатися',        scores: { joy: 7, calm: 4, energy: 9, focus: 6, stress: 1 } },
      { emoji: '🧘', text: 'Розслаблене та спокійне',             scores: { joy: 5, calm: 10, energy: 4, focus: 7, stress: 1 } },
      { emoji: '😓', text: 'Трохи напружене або скуте',           scores: { joy: 2, calm: 3,  energy: 3, focus: 3, stress: 7 } },
      { emoji: '🤕', text: 'Болі, важкість або сильна втома',     scores: { joy: 1, calm: 1,  energy: 1, focus: 1, stress: 9 } },
    ],
  },
  {
    id: 7,
    text: 'Як ти реагуєш на несподівані зміни чи перешкоди?',
    answers: [
      { emoji: '😎', text: 'Спокійно адаптуюсь, це не проблема',  scores: { joy: 6, calm: 9, energy: 5, focus: 8, stress: 1 } },
      { emoji: '🤔', text: 'Обмірковую і шукаю рішення',           scores: { joy: 5, calm: 6, energy: 5, focus: 9, stress: 3 } },
      { emoji: '😤', text: 'Відчуваю роздратування',               scores: { joy: 2, calm: 2, energy: 6, focus: 3, stress: 7 } },
      { emoji: '😰', text: 'Відчуваю паніку або тривогу',          scores: { joy: 1, calm: 1, energy: 2, focus: 2, stress: 10 } },
    ],
  },
  {
    id: 8,
    text: 'Якби ти міг(-ла) зробити щось зараз, що б це було?',
    answers: [
      { emoji: '🎉', text: 'Зустрітися з друзями або розважитися', scores: { joy: 10, calm: 4, energy: 9, focus: 3, stress: 1 } },
      { emoji: '📖', text: 'Почитати або помедитувати',             scores: { joy: 5,  calm: 10, energy: 3, focus: 7, stress: 1 } },
      { emoji: '💻', text: 'Зайнятися роботою або навчанням',       scores: { joy: 4,  calm: 5,  energy: 6, focus: 9, stress: 3 } },
      { emoji: '🛏️', text: 'Поспати або просто полежати',           scores: { joy: 2,  calm: 5,  energy: 1, focus: 2, stress: 6 } },
    ],
  },
];

/* ============================================================
   2. МАППІНГ РЕЗУЛЬТАТУ → НАСТРІЙ (для setMood)
   ------------------------------------------------------------
   Ключі відповідають назвам у moods{} з script.js
   ============================================================ */

const MOOD_MAP = {
  joy:    'happy',
  calm:   'calm',
  energy: 'happy',   // висока енергія → happy (найближче)
  focus:  'neutral', // фокус → нейтральний
  stress: 'stressed',
};

/* Текстовий опис для кожного результату */
const MOOD_DESCRIPTIONS = {
  happy: {
    title: '🌟 Радісний стан',
    desc: 'Ти сповнений(-а) позитивної енергії та натхнення. Відмінний момент для творчості, спілкування та нових починань!',
  },
  calm: {
    title: '🌿 Спокійний стан',
    desc: 'Ти перебуваєш у стані внутрішньої рівноваги та зосередженості. Ідеальний час для вдумливої роботи та відпочинку.',
  },
  neutral: {
    title: '✨ Збалансований стан',
    desc: 'Твій стан стабільний та врівноважений. Ти маєш ресурси і для роботи, і для відпочинку — використовуй цей момент мудро.',
  },
  stressed: {
    title: '🔥 Підвищений стрес',
    desc: 'Ти відчуваєш напругу. Спробуй зробити кілька глибоких вдихів, зробити паузу і розставити пріоритети.',
  },
};

/* ============================================================
   3. СТАН ТЕСТУ
   ============================================================ */

const quizState = {
  currentQuestion: 0,
  selectedAnswer:  null,
  // Накопичені сирі бали по кожній шкалі
  rawScores: { joy: 0, calm: 0, energy: 0, focus: 0, stress: 0 },
  // Нормалізовані бали 0–100
  finalScores: { joy: 0, calm: 0, energy: 0, focus: 0, stress: 0 },
  totalIndex:   0,
  dominantMood: 'neutral',
};

/* ============================================================
   4. ДОПОМІЖНІ ФУНКЦІЇ
   ============================================================ */

/** Скидає стан тесту на початок */
function resetQuizState() {
  quizState.currentQuestion = 0;
  quizState.selectedAnswer   = null;
  quizState.rawScores = { joy: 0, calm: 0, energy: 0, focus: 0, stress: 0 };
  quizState.finalScores = { joy: 0, calm: 0, energy: 0, focus: 0, stress: 0 };
  quizState.totalIndex   = 0;
  quizState.dominantMood = 'neutral';
}

/** Відкрити/закрити оверлей */
function openQuiz() {
  resetQuizState();
  renderQuestion();
  document.getElementById('quizOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuiz() {
  document.getElementById('quizOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

/* ============================================================
   5. РЕНДЕР ПИТАННЯ
   ============================================================ */

function renderQuestion() {
  const q     = QUESTIONS[quizState.currentQuestion];
  const total = QUESTIONS.length;
  const num   = quizState.currentQuestion + 1;

  // Прогрес
  document.getElementById('quizProgressFill').style.width = ((num - 1) / total * 100) + '%';
  document.getElementById('quizProgressNum').textContent  = `${num} / ${total}`;

  // Крапки-індикатори шкал (декоративно)
  const dots = document.querySelectorAll('.scale-dot');
  dots.forEach((dot, i) => dot.classList.toggle('active', i < num));

  // Питання
  const area = document.getElementById('quizQuestionArea');
  area.innerHTML = `
    <div class="quiz-question-wrap">
      <span class="quiz-q-number">Питання ${num}</span>
      <p class="quiz-q-text">${q.text}</p>
      <div class="quiz-answers" id="quizAnswers">
        ${q.answers.map((ans, i) => `
          <button
            class="quiz-answer-btn"
            data-index="${i}"
            onclick="selectAnswer(${i})"
          >
            <span class="answer-emoji">${ans.emoji}</span>
            <span>${ans.text}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Кнопка "Далі" — неактивна поки не обрана відповідь
  quizState.selectedAnswer = null;
  updateNextBtn();

  // Оновити текст кнопки
  const nextBtn = document.getElementById('quizNextBtn');
  if (num === total) {
    nextBtn.innerHTML = `Переглянути результат
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"/>
      </svg>`;
  } else {
    nextBtn.innerHTML = `Далі
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>`;
  }
}

/* ============================================================
   6. ВИБІР ВІДПОВІДІ
   ============================================================ */

function selectAnswer(index) {
  quizState.selectedAnswer = index;

  // Виділити обрану кнопку
  document.querySelectorAll('.quiz-answer-btn').forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });

  updateNextBtn();
}

function updateNextBtn() {
  const btn = document.getElementById('quizNextBtn');
  if (quizState.selectedAnswer !== null) {
    btn.classList.add('enabled');
  } else {
    btn.classList.remove('enabled');
  }
}

/* ============================================================
   7. ПЕРЕЙТИ ДО НАСТУПНОГО ПИТАННЯ
   ============================================================ */

function quizNext() {
  if (quizState.selectedAnswer === null) return;

  // Додати бали обраної відповіді
  const q      = QUESTIONS[quizState.currentQuestion];
  const scores = q.answers[quizState.selectedAnswer].scores;

  Object.keys(scores).forEach(scale => {
    quizState.rawScores[scale] += scores[scale];
  });

  quizState.currentQuestion++;

  if (quizState.currentQuestion < QUESTIONS.length) {
    renderQuestion();
  } else {
    calculateResults();
    renderResults();
  }
}

/* ============================================================
   8. ПІДРАХУНОК РЕЗУЛЬТАТІВ
   ============================================================ */

function calculateResults() {
  const maxPerScale = QUESTIONS.length * 10; // макс. можливих балів

  // Нормалізація до 0–100
  const scales = ['joy', 'calm', 'energy', 'focus', 'stress'];
  scales.forEach(scale => {
    quizState.finalScores[scale] = Math.round(
      (quizState.rawScores[scale] / maxPerScale) * 100
    );
  });

  const s = quizState.finalScores;

  // Загальний індекс 0–10
  // Формула: (joy*0.25 + calm*0.2 + energy*0.2 + focus*0.25 - stress*0.1)
  const rawIndex =
    s.joy    * 0.25 +
    s.calm   * 0.20 +
    s.energy * 0.20 +
    s.focus  * 0.25 -
    s.stress * 0.10;

  // rawIndex діапазон ≈ 0..90 → нормалізуємо до 0–10
  quizState.totalIndex = Math.min(10, Math.max(0, (rawIndex / 90 * 10)));
  quizState.totalIndex = Math.round(quizState.totalIndex * 10) / 10;

  // Визначення домінуючого стану
  // Виключаємо стрес з "позитивних" шкал і перевіряємо окремо
  const posScales = { joy: s.joy, calm: s.calm, energy: s.energy, focus: s.focus };

  if (s.stress >= 65) {
    // Якщо стрес дуже високий — домінує stressed
    quizState.dominantMood = 'stressed';
  } else {
    // Знаходимо шкалу з найвищим значенням серед позитивних
    let maxScale = 'joy';
    let maxVal   = 0;
    Object.entries(posScales).forEach(([scale, val]) => {
      if (val > maxVal) { maxVal = val; maxScale = scale; }
    });
    quizState.dominantMood = MOOD_MAP[maxScale];
  }
}

/* ============================================================
   9. РЕНДЕР РЕЗУЛЬТАТІВ
   ============================================================ */

function renderResults() {
  const moodInfo = MOOD_DESCRIPTIONS[quizState.dominantMood];
  const s        = quizState.finalScores;

  const scalesList = [
    { key: 'joy',    label: 'Радість',  emoji: '😄', cls: 'joy' },
    { key: 'calm',   label: 'Спокій',   emoji: '😌', cls: 'calm' },
    { key: 'energy', label: 'Енергія',  emoji: '⚡', cls: 'energy' },
    { key: 'focus',  label: 'Фокус',    emoji: '🎯', cls: 'focus' },
    { key: 'stress', label: 'Стрес',    emoji: '😤', cls: 'stress' },
  ];

  const area = document.getElementById('quizQuestionArea');
  area.innerHTML = `
    <div class="quiz-results" id="quizResultsBlock">

      <!-- Шапка результату -->
      <div class="quiz-results-header">
        <div class="results-emoji-orb" id="resultsOrb">
          ${getMoodEmoji(quizState.dominantMood)}
        </div>
        <div class="results-mood-title">${moodInfo.title}</div>
        <p class="results-mood-desc">${moodInfo.desc}</p>
      </div>

      <!-- Шкали -->
      <div class="quiz-scales">
        ${scalesList.map(scale => `
          <div class="quiz-scale-row ${scale.cls}">
            <div class="scale-label">
              <span class="scale-emoji">${scale.emoji}</span>
              ${scale.label}
            </div>
            <div class="scale-track">
              <div class="scale-fill" id="scaleFill_${scale.key}" style="width:0%"></div>
            </div>
            <div class="scale-pct" id="scalePct_${scale.key}">0%</div>
          </div>
        `).join('')}
      </div>

      <!-- Загальний індекс -->
      <div class="quiz-total-index">
        <div class="index-number" id="indexNum">0</div>
        <div class="index-info">
          <div class="index-label">Загальний індекс настрою</div>
          <div class="index-sublabel">
            Розраховано за формулою:<br>
            (радість×0.25 + спокій×0.2 + енергія×0.2 + фокус×0.25 − стрес×0.1)
          </div>
        </div>
      </div>

      <!-- Дії -->
      <div class="quiz-results-actions">
        <button class="btn-apply-mood" onclick="applyQuizResult()">
          ✨ Застосувати тему до інтерфейсу
        </button>
        <button class="btn-retake" onclick="restartQuiz()">
          🔄 Пройти знову
        </button>
      </div>

    </div>
  `;

  // Оновити прогрес на 100%
  document.getElementById('quizProgressFill').style.width = '100%';
  document.getElementById('quizProgressNum').textContent  = `${QUESTIONS.length} / ${QUESTIONS.length}`;

  // Заховати кнопку "Далі" і крапки
  document.getElementById('quizFooter').style.display = 'none';

  // Анімоване заповнення шкал (після рендеру)
  requestAnimationFrame(() => {
    setTimeout(() => {
      scalesList.forEach(scale => {
        const fillEl = document.getElementById(`scaleFill_${scale.key}`);
        const pctEl  = document.getElementById(`scalePct_${scale.key}`);
        const val    = s[scale.key];
        if (fillEl) fillEl.style.width  = val + '%';
        if (pctEl)  pctEl.textContent   = val + '%';
      });

      // Анімація числа індексу
      animateNumber('indexNum', quizState.totalIndex, 1);
    }, 100);
  });
}

/** Анімує число від 0 до target за ~800мс */
function animateNumber(elId, target, decimals) {
  const el    = document.getElementById(elId);
  if (!el) return;
  const start = 0;
  const dur   = 800;
  const t0    = performance.now();

  function step(now) {
    const progress = Math.min(1, (now - t0) / dur);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = start + (target - start) * eased;
    el.textContent = current.toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/** Повернути емодзі для настрою */
function getMoodEmoji(mood) {
  return { happy: '🌟', calm: '🌿', neutral: '✨', stressed: '🔥' }[mood] || '✨';
}

/* ============================================================
   10. ЗАСТОСУВАТИ РЕЗУЛЬТАТ ДО ІНТЕРФЕЙСУ
   ============================================================ */

function applyQuizResult() {
  // Викликаємо існуючу функцію з script.js
  if (typeof setMood === 'function') {
    setMood(quizState.dominantMood);
  }
  closeQuiz();

  // Прокрутити до демо-секції щоб показати ефект
  const demoSection = document.getElementById('demo');
  if (demoSection) {
    setTimeout(() => {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350);
  }
}

/** Перезапустити тест */
function restartQuiz() {
  document.getElementById('quizFooter').style.display = '';
  resetQuizState();
  renderQuestion();
  document.getElementById('quizProgressFill').style.width = '0%';
}

/* ============================================================
   11. ІНІЦІАЛІЗАЦІЯ
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Закрити при кліку на фон
  const overlay = document.getElementById('quizOverlay');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.classList.contains('quiz-overlay-bg')) {
        closeQuiz();
      }
    });
  }

  // Закрити по Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeQuiz();
  });
});