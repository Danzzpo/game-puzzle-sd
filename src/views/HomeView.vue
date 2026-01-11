<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// Phosphor Icons
import {
  PhPuzzlePiece, PhList, PhX, PhGameController,
  PhStar, PhFolder, PhSun, PhMoon, PhSignIn, PhUserCircle,
  PhRocketLaunch, PhBrain, PhDeviceMobile, PhLightning, PhCaretRight
} from '@phosphor-icons/vue';

const router = useRouter();
const currentUser = ref('');
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const isDarkMode = ref(true); // Default Dark

// --- LOGIC ---
onMounted(() => {
  const savedUser = localStorage.getItem('puzzleUser');
  if (savedUser) currentUser.value = savedUser;

  const savedTheme = localStorage.getItem('puzzleTheme');
  // Set initial state based on storage
  if (savedTheme === 'light') {
    isDarkMode.value = false;
  } else {
    isDarkMode.value = true;
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

// --- THEME SWITCHING (LOCAL CONTROL) ---
// Kita mengubah state isDarkMode yang langsung mengontrol class CSS di template
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('puzzleTheme', isDarkMode.value ? 'dark' : 'light');
};
</script>

<template>
  <div class="home-container" :class="{ 'light-mode': !isDarkMode }">

    <div class="blobs-container">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <nav class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="nav-container">

        <div class="nav-left">
          <div class="logo-wrapper">
            <PhPuzzlePiece :size="32" weight="duotone" class="logo-icon" />
          </div>
          <div class="logo-text">Puzzle<span class="highlight">SD</span></div>
        </div>

        <div class="nav-center desktop-only">
          <router-link to="/puzzles" class="nav-item">
            <PhGameController :size="20" weight="bold" /> Puzzle
          </router-link>
          <router-link to="/popular" class="nav-item">
            <PhStar :size="20" weight="bold" /> Populer
          </router-link>
          <router-link to="/categories" class="nav-item">
            <PhFolder :size="20" weight="bold" /> Kategori
          </router-link>
        </div>

        <div class="nav-right">
          <div v-if="!currentUser" class="auth-buttons">
            <button class="btn-login" @click="goToLogin">
              <PhSignIn :size="18" weight="bold" /> Masuk
            </button>
            <button class="btn-register" @click="goToRegister">Daftar</button>
          </div>
          <div v-else class="user-profile">
            <PhUserCircle :size="32" weight="duotone" class="user-icon" />
            <span class="welcome-text desktop-only">Hi, <b>{{ currentUser }}</b></span>
            <button class="btn-logout" @click="handleLogout">Keluar</button>
          </div>

          <div class="nav-divider desktop-only"></div>

          <button class="theme-btn desktop-only" @click="toggleTheme" :title="isDarkMode ? 'Ganti ke Terang' : 'Ganti ke Gelap'">
            <PhSun v-if="!isDarkMode" :size="22" weight="fill" />
            <PhMoon v-else :size="22" weight="fill" />
          </button>

          <button class="burger-btn mobile-only" @click="toggleMobileMenu">
            <PhList v-if="!isMobileMenuOpen" :size="32" />
            <PhX v-else :size="32" />
          </button>
        </div>
      </div>
    </nav>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
        <div class="mobile-menu-content">
          <p class="menu-label">Menu Utama</p>
          <router-link to="/puzzles" class="m-link" @click="toggleMobileMenu">
            <div class="m-left"><PhGameController :size="24" /> <span>Puzzle</span></div>
            <PhCaretRight :size="16" />
          </router-link>
          <router-link to="/popular" class="m-link" @click="toggleMobileMenu">
            <div class="m-left"><PhStar :size="24" /> <span>Populer</span></div>
            <PhCaretRight :size="16" />
          </router-link>

          <div class="divider"></div>

          <div class="m-link theme-row" @click="toggleTheme">
            <div class="m-left">
              <PhSun v-if="!isDarkMode" :size="24" />
              <PhMoon v-else :size="24" />
              <span>Mode Tampilan</span>
            </div>
            <div class="theme-switch">
              <span v-if="isDarkMode">Gelap</span>
              <span v-else>Terang</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <main>

      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-text-left animate-enter">
            <div class="badge">
              <PhRocketLaunch :size="18" weight="fill" />
              <span>Game Edukasi No. #1</span>
            </div>
            <h1>
              Main Puzzle <br>
              <span class="text-gradient">Tanpa Batas</span>
            </h1>
            <p>Melatih kecerdasan visual, fokus, dan kesabaran dengan cara yang seru. Gratis untuk semua siswa SD!</p>

            <div class="hero-btns-left">
              <button @click="startGame" class="btn-hero-primary">
                <PhGameController :size="24" weight="fill" /> <span>Mulai Sekarang</span>
              </button>
              <button class="btn-hero-secondary">Lihat Koleksi</button>
            </div>
          </div>
        </div>
      </section>

      <section class="steps-section">
        <div class="section-header center-header">
          <h2>Cara Bermain</h2>
          <p>Langkah mudah menjadi juara.</p>
        </div>
        <div class="steps-grid">
          <div class="step-card delay-1">
            <div class="step-icon purple-bg"><PhGameController :size="32" weight="duotone"/></div>
            <h3>1. Pilih</h3>
            <p>Pilih gambar favoritmu.</p>
          </div>
          <div class="step-card delay-2">
            <div class="step-icon orange-bg"><PhList :size="32" weight="duotone"/></div>
            <h3>2. Level</h3>
            <p>Tentukan tingkat kesulitan.</p>
          </div>
          <div class="step-card delay-3">
            <div class="step-icon teal-bg"><PhPuzzlePiece :size="32" weight="duotone"/></div>
            <h3>3. Susun</h3>
            <p>Geser kotak hingga rapi.</p>
          </div>
          <div class="step-card delay-4">
            <div class="step-icon pink-bg"><PhStar :size="32" weight="duotone"/></div>
            <h3>4. Menang</h3>
            <p>Raih skor tertinggi!</p>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="section-header center-header">
          <h2>Fitur Unggulan</h2>
          <p>Kenapa harus main di PuzzleSD?</p>
        </div>
        <div class="features-wrapper">
          <div class="feature-box">
            <div class="icon-wrap"><PhBrain :size="54" weight="duotone" class="feat-icon" /></div>
            <h3>Asah Otak</h3>
            <p>Meningkatkan daya ingat & fokus.</p>
          </div>
          <div class="feature-box">
            <div class="icon-wrap"><PhDeviceMobile :size="54" weight="duotone" class="feat-icon" /></div>
            <h3>Responsif</h3>
            <p>Main di HP, Tablet, Laptop lancar.</p>
          </div>
          <div class="feature-box">
            <div class="icon-wrap"><PhLightning :size="54" weight="duotone" class="feat-icon" /></div>
            <h3>Ringan</h3>
            <p>Loading cepat & hemat kuota.</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

/* =========================================
   1. COLOR DEFINITION (LOCAL SCOPE)
   ========================================= */

/* A. DEFAULT (DARK MODE) */
.home-container {
  /* Variabel didefinisikan DI SINI, bukan di :root global */
  --bg-color: #0f0518;
  --text-main: #ffffff;
  --text-muted: #d1d5db;

  --nav-bg: rgba(15, 5, 24, 0.9);
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-border: rgba(255, 255, 255, 0.1);
  --card-shadow: 0 4px 15px rgba(0,0,0,0.2);

  --accent: #d946ef;
  --btn-bg: rgba(255,255,255,0.1);
  --btn-border: rgba(255,255,255,0.2);
  --btn-text: #fff;

  --section-gradient: linear-gradient(180deg, rgba(36, 11, 54, 0.95) 0%, rgba(74, 20, 140, 0.95) 100%);
  --mobile-bg: #1a0b2e;
  --blob-opacity: 0.4;

  /* Gradient Teks Default (Kuning/Ungu) */
  --grad-start: #d946ef;
  --grad-end: #fbbf24;

  /* Terapkan langsung ke container */
  background-color: var(--bg-color);
  color: var(--text-main);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
}

/* B. LIGHT MODE (AKTIF JIKA ADA CLASS .light-mode) */
.home-container.light-mode {
  --bg-color: #ffffff !important;
  --text-main: #111827 !important; /* Hitam Pekat - PASTI GELAP */
  --text-muted: #4b5563 !important; /* Abu Gelap */

  --nav-bg: rgba(255, 255, 255, 0.95) !important;

  --card-bg: #f8fafc !important;
  --card-border: #cbd5e1 !important; /* Border Abu Jelas */
  --card-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;

  --accent: #7c3aed !important;
  --btn-bg: #f1f5f9 !important;
  --btn-border: #cbd5e1 !important;
  --btn-text: #1f293b !important;

  --section-gradient: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%) !important;
  --mobile-bg: #ffffff !important;
  --blob-opacity: 0.15 !important;

  /* Gradient Teks Light Mode (Ungu ke Oranye Tua - Agar terlihat di putih) */
  --grad-start: #7c3aed;
  --grad-end: #ea580c;
}

/* Memaksa elemen teks menggunakan variabel */
h1, h2, h3, h4, h5, h6 {
  color: var(--text-main) !important;
  transition: color 0.3s ease;
}
p, span, div {
  color: var(--text-main); /* Default fallback */
}
p {
  color: var(--text-muted) !important;
}

/* =========================================
   2. STYLES
   ========================================= */

/* BLOBS */
.blobs-container {
  position: absolute; top: 0; left: 0; width: 100%; height: 100vh;
  overflow: hidden; pointer-events: none; z-index: 0;
}
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: var(--blob-opacity);
  animation: floatBlob 10s infinite alternate ease-in-out;
}
.blob-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: #7c3aed; }
.blob-2 { bottom: 10%; right: -10%; width: 400px; height: 400px; background: #db2777; }
.blob-3 { top: 40%; left: 40%; width: 300px; height: 300px; background: #00c853; opacity: 0.2; }

@keyframes floatBlob {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

/* NAVBAR */
.navbar { position: fixed; top: 0; left: 0; right: 0; height: 80px; z-index: 1000; transition: background-color 0.3s; }
.navbar.scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border-bottom: 1px solid var(--card-border);
}
.nav-container { max-width: 1280px; margin: 0 auto; height: 100%; padding: 0 30px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2; }

.nav-left { display: flex; align-items: center; gap: 10px; font-size: 24px; font-weight: 800; color: var(--text-main); }
.logo-icon { color: var(--accent); }
.highlight { color: var(--accent); }

.nav-center { display: flex; gap: 35px; }
.nav-item {
  color: var(--text-muted) !important; /* Paksa pakai muted */
  text-decoration: none; font-weight: 600;
  display: flex; align-items: center; gap: 8px; transition: 0.3s;
}
.nav-item:hover { color: var(--text-main) !important; transform: translateY(-2px); }
.nav-item.router-link-active { color: var(--accent) !important; }

.nav-right { display: flex; align-items: center; gap: 20px; }
.auth-buttons { display: flex; gap: 10px; }
.user-profile { display: flex; align-items: center; gap: 10px; color: var(--text-main); }
.user-icon { color: var(--accent); }

/* Buttons */
.btn-login {
  background: transparent; border: 2px solid var(--accent); color: var(--accent);
  padding: 8px 20px; border-radius: 50px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s;
}
.btn-login:hover { background: var(--accent); color: white; }

.btn-register {
  background: #10b981; border: none; color: white;
  padding: 10px 24px; border-radius: 50px; font-weight: 700; cursor: pointer; transition: 0.3s;
}
.btn-register:hover { transform: translateY(-2px); }

.theme-btn {
  background: var(--btn-bg); border: 1px solid var(--btn-border); color: var(--text-main);
  width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: 0.3s;
}
.theme-btn:hover { background: var(--accent); color: white; border-color: var(--accent); }

.btn-logout { background: #ef4444; color: white; border: none; padding: 6px 15px; border-radius: 20px; font-weight: bold; cursor: pointer; }

/* HERO */
.hero-section { padding: 160px 5% 100px; display: flex; align-items: center; min-height: 80vh; position: relative; z-index: 1; }
.hero-text-left { max-width: 700px; }

.badge {
  background: rgba(217, 70, 239, 0.1); color: var(--accent);
  border: 1px solid var(--accent); padding: 6px 16px; border-radius: 50px;
  font-size: 14px; font-weight: bold; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px;
}
h1 { font-size: 4rem; line-height: 1.1; font-weight: 800; margin-bottom: 20px; color: var(--text-main); }

/* GRADIENT TEXT FIX */
.text-gradient {
  background: linear-gradient(120deg, var(--grad-start), var(--grad-end));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero-text-left p { font-size: 1.3rem; color: var(--text-muted); margin-bottom: 30px; line-height: 1.6; }

.hero-btns-left { display: flex; gap: 15px; }
.btn-hero-primary {
  background: var(--accent); color: white; border: none; padding: 14px 30px;
  border-radius: 12px; font-size: 1rem; font-weight: bold; cursor: pointer;
  display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.btn-hero-secondary {
  background: transparent;
  border: 2px solid var(--text-muted);
  color: var(--text-main) !important; /* Paksa warna text main */
  padding: 14px 30px; border-radius: 12px; font-size: 1rem; font-weight: bold; cursor: pointer;
}

/* SECTIONS (CARDS) */
.steps-section {
  padding: 100px 5%; position: relative; z-index: 1;
  background: var(--section-gradient);
  border-radius: 40px 40px 0 0; margin-top: 50px;
}
.center-header { text-align: center; margin-bottom: 50px; }
.section-header h2 { font-size: 2.5rem; margin-bottom: 10px; color: var(--text-main); }
.section-header p { color: var(--text-muted); font-size: 1.1rem; }

.steps-grid, .features-wrapper { display: flex; flex-wrap: wrap; gap: 25px; justify-content: center; }

.step-card, .feature-box {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  padding: 30px; border-radius: 20px; width: 280px; text-align: center;
  transition: transform 0.3s, border-color 0.3s;
}
.step-card:hover, .feature-box:hover { transform: translateY(-10px); border-color: var(--accent); }

.step-icon, .icon-wrap {
  width: 60px; height: 60px; margin: 0 auto 20px; border-radius: 15px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}
.purple-bg { background: #a855f7; color: white; }
.orange-bg { background: #f97316; color: white; }
.teal-bg { background: #14b8a6; color: white; }
.pink-bg { background: #ec4899; color: white; }

.step-card h3, .feature-box h3 { font-size: 1.3rem; margin-bottom: 10px; color: var(--text-main); }
.step-card p, .feature-box p { font-size: 0.95rem; color: var(--text-muted) !important; }

.features-section { padding: 80px 5%; }
.feature-box .feat-icon { color: var(--accent); }

/* --- MOBILE --- */
.mobile-only { display: none !important; }
.burger-btn { background: transparent; border: none; color: var(--text-main); padding: 5px; cursor: pointer; }

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: flex !important; }
  .nav-left { font-size: 20px; }
  .navbar { height: 70px; }
  .nav-right { gap: 10px; }

  .btn-login, .btn-register { padding: 6px 14px; font-size: 12px; }

  .hero-section { padding-top: 120px; text-align: center; flex-direction: column; }
  h1 { font-size: 2.8rem; }
  .hero-btns-left { justify-content: center; flex-direction: column; width: 100%; }
  .btn-hero-primary, .btn-hero-secondary { width: 100%; justify-content: center; }

  .step-card, .feature-box { width: 100%; }

  .mobile-menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999; display: flex; justify-content: flex-end; }
  .mobile-menu-content {
    background: var(--mobile-bg);
    width: 80%; padding: 20px; height: 100%;
    display: flex; flex-direction: column; gap: 15px;
    border-left: 1px solid var(--card-border);
  }
  .m-link {
    color: var(--text-main); text-decoration: none;
    padding: 15px; border-radius: 10px; background: var(--card-bg);
    border: 1px solid var(--card-border);
    display: flex; justify-content: space-between; font-weight: 600;
  }
  .theme-switch { font-size: 14px; color: var(--text-muted); }
}
</style>
