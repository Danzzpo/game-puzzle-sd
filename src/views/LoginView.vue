<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Import Ikon Phosphor (PhGoogleLogo dihapus karena pakai gambar asli)
import {
  PhEnvelope, PhLockKey, PhArrowLeft,
  PhStar, PhPlanet
} from '@phosphor-icons/vue';

const router = useRouter();
const emailInput = ref('');
const passwordInput = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// --- DATA AKUN DEMO ---
const DEMO_USER = {
  email: 'admin@puzzle.com',
  password: '123'
};

const handleLogin = () => {
  errorMessage.value = '';

  if (!emailInput.value || !passwordInput.value) {
    errorMessage.value = "Email dan Password wajib diisi!";
    return;
  }

  // Simulasi Loading
  isLoading.value = true;

  setTimeout(() => {
    if (emailInput.value === DEMO_USER.email && passwordInput.value === DEMO_USER.password) {
      const name = emailInput.value.split('@')[0];
      const cleanName = name.charAt(0).toUpperCase() + name.slice(1);

      localStorage.setItem('puzzleUser', cleanName);
      localStorage.setItem('puzzleTheme', 'dark');

      router.push('/');
    } else {
      errorMessage.value = "Email atau Password salah!";
      isLoading.value = false;
    }
  }, 1500);
};
</script>

<template>
  <div class="auth-page">

    <div class="blobs-container">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <div class="floating-decorations">
      <PhStar class="decor-item d1" weight="fill" />
      <PhPlanet class="decor-item d2" weight="duotone" />
      <div class="circle c1"></div>
      <div class="circle c2"></div>
    </div>

    <div class="header-nav">
      <router-link to="/" class="btn-back-pill">
        <PhArrowLeft weight="bold" :size="20" />
        <span>Kembali ke Beranda</span>
      </router-link>
    </div>

    <div class="auth-card animate-enter">

      <div class="card-header">
        <h2>Selamat Datang</h2>
        <p class="subtitle">Masuk untuk melanjutkan permainan.</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">

        <div class="input-group">
          <PhEnvelope :size="22" class="input-icon" />
          <input
            v-model="emailInput"
            type="email"
            placeholder="Alamat Email"
            required
          />
        </div>

        <div class="input-group">
          <PhLockKey :size="22" class="input-icon" />
          <input
            v-model="passwordInput"
            type="password"
            placeholder="Kata Sandi"
            required
          />
        </div>

        <div class="extra-options">
          <label class="remember-me">
            <input type="checkbox"> Ingat Saya
          </label>
          <a href="#" class="forgot-link">Lupa Sandi?</a>
        </div>

        <button type="submit" class="btn-primary-auth" :disabled="isLoading">
          <span v-if="isLoading" class="loader"></span>
          <span v-else>Masuk Sekarang</span>
        </button>

      </form>

      <transition name="shake">
        <p v-if="errorMessage" class="error-msg">
          ⚠️ {{ errorMessage }}
        </p>
      </transition>

      <div class="divider"><span>Atau lanjutkan dengan</span></div>

      <button class="btn-google">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google Logo"
          class="google-logo-img"
        />
        <span>Google</span>
      </button>

      <div class="auth-footer">
        Belum punya akun? <router-link to="/daftar">Daftar Gratis</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

/* --- CONTAINER UTAMA --- */
.auth-page {
  height: 100vh; width: 100vw;
  display: flex; align-items: center; justify-content: center;
  background-color: #0f0518;
  font-family: 'Poppins', sans-serif; color: white;
  position: relative; overflow: hidden;
}

/* --- BACKGROUND BLOBS --- */
.blobs-container {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
}
.blob {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.4;
  animation: floatBlob 15s infinite alternate ease-in-out;
}
.blob-1 { top: -20%; left: -10%; width: 600px; height: 600px; background: #7c3aed; }
.blob-2 { bottom: -20%; right: -10%; width: 500px; height: 500px; background: #db2777; animation-delay: -5s; }

@keyframes floatBlob {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

/* --- DEKORASI --- */
.floating-decorations {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
}
.decor-item { position: absolute; opacity: 0.3; animation: floatItem 8s infinite ease-in-out; }
.d1 { top: 15%; right: 20%; font-size: 3rem; color: #fbbf24; animation-duration: 6s; }
.d2 { bottom: 15%; left: 10%; font-size: 4rem; color: #a855f7; animation-duration: 9s; }

.circle { position: absolute; border-radius: 50%; background: white; opacity: 0.05; }
.c1 { width: 100px; height: 100px; top: 10%; left: 30%; }
.c2 { width: 50px; height: 50px; bottom: 30%; right: 10%; }

@keyframes floatItem {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* --- TOMBOL KEMBALI --- */
.header-nav {
  position: absolute; top: 25px; left: 25px; z-index: 10;
}
.btn-back-pill {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 20px; border-radius: 50px;
  color: white; text-decoration: none; font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.btn-back-pill:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

/* --- CARD LOGIN --- */
.auth-card {
  width: 100%; max-width: 400px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
  z-index: 5;
  position: relative;
  /* Animasi float dihapus, ganti dengan entrance saja */
}
.animate-enter { animation: fadeInUp 0.8s ease-out; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

/* HEADER CARD */
.card-header { margin-bottom: 30px; }
.icon-glow {
  width: 70px; height: 70px;
  background: linear-gradient(135deg, #d946ef, #a855f7);
  border-radius: 20px; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 10px 30px rgba(217, 70, 239, 0.4);
  transform: rotate(-10deg);
}
h2 { font-size: 26px; font-weight: 800; margin: 0; color: white; letter-spacing: 0.5px; }
.subtitle { font-size: 14px; color: rgba(255,255,255,0.6); margin-top: 8px; }

/* --- INPUT FIELDS --- */
.auth-form { display: flex; flex-direction: column; gap: 20px; }

.input-group {
  position: relative;
  background: rgba(0,0,0,0.2); border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; padding: 0 18px;
  transition: 0.3s;
}
.input-group:focus-within {
  border-color: #d946ef; box-shadow: 0 0 0 4px rgba(217, 70, 239, 0.15);
  background: rgba(0,0,0,0.3); transform: scale(1.02);
}
.input-icon { color: rgba(255,255,255,0.5); }
.input-group input {
  width: 100%; padding: 16px 12px;
  background: transparent; border: none; outline: none;
  color: white; font-size: 15px; font-weight: 500;
}
.input-group input::placeholder { color: rgba(255,255,255,0.3); }

/* EXTRA OPTIONS */
.extra-options {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 5px;
}
.remember-me { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.forgot-link { color: #d946ef; text-decoration: none; font-weight: 600; transition: 0.3s; }
.forgot-link:hover { color: #f0abfc; text-decoration: underline; }

/* BUTTONS */
.btn-primary-auth {
  background: linear-gradient(135deg, #d946ef, #a855f7);
  border: none; padding: 16px; border-radius: 16px;
  color: white; font-weight: 700; font-size: 16px;
  cursor: pointer; transition: 0.3s;
  box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
  display: flex; justify-content: center; align-items: center;
}
.btn-primary-auth:hover:not(:disabled) {
  transform: translateY(-3px); box-shadow: 0 15px 35px rgba(168, 85, 247, 0.5);
}
.btn-primary-auth:disabled { opacity: 0.7; cursor: not-allowed; }

.divider { display: flex; align-items: center; margin: 25px 0; color: rgba(255,255,255,0.4); font-size: 13px; }
.divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
.divider span { padding: 0 15px; }

/* GOOGLE BUTTON (LOGO ASLI) */
.btn-google {
  background: white; /* Background putih agar logo G terlihat jelas */
  border: none;
  color: #333; padding: 14px; border-radius: 16px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;
  font-size: 15px; font-weight: 600; transition: 0.3s; width: 100%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.btn-google:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255,255,255,0.15); }
.google-logo-img { width: 20px; height: 20px; }

.auth-footer { margin-top: 30px; font-size: 14px; color: rgba(255,255,255,0.6); }
.auth-footer a { color: #d946ef; text-decoration: none; font-weight: 700; margin-left: 5px; }
.auth-footer a:hover { color: white; }

.error-msg {
  background: rgba(239, 68, 68, 0.1); color: #fca5a5;
  padding: 10px; border-radius: 10px; font-size: 13px; margin-top: 15px; border: 1px solid rgba(239, 68, 68, 0.3);
}

.loader {
  width: 20px; height: 20px; border: 3px solid #fff;
  border-bottom-color: transparent; border-radius: 50%;
  display: inline-block; animation: rotation 1s linear infinite;
}
@keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

@media (max-width: 600px) {
  .auth-card { padding: 30px 20px; width: 90%; }
  .header-nav { top: 20px; left: 20px; }
  h2 { font-size: 22px; }
}
</style>
