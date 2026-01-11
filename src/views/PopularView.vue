<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// Import Ikon
import {
  PhArrowLeft, PhTrophy, PhStar, PhPlay,
  PhChartLineUp,PhFire, PhMedal
} from '@phosphor-icons/vue';

const router = useRouter();
const selectedFilter = ref('Minggu Ini');
const popularPuzzles = ref([]);

// --- 1. AMBIL GAMBAR DARI ASSETS ---
const allImages = import.meta.glob('@/assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

onMounted(() => {
  const loadedData = [];

  for (const path in allImages) {
    // Parsing path: /src/assets/Hewan/kucing.jpg
    const parts = path.split('/');
    const assetsIndex = parts.indexOf('assets');

    if (assetsIndex !== -1 && parts.length > assetsIndex + 2) {
      const folderName = parts[assetsIndex + 1]; // Kategori
      const fileName = parts[parts.length - 1].split('.')[0]; // Nama File

      // Format Teks
      const titleName = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const categoryName = folderName.charAt(0).toUpperCase() + folderName.slice(1);

      // --- SIMULASI STATISTIK ---
      // Kita acak angka agar terlihat hidup
      const completions = Math.floor(Math.random() * 8000) + 500; // 500 - 8500 main
      const rating = (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1); // Rating 4.2 - 5.0

      loadedData.push({
        id: path,
        title: titleName,
        category: categoryName,
        img: allImages[path].default,
        rating: rating,
        completions: completions,
        isTrending: Math.random() > 0.7 // 30% kemungkinan trending
      });
    }
  }

  // URUTKAN DARI YANG TERBANYAK DIMAINKAN
  popularPuzzles.value = loadedData
    .sort((a, b) => b.completions - a.completions)
    .slice(0, 12); // Ambil Top 12
});

const goHome = () => router.push('/');

const startGame = (puzzle) => {
  router.push({
    path: '/game',
    query: { img: puzzle.img, title: puzzle.title }
  });
};
</script>

<template>
  <div class="page-container">

    <div class="blobs-container">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
    </div>

    <div class="header-section">
      <div class="header-inner">

        <div class="header-top">
          <button @click="goHome" class="btn-back">
            <PhArrowLeft weight="bold" size="18" />
            <span>Beranda</span>
          </button>
        </div>

        <div class="header-main">

          <div class="hero-text animate-enter">
            <div class="title-row">
              <div class="icon-badge gold">
                <PhTrophy size="32" weight="duotone" />
              </div>
              <h1>Paling Populer</h1>
            </div>
            <p>Puzzle favorit juara yang paling sering dimainkan.</p>
          </div>

          <div class="filter-wrapper animate-enter" style="animation-delay: 0.1s">
            <button
              v-for="filter in ['Minggu Ini', 'Bulan Ini', 'Semua']"
              :key="filter"
              class="filter-btn"
              :class="{ active: selectedFilter === filter }"
              @click="selectedFilter = filter"
            >
              {{ filter }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="content-area">
      <div class="grid-container animate-enter" style="animation-delay: 0.2s">

        <div
          v-for="(puzzle, index) in popularPuzzles"
          :key="puzzle.id"
          class="puzzle-card"
          @click="startGame(puzzle)"
        >
          <div v-if="index < 3" class="rank-ribbon" :class="`rank-${index + 1}`">
            <PhMedal weight="fill" size="16"/> #{{ index + 1 }}
          </div>

          <div class="card-image">
            <img :src="puzzle.img" :alt="puzzle.title" loading="lazy" />

            <div class="overlay">
              <div class="play-icon-circle">
                <PhPlay weight="fill" size="32" />
              </div>
            </div>

            <div class="rating-badge">
              <PhStar weight="fill" color="#fbbf24" /> {{ puzzle.rating }}
            </div>
          </div>

          <div class="card-info">
            <div class="info-header">
              <span class="category-text">{{ puzzle.category }}</span>
              <span v-if="puzzle.isTrending" class="trending-tag">
                <PhFire weight="fill" /> Trending
              </span>
            </div>

            <h3>{{ puzzle.title }}</h3>

            <div class="stats-bar">
              <div class="stat">
                <PhChartLineUp size="16" weight="bold"/>
                <span>{{ puzzle.completions.toLocaleString() }} Main</span>
              </div>
            </div>
          </div>
        </div>

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

.blobs-container { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: var(--blob-opacity); }
.b1 { top: -20%; right: -10%; width: 50vw; height: 50vw; background: var(--accent); }
.b2 { bottom: -10%; left: -10%; width: 60vw; height: 60vw; background: #fbbf24; opacity: 0.3; }

/* Animasi */
.animate-enter { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

/* ========================
   HEADER SECTION
   ======================== */
.header-section {
  position: sticky; top: 0; z-index: 50; padding: 20px 24px;
  background: var(--nav-bg); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--card-border);
}

.header-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

/* Tombol Kembali (Bentuk Pil) */
.header-top { display: flex; align-items: flex-start; }

.btn-back {
  display: flex; align-items: center; gap: 8px;
  background: var(--card-bg); border: 1px solid var(--btn-border);
  color: var(--text-muted); padding: 8px 16px; border-radius: 30px;
  font-weight: 600; font-size: 0.9rem;
  cursor: pointer; transition: 0.2s;
}
.btn-back:hover { background: var(--accent); color: white; border-color: var(--accent); }

/* Header Main */
.header-main {
  display: flex; align-items: flex-end; justify-content: space-between;
  flex-wrap: wrap; gap: 20px;
}

.hero-text { text-align: left; }
.title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }

.icon-badge {
  width: 48px; height: 48px; border-radius: 12px;
  background: var(--input-bg); border: 1px solid var(--card-border);
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--card-shadow); color: var(--accent);
}
.icon-badge.gold { color: #fbbf24; border-color: rgba(251, 191, 36, 0.3); }

.hero-text h1 { font-size: 2rem; font-weight: 800; margin: 0; line-height: 1; }
.hero-text p { color: var(--text-muted); font-size: 1rem; margin: 0; }

/* Filter Tabs */
.filter-wrapper {
  display: flex; gap: 6px;
  background: var(--input-bg); padding: 6px; border-radius: 16px;
  border: 1px solid var(--input-border);
}

.filter-btn {
  background: transparent; border: none;
  color: var(--text-muted); padding: 8px 16px; border-radius: 12px;
  font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: 0.2s;
}
.filter-btn:hover { color: var(--text-main); background: rgba(0,0,0,0.05); }
.filter-btn.active { background: var(--accent); color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }

/* ========================
   GRID KONTEN
   ======================== */
.content-area {
  flex: 1; padding: 30px 24px; z-index: 1;
  max-width: 1200px; margin: 0 auto; width: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

/* CARD DESIGN PREMIUM */
.puzzle-card {
  position: relative;
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: 20px; overflow: hidden; cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: var(--card-shadow);
  display: flex; flex-direction: column;
}
.puzzle-card:hover {
  transform: translateY(-8px); border-color: var(--accent);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

/* Rank Ribbon */
.rank-ribbon {
  position: absolute; top: 12px; left: 12px; z-index: 10;
  padding: 6px 12px; border-radius: 8px;
  font-weight: 800; color: white; font-size: 0.85rem;
  display: flex; align-items: center; gap: 5px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.rank-1 { background: linear-gradient(135deg, #FFD700, #FDB931); } /* Emas */
.rank-2 { background: linear-gradient(135deg, #C0C0C0, #E0E0E0); color: #444; } /* Perak */
.rank-3 { background: linear-gradient(135deg, #CD7F32, #A0522D); } /* Perunggu */

/* Image */
.card-image { position: relative; height: 180px; overflow: hidden; }
.card-image img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
.puzzle-card:hover .card-image img { transform: scale(1.1); }

/* Overlay & Play Button */
.overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.2);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: 0.3s;
}
.puzzle-card:hover .overlay { opacity: 1; background: rgba(0,0,0,0.3); }

.play-icon-circle {
  width: 60px; height: 60px; border-radius: 50%;
  background: rgba(255,255,255,0.9); color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  transform: scale(0.8); transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
.puzzle-card:hover .play-icon-circle { transform: scale(1); }

/* Rating Badge */
.rating-badge {
  position: absolute; bottom: 10px; right: 10px;
  background: rgba(0,0,0,0.75); backdrop-filter: blur(4px);
  color: white; font-size: 0.8rem; font-weight: bold;
  padding: 4px 10px; border-radius: 20px; display: flex; align-items: center; gap: 4px;
}

/* Info Section */
.card-info { padding: 16px; display: flex; flex-direction: column; gap: 6px; }

.info-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.category-text { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.trending-tag {
  font-size: 0.7rem; color: #ef4444; font-weight: 700;
  display: flex; align-items: center; gap: 4px;
  background: rgba(239, 68, 68, 0.1); padding: 2px 6px; border-radius: 4px;
}

.card-info h3 {
  font-size: 1.15rem; margin: 0; color: var(--text-main);
  font-weight: 700; line-height: 1.3;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.stats-bar { margin-top: 6px; display: flex; align-items: center; gap: 10px; }
.stat {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.85rem; color: var(--text-muted); font-weight: 500;
}
.stat svg { color: var(--accent); }

/* RESPONSIVE */
@media (max-width: 768px) {
  .header-main { flex-direction: column; align-items: flex-start; gap: 15px; }
  .filter-wrapper { width: 100%; overflow-x: auto; justify-content: flex-start; }
}

@media (max-width: 600px) {
  .header-section { padding: 15px 20px; }
  .grid-container { grid-template-columns: 1fr; gap: 15px; } /* 1 Kolom Full di HP */
  .card-image { height: 200px; } /* Gambar lebih tinggi di HP */
  .hero-text h1 { font-size: 1.6rem; }
}
</style>
