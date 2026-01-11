<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
// Import VueUse untuk Dark Mode Otomatis
import { useDark, useToggle } from '@vueuse/core';

// Icons
import {
  PhPuzzlePiece, PhList, PhX, PhGameController,
  PhStar, PhFolder, PhSun, PhMoon, PhSignIn, PhUserCircle,
  PhRocketLaunch, PhBrain, PhDeviceMobile, PhLightning, PhCaretRight
} from '@phosphor-icons/vue';

const router = useRouter();
const currentUser = ref('');
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

// --- LOGIKA DARK MODE (MAGIC DENGAN VUEUSE) ---
// useDark otomatis cek localStorage & preferensi sistem
const isDark = useDark();
const toggleDark = useToggle(isDark);

onMounted(() => {
  const savedUser = localStorage.getItem('puzzleUser');
  if (savedUser) currentUser.value = savedUser;
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => { isScrolled.value = window.scrollY > 20; };
const handleLogout = () => { localStorage.removeItem('puzzleUser'); window.location.reload(); };
const goTo = (path) => { router.push(path); isMobileMenuOpen.value = false; };
</script>

<template>
  <div class="home-container">

    <div class="blobs-container">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
      <div class="blob b3"></div>
    </div>

    <nav class="navbar" :class="{ 'scrolled': isScrolled }">
      <div class="nav-content">
        <div class="nav-left" @click="goTo('/')">
          <PhPuzzlePiece :size="32" weight="duotone" class="logo-icon" />
          <span class="logo-text">Puzzle<span class="highlight">SD</span></span>
        </div>

        <div class="nav-center desktop-only">
          <a @click="goTo('/puzzles')" class="nav-link"><PhGameController size="20"/> Puzzle</a>
          <a @click="goTo('/popular')" class="nav-link"><PhStar size="20"/> Populer</a>
          <a @click="goTo('/categories')" class="nav-link"><PhFolder size="20"/> Kategori</a>
        </div>

        <div class="nav-right">
          <div v-if="!currentUser" class="auth-btns desktop-only">
            <button class="btn-login" @click="goTo('/masuk')">Masuk</button>
            <button class="btn-register" @click="goTo('/daftar')">Daftar</button>
          </div>
          <div v-else class="user-profile desktop-only">
            <PhUserCircle size="28" weight="duotone" class="icon-user"/>
            <span class="user-name">Hai, <b>{{ currentUser }}</b></span>
            <button class="btn-logout" @click="handleLogout" title="Keluar"><PhSignIn size="20" weight="bold"/></button>
          </div>

          <div class="divider desktop-only"></div>

          <button class="theme-btn" @click="toggleDark()" :title="isDark ? 'Ganti ke Terang' : 'Ganti ke Gelap'">
            <PhSun v-if="!isDark" size="22" weight="fill" />
            <PhMoon v-else size="22" weight="fill" />
          </button>

          <button class="burger-btn mobile-only" @click="isMobileMenuOpen = !isMobileMenuOpen">
            <PhList v-if="!isMobileMenuOpen" size="28" />
            <PhX v-else size="28" />
          </button>
        </div>
      </div>
    </nav>

    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="mobile-content">
          <div v-if="currentUser" class="m-user">
            <PhUserCircle size="32"/> Halo, {{ currentUser }}
          </div>

          <div class="m-links">
            <a @click="goTo('/puzzles')" class="m-item"><span>Puzzle</span> <PhCaretRight/></a>
            <a @click="goTo('/popular')" class="m-item"><span>Populer</span> <PhCaretRight/></a>
            <a @click="goTo('/categories')" class="m-item"><span>Kategori</span> <PhCaretRight/></a>
          </div>

          <div class="m-divider"></div>

          <div v-if="!currentUser" class="m-auth">
            <button class="btn-login full" @click="goTo('/masuk')">Masuk</button>
            <button class="btn-register full" @click="goTo('/daftar')">Daftar</button>
          </div>
          <div v-else>
            <button class="btn-logout full" @click="handleLogout">Keluar</button>
          </div>
        </div>
      </div>
    </transition>

    <main>
      <section class="hero">
        <div class="hero-content">
          <div class="pill"><PhRocketLaunch weight="fill" /> Game Edukasi No. #1</div>

          <h1>Main Puzzle <br><span class="text-gradient">Tanpa Batas</span></h1>

          <p>Latih kecerdasan visual dan fokus dengan cara yang seru. Gratis untuk semua siswa SD!</p>

          <div class="hero-actions">
            <button class="btn-primary" @click="goTo('/game')"><PhGameController size="24" weight="fill"/> Main Sekarang</button>
            <button class="btn-secondary" @click="goTo('/puzzles')">Lihat Koleksi</button>
          </div>
        </div>
      </section>

      <section class="section-steps">
        <div class="section-header">
          <h2>Cara Bermain</h2>
          <p>Langkah mudah menjadi juara.</p>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-icon purple-bg"><PhGameController size="32" weight="duotone"/></div>
            <h3>1. Pilih</h3>
            <p>Pilih gambar favoritmu.</p>
          </div>
          <div class="step-card">
            <div class="step-icon orange-bg"><PhList size="32" weight="duotone"/></div>
            <h3>2. Level</h3>
            <p>Tentukan tingkat kesulitan.</p>
          </div>
          <div class="step-card">
            <div class="step-icon teal-bg"><PhPuzzlePiece size="32" weight="duotone"/></div>
            <h3>3. Susun</h3>
            <p>Geser kotak hingga rapi.</p>
          </div>
          <div class="step-card">
            <div class="step-icon pink-bg"><PhStar size="32" weight="duotone"/></div>
            <h3>4. Menang</h3>
            <p>Raih skor tertinggi!</p>
          </div>
        </div>
      </section>

      <section class="section-features">
        <div class="section-header">
          <h2>Fitur Unggulan</h2>
          <p>Kenapa harus main di PuzzleSD?</p>
        </div>
        <div class="feat-grid">
          <div class="feat-card">
            <div class="icon-box purple-bg"><PhBrain size="32" weight="duotone"/></div>
            <h3>Asah Otak</h3>
            <p>Meningkatkan daya ingat.</p>
          </div>
          <div class="feat-card">
            <div class="icon-box orange-bg"><PhDeviceMobile size="32" weight="duotone"/></div>
            <h3>Responsif</h3>
            <p>Main di HP & Laptop lancar.</p>
          </div>
          <div class="feat-card">
            <div class="icon-box green-bg"><PhLightning size="32" weight="duotone"/></div>
            <h3>Ringan</h3>
            <p>Hemat kuota & cepat.</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* CONTAINER */
.home-container { min-height: 100vh; position: relative; overflow-x: hidden; }

/* BLOBS */
.blobs-container { position: absolute; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: var(--blob-opacity); animation: float 10s infinite alternate; }
.b1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--accent); }
.b2 { bottom: 0; right: 0; width: 40vw; height: 40vw; background: #3b82f6; }
.b3 { top: 40%; left: 30%; width: 30vw; height: 30vw; background: #ec4899; opacity: 0.2; }
@keyframes float { from { transform: translate(0,0); } to { transform: translate(20px, 40px); } }

/* NAVBAR */
.navbar { position: fixed; top: 0; width: 100%; height: 70px; z-index: 100; transition: 0.3s; display: flex; align-items: center; }
.navbar.scrolled { background: var(--nav-bg); backdrop-filter: blur(var(--nav-blur)); border-bottom: 1px solid var(--card-border); }
.nav-content { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }

.nav-left { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 1.4rem; cursor: pointer; color: var(--text-main); }
.logo-icon, .highlight { color: var(--accent); }

.nav-center { display: flex; gap: 30px; }
.nav-link { color: var(--text-muted); cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; transition: 0.2s; }
.nav-link:hover { color: var(--accent); }

.nav-right { display: flex; align-items: center; gap: 15px; }

/* PERBAIKAN: GAP TOMBOL LOGIN/DAFTAR */
.auth-btns { display: flex; align-items: center; gap: 12px; }

.btn-login { background: transparent; color: var(--text-main); font-weight: 600; border: none; cursor: pointer; font-size: 1rem; padding: 8px 16px; }
.btn-login:hover { color: var(--accent); }

.btn-register { background: var(--accent); color: white; border: none; padding: 8px 24px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: 0.2s; }
.btn-register:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.2); opacity: 0.9; }

.theme-btn { background: var(--btn-bg); border: 1px solid var(--btn-border); color: var(--text-main); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
.theme-btn:hover { border-color: var(--accent); color: var(--accent); }

.btn-logout { background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-left: 10px; }
.user-name { color: var(--text-main); font-size: 0.9rem; }

/* HERO SECTION - RATA KIRI */
.hero {
  min-height: 85vh;
  display: flex;
  align-items: center; /* Vertikal tengah */
  justify-content: flex-start; /* Horizontal Kiri */
  padding: 120px 20px 50px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  text-align: left; /* Teks Rata Kiri */
  max-width: 700px; /* Batasi lebar agar rapi */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Elemen anak rata kiri */
}

.pill { background: rgba(124, 58, 237, 0.1); color: var(--accent); padding: 6px 16px; border-radius: 50px; font-weight: bold; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px; border: 1px solid var(--accent); }
h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 20px; color: var(--text-main); }
.text-gradient { background: linear-gradient(to right, var(--accent), #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { font-size: 1.2rem; max-width: 90%; margin-bottom: 40px; color: var(--text-muted); }

.hero-actions { display: flex; gap: 15px; flex-wrap: wrap; }
.btn-primary { background: var(--accent); color: white; padding: 14px 30px; border-radius: 12px; font-weight: bold; border: none; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
.btn-secondary { background: transparent; border: 2px solid var(--btn-border); color: var(--text-main); padding: 14px 30px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.3s; }
.btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

/* SECTIONS (Common) */
.section-steps, .section-features { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 50px; }
.section-header h2 { font-size: 2.5rem; margin-bottom: 10px; color: var(--text-main); }
.section-header p { color: var(--text-muted); font-size: 1.1rem; }

/* STEPS GRID */
.steps-grid { display: flex; flex-wrap: wrap; gap: 25px; justify-content: center; }
.step-card { background: var(--card-bg); border: 1px solid var(--card-border); padding: 30px; border-radius: 20px; width: 260px; text-align: center; transition: 0.3s; box-shadow: var(--card-shadow); }
.step-card:hover { transform: translateY(-10px); border-color: var(--accent); }
.step-card h3 { margin: 15px 0 10px; font-size: 1.2rem; color: var(--text-main); }
.step-card p { font-size: 0.9rem; color: var(--text-muted); }

.step-icon { width: 60px; height: 60px; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto; color: white; }

/* FEATURES GRID */
.feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.feat-card { background: var(--card-bg); border: 1px solid var(--card-border); padding: 30px; border-radius: 20px; text-align: center; box-shadow: var(--card-shadow); transition: 0.3s; }
.feat-card:hover { transform: translateY(-5px); border-color: var(--accent); }
.feat-card h3 { margin: 20px 0 10px; color: var(--text-main); }
.feat-card p { color: var(--text-muted); }

.icon-box { width: 60px; height: 60px; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto; color: white; font-size: 1.5rem; }

/* COLORS */
.purple-bg { background: #a855f7; } .orange-bg { background: #f97316; } .green-bg { background: #10b981; } .teal-bg { background: #14b8a6; } .pink-bg { background: #ec4899; }

/* MOBILE */
.mobile-only { display: none !important; }
.burger-btn { background: transparent; border: none; color: var(--text-main); }

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block !important; }
  h1 { font-size: 2.5rem; }

  .hero { align-items: flex-start; padding-top: 140px; }
  .hero-content { align-items: flex-start; text-align: left; }

  .mobile-menu { position: fixed; inset: 0; top: 70px; background: var(--bg-color); z-index: 99; padding: 20px; border-top: 1px solid var(--card-border); }
  .m-links { display: flex; flex-direction: column; gap: 15px; margin: 20px 0; }
  .m-item { background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--card-border); display: flex; justify-content: space-between; font-weight: 600; color: var(--text-main); }
  .full { width: 100%; margin-bottom: 10px; padding: 12px; border-radius: 10px; font-weight: bold; }
}
</style>
