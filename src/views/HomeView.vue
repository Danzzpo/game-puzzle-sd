<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref('');
const isDarkMode = ref(true);
const isMobileMenuOpen = ref(false); // State untuk menu HP

// --- LOGIC ---
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

const goToLogin = () => { router.push('/masuk'); };
const goToRegister = () => { router.push('/daftar'); };
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
        <a href="#" class="nav-item">📚 Koleksi</a>
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
          <span v-if="isDarkMode">🌙</span><span v-else>☀️</span>
        </button>

        <button class="mobile-menu-btn mobile-only" @click="toggleMobileMenu">
          <span v-if="!isMobileMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </nav>

    <div v-if="isMobileMenuOpen" class="mobile-dropdown">
      <router-link to="/puzzles" class="mobile-item" @click="toggleMobileMenu">🧩 Puzzle</router-link>
      <router-link to="/popular" class="mobile-item" @click="toggleMobileMenu">🔥 Populer</router-link>
      <router-link to="/categories" class="mobile-item" @click="toggleMobileMenu">📂 Kategori</router-link>
      <div class="mobile-item theme-row" @click="toggleTheme">
        <span>Mode {{ isDarkMode ? 'Gelap' : 'Terang' }}</span>
        <span>{{ isDarkMode ? '🌙' : '☀️' }}</span>
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
          <h2 style="color: white;">Cara Bermain</h2>
          <p style="color: #d8b4fe;">Hanya 4 langkah mudah untuk memulai puzzle pertamamu</p>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-circle purple">1</div>
            <h3>Pilih Gambar</h3>
            <p>Pilih gambar dari galeri kami atau gunakan AI.</p>
          </div>
          <div class="step-card">
            <div class="step-circle orange">2</div>
            <h3>Atur Kesulitan</h3>
            <p>Pilih jumlah kepingan puzzle (3x3 hingga 5x5).</p>
          </div>
          <div class="step-card">
            <div class="step-circle green">3</div>
            <h3>Mulai Menyusun</h3>
            <p>Nikmati permainan dengan fitur simpan otomatis.</p>
          </div>
          <div class="step-card">
            <div class="step-circle pink">4</div>
            <h3>Bagikan</h3>
            <p>Bagikan hasil karyamu dan tantang temanmu.</p>
          </div>
        </div>
      </section>

      <section class="why-us">
        <div class="section-header">
          <h2>Mengapa PuzzleSD?</h2>
          <p>Platform modern untuk pecinta puzzle</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-box purple-glow"><span class="f-icon">🧠</span></div>
            <div class="feature-text">
              <h3>AI Image Generation</h3>
              <p>Buat puzzle unik dari ide apapun menggunakan kecerdasan buatan.</p>
            </div>
          </div>
          <div class="feature-card">
            <div class="feature-icon-box orange-glow"><span class="f-icon">☁️</span></div>
            <div class="feature-text">
              <h3>Cloud Sync</h3>
              <p>Progresmu tersimpan otomatis dan sinkron di semua perangkat.</p>
            </div>
          </div>
          <div class="feature-card">
            <div class="feature-icon-box teal-glow"><span class="f-icon">📱</span></div>
            <div class="feature-text">
              <h3>Main di Mana Saja</h3>
              <p>Desain responsif membuatmu bisa main di laptop, tablet, atau HP.</p>
            </div>
          </div>
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
  --shadow-color: rgba(0,0,0,0.2);
}
:global(.light-theme) {
  --bg-color: #f8f9fa;
  --nav-bg: #ffffff;
  --text-color: #1a1a1a;
  --text-secondary: #555555;
  --border-color: #e2e8f0;
  --card-bg: #ffffff;
  --shadow-color: rgba(0,0,0,0.05);
}

.home-container { background-color: var(--bg-color); color: var(--text-color); min-height: 100vh; font-family: 'Poppins', sans-serif; transition: background-color 0.3s ease, color 0.3s ease; overflow-x: hidden; }

/* NAVBAR */
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 5%; background-color: var(--nav-bg); border-bottom: 1px solid var(--border-color); position: relative; z-index: 100; }
.nav-left { display: flex; align-items: center; gap: 10px; }
.logo-icon { font-size: 32px; }
.logo-text { font-size: 26px; font-weight: 800; color: var(--text-color); }
.highlight { color: #d946ef; }

.nav-center { display: flex; gap: 30px; }
.nav-item { text-decoration: none; color: var(--text-secondary); font-weight: 600; font-size: 16px; display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
.nav-item:hover { color: var(--text-color); }

.nav-right { display: flex; align-items: center; gap: 15px; }
.auth-buttons { display: flex; gap: 10px; }
.btn-login { background: transparent; border: 2px solid #8b5cf6; color: #8b5cf6; padding: 8px 20px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; }
.btn-register { background: #00c853; border: none; color: white; padding: 8px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 14px; }
.btn-logout { background: #ff5252; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; }

.separator { width: 1px; height: 30px; background: var(--border-color); }
.theme-btn { background: transparent; border: none; cursor: pointer; padding: 5px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 24px;}

/* MOBILE MENU */
.mobile-only { display: none; }
.mobile-menu-btn { background: transparent; border: none; font-size: 24px; color: var(--text-color); cursor: pointer; }
.mobile-dropdown {
  position: absolute; top: 100%; left: 0; right: 0; background: var(--nav-bg); border-bottom: 1px solid var(--border-color);
  display: flex; flex-direction: column; padding: 10px; z-index: 99; box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.mobile-item { padding: 15px; text-decoration: none; color: var(--text-color); font-weight: bold; border-bottom: 1px solid var(--border-color); }
.theme-row { display: flex; justify-content: space-between; cursor: pointer; }

/* HERO SECTION */
.hero-section { display: flex; align-items: center; justify-content: space-between; padding: 60px 5%; min-height: 80vh; }
.hero-text { max-width: 50%; }
h1 { font-size: 3.5rem; line-height: 1.1; margin: 20px 0; font-weight: 800; color: var(--text-color); }
.gradient-text { background: linear-gradient(to right, #ff7e5f, #feb47b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.badge { background: rgba(255, 126, 95, 0.2); color: #ff7e5f; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; display: inline-block; }
.hero-text p { color: var(--text-secondary); margin-bottom: 20px; font-size: 1.1rem; line-height: 1.6; }

.cta-buttons { display: flex; gap: 15px; }
.btn-primary { background: linear-gradient(90deg, #ff8a65, #ff5722); border: none; padding: 14px 35px; border-radius: 10px; color: white; font-weight: bold; cursor: pointer; }
.btn-secondary { background: transparent; border: 1px solid #00c853; color: #00c853; padding: 14px 35px; border-radius: 10px; font-weight: 600; cursor: pointer; }

.puzzle-card-preview { position: relative; padding: 10px; background: var(--card-bg); border-radius: 20px; border: 1px solid var(--border-color); box-shadow: 0 10px 30px var(--shadow-color); }
.puzzle-card-preview img { width: 100%; max-width: 500px; border-radius: 15px; }
.solve-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(90deg, #a3e635, #4ade80); border: none; padding: 12px 30px; border-radius: 12px; color: #1a1a1a; font-weight: 800; cursor: pointer; }

/* HOW IT WORKS */
.how-it-works { background-color: #2e026d; background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM22.485 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828z' fill='%234c1d95' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"); padding: 80px 5%; text-align: center; }
.section-header h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; }
.section-header p { font-size: 1.1rem; margin-bottom: 50px; }
.steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; }
.step-card { background: rgba(46, 16, 101, 0.8); border: 1px solid rgba(139, 92, 246, 0.3); padding: 30px 20px; border-radius: 20px; display: flex; flex-direction: column; align-items: center; transition: transform 0.3s; backdrop-filter: blur(10px); }
.step-card:hover { transform: translateY(-10px); }
.step-circle { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; color: white; margin-bottom: 15px; }
.purple { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
.orange { background: linear-gradient(135deg, #f97316, #ea580c); }
.green { background: linear-gradient(135deg, #10b981, #059669); }
.pink { background: linear-gradient(135deg, #ec4899, #db2777); }
.step-card h3 { font-size: 1.2rem; margin-bottom: 10px; color: white; }
.step-card p { font-size: 0.9rem; color: #a5b4fc; }

/* WHY PUZZLESD */
.why-us { padding: 80px 5%; text-align: center; }
.why-us .section-header h2 { color: var(--text-color); }
.why-us .section-header p { color: var(--text-secondary); }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto; }
.feature-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 30px; text-align: left; display: flex; gap: 20px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 6px var(--shadow-color); }
.feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px var(--shadow-color); }
.feature-icon-box { min-width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.purple-glow { background: rgba(139, 92, 246, 0.2); color: #a78bfa; }
.orange-glow { background: rgba(249, 115, 22, 0.2); color: #fb923c; }
.teal-glow { background: rgba(20, 184, 166, 0.2); color: #2dd4bf; }
.feature-text h3 { font-size: 1.2rem; margin: 0 0 8px 0; font-weight: 700; color: var(--text-color); }
.feature-text p { font-size: 0.95rem; color: var(--text-secondary); margin: 0; line-height: 1.5; }

/* --- RESPONSIVE MEDIA QUERIES --- */
@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block; }

  .navbar { padding: 15px 20px; }

  .hero-section { flex-direction: column-reverse; padding: 40px 20px; text-align: center; justify-content: center; }
  .hero-text { max-width: 100%; margin-top: 30px; }
  .hero-text h1 { font-size: 2.2rem; }
  .puzzle-card-preview img { width: 100%; max-width: 350px; }
  .cta-buttons { justify-content: center; }

  .auth-buttons { gap: 5px; margin-right: 10px; }
  .btn-login, .btn-register { padding: 6px 12px; font-size: 12px; }

  .how-it-works, .why-us { padding: 50px 20px; }
}
</style>
