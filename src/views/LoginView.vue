<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emailInput = ref('');
const passwordInput = ref('');

const handleLogin = () => {
  if (emailInput.value && passwordInput.value) {
    const name = emailInput.value.split('@')[0];
    // Huruf pertama besar
    const cleanName = name.charAt(0).toUpperCase() + name.slice(1);

    localStorage.setItem('puzzleUser', cleanName);
    router.push('/');
  } else {
    alert("Isi email dan password dulu ya!");
  }
};
</script>

<template>
  <div class="auth-page">
    <router-link to="/" class="back-link">← Kembali ke Beranda</router-link>

    <div class="auth-card">
      <h2>Selamat Datang Kembali</h2>
      <p class="subtitle">Masuk ke akunmu untuk melanjutkan petualangan puzzle.</p>

      <div class="social-buttons">
        <button class="btn-social google">
          <span class="icon-text">G</span> Masuk dengan Google
        </button>
        <button class="btn-social apple">
          <span class="icon-text"></span> Masuk dengan Apple
        </button>
      </div>

      <div class="divider">
        <span>atau lanjutkan dengan email</span>
      </div>

      <div class="form-group">
        <label>Alamat Email</label>
        <input v-model="emailInput" type="email" placeholder="Masukkan email" />
      </div>

      <div class="form-group">
        <label>Kata Sandi</label>
        <input v-model="passwordInput" type="password" placeholder="Masukkan kata sandi" />
      </div>

      <div class="cloudflare-mock">
        <div class="check-circle">✔</div>
        <span class="cf-text">Sukses!</span>
        <span class="cf-logo">CLOUDFLARE</span>
      </div>

      <button class="btn-primary-auth" @click="handleLogin">
        ➔ Masuk
      </button>

      <div class="auth-footer">
        <span>Belum punya akun? <router-link to="/daftar">Buat Akun</router-link></span>
        <a href="#" class="forgot-link">Lupa kata sandi?</a>
      </div>
    </div>
  </div>
</template>

<style>
/* --- SETUP BACKGROUND & HALAMAN --- */
.auth-page {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background-color: #0f0c16; /* Warna dasar ungu sangat gelap */

  /* Pattern Puzzle Overlay (SVG Pattern) + Gradient Ungu di Tengah */
  background-image:
    radial-gradient(circle at 50% 50%, rgba(45, 27, 78, 0.8) 0%, rgba(15, 12, 22, 1) 70%),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM22.485 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828z' fill='%232c2c2c' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");

  font-family: 'Poppins', sans-serif;
  color: white;
  position: relative;
}

.back-link {
  position: absolute; top: 30px; left: 30px;
  color: #a0a0b0; text-decoration: none; font-size: 14px;
  transition: color 0.3s;
}
.back-link:hover { color: white; }

/* --- CARD STYLE (Glow Effect) --- */
.auth-card {
  width: 100%; max-width: 420px;
  background: rgba(20, 15, 30, 0.6); /* Transparan gelap */
  backdrop-filter: blur(10px); /* Efek Blur di belakang kartu */
  padding: 40px;
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.3); /* Border ungu tipis */
  box-shadow: 0 0 60px rgba(139, 92, 246, 0.15); /* Glow ungu di sekitar kartu */
  text-align: center;
}

h2 { margin: 0 0 10px; font-size: 28px; font-weight: 700; color: #fff; }
.subtitle { color: #888; font-size: 14px; margin-bottom: 30px; }

/* --- SOCIAL BUTTONS --- */
.social-buttons { display: flex; flex-direction: column; gap: 12px; }
.btn-social {
  background: transparent; border: 1px solid #444; color: white;
  padding: 12px; border-radius: 8px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  font-weight: 500; font-size: 14px; transition: border-color 0.3s;
}
.btn-social:hover { border-color: #ff8a65; background: rgba(255,255,255,0.02); }

.btn-social.google .icon-text { color: #ea4335; font-weight: bold; font-size: 16px; }
.btn-social.apple .icon-text { color: #fff; font-size: 18px; margin-top: -2px; }

/* --- DIVIDER --- */
.divider { display: flex; align-items: center; margin: 25px 0; color: #555; font-size: 12px; }
.divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: #333; }
.divider span { padding: 0 10px; }

/* --- FORM INPUTS --- */
.form-group { text-align: left; margin-bottom: 18px; }
.form-group label { display: block; font-size: 13px; color: #aaa; margin-bottom: 6px; }
.form-group input {
  width: 100%; padding: 12px; box-sizing: border-box;
  background: #0a0810; /* Input sangat gelap */
  border: 1px solid #333;
  border-radius: 8px; color: white; outline: none; transition: border-color 0.3s;
}
.form-group input:focus { border-color: #8b5cf6; }

/* --- CLOUDFLARE WIDGET MOCK --- */
.cloudflare-mock {
  background: #222; border: 1px solid #444;
  padding: 10px 15px; border-radius: 4px;
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; cursor: default;
  width: fit-content;
}
.check-circle {
  width: 20px; height: 20px; background: #00c853;
  border-radius: 50%; color: white; font-size: 12px; font-weight: bold;
  display: flex; align-items: center; justify-content: center;
}
.cf-text { font-size: 14px; font-weight: 500; }
.cf-logo { margin-left: 20px; font-size: 9px; color: #888; letter-spacing: 0.5px; }

/* --- MAIN BUTTON (ORANGE) --- */
.btn-primary-auth {
  width: 100%;
  background: linear-gradient(90deg, #ff8a65, #ff6d00); /* Orange Gradient */
  border: none; padding: 14px; border-radius: 8px;
  color: white; font-weight: bold; font-size: 16px; cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 109, 0, 0.3);
  margin-bottom: 20px; transition: transform 0.2s;
}
.btn-primary-auth:hover { transform: translateY(-2px); }

/* --- FOOTER --- */
.auth-footer { display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #888; }
.auth-footer a { color: #ff8a65; text-decoration: none; font-weight: 500; }
.auth-footer a:hover { text-decoration: underline; }
</style>
