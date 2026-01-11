<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

// Saat web dibuka, cek apakah pengguna sebelumnya memilih mode 'light'
onMounted(() => {
  const savedTheme = localStorage.getItem('puzzleTheme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
});
</script>

<template>
  <RouterView />
</template>

<style>
/* =========================================
   1. DATABASE WARNA (VARIABLES)
   ========================================= */

/* DEFAULT: DARK MODE */
:root {
  --bg-color: #0f0518;
  --text-main: #ffffff;
  --text-muted: #d1d5db;

  --nav-bg: rgba(15, 5, 24, 0.95);
  --nav-blur: 15px;

  --card-bg: rgba(255, 255, 255, 0.05);
  --card-border: rgba(255, 255, 255, 0.1);
  --card-shadow: 0 4px 15px rgba(0,0,0,0.2);

  --accent: #d946ef;           /* Pink/Ungu Neon */
  --btn-bg: rgba(255,255,255,0.1);
  --btn-border: rgba(255,255,255,0.2);
  --btn-text: #ffffff;

  --input-bg: #1a1625;

  /* Gradient & Blobs untuk Background */
  --section-gradient: linear-gradient(180deg, rgba(36, 11, 54, 0.95) 0%, rgba(74, 20, 140, 0.95) 100%);
  --blob-opacity: 0.4;
  --text-grad-start: #d946ef;
  --text-grad-end: #fbbf24;
}

/* LIGHT MODE (Diaktifkan jika body punya class .light-theme) */
body.light-theme {
  --bg-color: #ffffff;
  --text-main: #111827;        /* Hitam Pekat */
  --text-muted: #4b5563;       /* Abu Gelap */

  --nav-bg: rgba(255, 255, 255, 0.95);
  --nav-blur: 20px;

  --card-bg: #f8fafc;          /* Abu Sangat Terang */
  --card-border: #cbd5e1;      /* Border Abu Jelas */
  --card-shadow: 0 10px 25px rgba(0,0,0,0.1);

  --accent: #7c3aed;           /* Ungu Gelap */
  --btn-bg: #f1f5f9;
  --btn-border: #cbd5e1;
  --btn-text: #1f293b;

  --input-bg: #ffffff;

  --section-gradient: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
  --blob-opacity: 0.15;        /* Blob lebih transparan di putih */
  --text-grad-start: #7c3aed;
  --text-grad-end: #ea580c;    /* Oranye Tua */
}

/* =========================================
   2. GLOBAL RESET
   ========================================= */
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;

  /* Terapkan variabel background & warna teks ke seluruh body */
  background-color: var(--bg-color);
  color: var(--text-main);

  /* Transisi halus saat ganti mode */
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Agar semua link & heading mengikuti warna tema */
a { text-decoration: none; color: inherit; }
h1, h2, h3, h4, h5, h6 { color: var(--text-main); }
p { color: var(--text-muted); }

/* Scrollbar Kustom (Opsional) */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-color); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 4px; }
</style>
