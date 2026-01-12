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

// --- LOGIKA DARK MODE ---
const isDark = useDark();
const toggleDark = useToggle(isDark);

// --- LOGIKA DATA GAMBAR (Untuk Tombol Main Sekarang) ---
const allImages = import.meta.glob('@/assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

onMounted(() => {
  const savedUser = localStorage.getItem('puzzleUser');
  if (savedUser) currentUser.value = savedUser;
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const handleLogout = () => {
  localStorage.removeItem('puzzleUser');
  window.location.reload();
};

const goTo = (path) => {
  router.push(path);
  isMobileMenuOpen.value = false;
};

// Fungsi Memulai Game dengan Gambar Acak
const playNowRandom = () => {
  const keys = Object.keys(allImages);
  if (keys.length > 0) {
    const randomPath = keys[Math.floor(Math.random() * keys.length)];
    const randomImg = allImages[randomPath].default;
    router.push({
      path: '/game',
      query: { img: randomImg, title: 'Puzzle Acak' }
    });
  } else {
    router.push('/puzzles'); // Fallback jika belum ada gambar
  }
};
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
          <PhPuzzlePiece :size="28" weight="duotone" class="logo-icon" />
          <span class="logo-text">Puzzle<span class="highlight">SD</span></span>
        </div>

        <div class="nav-center desktop-only">
          <a @click="goTo('/puzzles')" class="nav-link"><PhGameController size="18"/> Puzzle</a>
          <a @click="goTo('/popular')" class="nav-link"><PhStar size="18"/> Populer</a>
          <a @click="goTo('/categories')" class="nav-link"><PhFolder size="18"/> Kategori</a>
        </div>

        <div class="nav-right">
          <div v-if="!currentUser" class="auth-btns desktop-only">
            <button class="btn-login" @click="goTo('/masuk')">Masuk</button>
            <button class="btn-register" @click="goTo('/daftar')">Daftar</button>
          </div>
          <div v-else class="user-profile desktop-only">
            <span class="user-name">Hai, <b>{{ currentUser }}</b></span>
            <button class="btn-logout-small" @click="handleLogout"><PhSignIn size="18"/></button>
          </div>

          <div class="divider desktop-only"></div>

          <button class="theme-btn" @click="toggleDark()">
            <PhSun v-if="!isDark" size="20" weight="fill" />
            <PhMoon v-else size="20" weight="fill" />
          </button>

          <button class="burger-btn mobile-tablet-only" @click="isMobileMenuOpen = !isMobileMenuOpen">
            <PhList v-if="!isMobileMenuOpen" size="26" />
            <PhX v-else size="26" />
          </button>
        </div>
      </div>
    </nav>

    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="mobile-content">
          <div v-if="currentUser" class="m-user">
            <PhUserCircle size="32" weight="duotone"/> <span>Halo, {{ currentUser }}</span>
          </div>

          <div class="m-links">
            <a @click="goTo('/puzzles')" class="m-item"><span>Puzzle</span> <PhCaretRight/></a>
            <a @click="goTo('/popular')" class="m-item"><span>Populer</span> <PhCaretRight/></a>
            <a @click="goTo('/categories')" class="m-item"><span>Kategori</span> <PhCaretRight/></a>
          </div>

          <div class="m-divider"></div>

          <div v-if="!currentUser" class="m-auth">
            <button class="btn-login full" @click="goTo('/masuk')">Masuk</button>
            <button class="btn-register full" @click="goTo('/daftar')">Daftar Sekarang</button>
          </div>
          <div v-else>
            <button class="btn-logout full" @click="handleLogout">Keluar Akun</button>
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
            <button class="btn-primary" @click="playNowRandom">
              <PhGameController size="24" weight="fill"/> Main Sekarang
            </button>
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
            <p>Meningkatkan daya ingat dan konsentrasi.</p>
          </div>
          <div class="feat-card">
            <div class="icon-box orange-bg"><PhDeviceMobile size="32" weight="duotone"/></div>
            <h3>Responsif</h3>
            <p>Main di HP, Tablet, & Laptop dengan lancar.</p>
          </div>
          <div class="feat-card">
            <div class="icon-box green-bg"><PhLightning size="32" weight="duotone"/></div>
            <h3>Ringan</h3>
            <p>Aplikasi cepat dan hemat kuota internet.</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* CONTAINER */
.home-container { min-height: 100vh; position: relative; overflow-x: hidden; background-color: var(--bg-color); }

/* BLOBS BACKGROUND */
.blobs-container { position: absolute; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: var(--blob-opacity); animation: float 10s infinite alternate; }
.b1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--accent); }
.b2 { bottom: 0; right: 0; width: 40vw; height: 40vw; background: #3b82f6; }
.b3 { top: 40%; left: 30%; width: 30vw; height: 30vw; background: #ec4899; opacity: 0.2; }
@keyframes float { from { transform: translate(0,0); } to { transform: translate(30px, 50px); } }

/* NAVBAR (SLIM & SINKRON) */
.navbar { position: fixed; top: 0; width: 100%; height: 64px; z-index: 1000; transition: 0.3s; display: flex; align-items: center; }
.navbar.scrolled { background: var(--nav-bg); backdrop-filter: blur(12px); border-bottom: 1px solid var(--card-border); }
.nav-content { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }

.nav-left { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 1.3rem; cursor: pointer; color: var(--text-main); }
.logo-icon, .highlight { color: var(--accent); }

.nav-center { display: flex; gap: 25px; }
.nav-link { color: var(--text-muted); cursor: pointer; font-weight: 600; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 6px; transition: 0.2s; }
.nav-link:hover { color: var(--accent); }

.nav-right { display: flex; align-items: center; gap: 12px; }

/* AUTH BUTTONS */
.auth-btns { display: flex; align-items: center; gap: 8px; }
.btn-login { background: transparent; color: var(--text-main); font-weight: 600; border: none; cursor: pointer; padding: 8px 12px; }
.btn-register { background: var(--accent); color: white; border: none; padding: 8px 20px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: 0.2s; }
.btn-register:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

.user-profile { display: flex; align-items: center; gap: 10px; color: var(--text-main); font-size: 0.9rem; }
.btn-logout-small { background: #ef4444; color: white; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

.divider { width: 1px; height: 24px; background: var(--card-border); margin: 0 5px; }

.theme-btn { background: var(--btn-bg); border: 1px solid var(--btn-border); color: var(--text-main); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }

/* HERO SECTION (RATA KIRI) */
.hero { min-height: 90vh; display: flex; align-items: center; padding: 100px 20px 50px; max-width: 1200px; margin: 0 auto; }
.hero-content { text-align: left; max-width: 650px; }
.pill { background: rgba(124, 58, 237, 0.1); color: var(--accent); padding: 6px 16px; border-radius: 50px; font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px; border: 1px solid var(--accent); }
h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 20px; color: var(--text-main); font-weight: 900; }
.text-gradient { background: linear-gradient(to right, var(--accent), #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { font-size: 1.2rem; margin-bottom: 40px; color: var(--text-muted); line-height: 1.6; }

.hero-actions { display: flex; gap: 15px; }
.btn-primary { background: var(--accent); color: white; padding: 14px 28px; border-radius: 12px; font-weight: bold; border: none; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
.btn-secondary { background: transparent; border: 2px solid var(--btn-border); color: var(--text-main); padding: 14px 28px; border-radius: 12px; font-weight: bold; cursor: pointer; }

/* CARA BERMAIN & FITUR */
.section-steps, .section-features { padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 40px; }
.section-header h2 { font-size: 2.2rem; color: var(--text-main); font-weight: 800; }
.section-header p { color: var(--text-muted); }

.steps-grid, .feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
.step-card, .feat-card { background: var(--card-bg); border: 1px solid var(--card-border); padding: 30px; border-radius: 20px; text-align: center; transition: 0.3s; box-shadow: var(--card-shadow); }
.step-card:hover { transform: translateY(-8px); border-color: var(--accent); }

.step-icon, .icon-box { width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: white; }
.purple-bg { background: #a855f7; } .orange-bg { background: #f97316; } .teal-bg { background: #14b8a6; } .pink-bg { background: #ec4899; } .green-bg { background: #10b981; }

/* MOBILE MENU */
.mobile-tablet-only { display: none; }
.burger-btn { background: transparent; border: none; color: var(--text-main); cursor: pointer; }

@media (max-width: 900px) {
  .desktop-only { display: none !important; }
  .mobile-tablet-only { display: block !important; }
  h1 { font-size: 2.5rem; }
  .hero { padding-top: 120px; }

  .mobile-menu { position: fixed; inset: 0; top: 64px; background: var(--bg-color); z-index: 999; padding: 20px; }
  .m-item { background: var(--card-bg); padding: 16px; border-radius: 12px; border: 1px solid var(--card-border); display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--text-main); font-weight: 600; }
  .full { width: 100%; padding: 14px; border-radius: 12px; margin-bottom: 10px; font-weight: bold; }
}

/* Transitions */
.slide-enter-active, .slide-leave-active { transition: 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
