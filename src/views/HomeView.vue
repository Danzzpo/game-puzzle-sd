<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref('');
const isDarkMode = ref(true);
const isMobileMenuOpen = ref(false); // Untuk menu HP

// --- LOGIC: Cek User & Tema ---
onMounted(() => {
  const savedUser = localStorage.getItem('puzzleUser');
  if (savedUser) currentUser.value = savedUser;

  const savedTheme = localStorage.getItem('puzzleTheme');
  if (savedTheme === 'light') {
    isDarkMode.value = false;
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  } else {
    isDarkMode.value = true;
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }
});

const handleLogout = () => {
  localStorage.removeItem('puzzleUser');
  currentUser.value = '';
  window.location.reload();
};

// --- NAVIGASI ---
const goToLogin = () => { router.push('/masuk'); };
const goToRegister = () => { router.push('/daftar'); };

// PENTING: Tombol ini mengarah ke halaman GAME terpisah
const startGame = () => { router.push('/game'); };

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    localStorage.setItem('puzzleTheme', 'dark');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('puzzleTheme', 'light');
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <div class="home-container">

    <nav class="navbar">
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
          <span class="welcome-text desktop-only">Halo, <b>{{ currentUser }}</b></span>
          <button class="btn-logout" @click="handleLogout">Keluar</button>
        </div>

        <div class="separator desktop-only"></div>

        <button class="theme-btn desktop-only" @click="toggleTheme">
          <span>{{ isDarkMode ? '🌙' : '☀️' }}</span>
        </button>

        <button class="mobile-menu-btn mobile-only" @click="toggleMobileMenu">
          <span v-if="!isMobileMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </nav>

    <div v-if="isMobileMenuOpen" class="mobile-dropdown-overlay">
      <div class="mobile-dropdown-content">
        <p class="menu-label">Menu Utama</p>
        <router-link to="/puzzles" class="mobile-item" @click="toggleMobileMenu">🧩 Puzzle</router-link>
        <router-link to="/popular" class="mobile-item" @click="toggleMobileMenu">🔥 Populer</router-link>
        <router-link to="/categories" class="mobile-item" @click="toggleMobileMenu">📂 Kategori</router-link>

        <div class="mobile-divider"></div>

        <div class="mobile-item theme-row" @click="toggleTheme">
          <span>Mode Tampilan</span>
          <div class="theme-switch">{{ isDarkMode ? '🌙 Gelap' : '☀️ Terang' }}</div>
        </div>
      </div>
    </div>

    <main class="main-content">

      <div class="hero-section">
        <div class="hero-text">
          <div class="badge">✨ Game Edukasi Terbaru</div>
          <h1>Belajar Sambil<br><span class="gradient-text">Bermain Puzzle</span></h1>
          <p>Melatih kecerdasan visual anak SD dengan cara yang menyenangkan. Susun gambar, selesaikan tantangan, dan jadilah juara!</p>
          <div class="cta-buttons">
            <button @click="startGame" class="btn-primary">▶ Mulai Main</button>
            <button class="btn-secondary">Lihat Koleksi</button>
          </div>
        </div>
        <div class="hero-image">
           <div class="puzzle-card-preview">
             <img src="https://images.unsplash.com/photo-1587654780291-39c940483719?w=500" alt="Puzzle Preview">
             <button @click="startGame" class="solve-btn">🧩 Mainkan</button>
           </div>
        </div>
      </div>

      <section class="how-it-works">
        <div class="section-header">
          <h2>Cara Bermain</h2>
          <p>Hanya 4 langkah mudah untuk memulai.</p>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-circle purple">1</div>
            <h3>Pilih</h3>
            <p>Pilih gambar favoritmu.</p>
          </div>
          <div class="step-card">
            <div class="step-circle orange">2</div>
            <h3>Level</h3>
            <p>Tentukan tingkat kesulitan.</p>
          </div>
          <div class="step-card">
            <div class="step-circle green">3</div>
            <h3>Susun</h3>
            <p>Geser potongan gambar.</p>
          </div>
          <div class="step-card">
            <div class="step-circle pink">4</div>
            <h3>Menang</h3>
            <p>Selesaikan tantangannya!</p>
          </div>
        </div>
      </section>

      <section class="why-us">
        <div class="section-header"><h2>Fitur Unggulan</h2></div>
        <div class="features-grid">
          <div class="feature-card"><div class="f-icon">🧠</div><h3>Melatih Otak</h3><p>Bagus untuk kecerdasan anak.</p></div>
          <div class="feature-card"><div class="f-icon">☁️</div><h3>Simpan Otomatis</h3><p>Progres tidak akan hilang.</p></div>
          <div class="feature-card"><div class="f-icon">📱</div><h3>Responsif</h3><p>Main di HP atau Laptop lancar.</p></div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
/* CONFIG WARNA */
:global(.dark-theme) {
  --bg-color: #130f1e;
  --nav-bg: #1e1b2e;
  --text-color: #ffffff;
  --text-secondary: #a0a0b0;
  --border-color: #333;
  --card-bg: rgba(255,255,255,0.03);
  --dropdown-bg: #2d2b3b;
}
:global(.light-theme) {
  --bg-color: #f8f9fa;
  --nav-bg: #ffffff;
  --text-color: #1a1a1a;
  --text-secondary: #555555;
  --border-color: #e2e8f0;
  --card-bg: #ffffff;
  --dropdown-bg: #ffffff;
}

.home-container { background-color: var(--bg-color); color: var(--text-color); min-height: 100vh; font-family: 'Poppins', sans-serif; overflow-x: hidden; transition: background-color 0.3s; }

/* NAVBAR */
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 5%; background-color: var(--nav-bg); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 1000; }
.nav-left { display: flex; align-items: center; gap: 10px; font-weight: bold; font-size: 20px; }
.logo-icon { font-size: 28px; }
.highlight { color: #d946ef; }

.nav-center { display: flex; gap: 30px; }
.nav-item { text-decoration: none; color: var(--text-secondary); font-weight: 600; transition: 0.2s; }
.nav-item:hover { color: var(--text-color); }

.nav-right { display: flex; align-items: center; gap: 15px; }
.auth-buttons { display: flex; gap: 10px; }
.btn-login { background: transparent; border: 2px solid #8b5cf6; color: #8b5cf6; padding: 8px 20px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; }
.btn-register { background: #00c853; border: none; color: white; padding: 8px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 14px; }
.btn-logout { background: #ff5252; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; }
.theme-btn { background: transparent; border: none; cursor: pointer; font-size: 22px; }
.separator { width: 1px; height: 30px; background: var(--border-color); }

/* MOBILE MENU (POP UP) */
.mobile-only { display: none; }
.mobile-menu-btn { background: transparent; border: none; font-size: 28px; color: var(--text-color); cursor: pointer; margin-left: 10px; }

.mobile-dropdown-overlay {
  position: fixed; top: 75px; left: 0; width: 100%; height: 100vh;
  background: rgba(0,0,0,0.5); z-index: 999;
}
.mobile-dropdown-content {
  background-color: var(--dropdown-bg);
  border-bottom: 2px solid #8b5cf6;
  padding: 20px;
  display: flex; flex-direction: column; gap: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.menu-label { font-size: 12px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 5px; }
.mobile-item {
  font-size: 16px; font-weight: 600; text-decoration: none; color: var(--text-color);
  padding: 12px; border-radius: 8px; background: var(--card-bg);
  display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color);
}
.mobile-divider { height: 1px; background: var(--border-color); margin: 5px 0; }
.theme-row { justify-content: space-between; cursor: pointer; }
.theme-switch { background: rgba(0,0,0,0.2); padding: 5px 12px; border-radius: 15px; font-size: 13px; }

/* HERO SECTION */
.hero-section { display: flex; align-items: center; justify-content: space-between; padding: 60px 5%; min-height: 80vh; }
.hero-text { max-width: 50%; }
h1 { font-size: 3.5rem; line-height: 1.1; margin: 20px 0; font-weight: 800; color: var(--text-color); }
.gradient-text { background: linear-gradient(to right, #ff7e5f, #feb47b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.badge { background: rgba(255, 126, 95, 0.2); color: #ff7e5f; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; display: inline-block; }
.hero-text p { color: var(--text-secondary); margin-bottom: 20px; font-size: 1.1rem; line-height: 1.6; }
.cta-buttons { display: flex; gap: 15px; }
.btn-primary { background: #ff6d00; color: white; border: none; padding: 14px 35px; border-radius: 10px; font-weight: bold; cursor: pointer; }
.btn-secondary { background: transparent; border: 1px solid #00c853; color: #00c853; padding: 14px 35px; border-radius: 10px; font-weight: 600; cursor: pointer; }
.puzzle-card-preview img { width: 100%; max-width: 500px; border-radius: 15px; }
.solve-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #a3e635; border: none; padding: 12px 30px; border-radius: 12px; font-weight: bold; cursor: pointer; }

/* HOW IT WORKS & FEATURES */
.how-it-works, .why-us { padding: 60px 5%; text-align: center; }
.section-header h2 { font-size: 2.5rem; margin-bottom: 30px; }
.steps-grid, .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.step-card, .feature-card { background: var(--card-bg); padding: 20px; border-radius: 15px; border: 1px solid var(--border-color); text-align: center; }
.step-circle, .f-icon { width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; border-radius: 50%; font-size: 24px; margin: 0 auto 10px; background: #333; color: white; }
.purple { background: #8b5cf6; } .orange { background: #f97316; } .green { background: #10b981; } .pink { background: #ec4899; }
.step-card h3, .feature-card h3 { font-size: 1.2rem; margin-bottom: 10px; color: var(--text-color); }
.step-card p, .feature-card p { font-size: 0.9rem; color: #a5b4fc; }

/* RESPONSIVE MOBILE */
@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block; }

  .navbar { padding: 15px 20px; }

  .hero-section { flex-direction: column-reverse; padding: 40px 20px; text-align: center; justify-content: center; }
  .hero-text { max-width: 100%; margin-top: 30px; }
  .hero-text h1 { font-size: 2.2rem; }
  .puzzle-card-preview img { width: 100%; max-width: 350px; }
  .cta-buttons { justify-content: center; }

  .auth-buttons { gap: 5px; }
  .btn-login, .btn-register { padding: 6px 12px; font-size: 13px; }

  .how-it-works, .why-us { padding: 50px 20px; }
}
</style>
