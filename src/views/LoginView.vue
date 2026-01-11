<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  PhEnvelope, PhLockKey, PhArrowLeft,
  PhCheck, PhWarningCircle, PhInfo
} from '@phosphor-icons/vue';

const router = useRouter();
const emailInput = ref('');
const passwordInput = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = () => {
  errorMessage.value = '';

  if (!emailInput.value || !passwordInput.value) {
    errorMessage.value = "Email dan kata sandi wajib diisi.";
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    if (emailInput.value.includes('@')) {
      const username = emailInput.value.split('@')[0];
      const capitalizedName = username.charAt(0).toUpperCase() + username.slice(1);

      localStorage.setItem('puzzleUser', capitalizedName);
      router.push('/');
    } else {
      errorMessage.value = "Format email tidak valid (harus pakai @).";
      isLoading.value = false;
    }
  }, 1500);
};
</script>

<template>
  <div class="auth-wrapper">

    <div class="blobs">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
    </div>

    <div class="auth-content">
      <div class="auth-header">
        <button @click="router.push('/')" class="btn-back">
          <PhArrowLeft weight="bold" size="18" /> <span>Beranda</span>
        </button>
      </div>

      <div class="auth-card animate-enter">
        <div class="card-head">
          <h1>Selamat Datang</h1>
          <p>Masuk untuk melanjutkan progres bermainmu.</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">

          <div class="input-group" :class="{ 'error-border': errorMessage }">
            <div class="icon-wrap"><PhEnvelope size="20" weight="duotone" /></div>
            <input v-model="emailInput" type="email" placeholder="nama@email.com" required />
          </div>

          <div class="input-group" :class="{ 'error-border': errorMessage }">
            <div class="icon-wrap"><PhLockKey size="20" weight="duotone" /></div>
            <input v-model="passwordInput" type="password" placeholder="Kata sandi" required />
          </div>

          <div class="form-actions">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" hidden>
              <div class="custom-checkbox">
                <PhCheck v-if="rememberMe" size="12" weight="bold" />
              </div>
              <span class="label-text">Ingat saya</span>
            </label>
            <a href="#" class="forgot-link">Lupa sandi?</a>
          </div>

          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Masuk Sekarang</span>
          </button>

          <div v-if="errorMessage" class="error-alert">
            <PhWarningCircle size="18" weight="fill"/> {{ errorMessage }}
          </div>
        </form>

        <div class="divider"><span>atau masuk dengan</span></div>

        <button class="btn-google">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="20" alt="G">
          <span>Google Account</span>
        </button>

        <div class="auth-footer">
          Belum punya akun? <router-link to="/daftar" class="link-register">Daftar Gratis</router-link>
        </div>

        <div class="prototype-note">
          <PhInfo size="20" weight="fill" class="note-icon"/>
          <p><strong>Note:</strong> Prototype mode. Login dengan email & password bebas.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* =========================================
   LAYOUT UTAMA (FIXED LAYOUT)
   ========================================= */
.auth-wrapper {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto; /* Allow scroll if needed */
  background-color: var(--bg-color);
  color: var(--text-main);
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blobs { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: var(--blob-opacity); }
.b1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--accent); }
.b2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: #3b82f6; }

/* Content Container untuk mengatur posisi Header dan Card */
.auth-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Card di tengah */
  justify-content: center;
  min-height: 100vh; /* Full height secara default */
}

/* =========================================
   HEADER (TOMBOL KEMBALI)
   ========================================= */
.auth-header {
  position: absolute;
  top: 30px;
  left: 30px;
  width: auto;
  z-index: 10;
}

.btn-back {
  display: flex; align-items: center; gap: 8px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--text-muted);
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600; font-size: 0.9rem;
  cursor: pointer; transition: 0.2s ease;
  backdrop-filter: blur(10px);
}
.btn-back:hover { color: var(--text-main); border-color: var(--accent); transform: translateX(-3px); }

/* =========================================
   CARD LOGIN
   ========================================= */
.auth-card {
  width: 100%; max-width: 400px;
  background: var(--card-bg); border: 1px solid var(--card-border); box-shadow: var(--card-shadow);
  border-radius: 24px; padding: 40px; text-align: center;
  backdrop-filter: blur(24px); position: relative;
}

.animate-enter { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.card-head h1 { font-size: 1.75rem; margin-bottom: 8px; }
.card-head p { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 32px; }

/* =========================================
   FORM & CHECKBOX (PERBAIKAN)
   ========================================= */
.auth-form { display: flex; flex-direction: column; gap: 16px; }

.input-group {
  display: flex; align-items: center;
  background: var(--input-bg); border: 1px solid var(--input-border);
  border-radius: 14px; padding: 0 16px; transition: 0.3s;
}
.input-group:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15); transform: translateY(-1px); }
.input-group.error-border { border-color: #ef4444; animation: shake 0.4s; }
.icon-wrap { color: var(--text-muted); display: flex; margin-right: 12px; }
input { width: 100%; padding: 14px 0; background: transparent; border: none; outline: none; color: var(--text-main); font-size: 1rem; font-weight: 500; }

/* FIX CHECKBOX ALIGNMENT */
.form-actions {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.9rem; margin-top: -4px; margin-bottom: 8px;
}
.remember-me {
  display: flex;
  align-items: center; /* Pastikan vertikal center */
  gap: 8px;
  cursor: pointer;
  color: var(--text-muted);
  user-select: none;
}
.custom-checkbox {
  width: 20px; height: 20px; /* Ukuran fix */
  border: 2px solid var(--input-border); border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  transition: 0.2s; background: var(--input-bg); color: white;
  flex-shrink: 0; /* Jangan gepeng */
}
input[type="checkbox"]:checked + .custom-checkbox { background: var(--accent); border-color: var(--accent); }
.label-text {
  padding-top: 1px; /* Micro adjustment biar pas tengah */
}

.forgot-link { color: var(--accent); font-weight: 600; text-decoration: none; }

/* BUTTONS */
.btn-primary {
  background: var(--accent); color: white; border: none; padding: 14px; border-radius: 14px;
  font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s;
  display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }

.divider { display: flex; align-items: center; margin: 24px 0; color: var(--text-muted); font-size: 0.85rem; font-weight: 500; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--card-border); }
.divider span { padding: 0 12px; }

.btn-google {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
  background: var(--input-bg); border: 1px solid var(--input-border); padding: 12px;
  border-radius: 14px; font-weight: 600; color: var(--text-main); cursor: pointer; transition: 0.2s;
}
.btn-google:hover { background: var(--card-bg); border-color: var(--accent); }

/* FOOTER */
.auth-footer { margin-top: 30px; font-size: 0.95rem; color: var(--text-muted); }
.link-register { color: var(--accent); font-weight: 700; text-decoration: none; margin-left: 4px; }

.prototype-note {
  margin-top: 25px; background: var(--input-bg); border: 1px dashed var(--card-border);
  border-radius: 12px; padding: 12px; display: flex; gap: 10px; align-items: flex-start; text-align: left;
}
.note-icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
.prototype-note p { margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; }
.prototype-note strong { color: var(--accent); }

.error-alert {
  margin-top: 10px; padding: 10px; border-radius: 10px; background: rgba(239, 68, 68, 0.1); color: #ef4444;
  font-size: 0.9rem; display: flex; align-items: center; gap: 8px; justify-content: center; border: 1px solid rgba(239, 68, 68, 0.2); animation: shake 0.4s;
}
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
.loader { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* =========================================
   MOBILE RESPONSIVE FIX (UTAMA)
   ========================================= */
@media (max-width: 600px) {
  .auth-content {
    /* Ubah layout jadi kolom agar elemen turun ke bawah */
    justify-content: flex-start;
    padding-top: 20px;
    padding-bottom: 40px;
    gap: 30px; /* Jarak antara tombol kembali dan kartu */
  }

  .auth-header {
    /* Matikan absolute position di mobile */
    position: relative;
    top: auto; left: auto;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .auth-card {
    /* Buat kartu lebih lebar di mobile */
    width: 100%;
    padding: 30px 20px;
    /* Pastikan background solid di mobile agar tidak tabrakan visual */
    background: var(--card-bg);
  }
}
</style>
