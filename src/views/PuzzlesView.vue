<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Import Ikon
import {
  PhArrowLeft, PhMagnifyingGlass, PhPlay,
  PhPuzzlePiece, PhImages, PhSmileySad, PhSquaresFour
} from '@phosphor-icons/vue';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const currentCategory = ref('');
const puzzles = ref([]);

// --- 1. LOGIKA BACA ASSETS OTOMATIS ---
const allImages = import.meta.glob('@/assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

const loadPuzzles = () => {
  const targetCategory = route.query.category;
  currentCategory.value = targetCategory;

  const loadedPuzzles = [];

  for (const path in allImages) {
    const parts = path.split('/');
    const assetsIndex = parts.indexOf('assets');

    if (assetsIndex !== -1 && parts.length > assetsIndex + 2) {
      const folderName = parts[assetsIndex + 1];

      const isMatch = targetCategory
        ? folderName.toLowerCase() === targetCategory.toLowerCase()
        : true;

      if (isMatch) {
        const fileName = parts[parts.length - 1].split('.')[0];
        const displayName = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        loadedPuzzles.push({
          id: path,
          title: displayName,
          image: allImages[path].default,
          category: folderName,
          difficulty: 'Mudah'
        });
      }
    }
  }
  puzzles.value = loadedPuzzles;
};

onMounted(loadPuzzles);
watch(() => route.query.category, loadPuzzles);

// --- 2. SEARCH & NAVIGASI ---
const filteredPuzzles = computed(() => {
  if (!searchQuery.value) return puzzles.value;
  return puzzles.value.filter(p =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const playPuzzle = (puzzle) => {
  router.push({
    path: '/game',
    query: { img: puzzle.image, title: puzzle.title }
  });
};

const goBack = () => router.push('/categories');
</script>

<template>
  <div class="page-container">

    <div class="blobs-container">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
    </div>

    <div class="header-section glass-header">
      <div class="header-inner">

        <div class="header-top">
          <button @click="goBack" class="btn-back">
            <PhArrowLeft weight="bold" size="18" />
            <span>Kategori</span>
          </button>
        </div>

        <div class="header-main">

          <div class="hero-text animate-enter">
            <div class="title-row">
              <div class="icon-badge">
                <PhImages size="28" weight="duotone" v-if="currentCategory"/>
                <PhSquaresFour size="28" weight="duotone" v-else/>
              </div>
              <h1>{{ currentCategory ? currentCategory : 'Semua Puzzle' }}</h1>
            </div>

            <p v-if="currentCategory">Koleksi gambar pilihan dari tema {{ currentCategory }}.</p>
            <p v-else>Jelajahi seluruh koleksi puzzle yang tersedia.</p>

            <div class="stats-pill" v-if="puzzles.length > 0">
              <PhPuzzlePiece weight="bold"/> {{ puzzles.length }} Gambar Tersedia
            </div>
          </div>

          <div class="search-wrapper animate-enter" style="animation-delay: 0.1s">
            <div class="search-bar">
              <PhMagnifyingGlass size="20" class="search-icon"/>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari gambar..."
              />
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="content-area">

      <div v-if="filteredPuzzles.length > 0" class="grid-container animate-enter" style="animation-delay: 0.2s">
        <div
          v-for="item in filteredPuzzles"
          :key="item.id"
          class="puzzle-card"
        >
          <div class="card-image">
            <img :src="item.image" :alt="item.title" loading="lazy" />

            <div class="overlay">
              <button class="btn-play" @click="playPuzzle(item)">
                <PhPlay weight="fill" size="24" /> Mainkan
              </button>
            </div>
          </div>

          <div class="card-info">
            <div class="info-top">
              <span class="category-badge">{{ item.category }}</span>
              <span class="level-text">{{ item.difficulty }}</span>
            </div>
            <h3>{{ item.title }}</h3>
          </div>
        </div>
      </div>

      <div v-else class="empty-state animate-enter">
        <div class="icon-empty">
          <PhSmileySad size="64" weight="duotone" v-if="currentCategory"/>
          <PhImages size="64" weight="duotone" v-else/>
        </div>

        <h3 v-if="currentCategory">Folder "{{ currentCategory }}" Kosong</h3>
        <h3 v-else>Tidak Ada Puzzle</h3>

        <p v-if="currentCategory">
          Pastikan folder <code>src/assets/{{ currentCategory }}</code> berisi gambar.
        </p>
        <p v-else>Belum ada gambar apapun di folder assets.</p>

        <button @click="goBack" class="btn-home">Pilih Kategori Lain</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ========================
   GLOBAL LAYOUT
   ======================== */
.page-container {
  min-height: 100vh; width: 100%; position: relative; overflow-x: hidden;
  background-color: var(--bg-color); color: var(--text-main);
  display: flex; flex-direction: column;
}

/* Background Blobs */
.blobs-container { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: var(--blob-opacity); }
.b1 { top: -10%; left: -10%; width: 60vw; height: 60vw; background: var(--accent); }
.b2 { bottom: -10%; right: -10%; width: 60vw; height: 60vw; background: #3b82f6; opacity: 0.5; }

/* Animasi Masuk */
.animate-enter { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

/* ========================
   HEADER SECTION (GLASS / TRANSPARAN)
   ======================== */
.header-section {
  position: sticky; top: 0; z-index: 50; padding: 20px 24px;

  /* Efek Kaca (Glassmorphism) */
  background: rgba(255, 255, 255, 0.05); /* Sangat bening */
  backdrop-filter: blur(20px); /* Blur kuat */
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

.header-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

/* Tombol Kembali (Transparan) */
.header-top { display: flex; align-items: flex-start; }

.btn-back {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255, 255, 255, 0.15); /* Transparan */
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: var(--text-muted); padding: 8px 16px; border-radius: 30px;
  font-weight: 600; font-size: 0.9rem;
  cursor: pointer; transition: 0.2s;
}
.btn-back:hover { background: var(--accent); color: white; border-color: var(--accent); }

/* Header Main (Judul & Search) */
.header-main {
  display: flex; align-items: flex-end; justify-content: space-between;
  flex-wrap: wrap; gap: 20px;
}

.hero-text { text-align: left; }
.title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }

.icon-badge {
  width: 48px; height: 48px; border-radius: 12px;
  background: rgba(255, 255, 255, 0.1); /* Transparan */
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: var(--accent);
  display: flex; align-items: center; justify-content: center;
}

.hero-text h1 { font-size: 2rem; font-weight: 800; margin: 0; line-height: 1; text-transform: capitalize; }
.hero-text p { color: var(--text-muted); font-size: 1rem; margin: 0; }

.stats-pill {
  margin-top: 8px; display: inline-flex; align-items: center; gap: 6px;
  background: rgba(124, 58, 237, 0.1); color: var(--accent);
  padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;
  border: 1px solid rgba(124, 58, 237, 0.2);
}

/* Search Bar (Transparan) */
.search-wrapper { width: 100%; max-width: 320px; }
.search-bar {
  display: flex; align-items: center;
  background: rgba(255, 255, 255, 0.1); /* Transparan */
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 16px; padding: 12px 16px; transition: 0.3s;
}
.search-bar:focus-within {
  background: var(--input-bg); /* Solid saat aktif */
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}
.search-icon { color: var(--text-muted); margin-right: 12px; }
.search-bar input { width: 100%; background: transparent; border: none; outline: none; font-size: 1rem; color: var(--text-main); }

/* ========================
   GRID PUZZLE
   ======================== */
.content-area {
  flex: 1; padding: 30px 24px; z-index: 1;
  max-width: 1200px; margin: 0 auto; width: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

/* CARD DESIGN */
.puzzle-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: 20px; overflow: hidden; box-shadow: var(--card-shadow);
  transition: 0.3s; display: flex; flex-direction: column;
}
.puzzle-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); border-color: var(--accent); }

/* Image */
.card-image { position: relative; height: 180px; overflow: hidden; }
.card-image img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
.puzzle-card:hover .card-image img { transform: scale(1.1); }

/* Overlay Play */
.overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: 0.3s;
}
.puzzle-card:hover .overlay { opacity: 1; }

.btn-play {
  background: var(--accent); color: white; border: none;
  padding: 10px 24px; border-radius: 30px; font-weight: bold; font-size: 1rem;
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  transform: translateY(20px); transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.puzzle-card:hover .btn-play { transform: translateY(0); }

/* Info */
.card-info { padding: 16px; display: flex; flex-direction: column; gap: 8px; }

.info-top { display: flex; justify-content: space-between; align-items: center; }
.category-badge {
  font-size: 0.7rem; background: var(--btn-bg); color: var(--text-muted);
  padding: 4px 8px; border-radius: 6px; border: 1px solid var(--card-border);
  text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;
}
.level-text { font-size: 0.75rem; color: #10b981; font-weight: 600; }

.card-info h3 {
  font-size: 1.1rem; margin: 0; color: var(--text-main);
  font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* Empty State */
.empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
.icon-empty { margin-bottom: 20px; opacity: 0.5; }
.btn-home { margin-top: 20px; background: var(--accent); color: white; border: none; padding: 10px 24px; border-radius: 12px; font-weight: bold; cursor: pointer; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .header-main { flex-direction: column; align-items: flex-start; gap: 15px; }
  .search-wrapper { max-width: 100%; }
}

@media (max-width: 600px) {
  .header-section { padding: 15px 20px; }
  .grid-container { grid-template-columns: repeat(2, 1fr); gap: 15px; } /* 2 Kolom di HP */
  .card-image { height: 140px; }
  .card-info h3 { font-size: 0.95rem; }
}
</style>
