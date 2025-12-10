<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedFilter = ref('Week'); // Default filter 'Week'

// Data Dummy sesuai gambar referensi
const popularPuzzles = [
  {
    id: 1,
    title: "Tuxedo Cat on Piano",
    category: "Animals & Wildlife",
    tags: ["black and white", "calm", "classic"],
    rating: 5,
    img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop",
    btnColor: "#ff6d00" // Orange
  },
  {
    id: 2,
    title: "Tropical Fruit Still Life",
    category: "Food & Cuisine",
    tags: ["art", "colorful", "mango"],
    rating: 5,
    img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop",
    btnColor: "#00c853" // Green/Teal
  },
  {
    id: 3,
    title: "Classic Convertible on Coastal Drive",
    category: "Transportation & Vehicles",
    tags: ["blue sky", "classic car", "highway"],
    rating: 5,
    img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&auto=format&fit=crop",
    btnColor: "#d500f9" // Purple/Pink
  },
    {
    id: 4,
    title: "Mountain Lake Sunset",
    category: "Nature",
    tags: ["sunset", "lake", "peaceful"],
    rating: 4,
    img: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=600&auto=format&fit=crop",
    btnColor: "#2962ff" // Blue
  },
];

const goHome = () => router.push('/');
</script>

<template>
  <div class="popular-page">
    <div class="top-nav">
      <button @click="goHome" class="back-link">← Kembali ke Beranda</button>
    </div>

    <div class="header-section">
      <div class="title-group">
        <span class="trophy-icon">🏆</span>
        <div>
          <h1>Popular Puzzles</h1>
          <p class="subtitle">Top 30 puzzles by completions</p>
        </div>
      </div>

      <div class="filter-buttons">
        <button
          :class="{ active: selectedFilter === 'Week' }"
          @click="selectedFilter = 'Week'"
        >Week</button>
        <button
          :class="{ active: selectedFilter === 'Month' }"
          @click="selectedFilter = 'Month'"
        >Month</button>
        <button
          :class="{ active: selectedFilter === 'Year' }"
          @click="selectedFilter = 'Year'"
        >Year</button>
      </div>
    </div>

    <div class="puzzle-grid">
      <div v-for="puzzle in popularPuzzles" :key="puzzle.id" class="puzzle-card">

        <div class="card-image-wrapper">
          <img :src="puzzle.img" :alt="puzzle.title">
          <div class="rating">⭐⭐⭐⭐⭐</div>
        </div>

        <div class="card-content">
          <h3>{{ puzzle.title }}</h3>

          <div class="tags-container">
            <span v-for="tag in puzzle.tags" :key="tag" class="tag-pill">{{ tag }}</span>
          </div>

          <div class="category-badge">{{ puzzle.category }}</div>

          <button class="btn-start" :style="{ backgroundColor: puzzle.btnColor }">
            🧩 Start Puzzle
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.popular-page {
  min-height: 100vh;
  background-color: #0f0c16; /* Latar sangat gelap */
  /* Pattern Puzzle tipis di background */
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 2c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18S29.941 2 20 2z' fill='%232c2c2c' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
  color: white;
  padding: 40px 80px;
  font-family: 'Poppins', sans-serif;
}

.top-nav { margin-bottom: 20px; }
.back-link { background: none; border: none; color: #888; cursor: pointer; font-size: 14px; }
.back-link:hover { color: white; }

/* HEADER */
.header-section { margin-bottom: 40px; }
.title-group { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
.trophy-icon { font-size: 40px; }
h1 { font-size: 32px; font-weight: 800; margin: 0; }
.subtitle { color: #8b5cf6; margin: 5px 0 0 0; font-size: 14px; }

/* FILTERS */
.filter-buttons { display: flex; gap: 10px; }
.filter-buttons button {
  background: transparent; border: 1px solid #333; color: #888;
  padding: 8px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;
  transition: all 0.3s;
}
.filter-buttons button.active {
  background: #ff6d00; border-color: #ff6d00; color: white; /* Active Orange */
}
.filter-buttons button:hover:not(.active) { border-color: #666; color: white; }

/* GRID */
.puzzle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* CARD */
.puzzle-card {
  background: #15111e; border-radius: 16px; overflow: hidden;
  border: 1px solid #2d2640; transition: transform 0.2s;
  display: flex; flex-direction: column;
}
.puzzle-card:hover { transform: translateY(-5px); border-color: #555; }

.card-image-wrapper { position: relative; height: 200px; }
.card-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
.rating {
  position: absolute; top: 10px; left: 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8); font-size: 12px;
}

.card-content { padding: 20px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.card-content h3 { margin: 0; font-size: 16px; font-weight: 700; }

/* TAGS */
.tags-container { display: flex; flex-wrap: wrap; gap: 6px; }
.tag-pill {
  background: #251e33; color: #aaa; padding: 4px 8px;
  border-radius: 4px; font-size: 10px; text-transform: lowercase;
}

.category-badge {
  background: #2d1b4e; color: #d6bcfa; /* Ungu muda */
  padding: 6px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;
  align-self: flex-start; margin-top: auto; /* Agar nempel ke bawah sebelum tombol */
}

/* BUTTON */
.btn-start {
  border: none; padding: 12px; border-radius: 8px; width: 100%;
  color: white; font-weight: bold; cursor: pointer; margin-top: 10px;
  display: flex; justify-content: center; align-items: center; gap: 8px;
}
.btn-start:hover { opacity: 0.9; }
</style>
