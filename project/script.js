/**
 * MoodFlow — script.js (ВИПРАВЛЕНА ВЕРСІЯ)
 *
 * Виправлено: setMood() тепер оновлює і текстові відсотки
 * у <span> поряд з прогрес-барами в hero-карточці.
 */

/* ============================================================
   1. MOOD DATA
   ============================================================ */

const moods = {
  neutral: {
    class: '',
    emoji: '✨',
    badge: 'Активний режим: Нейтральний',
    text: 'Зверни увагу, як змінились кольори, форми, відступи та загальна атмосфера сторінки. Це допомагає створити максимально комфортне середовище для твого поточного стану.',
    bars: [72, 85, 60, 91],
    score: '8.5',
  },
  happy: {
    class: 'mood-happy',
    emoji: '🌟',
    badge: 'Активний режим: Радісний',
    text: '🎉 Ти в чудовому настрої! Інтерфейс став яскравішим і теплішим — так само як твій стан.',
    bars: [95, 70, 90, 85],
    score: '9.2',
  },
  calm: {
    class: 'mood-calm',
    emoji: '🌿',
    badge: 'Активний режим: Спокійний',
    text: '🌿 Ідеальний стан для роботи. Зелені тони та м\'які форми підтримують твою зосередженість.',
    bars: [60, 95, 50, 88],
    score: '8.8',
  },
  stressed: {
    class: 'mood-stressed',
    emoji: '🔥',
    badge: 'Активний режим: Стресовий',
    text: '😮‍💨 Відчуваєш напругу? Зроби глибокий вдих. Інтерфейс адаптувався під твій стан.',
    bars: [30, 40, 85, 55],
    score: '5.4',
  },
};

let currentMood = 'neutral';

/* ============================================================
   2. APPLY MOOD
   ============================================================ */

function setMood(mood) {
  if (currentMood === mood) return;
  currentMood = mood;

  const data = moods[mood];

  // Класи теми на body
  document.body.classList.remove('mood-happy', 'mood-calm', 'mood-stressed');
  if (data.class) {
    document.body.classList.add(data.class);
  }

  // Активні кнопки
  document.querySelectorAll('[data-mood]').forEach(el => {
    el.classList.toggle('active', el.dataset.mood === mood);
  });

  // Hero emoji і score
  const heroEmoji    = document.getElementById('heroEmoji');
  const moodScoreNum = document.getElementById('moodScoreNum');
  if (heroEmoji)    heroEmoji.textContent    = data.emoji;
  if (moodScoreNum) moodScoreNum.textContent = data.score;

  // Бари: оновлюємо і ширину, і текстовий відсоток
  ['bar1', 'bar2', 'bar3', 'bar4'].forEach((id, i) => {
    const barEl = document.getElementById(id);
    if (!barEl) return;

    const val = data.bars[i];

    // Ширина прогрес-бара
    barEl.style.width = val + '%';

    // Текстовий <span> з відсотком — останній span у рядку .mood-bar-row
    const row      = barEl.closest('.mood-bar-row');
    if (row) {
      const spans    = row.querySelectorAll('span');
      const lastSpan = spans[spans.length - 1];
      if (lastSpan) lastSpan.textContent = val + '%';
    }
  });

  // Demo-секція
  const resultBadge = document.getElementById('resultBadge');
  const resultText  = document.getElementById('resultText');
  if (resultBadge) resultBadge.textContent = data.badge;
  if (resultText)  resultText.textContent  = data.text;
}

/* ============================================================
   3. EVENTS
   ============================================================ */

function initMoodControls() {
  document.querySelectorAll('[data-mood]').forEach(btn => {
    btn.addEventListener('click', () => {
      setMood(btn.dataset.mood);
    });
  });
}

/* ============================================================
   4. SCROLL REVEAL
   ============================================================ */

function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   5. PROGRESS BAR
   ============================================================ */

function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = pct + '%';
  });
}

/* ============================================================
   6. NAV SHADOW
   ============================================================ */

function initNavShadow() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.style.boxShadow =
      window.scrollY > 20
        ? '0 4px 32px rgba(0,0,0,0.08)'
        : 'none';
  });
}

/* ============================================================
   7. INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMoodControls();
  initScrollReveal();
  initProgressBar();
  initNavShadow();

  currentMood = ''; // скидаємо щоб перший виклик setMood('neutral') спрацював
  setMood('neutral');
});