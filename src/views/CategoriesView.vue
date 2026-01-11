<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Import Icons
import {
  PhArrowLeft, PhMagnifyingGlass, PhCaretRight,
  PhPawPrint, PhTree, PhCar, PhPlanet, PhPaintBrush,
  PhBuildings, PhSoccerBall, PhMusicNotes
} from '@phosphor-icons/vue';

const router = useRouter();
const searchQuery = ref('');

// Data Kategori (Bisa diganti dengan gambar dari src/assets jika ada)
const categories = ref([
  { id: 1, name: 'Hewan', count: 120, icon: PhPawPrint, color: 'orange' },
  { id: 2, name: 'Alam', count: 85, icon: PhTree, color: 'green' },
  { id: 3, name: 'Kendaraan', count: 94, icon: PhCar, color: 'blue' },
  { id: 4, name: 'Antariksa', count: 42, icon: PhPlanet, color: 'purple' },
  { id: 5, name: 'Seni', count: 67, icon: PhPaintBrush, color: 'pink' },
  { id: 6, name: 'Kota', count: 55, icon: PhBuildings, color: 'cyan' },
  { id: 7, name: 'Olahraga', count: 30, icon: PhSoccerBall, color: 'red' },
  { id: 8, name: 'Musik', count: 48, icon: PhMusicNotes, color: 'yellow' },
]);

// Fitur Pencarian Sederhana
const filteredCategories = () => {
  return categories.value.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const goBack = () => router.push('/');
</script>

<template>
  <div class="page-container">

    <div class="blobs-container">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
    </div>

    <div class="header-section">
      <button @click="goBack" class="btn-back">
        <PhArrowLeft weight="bold" /> Kembali
      </button>

      <div class="header-content">
        <h1>Kategori Puzzle</h1>
        <p>Pilih tema favoritmu dan mulai bermain!</p>
      </div>

      <div class="search-bar">
        <PhMagnifyingGlass size="20" class="search-icon"/>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari kategori..."
        />
      </div>
    </div>

    <div class="grid-container">
      <div
        v-for="cat in filteredCategories()"
        :key="cat.id"
        class="category-card"
        @click="router.push('/puzzles')"
      >
        <div class="card-icon" :class="cat.color">
          <component :is="cat.icon" size="32" weight="duotone" />
        </div>

        <div class="card-info">
          <h3>{{ cat.name }}</h3>
          <span>{{ cat.count }} Puzzle</span>
        </div>

        <button class="btn-arrow">
          <PhCaretRight size="20" weight="bold" />
        </button>
      </div>
    </div>

    <div v-if="filteredCategories().length === 0" class="empty-state">
      <p>Kategori tidak ditemukan 😔</p>
    </div>

  </div>
</template>

<style scoped>
/* ========================
   LAYOUT & BACKGROUND
   ======================== */
.page-container {
  min-height: 100vh;
  padding: 30px 20px;
  position: relative;
  overflow-x: hidden;
  max-width: 1200px;
  margin: 0 auto;
  /* Background otomatis dari App.vue */
}

/* Blobs Background */
.blobs-container { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: var(--blob-opacity); }
.b1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--accent); opacity: 0.2; }
.b2 { top: 20%; right: -20%; width: 40vw; height: 40vw; background: #3b82f6; opacity: 0.2; }

/* ========================
   HEADER
   ======================== */
.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
}

.btn-back {
  position: absolute; left: 0; top: 0;
  display: flex; align-items: center; gap: 8px;
  background: var(--card-bg); border: 1px solid var(--card-border);
  color: var(--text-muted); padding: 8px 16px; border-radius: 30px;
  font-weight: 600; cursor: pointer; transition: 0.2s;
  backdrop-filter: blur(10px);
}
.btn-back:hover { color: var(--text-main); border-color: var(--accent); }

.header-content h1 { font-size: 2.5rem; margin-bottom: 10px; margin-top: 40px; }
.header-content p { font-size: 1.1rem; color: var(--text-muted); }

/* Search Bar */
.search-bar {
  margin-top: 30px; width: 100%; max-width: 500px;
  display: flex; align-items: center;
  background: var(--input-bg); border: 1px solid var(--card-border);
  padding: 12px 20px; border-radius: 16px; transition: 0.3s;
}
.search-bar:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15); }
.search-icon { color: var(--text-muted); margin-right: 10px; }
.search-bar input {
  width: 100%; background: transparent; border: none; outline: none;
  font-size: 1rem; color: var(--text-main);
}
.search-bar input::placeholder { color: var(--text-muted); opacity: 0.7; }

/* ========================
   GRID KATEGORI
   ======================== */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
}

.category-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: var(--card-shadow);
}

.category-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

/* Icon Box */
.card-icon {
  width: 60px; height: 60px;
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; flex-shrink: 0;
}

/* Warna Ikon Dinamis */
.orange { background: rgba(249, 115, 22, 0.1); color: #f97316; }
.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
.pink { background: rgba(236, 72, 153, 0.1); color: #ec4899; }
.cyan { background: rgba(6, 182, 212, 0.1); color: #06b6d4; }
.red { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.yellow { background: rgba(234, 179, 8, 0.1); color: #eab308; }

/* Text Info */
.card-info { flex: 1; }
.card-info h3 { font-size: 1.1rem; margin-bottom: 4px; color: var(--text-main); }
.card-info span { font-size: 0.85rem; color: var(--text-muted); }

/* Arrow Button */
.btn-arrow {
  width: 36px; height: 36px;
  border-radius: 50%; border: none;
  background: var(--input-bg); color: var(--text-muted);
  display: flex; align-items: center; justify-content: center;
  transition: 0.2s;
}
.category-card:hover .btn-arrow {
  background: var(--accent); color: white;
}

/* Empty State */
.empty-state { text-align: center; margin-top: 50px; color: var(--text-muted); font-size: 1.2rem; }

/* ========================
   RESPONSIVE
   ======================== */
@media (max-width: 600px) {
  .header-section { align-items: flex-start; text-align: left; }
  .btn-back { position: relative; margin-bottom: 20px; }
  .header-content h1 { margin-top: 0; font-size: 2rem; }
  .grid-container { grid-template-columns: 1fr; } /* 1 Kolom di HP */
}
</style>
