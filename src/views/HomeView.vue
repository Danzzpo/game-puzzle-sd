<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// Ikon Phosphor
import {
  PhPuzzlePiece, PhList, PhX, PhGameController,
  PhStar, PhFolder, PhSun, PhMoon, PhSignIn, PhUserCircle,
  PhRocketLaunch, PhBrain, PhDeviceMobile, PhLightning, PhCaretRight
} from '@phosphor-icons/vue';

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

    <div class="blobs-container">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <nav class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="nav-container">

        <div class="nav-left">
          <div class="logo-wrapper">
            <PhPuzzlePiece :size="32" weight="duotone" color="#d946ef" class="logo-icon-spin" />
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
            <PhUserCircle :size="32" weight="duotone" color="#d946ef" />
            <span class="welcome-text desktop-only">Hi, <b>{{ currentUser }}</b></span>
            <button class="btn-logout" @click="handleLogout">Keluar</button>
          </div>

          <div class="nav-divider desktop-only"></div>

          <button class="theme-btn desktop-only" @click="toggleTheme" title="Ganti Mode">
            <PhMoon v-if="isDarkMode" :size="22" weight="fill" />
            <PhSun v-else :size="22" weight="fill" />
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
          <router-link to="/categories" class="m-link" @click="toggleMobileMenu">
            <div class="m-left"><PhFolder :size="24" /> <span>Kategori</span></div>
            <PhCaretRight :size="16" />
          </router-link>

          <div class="divider"></div>

          <div class="m-link theme-row" @click="toggleTheme">
            <div class="m-left">
              <PhMoon v-if="isDarkMode" :size="24" />
              <PhSun v-else :size="24" />
              <span>Mode Tampilan</span>
            </div>
            <div class="theme-switch" :class="{ 'light-active': !isDarkMode }">
              <span v-if="isDarkMode">Gelap</span>
              <span v-else>Terang</span>
            </div>
          </div>

          <div class="divider"></div>
          <p class="m-footer">PuzzleSD © 2025</p>
        </div>
      </div>
    </transition>

    <main>

      <section id="hero" class="hero-section">
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
                <PhGameController :size="24" weight="fill" />
                <span>Mulai Sekarang</span>
              </button>
              <button class="btn-hero-secondary">Lihat Koleksi</button>
            </div>
          </div>
          <div class="hero-spacer"></div>
        </div>
      </section>

      <section id="how-to" class="steps-section">
        <div class="section-header center-header"> <h2>Cara Bermain</h2>
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

      <section id="features" class="features-section">
        <div class="section-header center-header"> <h2>Fitur Unggulan</h2>
          <p>Kenapa harus main di PuzzleSD?</p>
        </div>
        <div class="features-wrapper">
          <div class="feature-box">
            <div class="icon-wrap"><PhBrain :size="54" weight="duotone" color="#d946ef" /></div>
            <h3>Asah Otak</h3>
            <p>Meningkatkan daya ingat & fokus.</p>
          </div>
          <div class="feature-box">
            <div class="icon-wrap"><PhDeviceMobile :size="54" weight="duotone" color="#00c853" /></div>
            <h3>Responsif</h3>
            <p>Main di HP, Tablet, Laptop lancar.</p>
          </div>
          <div class="feature-box">
            <div class="icon-wrap"><PhLightning :size="54" weight="duotone" color="#ffb74d" /></div>
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

/* --- COLORS & VARS --- */
:global(body) {
  --bg-color: #0f0518;
  --text-color: #ffffff;
  --nav-bg-scrolled: rgba(15, 5, 24, 0.8);
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-border: rgba(255, 255, 255, 0.1);
  --text-sec: #d1d5db;
  --border-color: rgba(255,255,255,0.1);
  --btn-theme-bg: rgba(255,255,255,0.1);
  --btn-theme-border: rgba(255,255,255,0.2);
  --btn-theme-icon: #fff;
  --mobile-menu-bg: #1a0b2e;

  /* DARK MODE: Background Ungu Gelap, Teks Putih */
  --steps-bg: linear-gradient(180deg, rgba(36, 11, 54, 0.95) 0%, rgba(74, 20, 140, 0.95) 100%);
  --steps-title: #ffffff;
  --steps-desc: #e9d5ff;
}

:global(body.light-theme) {
  --bg-color: #f0fdfa;
  --text-color: #1f2937;
  --nav-bg-scrolled: rgba(255, 255, 255, 0.8);
  --card-bg: #ffffff;
  --card-border: rgba(0, 0, 0, 0.05);
  --text-sec: #4b5563;
  --border-color: rgba(0,0,0,0.1);
  --btn-theme-bg: rgba(0,0,0,0.05);
  --btn-theme-border: rgba(0,0,0,0.1);
  --btn-theme-icon: #333;
  --mobile-menu-bg: #ffffff;

  /* LIGHT MODE: Background Lavender, Teks Gelap */
  --steps-bg: linear-gradient(180deg, #f3e8ff 0%, #d8b4fe 100%);
  --steps-title: #4c1d95; /* Ungu Gelap */
  --steps-desc: #6b21a8; /* Ungu Sedang */
}

.home-container {
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  transition: background-color 0.3s, color 0.3s;
  position: relative;
}

/* --- BACKGROUND BLOBS --- */
.blobs-container {
  position: absolute; top: 0; left: 0; width: 100%; height: 100vh;
  overflow: hidden; pointer-events: none; z-index: 0;
}
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.4;
  animation: floatBlob 10s infinite alternate ease-in-out;
}
.blob-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: #7c3aed; }
.blob-2 { bottom: 10%; right: -10%; width: 400px; height: 400px; background: #db2777; animation-delay: -5s; }
.blob-3 { top: 40%; left: 40%; width: 300px; height: 300px; background: #00c853; opacity: 0.2; animation-duration: 15s; }

@keyframes floatBlob {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

/* --- NAVBAR --- */
.navbar { position: fixed; top: 0; left: 0; right: 0; height: 90px; z-index: 1000; transition: all 0.3s ease; background: transparent; }
.navbar.scrolled {
  background: var(--nav-bg-scrolled);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border-bottom: 1px solid var(--border-color);
  height: 80px;
}
.nav-container { max-width: 1280px; margin: 0 auto; height: 100%; padding: 0 30px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2; }

.nav-left { display: flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 800; }
.logo-icon-spin:hover { animation: spin 1s ease-in-out; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.highlight { color: #d946ef; }

.nav-center { display: flex; gap: 35px; }
.nav-item {
  color: var(--text-sec); text-decoration: none; font-weight: 600; font-size: 1rem;
  transition: all 0.3s; position: relative; display: flex; align-items: center; gap: 8px;
}
.nav-item:hover { color: var(--text-color); transform: translateY(-2px); }

.nav-right { display: flex; align-items: center; gap: 30px; }
.auth-buttons { display: flex; gap: 15px; align-items: center; }
.user-profile { display: flex; align-items: center; gap: 15px; }

.btn-login {
  background: transparent; border: 2px solid #a855f7; color: #d8b4fe;
  padding: 8px 24px; border-radius: 50px; cursor: pointer; font-weight: 700; transition: 0.3s;
  display: flex; align-items: center; gap: 8px;
}
:global(body.light-theme) .btn-login { border-color: #d946ef; color: #d946ef; }
.btn-login:hover { background: #a855f7; color: white; transform: scale(1.05); }

.btn-register {
  background: #10b981; border: none; color: white;
  padding: 10px 28px; border-radius: 50px; cursor: pointer; font-weight: 700;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); transition: all 0.3s;
}
.btn-register:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(16, 185, 129, 0.6); }

.btn-logout { background: #ef4444; color: white; border: none; padding: 8px 20px; border-radius: 20px; cursor: pointer; font-weight: bold; transition: 0.3s; }
.btn-logout:hover { background: #dc2626; }

.nav-divider { width: 1px; height: 30px; background-color: var(--border-color); }
.theme-btn {
  background: var(--btn-theme-bg); border: 1px solid var(--btn-theme-border);
  color: var(--btn-theme-icon); border-radius: 12px; cursor: pointer; transition: 0.3s;
  width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
}
.theme-btn:hover { background: rgba(255,255,255,0.2); transform: rotate(15deg); }

/* --- HERO SECTION --- */
.hero-section {
  position: relative; padding-top: 180px; padding-bottom: 120px;
  padding-left: 5%; padding-right: 5%;
  display: flex; align-items: center; min-height: 85vh; z-index: 1;
}
.animate-enter { animation: fadeInUp 1s ease-out forwards; opacity: 0; transform: translateY(30px); }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

.hero-text-left { max-width: 700px; z-index: 2; text-align: left; }
.badge {
  background: rgba(217, 70, 239, 0.15); color: #d946ef; border: 1px solid rgba(217, 70, 239, 0.3);
  padding: 8px 20px; border-radius: 50px; font-size: 14px; font-weight: bold;
  display: inline-flex; align-items: center; gap: 8px; margin-bottom: 25px;
  backdrop-filter: blur(5px);
}
h1 { font-size: 4.5rem; line-height: 1.1; font-weight: 800; margin-bottom: 25px; letter-spacing: -1px; }
.text-gradient {
  background: linear-gradient(120deg, #d946ef, #fbbf24);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-text-left p { font-size: 1.3rem; color: var(--text-sec); margin-bottom: 40px; line-height: 1.6; }

.hero-btns-left { display: flex; gap: 20px; justify-content: flex-start; }
.btn-hero-primary {
  background: linear-gradient(135deg, #9333ea, #d946ef); color: white;
  border: none; padding: 16px 40px; border-radius: 16px; font-size: 1.1rem; font-weight: bold;
  cursor: pointer; box-shadow: 0 10px 30px rgba(217, 70, 239, 0.4); transition: all 0.3s;
  display: flex; align-items: center; gap: 10px;
}
.btn-hero-primary:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 20px 40px rgba(217, 70, 239, 0.5); }

.btn-hero-secondary {
  background: transparent; border: 2px solid var(--text-sec); color: var(--text-color);
  padding: 16px 40px; border-radius: 16px; font-size: 1.1rem; font-weight: bold;
  cursor: pointer; transition: 0.3s;
}
.btn-hero-secondary:hover { border-color: var(--text-color); background: rgba(255,255,255,0.05); }

/* --- STEPS & FEATURES --- */
.steps-section {
  padding: 100px 5%; position: relative; z-index: 1;
  background: var(--steps-bg);
  backdrop-filter: blur(10px);
  margin-top: 50px;
  border-radius: 40px 40px 0 0;
  box-shadow: 0 -10px 50px rgba(0,0,0,0.3);
}

/* Class Center Header yang baru */
.center-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.section-header h2 { font-size: 3rem; margin-bottom: 15px; }
.steps-section .section-header h2 { color: var(--steps-title) !important; }

.section-header p { color: var(--text-sec); margin-bottom: 60px; font-size: 1.2rem; }
.steps-section .section-header p { color: var(--steps-desc) !important; }

.steps-grid, .features-wrapper { display: flex; flex-wrap: wrap; gap: 30px; justify-content: center; }

/* CARD DESIGN */
.step-card, .feature-box {
  background: var(--card-bg);
  padding: 40px 30px; border-radius: 24px;
  border: 1px solid var(--card-border);
  width: 280px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative; overflow: hidden;
}
.step-card:hover, .feature-box:hover {
  transform: translateY(-15px) scale(1.03);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  border-color: #d946ef;
}

.step-icon, .icon-wrap {
  width: 70px; height: 70px; margin: 0 auto 20px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  transition: transform 0.3s;
}
.step-card:hover .step-icon, .feature-box:hover .icon-wrap { transform: rotate(10deg) scale(1.1); }

.purple-bg { background: linear-gradient(135deg, #a855f7, #d946ef); color: white; }
.orange-bg { background: linear-gradient(135deg, #f97316, #fbbf24); color: white; }
.teal-bg { background: linear-gradient(135deg, #14b8a6, #2dd4bf); color: white; }
.pink-bg { background: linear-gradient(135deg, #ec4899, #f43f5e); color: white; }

/* WARNA JUDUL & TEKS DALAM CARD */
.step-card h3 {
  margin-bottom: 10px; font-size: 1.4rem;
  color: var(--steps-title); /* Ikut variable tema */
}
.step-card p {
  font-size: 1rem;
  color: var(--steps-desc); /* Ikut variable tema */
}

/* Warna Teks Fitur */
.features-section { padding: 100px 5%; z-index: 1; position: relative; }
.feature-box h3 { margin-bottom: 10px; font-size: 1.4rem; font-weight: 700; color: var(--text-color); }
.feature-box p { font-size: 1rem; color: var(--text-sec); }

/* --- MOBILE MENU --- */
.mobile-only { display: none !important; }
.burger-btn { background: transparent; border: none; color: var(--text-color); cursor: pointer; padding: 5px; }
.mobile-menu-overlay { position: fixed; top: 70px; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); z-index: 999; display: flex; justify-content: flex-end; }
.mobile-menu-content { background: var(--mobile-menu-bg); width: 100%; height: auto; padding: 25px; border-bottom: 2px solid #d946ef; display: flex; flex-direction: column; gap: 15px; animation: slideDown 0.4s ease; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.m-link {
  color: var(--text-color); text-decoration: none; font-size: 16px; font-weight: 600;
  padding: 15px; border-radius: 12px; background: var(--card-bg); border: 1px solid var(--border-color);
  display: flex; justify-content: space-between; align-items: center;
}
.m-link:active { transform: scale(0.98); }

/* --- RESPONSIVE MOBILE --- */
@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: flex !important; }
  .navbar { height: 75px; } .navbar.scrolled { height: 65px; } .nav-container { padding: 0 20px; }

  .nav-left { font-size: 20px; }
  .logo-wrapper svg { width: 28px; height: 28px; }

  .nav-right { gap: 10px; }
  .auth-buttons { gap: 8px; }

  .btn-login, .btn-register { font-size: 12px; padding: 8px 16px; height: auto; }

  .hero-section { padding-top: 130px; text-align: center; justify-content: center; }
  .hero-text-left { width: 100%; text-align: center; }
  h1 { font-size: 3rem; }
  .hero-btns-left { flex-direction: column; width: 100%; gap: 15px; }
  .btn-hero-primary, .btn-hero-secondary { width: 100%; justify-content: center; }

  .steps-section { border-radius: 30px 30px 0 0; }
  .step-card, .feature-box { width: 100%; max-width: 350px; }
}
</style>
