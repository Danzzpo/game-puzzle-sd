<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emailInput = ref('');
const passwordInput = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// --- DATA AKUN (Tetap ada di kodingan, tapi tidak ditampilkan) ---
const DEMO_USER = {
  email: 'admin@puzzle.com',
  password: '123'
};

const handleLogin = () => {
  // 1. Reset Error
  errorMessage.value = '';

  // 2. Validasi Input Kosong
  if (!emailInput.value || !passwordInput.value) {
    errorMessage.value = "Email dan Password wajib diisi!";
    return;
  }

  // 3. Validasi Format Email Sederhana
  if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
    errorMessage.value = "Format email tidak valid.";
    return;
  }

  // 4. Mulai Loading
  isLoading.value = true;

  setTimeout(() => {
    // 5. Cek Kesesuaian Data
    if (emailInput.value === DEMO_USER.email && passwordInput.value === DEMO_USER.password) {
      // BERHASIL
      const name = emailInput.value.split('@')[0];
      const cleanName = name.charAt(0).toUpperCase() + name.slice(1);

      localStorage.setItem('puzzleUser', cleanName);
      localStorage.setItem('puzzleTheme', 'dark');

      router.push('/'); // Pindah ke Home
    } else {
      // GAGAL
      errorMessage.value = "Email atau Password salah!";
      isLoading.value = false;
    }
  }, 1500);
};
</script>

<template>
  <div class="auth-page">
    <router-link to="/" class="back-link">← Kembali ke Beranda</router-link>

    <div class="auth-card">
      <h2>Selamat Datang Kembali</h2>
      <p class="subtitle">Masuk untuk melanjutkan permainan.</p>

      <div class="social-buttons">
        <button class="btn-social google">
          <span class="icon-text">G</span> Masuk dengan Google
        </button>
      </div>

      <div class="divider"><span>atau login manual</span></div>

      <div class="form-group">
        <label>Alamat Email</label>
        <input
          v-model="emailInput"
          type="email"
          placeholder="Contoh: admin@puzzle.com"
          @keyup.enter="handleLogin"
        />
      </div>

      <div class="form-group">
        <label>Kata Sandi</label>
        <input
          v-model="passwordInput"
          type="password"
          placeholder="Masukkan kata sandi"
          @keyup.enter="handleLogin"
        />
      </div>

      <div class="cloudflare-mock">
        <div class="check-circle">✔</div>
        <span class="cf-text">Verifikasi Manusia</span>
        <span class="cf-logo">CLOUDFLARE</span>
      </div>

      <button
        class="btn-primary-auth"
        @click="handleLogin"
        :disabled="isLoading"
        :class="{ 'btn-loading': isLoading }"
      >
        <span v-if="isLoading">Memuat... ⏳</span>
        <span v-else>➔ Masuk</span>
      </button>

      <p v-if="errorMessage" class="error-msg">⚠️ {{ errorMessage }}</p>

      <div class="auth-footer">
        <span>Belum punya akun? <router-link to="/daftar">Buat Akun</router-link></span>
        <a href="#" class="forgot-link">Lupa kata sandi?</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- SETUP GLOBAL --- */
.auth-page {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background-color: #0f0c16;
  background-image: radial-gradient(circle at 50% 50%, rgba(45, 27, 78, 0.8) 0%, rgba(15, 12, 22, 1) 70%);
  font-family: 'Poppins', sans-serif; color: white; position: relative;
}

.back-link { position: absolute; top: 30px; left: 30px; color: #a0a0b0; text-decoration: none; font-size: 14px; transition: color 0.3s; }
.back-link:hover { color: white; }

/* CARD */
.auth-card {
  width: 100%; max-width: 400px;
  background: rgba(20, 15, 30, 0.7); backdrop-filter: blur(10px);
  padding: 40px; border-radius: 16px; border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 50px rgba(139, 92, 246, 0.1); text-align: center;
}

h2 { margin: 0 0 10px; font-size: 26px; font-weight: 700; color: #fff; }
.subtitle { color: #888; font-size: 14px; margin-bottom: 20px; }

/* Social & Divider */
.social-buttons { display: flex; flex-direction: column; gap: 10px; }
.btn-social { background: transparent; border: 1px solid #444; color: white; padding: 10px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
.btn-social:hover { border-color: #ff8a65; }
.icon-text { color: #ea4335; font-weight: bold; }
.divider { display: flex; align-items: center; margin: 20px 0; color: #555; font-size: 12px; }
.divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: #333; }
.divider span { padding: 0 10px; }

/* Form */
.form-group { text-align: left; margin-bottom: 15px; }
.form-group label { display: block; font-size: 13px; color: #aaa; margin-bottom: 6px; }
.form-group input {
  width: 100%; padding: 12px; box-sizing: border-box; background: #0a0810;
  border: 1px solid #333; border-radius: 8px; color: white; outline: none; transition: 0.3s;
}
.form-group input:focus { border-color: #8b5cf6; }

/* Cloudflare Mock */
.cloudflare-mock {
  background: #222; border: 1px solid #444; padding: 10px 15px; border-radius: 6px;
  display: flex; align-items: center; gap: 10px; margin-bottom: 20px; cursor: default;
}
.check-circle { width: 20px; height: 20px; background: #00c853; border-radius: 50%; color: white; font-size: 12px; display: flex; align-items: center; justify-content: center; }
.cf-logo { margin-left: auto; font-size: 9px; color: #888; }

/* Button & Error */
.btn-primary-auth {
  width: 100%; background: linear-gradient(90deg, #ff8a65, #ff6d00);
  border: none; padding: 14px; border-radius: 8px; color: white; font-weight: bold;
  font-size: 16px; cursor: pointer; box-shadow: 0 4px 15px rgba(255, 109, 0, 0.3);
  margin-bottom: 15px; transition: transform 0.2s, opacity 0.2s;
}
.btn-primary-auth:hover:not(:disabled) { transform: translateY(-2px); }
.btn-primary-auth:disabled { opacity: 0.7; cursor: not-allowed; }
.btn-loading { background: #444; box-shadow: none; }

.error-msg { color: #ff5252; font-size: 13px; margin-bottom: 15px; animation: shake 0.3s; }

/* Footer */
.auth-footer { display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #888; }
.auth-footer a { color: #ff8a65; text-decoration: none; font-weight: 500; }
.auth-footer a:hover { text-decoration: underline; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>
