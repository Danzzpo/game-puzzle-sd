<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Import icons
import {
  PhUser, PhEnvelope, PhLockKey, PhArrowLeft,
  PhWarningCircle, PhInfo
} from '@phosphor-icons/vue';

const router = useRouter();
const nameInput = ref('');
const emailInput = ref('');
const passwordInput = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleRegister = () => {
  errorMessage.value = '';

  if (!nameInput.value || !emailInput.value || !passwordInput.value) {
    errorMessage.value = "Mohon lengkapi nama, email, dan kata sandi.";
    return;
  }

  if (!emailInput.value.includes('@')) {
    errorMessage.value = "Format email tidak valid.";
    return;
  }

  isLoading.value = true;

  // Simulasi Register
  setTimeout(() => {
    // Simpan nama user ke localStorage agar langsung login
    localStorage.setItem('puzzleUser', nameInput.value);
    router.push('/');
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
          <h1>Buat Akun Baru</h1>
          <p>Bergabung sekarang dan mulai petualanganmu!</p>
        </div>

        <form @submit.prevent="handleRegister" class="auth-form">

          <div class="input-group">
            <div class="icon-wrap"><PhUser size="20" weight="duotone" /></div>
            <input
              v-model="nameInput"
              type="text"
              placeholder="Nama Lengkap"
              required
            />
          </div>

          <div class="input-group">
            <div class="icon-wrap"><PhEnvelope size="20" weight="duotone" /></div>
            <input
              v-model="emailInput"
              type="email"
              placeholder="Alamat Email"
              required
            />
          </div>

          <div class="input-group">
            <div class="icon-wrap"><PhLockKey size="20" weight="duotone" /></div>
            <input
              v-model="passwordInput"
              type="password"
              placeholder="Buat Kata Sandi"
              required
            />
          </div>

          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="isLoading" class="loader"></span>
            <span v-else>Daftar Sekarang</span>
          </button>

          <div v-if="errorMessage" class="error-alert">
            <PhWarningCircle size="18" weight="fill"/> {{ errorMessage }}
          </div>
        </form>

        <div class="divider">
          <span>atau daftar dengan</span>
        </div>

        <button class="btn-google">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="20" alt="G">
          <span>Google Account</span>
        </button>

        <div class="auth-footer">
          Sudah punya akun?
          <router-link to="/masuk" class="link-login">Masuk di sini</router-link>
        </div>

        <div class="prototype-note">
          <PhInfo size="20" weight="fill" class="note-icon"/>
          <p><strong>Note:</strong> Prototype mode. Data tidak disimpan permanen di server.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* =========================================
   LAYOUT UTAMA (PERSIS SEPERTI LOGIN)
   ========================================= */
.auth-wrapper {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-color);
  color: var(--text-main);
  transition: background-color 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blobs { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: var(--blob-opacity); }
/* Variasi posisi blob sedikit beda biar dinamis */
.b1 { top: -10%; right: -10%; width: 50vw; height: 50vw; background: var(--accent); animation: float 10s infinite alternate; }
.b2 { bottom: -10%; left: -10%; width: 40vw; height: 40vw; background: #10b981; animation: float 12s infinite alternate-reverse; }

@keyframes float { from { transform: translate(0,0); } to { transform: translate(30px, 50px); } }

/* Content Container */
.auth-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
   CARD REGISTER
   ========================================= */
.auth-card {
  width: 100%; max-width: 420px;
  background: var(--card-bg); border: 1px solid var(--card-border); box-shadow: var(--card-shadow);
  border-radius: 24px; padding: 40px; text-align: center;
  backdrop-filter: blur(24px); position: relative;
}

.animate-enter { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.card-head h1 { font-size: 1.75rem; margin-bottom: 8px; }
.card-head p { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 32px; }

/* =========================================
   FORM ELEMENTS
   ========================================= */
.auth-form { display: flex; flex-direction: column; gap: 16px; }

.input-group {
  display: flex; align-items: center;
  background: var(--input-bg); border: 1px solid var(--input-border);
  border-radius: 14px; padding: 0 16px; transition: 0.3s;
}
.input-group:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15); transform: translateY(-1px); }

.icon-wrap { color: var(--text-muted); display: flex; margin-right: 12px; }
input { width: 100%; padding: 14px 0; background: transparent; border: none; outline: none; color: var(--text-main); font-size: 1rem; font-weight: 500; }

/* BUTTONS */
.btn-primary {
  background: var(--accent); color: white; border: none; padding: 14px; border-radius: 14px;
  font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s;
  display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-top: 10px;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

.divider { display: flex; align-items: center; margin: 24px 0; color: var(--text-muted); font-size: 0.85rem; font-weight: 500; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--card-border); }
.divider span { padding: 0 12px; }

.btn-google {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
  background: var(--input-bg); border: 1px solid var(--input-border); padding: 12px;
  border-radius: 14px; font-weight: 600; color: var(--text-main); cursor: pointer; transition: 0.2s;
}
.btn-google:hover { background: var(--card-bg); border-color: var(--accent); }

/* =========================================
   FOOTER & UTILS
   ========================================= */
.auth-footer { margin-top: 30px; font-size: 0.95rem; color: var(--text-muted); }
.link-login { color: var(--accent); font-weight: 700; text-decoration: none; margin-left: 4px; }
.link-login:hover { text-decoration: underline; }

.prototype-note {
  margin-top: 25px; background: var(--input-bg); border: 1px dashed var(--card-border);
  border-radius: 12px; padding: 12px; display: flex; gap: 10px; align-items: flex-start; text-align: left;
}
.note-icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
.prototype-note p { margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; }
.prototype-note strong { color: var(--accent); }

.error-alert {
  margin-top: 5px; padding: 10px; border-radius: 10px; background: rgba(239, 68, 68, 0.1); color: #ef4444;
  font-size: 0.9rem; display: flex; align-items: center; gap: 8px; justify-content: center; border: 1px solid rgba(239, 68, 68, 0.2); animation: shake 0.4s;
}
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
.loader { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* =========================================
   MOBILE RESPONSIVE FIX (AGAR TIDAK NUMPUK)
   ========================================= */
@media (max-width: 600px) {
  .auth-content {
    /* Ubah arah jadi kolom vertikal */
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
    width: 100%;
    padding: 30px 20px;
    background: var(--card-bg);
  }
}
</style>
