<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Data Dummy Puzzle (Contoh)
const puzzles = [
  { id: 1, title: "Burung Tropis", img: "https://picsum.photos/id/237/300/300", category: "Hewan" },
  { id: 2, title: "Kota Malam", img: "https://picsum.photos/id/122/300/300", category: "Kota" },
  { id: 3, title: "Kucing Lucu", img: "https://picsum.photos/id/40/300/300", category: "Hewan" },
  { id: 4, title: "Pemandangan", img: "https://picsum.photos/id/10/300/300", category: "Alam" },
  { id: 5, title: "Mobil Klasik", img: "https://picsum.photos/id/111/300/300", category: "Otomotif" },
  { id: 6, title: "Abstrak", img: "https://picsum.photos/id/106/300/300", category: "Seni" },
];

const goHome = () => router.push('/');
</script>

<template>
  <div class="puzzles-page">
    <div class="header">
      <button @click="goHome" class="back-btn">← Home</button>
      <h1>🧩 Katalog Puzzle</h1>
      <p>Temukan dan mainkan puzzle buatan komunitas.</p>
    </div>

    <div class="filter-bar">
      <div class="search-box">
        <span class="icon">🔍</span>
        <input type="text" placeholder="Cari puzzle..." />
      </div>
      <select class="category-select">
        <option>Semua Kategori</option>
        <option>Hewan</option>
        <option>Pemandangan</option>
      </select>
    </div>

    <div class="puzzle-grid">
      <div v-for="puzzle in puzzles" :key="puzzle.id" class="puzzle-card">
        <div class="card-img">
          <img :src="puzzle.img" :alt="puzzle.title">
          <div class="overlay">
            <button>▶ Mainkan</button>
          </div>
        </div>
        <div class="card-info">
          <h3>{{ puzzle.title }}</h3>
          <span>{{ puzzle.category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.puzzles-page {
  min-height: 100vh;
  background-color: #130f1e;
  color: white;
  padding: 40px 80px;
  font-family: 'Poppins', sans-serif;
}

.header { margin-bottom: 40px; }
.back-btn { background: none; border: none; color: #8b5cf6; cursor: pointer; margin-bottom: 10px; font-weight: bold;}
h1 { font-size: 2.5rem; margin: 0; }
.header p { color: #aaa; margin-top: 5px; }

.filter-bar {
  display: flex; gap: 20px; margin-bottom: 40px;
  background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; border: 1px solid #333;
}
.search-box {
  display: flex; align-items: center; background: #0a0810;
  border: 1px solid #333; padding: 10px 15px; border-radius: 8px; flex: 1;
}
.search-box input { background: transparent; border: none; color: white; outline: none; margin-left: 10px; width: 100%; }
.category-select {
  background: #0a0810; border: 1px solid #333; color: white;
  padding: 0 20px; border-radius: 8px; cursor: pointer;
}

.puzzle-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 25px;
}
.puzzle-card {
  background: #1e1b2e; border-radius: 12px; overflow: hidden;
  border: 1px solid #333; transition: transform 0.2s;
}
.puzzle-card:hover { transform: translateY(-5px); border-color: #8b5cf6; }

.card-img { position: relative; height: 180px; }
.card-img img { width: 100%; height: 100%; object-fit: cover; }
.overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.2s;
}
.puzzle-card:hover .overlay { opacity: 1; }
.overlay button {
  background: #00c853; color: white; border: none; padding: 8px 20px;
  border-radius: 20px; font-weight: bold; cursor: pointer;
}

.card-info { padding: 15px; }
.card-info h3 { margin: 0; font-size: 16px; }
.card-info span { font-size: 12px; color: #888; }
</style>
