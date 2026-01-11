<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  PhArrowLeft, PhMagnifyingGlass, PhCaretRight,
  PhFolderDashed, PhPuzzlePiece, PhSquaresFour, PhTag
} from '@phosphor-icons/vue';

const router = useRouter();
const searchQuery = ref('');
const categories = ref([]);

// --- LOGIKA PEMBACAAN ASSETS ---
const allImages = import.meta.glob('@/assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

onMounted(() => {
  const groups = {};

  for (const path in allImages) {
    const parts = path.split('/');
    const assetsIndex = parts.indexOf('assets');

    if (assetsIndex !== -1 && parts.length > assetsIndex + 2) {
      const folderName = parts[assetsIndex + 1];

      if (folderName.includes('.')) continue;

      if (!groups[folderName]) {
        const displayName = folderName.charAt(0).toUpperCase() + folderName.slice(1);

        groups[folderName] = {
          id: folderName,
          name: displayName,
          image: allImages[path].default,
          count: 0
        };
      }
      groups[folderName].count++;
    }
  }
  categories.value = Object.values(groups);
});

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;
  return categories.value.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectCategory = (categoryId) => {
  router.push({ path: '/puzzles', query: { category: categoryId } });
};

const goBack = () => router.push('/');
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
            <span>Kembali</span>
          </button>
        </div>

        <div class="header-main">

          <div class="hero-text animate-enter">
            <div class="title-row">
              <div class="icon-badge">
                <PhSquaresFour size="28" weight="duotone" />
              </div>
              <h1>Kategori</h1>
            </div>
            <p>Pilih tema favoritmu dan mulai main.</p>

            <div class="stats-pill" v-if="categories.length > 0">
              <PhTag weight="bold"/> {{ categories.length }} Tema
            </div>
          </div>

          <div class="search-wrapper animate-enter" style="animation-delay: 0.1s">
            <div class="search-bar">
              <PhMagnifyingGlass size="20" class="search-icon"/>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari tema..."
              />
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="content-area">
      <div v-if="filteredCategories.length > 0" class="grid-container animate-enter" style="animation-delay: 0.2s">

        <div
          v-for="cat in filteredCategories"
          :key="cat.id"
          class="category-card"
          @click="selectCategory(cat.id)"
        >
          <div class="card-image">
            <img :src="cat.image" :alt="cat.name" loading="lazy" />
            <div class="overlay-gradient"></div>
          </div>

          <div class="card-body">
            <div class="text-info">
              <span class="puzzle-count">
                <PhPuzzlePiece weight="fill" /> {{ cat.count }} Puzzle
              </span>
              <h3>{{ cat.name }}</h3>
            </div>
            <button class="action-btn">
              <PhCaretRight size="18" weight="bold" />
            </button>
          </div>
        </div>

      </div>

      <div v-else class="empty-state animate-enter">
        <div class="icon-empty"><PhFolderDashed size="64" weight="duotone"/></div>
        <h3>Tidak Ditemukan</h3>
        <p v-if="categories.length === 0">
          Folder <code>src/assets/</code> kosong.
        </p>
        <p v-else>Tidak ada kategori "{{ searchQuery }}"</p>
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
.b1 { top: -20%; left: -10%; width: 50vw; height: 50vw; background: var(--accent); }
.b2 { top: 40%; right: -20%; width: 50vw; height: 50vw; background: #3b82f6; opacity: 0.5; }

/* Animasi */
.animate-enter { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

/* ========================
   HEADER SECTION (TRANSPARAN / GLASS)
   ======================== */
.header-section {
  position: sticky; top: 0; z-index: 50;
  padding: 20px 24px;

  /* EFEK TRANSPARAN & BLUR */
  background: rgba(255, 255, 255, 0.05); /* Sangat bening */
  backdrop-filter: blur(20px); /* Efek kaca buram yang kuat */
  -webkit-backdrop-filter: blur(20px); /* Support Safari */

  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Garis batas tipis */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); /* Bayangan halus */
}

/* Jika Dark Mode (Opsional, agar tetap terbaca) */
:global(.dark) .header-section {
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

/* 1. Baris Atas: Tombol Kembali */
.header-top { display: flex; align-items: flex-start; }

.btn-back {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255, 255, 255, 0.15); /* Transparan */
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-main); padding: 8px 16px; border-radius: 30px;
  font-weight: 600; font-size: 0.9rem;
  cursor: pointer; transition: 0.2s;
  backdrop-filter: blur(5px);
}
.btn-back:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

/* 2. Baris Utama */
.header-main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.hero-text { text-align: left; }

.title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }

.icon-badge {
  width: 48px; height: 48px;
  background: rgba(255, 255, 255, 0.1); /* Transparan */
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.hero-text h1 { font-size: 2rem; font-weight: 800; margin: 0; line-height: 1; }
.hero-text p { color: var(--text-muted); font-size: 1rem; margin: 0; }

.stats-pill {
  margin-top: 8px; display: inline-flex; align-items: center; gap: 6px;
  background: rgba(124, 58, 237, 0.1); color: var(--accent);
  padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;
  border: 1px solid rgba(124, 58, 237, 0.2);
}

/* Search Bar Transparan */
.search-wrapper { width: 100%; max-width: 320px; }
.search-bar {
  display: flex; align-items: center;
  background: rgba(255, 255, 255, 0.1); /* Transparan */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px; padding: 12px 16px; transition: 0.3s;
  backdrop-filter: blur(5px);
}
.search-bar:focus-within {
  background: var(--input-bg); /* Jadi solid saat diketik agar jelas */
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}
.search-icon { color: var(--text-muted); margin-right: 12px; }
.search-bar input { width: 100%; background: transparent; border: none; outline: none; font-size: 1rem; color: var(--text-main); }

/* ========================
   GRID KONTEN
   ======================== */
.content-area {
  flex: 1; padding: 30px 24px; z-index: 1;
  max-width: 1200px; margin: 0 auto; width: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* CARD */
.category-card {
  position: relative; background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: 24px; overflow: hidden; cursor: pointer;
  transition: all 0.4s; box-shadow: var(--card-shadow);
  display: flex; flex-direction: column; aspect-ratio: 4/3;
}
.category-card:hover { transform: translateY(-8px); border-color: var(--accent); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }

.card-image { position: absolute; inset: 0; z-index: 0; }
.card-image img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s; }
.category-card:hover .card-image img { transform: scale(1.1); }
.overlay-gradient { position: absolute; bottom: 0; left: 0; right: 0; height: 80%; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%); }

.card-body {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
  padding: 20px; display: flex; align-items: flex-end; justify-content: space-between;
}
.text-info h3 { color: white; font-size: 1.35rem; font-weight: 700; margin: 0; text-shadow: 0 2px 5px rgba(0,0,0,0.5); }
.puzzle-count { font-size: 0.8rem; color: rgba(255,255,255,0.9); display: flex; align-items: center; gap: 6px; font-weight: 500; margin-bottom: 4px; }

.action-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); color: white;
  border: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; transition: 0.3s;
}
.category-card:hover .action-btn { background: var(--accent); border-color: var(--accent); transform: rotate(-45deg); }

.empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }

/* ========================
   RESPONSIVE
   ======================== */
@media (max-width: 768px) {
  .header-main { flex-direction: column; align-items: flex-start; gap: 15px; }
  .search-wrapper { max-width: 100%; }
}

@media (max-width: 600px) {
  .header-section { padding: 15px 20px; }
  .grid-container { grid-template-columns: 1fr; gap: 20px; }
  .category-card { aspect-ratio: 16/10; }
  .hero-text h1 { font-size: 1.5rem; }
}
</style>
