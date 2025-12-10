<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const nameInput = ref('');
const emailInput = ref('');
const passwordInput = ref('');

const handleRegister = () => {
  if (nameInput.value && emailInput.value && passwordInput.value) {
    localStorage.setItem('puzzleUser', nameInput.value);
    router.push('/');
  } else {
    alert("Mohon lengkapi data pendaftaran.");
  }
};
</script>

<template>
  <div class="auth-page">
    <router-link to="/" class="back-link">← Kembali ke Beranda</router-link>

    <div class="auth-card">
      <h2>Buat Akun Baru</h2>
      <p class="subtitle">Bergabunglah dan mainkan ribuan puzzle seru.</p>

      <div class="social-buttons">
        <button class="btn-social google">
          <span class="icon-text">G</span> Daftar dengan Google
        </button>
      </div>

      <div class="divider"><span>atau daftar dengan email</span></div>

      <div class="form-group">
        <label>Nama Lengkap</label>
        <input v-model="nameInput" type="text" placeholder="Nama Anda" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="emailInput" type="email" placeholder="nama@email.com" />
      </div>
      <div class="form-group">
        <label>Kata Sandi</label>
        <input v-model="passwordInput" type="password" placeholder="Buat sandi" />
      </div>

      <button class="btn-primary-auth" @click="handleRegister">➔ Daftar Sekarang</button>

      <div class="auth-footer">
        <span>Sudah punya akun? <router-link to="/masuk">Masuk di sini</router-link></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS Ditanam Langsung agar tidak Error */
.auth-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background-color: #0f0c16; color: white; position: relative;
  background-image: radial-gradient(circle at 50% 50%, #2d1b4e 0%, #0f0c16 80%);
}
.back-link { position: absolute; top: 30px; left: 30px; color: #aaa; text-decoration: none; }
.auth-card {
  width: 100%; max-width: 400px; background: rgba(20, 15, 30, 0.8);
  padding: 40px; border-radius: 16px; border: 1px solid #2d2640; text-align: center;
  backdrop-filter: blur(10px);
}
h2 { margin-bottom: 10px; }
.subtitle { color: #888; font-size: 14px; margin-bottom: 20px; }
.social-buttons { display: flex; flex-direction: column; gap: 10px; }
.btn-social { background: transparent; border: 1px solid #444; color: white; padding: 10px; border-radius: 8px; cursor: pointer; }
.divider { margin: 20px 0; color: #555; font-size: 12px; }
.form-group { text-align: left; margin-bottom: 15px; }
.form-group input { width: 100%; padding: 12px; background: #0a0810; border: 1px solid #333; border-radius: 8px; color: white; }
.btn-primary-auth {
  width: 100%; background: linear-gradient(90deg, #00c853, #009624);
  border: none; padding: 12px; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; margin-top: 10px;
}
.auth-footer { margin-top: 20px; font-size: 13px; color: #888; }
.auth-footer a { color: #00c853; text-decoration: none; }
</style>
