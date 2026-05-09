/**
 * MoodFlow — quiz.js (ВИПРАВЛЕНА ВЕРСІЯ)
 *
 * Виправлено:
 *  1. Кнопка "Далі" зникає після повторного відкриття тесту
 *  2. Hero-карточка оновлює % і числа після результату тесту
 *  3. % у рядках mood-bar-row оновлюються разом з прогрес-барами
 *  4. Кнопки "Спробувати" / "Спробувати безкоштовно" — scrollToDemo
 */

/* ============================================================
   1. ПИТАННЯ ТА ВІДПОВІДІ
   Щоб додати нове питання — просто додай об'єкт у кінець масиву.
   ============================================================ */

const QUESTIONS = [
  {
    id: 1,
    text: 'Як ти почуваєшся, прокинувшись сьогодні вранці?',
    answers: [
      { emoji: '🌅', text: 'Бадьоро та з ентузіазмом',    scores: { joy: 8, calm: 4, energy: 9, focus: 6, stress: 1 } },
      { emoji: '😴', text: 'Спокійно, але трохи сонно',   scores: { joy: 4, calm: 8, energy: 3, focus: 5, stress: 2 } },
      { emoji: '😐', text: 'Нейтрально, як завжди',        scores: { joy: 4, calm: 5, energy: 4, focus: 5, stress: 3 } },
      { emoji: '😩', text: 'Втомлено та без натхнення',    scores: { joy: 1, calm: 2, energy: 2, focus: 2, stress: 8 } },
    ],
  },
  {
    id: 2,
    text: 'Наскільки добре ти можеш зосередитися прямо зараз?',
    answers: [
      { emoji: '🎯', text: 'Чудово — думки чіткі, концентрація висока', scores: { joy: 5, calm: 6, energy: 6, focus: 10, stress: 1 } },
      { emoji: '🌊', text: 'Непогано, якщо немає відволікань',          scores: { joy: 4, calm: 6, energy: 4, focus: 7,  stress: 3 } },
      { emoji: '🌀', text: 'Складно — думки розсіяні',                  scores: { joy: 2, calm: 3, energy: 3, focus: 3,  stress: 6 } },
      { emoji: '🤯', text: 'Зовсім не можу зосередитись',              scores: { joy: 1, calm: 1, energy: 2, focus: 1,  stress: 9 } },
    ],
  },
  {
    id: 3,
    text: 'Що краще описує твій рівень енергії зараз?',
    answers: [
      { emoji: '⚡',    text: 'Заряджений та готовий до дій',  scores: { joy: 7, calm: 3, energy: 10, focus: 7, stress: 2 } },
      { emoji: '🔋',    text: 'Достатньо енергії для роботи',  scores: { joy: 5, calm: 5, energy: 7,  focus: 6, stress: 3 } },
      { emoji: '🪫',    text: 'Подекуди втомлений',            scores: { joy: 3, calm: 4, energy: 4,  focus: 4, stress: 5 } },
      { emoji: '😮',    text: 'Виснажений, сил майже немає',   scores: { joy: 1, calm: 2, energy: 1,  focus: 2, stress: 9 } },
    ],
  },
  {
    id: 4,
    text: 'Як ти ставишся до завдань, які чекають на тебе сьогодні?',
    answers: [
      { emoji: '🚀', text: 'З радістю та нетерпінням',               scores: { joy: 9, calm: 4, energy: 8, focus: 7, stress: 1 } },
      { emoji: '📋', text: 'Спокійно та методично',                  scores: { joy: 5, calm: 9, energy: 5, focus: 8, stress: 2 } },
      { emoji: '😬', text: 'Трохи тривожно, є багато невизначеного', scores: { joy: 2, calm: 2, energy: 4, focus: 4, stress: 7 } },
      { emoji: '😞', text: 'Пригнічено, не хочеться нічого',         scores: { joy: 1, calm: 1, energy: 1, focus: 1, stress: 9 } },
    ],
  },
  {
    id: 5,
    text: 'Чи є у тебе відчуття радості або задоволення прямо зараз?',
    answers: [
      { emoji: '😄', text: 'Так, я щасливий(-а) і натхненний(-а)',  scores: { joy: 10, calm: 5, energy: 8, focus: 6, stress: 1 } },
      { emoji: '🙂', text: 'Є легке задоволення від спокою',         scores: { joy: 6,  calm: 9, energy: 4, focus: 6, stress: 2 } },
      { emoji: '😶', text: 'Ні особливої радості, ні смутку',        scores: { joy: 3,  calm: 5, energy: 4, focus: 5, stress: 3 } },
      { emoji: '😟', text: 'Скоріше смуток або тривога',             scores: { joy: 1,  calm: 1, energy: 2, focus: 2, stress: 8 } },
    ],
  },
  {
    id: 6,
    text: 'Як твоє тіло почувається фізично?',
    answers: [
      { emoji: '💪', text: 'Легкість, хочеться рухатися',       scores: { joy: 7, calm: 4,  energy: 9, focus: 6, stress: 1 } },
      { emoji: '🧘', text: 'Розслаблене та спокійне',            scores: { joy: 5, calm: 10, energy: 4, focus: 7, stress: 1 } },
      { emoji: '😓', text: 'Трохи напружене або скуте',          scores: { joy: 2, calm: 3,  energy: 3, focus: 3, stress: 7 } },
      { emoji: '🤕', text: 'Болі, важкість або сильна втома',    scores: { joy: 1, calm: 1,  energy: 1, focus: 1, stress: 9 } },
    ],
  },
  {
    id: 7,
    text: 'Як ти реагуєш на несподівані зміни чи перешкоди?',
    answers: [
      { emoji: '😎', text: 'Спокійно адаптуюсь, це не проблема', scores: { joy: 6, calm: 9, energy: 5, focus: 8, stress: 1  } },
      { emoji: '🤔', text: 'Обмірковую і шукаю рішення',          scores: { joy: 5, calm: 6, energy: 5, focus: 9, stress: 3  } },
      { emoji: '😤', text: 'Відчуваю роздратування',              scores: { joy: 2, calm: 2, energy: 6, focus: 3, stress: 7  } },
      { emoji: '😰', text: 'Відчуваю паніку або тривогу',         scores: { joy: 1, calm: 1, energy: 2, focus: 2, stress: 10 } },
    ],
  },
  {
    id: 8,
    text: 'Якби ти міг(-ла) зробити щось зараз, що б це було?',
    answers: [
      { emoji: '🎉',  text: 'Зустрітися з друзями або розважитися', scores: { joy: 10, calm: 4,  energy: 9, focus: 3, stress: 1 } },
      { emoji: '📖',  text: 'Почитати або помедитувати',             scores: { joy: 5,  calm: 10, energy: 3, focus: 7, stress: 1 } },
      { emoji: '💻',  text: 'Зайнятися роботою або навчанням',       scores: { joy: 4,  calm: 5,  energy: 6, focus: 9, stress: 3 } },
      { emoji: '🛏',  text: 'Поспати або просто полежати',           scores: { joy: 2,  calm: 5,  energy: 1, focus: 2, stress: 6 } },
    ],
  },
];

/* ============================================================
   2. МАППІНГ → існуючі ключі moods{} у script.js
   ============================================================ */

const MOOD_MAP = {
  joy:    'happy',
  calm:   'calm',
  energy: 'happy',
  focus:  'neutral',
  stress: 'stressed',
};

const MOOD_DESCRIPTIONS = {
  happy: {
    title: '🌟 Радісний стан',
    desc:  'Ти сповнений(-а) позитивної енергії та натхнення. Відмінний момент для творчості, спілкування та нових починань!',
  },
  calm: {
    title: '🌿 Спокійний стан',
    desc:  'Ти перебуваєш у стані внутрішньої рівноваги та зосередженості. Ідеальний час для вдумливої роботи та відпочинку.',
  },
  neutral: {
    title: '✨ Збалансований стан',
    desc:  'Твій стан стабільний та врівноважений. Ти маєш ресурси і для роботи, і для відпочинку — використовуй цей момент мудро.',
  },
  stressed: {
    title: '🔥 Підвищений стрес',
    desc:  'Ти відчуваєш напругу. Спробуй зробити кілька глибоких вдихів, зробити паузу і розставити пріоритети.',
  },
};

/* ============================================================
   3. СТАН ТЕСТУ
   ============================================================ */

const quizState = {
  currentQuestion: 0,
  selectedAnswer:  null,
  rawScores:   { joy: 0, calm: 0, energy: 0, focus: 0, stress: 0 },
  finalScores: { joy: 0, calm: 0, energy: 0, focus: 0, stress: 0 },
  totalIndex:   0,
  dominantMood: 'neutral',
};

/* ============================================================
   4. СКИДАННЯ СТАНУ
   ============================================================ */

function resetQuizState() {
  quizState.currentQuestion = 0;
  quizState.selectedAnswer  = null;
  quizState.rawScores   = { joy: 0, calm: 0, energy: 0, focus: 0, stress: 0 };
  quizState.finalScores = { joy: 0, calm: 0, energy: 0, focus: 0, stress: 0 };
  quizState.totalIndex  = 0;
  quizState.dominantMood = 'neutral';
}

/* ============================================================
   5. ВІДКРИТИ / ЗАКРИТИ ОВЕРЛЕЙ

   ФІКС #1: openQuiz() завжди показує quizFooter назад,
   щоб кнопка "Далі" була видима після повторного відкриття.
   ============================================================ */

function openQuiz() {
  resetQuizState();

  // ФІКС: завжди повертаємо футер перед рендером
  const footer = document.getElementById('quizFooter');
  if (footer) footer.style.display = '';

  renderQuestion();
  document.getElementById('quizOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuiz() {
  document.getElementById('quizOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

/* ============================================================
   6. РЕНДЕР ПИТАННЯ
   ============================================================ */

function renderQuestion() {
  const q     = QUESTIONS[quizState.currentQuestion];
  const total = QUESTIONS.length;
  const num   = quizState.currentQuestion + 1;

  // Прогрес-бар
  document.getElementById('quizProgressFill').style.width = ((num - 1) / total * 100) + '%';
  document.getElementById('quizProgressNum').textContent  = `${num} / ${total}`;

  // Крапки-індикатори
  document.querySelectorAll('.scale-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i < num);
  });

  // Питання + відповіді
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

  // Скинути вибір і заблокувати кнопку "Далі"
  quizState.selectedAnswer = null;
  updateNextBtn();

  // Текст кнопки: остання відповідь — "Переглянути результат"
  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.innerHTML = num === total
      ? `Переглянути результат
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>`
      : `Далі
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>`;
  }
}

/* ============================================================
   7. ВИБІР ВІДПОВІДІ
   ============================================================ */

function selectAnswer(index) {
  quizState.selectedAnswer = index;
  document.querySelectorAll('.quiz-answer-btn').forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });
  updateNextBtn();
}

function updateNextBtn() {
  const btn = document.getElementById('quizNextBtn');
  if (!btn) return;
  if (quizState.selectedAnswer !== null) {
    btn.classList.add('enabled');
  } else {
    btn.classList.remove('enabled');
  }
}

/* ============================================================
   8. ПЕРЕЙТИ ДО НАСТУПНОГО ПИТАННЯ
   ============================================================ */

function quizNext() {
  if (quizState.selectedAnswer === null) return;

  // Додати бали обраної відповіді до накопичувача
  const scores = QUESTIONS[quizState.currentQuestion].answers[quizState.selectedAnswer].scores;
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
   9. ПІДРАХУНОК РЕЗУЛЬТАТІВ
   ============================================================ */

function calculateResults() {
  const maxPerScale = QUESTIONS.length * 10; // макс. балів на шкалу

  // Нормалізація 0–100
  ['joy', 'calm', 'energy', 'focus', 'stress'].forEach(scale => {
    quizState.finalScores[scale] = Math.round(
      (quizState.rawScores[scale] / maxPerScale) * 100
    );
  });

  const s = quizState.finalScores;

  // Загальний індекс (0–10)
  const rawIndex =
    s.joy    * 0.25 +
    s.calm   * 0.20 +
    s.energy * 0.20 +
    s.focus  * 0.25 -
    s.stress * 0.10;

  quizState.totalIndex = Math.round(
    Math.min(10, Math.max(0, rawIndex / 90 * 10)) * 10
  ) / 10;

  // Домінуючий стан
  if (s.stress >= 65) {
    quizState.dominantMood = 'stressed';
  } else {
    let maxScale = 'joy', maxVal = 0;
    ['joy', 'calm', 'energy', 'focus'].forEach(scale => {
      if (s[scale] > maxVal) { maxVal = s[scale]; maxScale = scale; }
    });
    quizState.dominantMood = MOOD_MAP[maxScale];
  }
}

/* ============================================================
   10. РЕНДЕР РЕЗУЛЬТАТІВ
   ============================================================ */

function renderResults() {
  const moodInfo   = MOOD_DESCRIPTIONS[quizState.dominantMood];
  const s          = quizState.finalScores;
  const scalesList = [
    { key: 'joy',    label: 'Радість', emoji: '😄', cls: 'joy'    },
    { key: 'calm',   label: 'Спокій',  emoji: '😌', cls: 'calm'   },
    { key: 'energy', label: 'Енергія', emoji: '⚡', cls: 'energy' },
    { key: 'focus',  label: 'Фокус',   emoji: '🎯', cls: 'focus'  },
    { key: 'stress', label: 'Стрес',   emoji: '😤', cls: 'stress' },
  ];

  const area = document.getElementById('quizQuestionArea');
  area.innerHTML = `
    <div class="quiz-results" id="quizResultsBlock">

      <div class="quiz-results-header">
        <div class="results-emoji-orb">${getMoodEmoji(quizState.dominantMood)}</div>
        <div class="results-mood-title">${moodInfo.title}</div>
        <p class="results-mood-desc">${moodInfo.desc}</p>
      </div>

      <div class="quiz-scales">
        ${scalesList.map(sc => `
          <div class="quiz-scale-row ${sc.cls}">
            <div class="scale-label">
              <span class="scale-emoji">${sc.emoji}</span>${sc.label}
            </div>
            <div class="scale-track">
              <div class="scale-fill" id="scaleFill_${sc.key}" style="width:0%"></div>
            </div>
            <div class="scale-pct" id="scalePct_${sc.key}">0%</div>
          </div>
        `).join('')}
      </div>

      <div class="quiz-total-index">
        <div class="index-number" id="indexNum">0</div>
        <div class="index-info">
          <div class="index-label">Загальний індекс настрою</div>
          <div class="index-sublabel">
            Розраховано за формулою:<br>
            (радість&times;0.25 + спокій&times;0.2 + енергія&times;0.2 + фокус&times;0.25 &minus; стрес&times;0.1)
          </div>
        </div>
      </div>

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

  // Прогрес 100%
  document.getElementById('quizProgressFill').style.width = '100%';
  document.getElementById('quizProgressNum').textContent  = `${QUESTIONS.length} / ${QUESTIONS.length}`;

  // Заховати футер з кнопкою "Далі"
  document.getElementById('quizFooter').style.display = 'none';

  // Анімоване заповнення шкал після першого frame
  requestAnimationFrame(() => {
    setTimeout(() => {
      scalesList.forEach(sc => {
        const fillEl = document.getElementById(`scaleFill_${sc.key}`);
        const pctEl  = document.getElementById(`scalePct_${sc.key}`);
        if (fillEl) fillEl.style.width = s[sc.key] + '%';
        if (pctEl)  pctEl.textContent  = s[sc.key] + '%';
      });
      animateNumber('indexNum', quizState.totalIndex, 1);
    }, 120);
  });
}

/* ============================================================
   11. АНІМАЦІЯ ЧИСЛА
   ============================================================ */

function animateNumber(elId, target, decimals) {
  const el = document.getElementById(elId);
  if (!el) return;
  const dur = 900, t0 = performance.now();
  function step(now) {
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * e).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function getMoodEmoji(mood) {
  return { happy: '🌟', calm: '🌿', neutral: '✨', stressed: '🔥' }[mood] || '✨';
}

/* ============================================================
   12. ЗАСТОСУВАТИ РЕЗУЛЬТАТ

   ФІКС #2 + #3: після setMood() оновлюємо hero-карточку —
   emoji орбу, загальний індекс, прогрес-бари І текстові % у рядках.
   ============================================================ */

function applyQuizResult() {
  const mood = quizState.dominantMood;

  // ① Застосувати існуючу тему (кольори, стилі) через script.js
  if (typeof setMood === 'function') {
    setMood(mood);
  }

  // ② Оновити hero-карточку реальними даними тесту
  updateHeroCard();

  closeQuiz();

  // ③ Прокрутити до demo-секції щоб показати ефект
  const demo = document.getElementById('demo');
  if (demo) {
    setTimeout(() => demo.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
  }
}

/**
 * ФІКС #2 + #3
 * Оновлює всі елементи hero-карточки реальними результатами тесту:
 *   #heroEmoji      — emoji орбу
 *   #moodScoreNum   — загальний індекс (число)
 *   #bar1..#bar4    — ширина прогрес-барів (width%)
 *   .mood-bar-row   — текстовий % в останньому <span> кожного рядка
 */
function updateHeroCard() {
  const s   = quizState.finalScores;
  const idx = quizState.totalIndex;

  // Emoji орбу
  const heroEmoji = document.getElementById('heroEmoji');
  if (heroEmoji) heroEmoji.textContent = getMoodEmoji(quizState.dominantMood);

  // Загальний індекс
  const scoreEl = document.getElementById('moodScoreNum');
  if (scoreEl) scoreEl.textContent = idx.toFixed(1);

  // Бари: bar1=Радість, bar2=Спокій, bar3=Енергія, bar4=Фокус
  const barMap = [
    { barId: 'bar1', scale: 'joy'    },
    { barId: 'bar2', scale: 'calm'   },
    { barId: 'bar3', scale: 'energy' },
    { barId: 'bar4', scale: 'focus'  },
  ];

  barMap.forEach(({ barId, scale }) => {
    const val   = s[scale];
    const barEl = document.getElementById(barId);
    if (!barEl) return;

    // Оновити ширину бару
    barEl.style.width = val + '%';

    // Знайти батьківський рядок і оновити текстовий відсоток
    const row = barEl.closest('.mood-bar-row');
    if (row) {
      const spans    = row.querySelectorAll('span');
      const lastSpan = spans[spans.length - 1];
      if (lastSpan) lastSpan.textContent = val + '%';
    }
  });
}

/* ============================================================
   13. ПЕРЕЗАПУСТИТИ ТЕСТ

   ФІКС #1 (додатково): restartQuiz теж завжди показує футер.
   ============================================================ */

function restartQuiz() {
  // ФІКС: повертаємо футер з кнопкою "Далі"
  const footer = document.getElementById('quizFooter');
  if (footer) footer.style.display = '';

  resetQuizState();
  renderQuestion();
  document.getElementById('quizProgressFill').style.width = '0%';
}

/* ============================================================
   14. ІНІЦІАЛІЗАЦІЯ

   ФІКС #4: визначаємо глобальну scrollToDemo() щоб кнопки
   "Спробувати" і "Спробувати безкоштовно" з onclick="scrollToDemo()"
   у HTML працювали коректно.
   ============================================================ */

// Глобальна — доступна з onclick у HTML
window.scrollToDemo = function () {
  const demo = document.getElementById('demo');
  if (demo) demo.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

document.addEventListener('DOMContentLoaded', () => {

  // Закрити оверлей кліком на фон
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