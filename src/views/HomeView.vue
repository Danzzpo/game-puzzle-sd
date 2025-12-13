<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref('');
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const isDarkMode = ref(true);

// --- LOGIC ---
onMounted(() => {
  const savedUser = localStorage.getItem('puzzleUser');
  if (savedUser) currentUser.value = savedUser;

  const savedTheme = localStorage.getItem('puzzleTheme');
  if (savedTheme === 'light') {
    isDarkMode.value = false;
    document.body.classList.add('light-theme');
  } else {
    isDarkMode.value = true;
    document.body.classList.remove('light-theme');
  }

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const handleLogout = () => {
  localStorage.removeItem('puzzleUser');
  currentUser.value = '';
  window.location.reload();
};

const goToLogin = () => { router.push('/masuk'); };
const goToRegister = () => { router.push('/daftar'); };
const startGame = () => { router.push('/game'); };

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.body.classList.remove('light-theme');
    localStorage.setItem('puzzleTheme', 'dark');
  } else {
    document.body.classList.add('light-theme');
    localStorage.setItem('puzzleTheme', 'light');
  }
};
</script>

<template>
  <div class="home-container">

    <nav class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="nav-container">

        <div class="nav-left">
          <div class="logo-icon">🧩</div>
          <div class="logo-text">Puzzle<span class="highlight">SD</span></div>
        </div>

        <div class="nav-center desktop-only">
          <router-link to="/puzzles" class="nav-item">🧩 Puzzle</router-link>
          <router-link to="/popular" class="nav-item">🔥 Populer</router-link>
          <router-link to="/categories" class="nav-item">📂 Kategori</router-link>
        </div>

        <div class="nav-right">
          <div v-if="!currentUser" class="auth-buttons">
            <button class="btn-login" @click="goToLogin">Masuk</button>
            <button class="btn-register" @click="goToRegister">Daftar</button>
          </div>
          <div v-else class="user-profile">
            <span class="welcome-text desktop-only">Hi, <b>{{ currentUser }}</b></span>
            <button class="btn-logout" @click="handleLogout">Keluar</button>
          </div>

          <div class="nav-divider desktop-only"></div>

          <button class="theme-btn desktop-only" @click="toggleTheme" title="Ganti Mode">
            <span class="theme-icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
          </button>

          <button class="burger-btn mobile-only" @click="toggleMobileMenu">
            <span v-if="!isMobileMenuOpen">☰</span>
            <span v-else>✕</span>
          </button>
        </div>
      </div>
    </nav>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
        <div class="mobile-menu-content">
          <p class="menu-label">Menu Utama</p>
          <router-link to="/puzzles" class="m-link" @click="toggleMobileMenu">
            <span>🧩 Puzzle</span> <span>➔</span>
          </router-link>
          <router-link to="/popular" class="m-link" @click="toggleMobileMenu">
            <span>🔥 Populer</span> <span>➔</span>
          </router-link>
          <router-link to="/categories" class="m-link" @click="toggleMobileMenu">
            <span>📂 Kategori</span> <span>➔</span>
          </router-link>

          <div class="divider"></div>

          <div class="m-link theme-row" @click="toggleTheme">
            <span>Mode Tampilan</span>
            <div class="theme-switch" :class="{ 'light-active': !isDarkMode }">
              <span v-if="isDarkMode">🌙 Gelap</span>
              <span v-else>☀️ Terang</span>
            </div>
          </div>

          <div class="divider"></div>
          <p class="m-footer">PuzzleSD © 2025</p>
        </div>
      </div>
    </transition>

    <main>

      <section id="hero" class="hero-section">
        <div class="bg-pattern"></div>
        <div class="hero-content">
          <div class="hero-text-left">
            <div class="badge">🚀 Game Edukasi No. #1</div>
            <h1>Main Puzzle <span class="text-gradient">Tanpa Batas</span></h1>
            <p>Melatih kecerdasan visual, fokus, dan kesabaran dengan cara yang seru.<br>Gratis untuk semua siswa SD di Indonesia!</p>
            <div class="hero-btns-left">
              <button @click="startGame" class="btn-hero-primary">▶ Mulai Sekarang</button>
              <button class="btn-hero-secondary">Lihat Koleksi</button>
            </div>
          </div>
          <div class="hero-empty-space"></div>
        </div>
      </section>

      <section id="how-to" class="steps-section">
        <div class="section-header">
          <h2>Cara Bermain</h2>
          <p>Hanya 4 langkah mudah untuk menjadi juara.</p>
        </div>
        <div class="steps-grid">
          <div class="step-card purple-glow">
            <div class="circle-num purple-bg">1</div>
            <h3>Pilih Gambar</h3>
            <p>Pilih gambar hewan atau pemandangan favoritmu.</p>
          </div>
          <div class="step-card orange-glow">
            <div class="circle-num orange-bg">2</div>
            <h3>Pilih Level</h3>
            <p>Tentukan kesulitan dari 3x3 hingga 5x5.</p>
          </div>
          <div class="step-card teal-glow">
            <div class="circle-num teal-bg">3</div>
            <h3>Susun Puzzle</h3>
            <p>Geser atau ketuk kotak untuk menyusun gambar.</p>
          </div>
          <div class="step-card pink-glow">
            <div class="circle-num pink-bg">4</div>
            <h3>Menang!</h3>
            <p>Selesaikan secepat mungkin dan raih skor tinggi.</p>
          </div>
        </div>
      </section>

      <section id="features" class="features-section">
        <div class="section-header">
          <h2>Fitur Unggulan</h2>
          <p>Kenapa harus main di PuzzleSD?</p>
        </div>
        <div class="features-wrapper">
          <div class="feature-box">
            <span class="f-emoji">🧠</span>
            <h3>Asah Otak</h3>
            <p>Meningkatkan daya ingat dan kemampuan memecahkan masalah.</p>
          </div>
          <div class="feature-box">
            <span class="f-emoji">📱</span>
            <h3>Responsif</h3>
            <p>Nyaman dimainkan di HP, Tablet, maupun Laptop.</p>
          </div>
          <div class="feature-box">
            <span class="f-emoji">⚡</span>
            <h3>Ringan</h3>
            <p>Game loading cepat dan hemat kuota internet.</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

/* --- COLORS & VARS --- */
:global(body) {
  --bg-color: #1a0b2e;
  --text-color: #ffffff;
  --nav-bg-scrolled: rgba(26, 11, 46, 0.7);
  --card-bg: #1e1136;
  --text-sec: #d1d5db;
  --border-color: rgba(255,255,255,0.1);
}
:global(body.light-theme) {
  --bg-color: #f3f4f6;
  --text-color: #1f2937;
  --nav-bg-scrolled: rgba(255, 255, 255, 0.75);
  --card-bg: #ffffff; /* Kartu jadi Putih di Light Mode */
  --text-sec: #4b5563;
  --border-color: rgba(0,0,0,0.1);
}

.home-container {
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  transition: background-color 0.3s, color 0.3s;
}

/* NAVBAR */
.navbar { position: fixed; top: 0; left: 0; right: 0; height: 90px; z-index: 1000; transition: all 0.3s ease; background: transparent; }
.navbar.scrolled {
  background: var(--nav-bg-scrolled);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-bottom: 1px solid rgba(255,255,255,0.05);
  height: 80px;
}
.nav-container { max-width: 1280px; margin: 0 auto; height: 100%; padding: 0 30px; display: flex; justify-content: space-between; align-items: center; }
.nav-left { display: flex; align-items: center; gap: 10px; font-size: 26px; font-weight: 800; }
.logo-icon { font-size: 32px; } .highlight { color: #d946ef; }

.nav-center { display: flex; gap: 35px; }
.nav-item { color: var(--text-sec); text-decoration: none; font-weight: 600; font-size: 1.05rem; transition: color 0.3s; position: relative; }
.nav-item:hover { color: var(--text-color); }
.nav-item::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -5px; left: 0; background: #d946ef; transition: width 0.3s; }
.nav-item:hover::after { width: 100%; }

.nav-right { display: flex; align-items: center; gap: 30px; }
.auth-buttons { display: flex; gap: 15px; align-items: center; }
.user-profile { display: flex; align-items: center; gap: 20px; }
.welcome-text { font-size: 1rem; color: var(--text-color); }

.btn-login { background: transparent; border: 2px solid #6b21a8; color: #d8b4fe; padding: 10px 28px; border-radius: 50px; cursor: pointer; font-weight: 700; transition: 0.3s; font-size: 1rem; white-space: nowrap; }
:global(body.light-theme) .btn-login { border-color: #d946ef; color: #d946ef; }
.btn-login:hover { background: #6b21a8; color: white; }
.btn-register { background: #00c853; border: none; color: white; padding: 12px 28px; border-radius: 50px; cursor: pointer; font-weight: 700; font-size: 1rem; box-shadow: 0 4px 15px rgba(0, 200, 83, 0.4); transition: transform 0.2s; white-space: nowrap; }
.btn-register:hover { transform: translateY(-2px); background: #00e676; }
.btn-logout { background: #ff5252; color: white; border: none; padding: 10px 24px; border-radius: 20px; cursor: pointer; font-size: 14px; font-weight: bold; transition: transform 0.2s; }
.btn-logout:hover { transform: translateY(-2px); }
.nav-divider { width: 1px; height: 30px; background-color: var(--border-color); }

.theme-btn { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-color); border-radius: 12px; cursor: pointer; transition: 0.3s; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
:global(body.light-theme) .theme-btn { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); }
.theme-btn:hover { background: rgba(255,255,255,0.15); transform: scale(1.05); }
.theme-icon { font-size: 20px; }

/* MOBILE MENU */
.mobile-only { display: none; }
.burger-btn { background: transparent; border: none; color: var(--text-color); font-size: 32px; cursor: pointer; padding: 5px; }
.mobile-menu-overlay { position: fixed; top: 70px; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 999; display: flex; justify-content: flex-end; }
.mobile-menu-content { background: var(--bg-color); width: 100%; height: auto; padding: 20px; border-bottom: 2px solid #d946ef; display: flex; flex-direction: column; gap: 10px; animation: slideDown 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.menu-label { font-size: 12px; text-transform: uppercase; color: var(--text-sec); margin-bottom: 5px; font-weight: bold; }
.m-link { color: var(--text-color); text-decoration: none; font-size: 18px; font-weight: 600; padding: 12px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
.m-footer { text-align: center; color: var(--text-sec); font-size: 12px; margin-top: 20px; }
.theme-row { cursor: pointer; }
.theme-switch { background: rgba(128,128,128,0.2); padding: 5px 12px; border-radius: 15px; font-size: 14px; }
.theme-switch.light-active { background: #d946ef; color: white; }
@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

/* HERO */
.hero-section { position: relative; padding-top: 180px; padding-bottom: 120px; padding-left: 5%; padding-right: 5%; display: flex; align-items: center; justify-content: flex-start; min-height: 80vh; }
.bg-pattern { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(var(--text-sec) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.1; pointer-events: none; }
.hero-text-left { max-width: 800px; z-index: 2; text-align: left; }
.badge { background: linear-gradient(90deg, #7c3aed, #db2777); padding: 8px 18px; border-radius: 20px; font-size: 13px; font-weight: bold; display: inline-block; margin-bottom: 25px; color: white; }
h1 { font-size: 4.5rem; line-height: 1.1; font-weight: 800; margin-bottom: 25px; }
.text-gradient { background: linear-gradient(to right, #d946ef, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-text-left p { font-size: 1.4rem; color: var(--text-sec); margin-bottom: 40px; line-height: 1.6; }
.hero-btns-left { display: flex; gap: 20px; justify-content: flex-start; }
.btn-hero-primary { background: linear-gradient(90deg, #d946ef, #9333ea); color: white; border: none; padding: 18px 50px; border-radius: 14px; font-size: 1.2rem; font-weight: bold; cursor: pointer; box-shadow: 0 10px 30px rgba(217, 70, 239, 0.4); transition: transform 0.3s; }
.btn-hero-primary:hover { transform: translateY(-5px); }
.btn-hero-secondary { background: transparent; border: 2px solid var(--text-sec); color: var(--text-color); padding: 18px 50px; border-radius: 14px; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: 0.3s; }
.btn-hero-secondary:hover { border-color: var(--text-color); background: rgba(255,255,255,0.1); }

/* STEPS & FEATURES */
.steps-section {
  padding: 100px 5%; text-align: center;
  background: linear-gradient(180deg, #240b36 0%, #4a148c 100%);
  color: white;
}
:global(body.light-theme) .steps-section {
  background: linear-gradient(180deg, #6d28d9 0%, #4c1d95 100%);
}

.features-section { padding: 100px 5%; text-align: center; }

/* FIX FONT CARA BERMAIN - AGAR TETAP TERBACA DI LIGHT & DARK */
.steps-section .section-header h2 { font-size: 3rem; margin-bottom: 15px; color: #ffffff !important; }
.steps-section .section-header p { color: #e9d5ff !important; margin-bottom: 60px; font-size: 1.2rem; }

.features-section .section-header h2 { font-size: 3rem; margin-bottom: 15px; }
.features-section .section-header p { color: var(--text-sec); margin-bottom: 60px; font-size: 1.2rem; }

.steps-grid, .features-wrapper { display: flex; flex-wrap: wrap; gap: 30px; justify-content: center; }
.step-card, .feature-box { background: var(--card-bg); padding: 40px 30px; border-radius: 24px; border: 1px solid var(--border-color); width: 280px; transition: transform 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.step-card:hover { transform: translateY(-10px); }
.circle-num { width: 60px; height: 60px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; border-radius: 50%; box-shadow: 0 0 20px rgba(0,0,0,0.5); color: white; }
.purple-bg { background: #8b5cf6; } .orange-bg { background: #f97316; } .teal-bg { background: #14b8a6; } .pink-bg { background: #ec4899; }

/* FIX TEKS DALAM CARD AGAR MENGIKUTI TEMA */
/* Di Dark Mode: var(--text-color) = Putih. Di Light Mode: var(--text-color) = Hitam. */
.step-card h3 { margin-bottom: 10px; font-size: 1.3rem; color: var(--text-color); }
.step-card p { font-size: 1rem; color: var(--text-sec); }

.feature-box h3 { margin-bottom: 10px; font-size: 1.3rem; }
.feature-box p { font-size: 1rem; color: var(--text-sec); }

.f-emoji { font-size: 45px; display: block; margin-bottom: 15px; }

/* RESPONSIVE MOBILE */
@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block; }
  .navbar { height: 75px; } .navbar.scrolled { height: 65px; } .nav-container { padding: 0 15px; }
  .nav-left { gap: 5px; font-size: 18px; } .logo-icon { font-size: 24px; }
  .nav-right { gap: 8px; } .auth-buttons { gap: 5px; }
  .btn-login, .btn-register { font-size: 11px; padding: 6px 12px; height: auto; }
  .hero-section { padding-top: 130px; text-align: center; justify-content: center; }
  .hero-text-left { width: 100%; text-align: center; }
  h1 { font-size: 2.8rem; }
  .hero-btns-left { flex-direction: column; width: 100%; gap: 15px; }
  .btn-hero-primary, .btn-hero-secondary { width: 100%; padding: 15px; font-size: 1rem; }
}
</style>
