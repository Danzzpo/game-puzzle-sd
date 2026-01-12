<script setup>
import { RouterView } from 'vue-router'
// TAMBAHKAN INI: Import useDark dari VueUse
import { useDark } from '@vueuse/core'

// TAMBAHKAN INI: Inisialisasi tema saat aplikasi dimuat
// Ini otomatis mengecek preferensi sistem & localStorage
useDark();
</script>

<template>
  <RouterView />
</template>

<style>
/* =========================================
   1. RESET & FONT
   ========================================= */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;

  /* Gunakan Variabel */
  background-color: var(--bg-color);
  color: var(--text-main);
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden; /* Mencegah scroll horizontal */
}

/* =========================================
   2. DATABASE WARNA (GLOBAL VARIABLES)
   ========================================= */

/* A. TEMA TERANG (DEFAULT / LIGHT MODE) */
:root {
  --bg-color: #f8fafc;
  --bg-gradient: radial-gradient(circle at 50% 0%, #e0e7ff 0%, #f1f5f9 100%);

  --text-main: #0f172a;
  --text-muted: #64748b;

  --nav-bg: rgba(255, 255, 255, 0.85);
  --nav-blur: 16px;

  --card-bg: #ffffff;
  --card-border: #e2e8f0;
  --card-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  --input-bg: #ffffff;
  --input-border: #cbd5e1;

  --accent: #7c3aed; /* Ungu Modern */
  --btn-bg: #f1f5f9;
  --btn-border: #e2e8f0;

  --blob-opacity: 0.15;
}

/* B. TEMA GELAP (DARK MODE - Override) */
/* Class 'dark' ini akan otomatis ditambahkan oleh useDark() */
html.dark {
  --bg-color: #0f0518;
  --bg-gradient: radial-gradient(circle at 50% 0%, #2e1065 0%, #0f0518 80%);

  --text-main: #f8fafc;
  --text-muted: #94a3b8;

  --nav-bg: rgba(15, 5, 24, 0.85);

  --card-bg: rgba(30, 41, 59, 0.4);
  --card-border: rgba(255, 255, 255, 0.1);
  --card-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);

  --input-bg: rgba(15, 23, 42, 0.6);
  --input-border: rgba(255, 255, 255, 0.1);

  --accent: #d946ef; /* Ungu Neon */
  --btn-bg: rgba(255, 255, 255, 0.05);
  --btn-border: rgba(255, 255, 255, 0.1);

  --blob-opacity: 0.4;
}

/* Scrollbar Custom */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 10px; opacity: 0.5; }
</style>
