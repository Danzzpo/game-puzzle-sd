<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref('');
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false); // Untuk efek navbar saat di-scroll

// --- LOGIC ---
onMounted(() => {
  const savedUser = localStorage.getItem('puzzleUser');
  if (savedUser) currentUser.value = savedUser;

  // Deteksi Scroll untuk efek Navbar Transparan -> Solid
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
          <a href="#hero" class="nav-item">Beranda</a>
          <a href="#how-to" class="nav-item">Cara Main</a>
          <a href="#features" class="nav-item">Fitur</a>
          <router-link to="/popular" class="nav-item">Populer</router-link>
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
          <a href="#hero" class="m-link" @click="toggleMobileMenu">🏠 Beranda</a>
          <a href="#how-to" class="m-link" @click="toggleMobileMenu">🎮 Cara Bermain</a>
          <a href="#features" class="m-link" @click="toggleMobileMenu">✨ Fitur Unggulan</a>
          <router-link to="/popular" class="m-link" @click="toggleMobileMenu">🔥 Populer</router-link>
          <div class="divider"></div>
          <p class="m-footer">PuzzleSD © 2025</p>
        </div>
      </div>
    </transition>

    <main>

      <section id="hero" class="hero-section">
        <div class="bg-pattern"></div>

        <div class="hero-content">
          <div class="hero-text">
            <div class="badge">🚀 Game Edukasi No. #1</div>
            <h1>Main Puzzle <span class="text-gradient">Tanpa Batas</span></h1>
            <p>Melatih kecerdasan visual, fokus, dan kesabaran dengan cara yang seru. Gratis untuk semua!</p>

            <div class="hero-btns">
              <button @click="startGame" class="btn-hero-primary">▶ Mulai Sekarang</button>
              <button class="btn-hero-secondary">Lihat Koleksi</button>
            </div>
          </div>

          <div class="hero-visual">
             <div class="card-3d">
               <img src="https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=600&h=400&fit=crop" alt="Game Preview">
               <div class="floating-badge">🧩 Seru Banget!</div>
             </div>
          </div>
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
/* --- 1. GLOBAL VARIABLES & RESET --- */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

.home-container {
  /* Warna Background Ungu Gelap (Sesuai Referensi) */
  background-color: #1a0b2e;
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
}

/* --- 2. NAVBAR (STICKY) --- */
.navbar {
  position: fixed; /* KUNCI AGAR STICKY */
  top: 0; left: 0; right: 0;
  height: 80px;
  z-index: 1000;
  transition: all 0.3s ease;
  background: transparent; /* Awal transparan */
}

/* Saat di-scroll, navbar jadi solid */
.navbar.scrolled {
  background: rgba(26, 11, 46, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  height: 70px; /* Sedikit mengecil */
}

.nav-container {
  max-width: 1200px; margin: 0 auto;
  height: 100%; padding: 0 20px;
  display: flex; justify-content: space-between; align-items: center;
}

.nav-left { display: flex; align-items: center; gap: 8px; font-size: 24px; font-weight: 800; }
.highlight { color: #d946ef; }

.nav-center { display: flex; gap: 30px; }
.nav-item { color: #ccc; text-decoration: none; font-weight: 600; transition: color 0.3s; position: relative; }
.nav-item:hover { color: #fff; }
.nav-item::after {
  content: ''; position: absolute; width: 0; height: 2px; bottom: -5px; left: 0;
  background: #d946ef; transition: width 0.3s;
}
.nav-item:hover::after { width: 100%; }

.nav-right { display: flex; align-items: center; gap: 15px; }

/* Buttons Navbar */
.btn-login {
  background: transparent; border: 2px solid #6b21a8; color: #d8b4fe;
  padding: 8px 24px; border-radius: 50px; cursor: pointer; font-weight: 700; transition: 0.3s;
}
.btn-login:hover { background: #6b21a8; color: white; }

.btn-register {
  background: #00c853; border: none; color: white;
  padding: 10px 24px; border-radius: 50px; cursor: pointer; font-weight: 700;
  box-shadow: 0 4px 15px rgba(0, 200, 83, 0.4); transition: transform 0.2s;
}
.btn-register:hover { transform: translateY(-2px); background: #00e676; }

.btn-logout { background: #ff5252; color: white; border: none; padding: 5px 15px; border-radius: 20px; cursor: pointer; font-size: 12px; }

/* --- 3. MOBILE MENU --- */
.mobile-only { display: none; }
.burger-btn { background: transparent; border: none; color: white; font-size: 28px; cursor: pointer; }

.mobile-menu-overlay {
  position: fixed; top: 70px; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8); z-index: 999;
  display: flex; justify-content: flex-end;
}
.mobile-menu-content {
  background: #2d1b4e; width: 100%; height: auto;
  padding: 20px; border-bottom: 2px solid #d946ef;
  display: flex; flex-direction: column; gap: 15px;
  animation: slideDown 0.3s ease;
}
.m-link { color: white; text-decoration: none; font-size: 18px; font-weight: 600; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.m-footer { text-align: center; color: #888; font-size: 12px; margin-top: 20px; }

@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

/* --- 4. HERO SECTION --- */
.hero-section {
  position: relative;
  padding-top: 120px; /* Memberi ruang untuk navbar sticky */
  padding-bottom: 80px;
  padding-left: 5%; padding-right: 5%;
  display: flex; align-items: center; justify-content: space-between;
  min-height: 85vh;
}

/* Background Pattern (Ala Puzzle) */
.bg-pattern {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 40px 40px; opacity: 0.05; pointer-events: none;
}

.hero-text { max-width: 50%; z-index: 2; }
.badge {
  background: linear-gradient(90deg, #7c3aed, #db2777);
  padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;
  display: inline-block; margin-bottom: 20px; letter-spacing: 1px;
}
h1 { font-size: 3.8rem; line-height: 1.1; font-weight: 800; margin-bottom: 20px; }
.text-gradient {
  background: linear-gradient(to right, #d946ef, #fbbf24);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-text p { font-size: 1.2rem; color: #d1d5db; margin-bottom: 30px; line-height: 1.6; }

.hero-btns { display: flex; gap: 15px; }
.btn-hero-primary {
  background: linear-gradient(90deg, #d946ef, #9333ea);
  color: white; border: none; padding: 15px 40px; border-radius: 12px;
  font-size: 18px; font-weight: bold; cursor: pointer;
  box-shadow: 0 10px 30px rgba(217, 70, 239, 0.4); transition: transform 0.3s;
}
.btn-hero-primary:hover { transform: translateY(-5px); }

.btn-hero-secondary {
  background: transparent; border: 2px solid #4b5563; color: white;
  padding: 15px 40px; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer;
  transition: 0.3s;
}
.btn-hero-secondary:hover { border-color: white; background: rgba(255,255,255,0.1); }

.hero-visual { position: relative; z-index: 2; }
.card-3d img {
  width: 450px; border-radius: 20px;
  box-shadow: 20px 20px 0px rgba(107, 33, 168, 0.5); /* Efek bayangan solid */
  transform: rotate(-3deg); transition: transform 0.5s;
}
.card-3d:hover img { transform: rotate(0deg) scale(1.02); }
.floating-badge {
  position: absolute; bottom: -20px; right: -20px;
  background: #fbbf24; color: #000; padding: 10px 20px;
  border-radius: 10px; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  animation: float 3s infinite ease-in-out;
}
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

/* --- 5. STEPS SECTION --- */
.steps-section { padding: 80px 5%; background: #130823; text-align: center; }
.section-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
.section-header p { color: #a5b4fc; margin-bottom: 50px; }

.steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px; }
.step-card {
  background: #1e1136; padding: 30px; border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s;
}
.step-card:hover { transform: translateY(-10px); }

.circle-num {
  width: 60px; height: 60px; margin: 0 auto 20px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: bold; border-radius: 50%;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}
.purple-bg { background: #8b5cf6; box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
.orange-bg { background: #f97316; box-shadow: 0 0 20px rgba(249, 115, 22, 0.4); }
.teal-bg { background: #14b8a6; box-shadow: 0 0 20px rgba(20, 184, 166, 0.4); }
.pink-bg { background: #ec4899; box-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }

.step-card h3 { margin-bottom: 10px; font-size: 1.2rem; }
.step-card p { font-size: 0.9rem; color: #ccc; }

/* --- 6. FEATURES SECTION --- */
.features-section { padding: 80px 5%; background: #1a0b2e; text-align: center; }
.features-wrapper { display: flex; flex-wrap: wrap; gap: 30px; justify-content: center; }
.feature-box {
  background: linear-gradient(145deg, #251640, #1e1136);
  padding: 30px; border-radius: 16px; width: 300px;
  border: 1px solid rgba(255,255,255,0.05);
}
.f-emoji { font-size: 40px; display: block; margin-bottom: 15px; }

/* --- RESPONSIVE MOBILE --- */
@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block; }

  .navbar { height: 70px; }
  .navbar.scrolled { height: 60px; }

  .hero-section {
    flex-direction: column-reverse;
    text-align: center;
    padding-top: 100px;
    gap: 40px;
  }
  .hero-text { max-width: 100%; }
  h1 { font-size: 2.5rem; }
  .card-3d img { width: 100%; max-width: 350px; }

  .hero-btns { justify-content: center; flex-direction: column; }

  .auth-buttons .btn-register { padding: 8px 16px; font-size: 12px; }
}
</style>
