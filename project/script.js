/**
 * MoodFlow — script.js (FIXED)
 */

/* ============================================================
   1. MOOD DATA
   ============================================================ */

const moods = {
  neutral: {
    class: '',
    emoji: '✨',
    badge: 'Активний режим: Нейтральний',
    text: 'Зверни увагу, як змінились кольори...',
    bars: [72, 85, 60, 91],
    score: '8.5',
  },
  happy: {
    class: 'mood-happy',
    emoji: '🌟',
    badge: 'Активний режим: Радісний',
    text: '🎉 Ти в чудовому настрої!',
    bars: [95, 70, 90, 85],
    score: '9.2',
  },
  calm: {
    class: 'mood-calm',
    emoji: '🌿',
    badge: 'Активний режим: Спокійний',
    text: "🌿 Ідеальний стан для роботи.",
    bars: [60, 95, 50, 88],
    score: '8.8',
  },
  stressed: {
    class: 'mood-stressed',
    emoji: '🔥',
    badge: 'Активний режим: Стресовий',
    text: '😮‍💨 Відчуваєш напругу?',
    bars: [30, 40, 85, 55],
    score: '5.4',
  },
};

let currentMood = 'neutral';

/* ============================================================
   2. APPLY MOOD (FIXED)
   ============================================================ */

function setMood(mood) {
  if (currentMood === mood) return;
  currentMood = mood;

  const data = moods[mood];

  // 🟢 ВАЖЛИВО: не перезаписуємо всі класи
  document.body.classList.remove(
    'mood-happy',
    'mood-calm',
    'mood-stressed'
  );

  if (data.class) {
    document.body.classList.add(data.class);
  }

  // UI активні кнопки
  document.querySelectorAll('[data-mood]').forEach(el => {
    el.classList.toggle('active', el.dataset.mood === mood);
  });

  // Hero
  const heroEmoji = document.getElementById('heroEmoji');
  const moodScoreNum = document.getElementById('moodScoreNum');

  if (heroEmoji) heroEmoji.textContent = data.emoji;
  if (moodScoreNum) moodScoreNum.textContent = data.score;

  // Bars
  ['bar1', 'bar2', 'bar3', 'bar4'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.style.width = data.bars[i] + '%';
  });

  // Demo
  const resultBadge = document.getElementById('resultBadge');
  const resultText = document.getElementById('resultText');

  if (resultBadge) resultBadge.textContent = data.badge;
  if (resultText) resultText.textContent = data.text;
}

/* ============================================================
   3. EVENTS (ДОДАНО)
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
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
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
  initMoodControls(); // 🔥 нове
  initScrollReveal();
  initProgressBar();
  initNavShadow();

  setMood('neutral'); // початковий стан
});