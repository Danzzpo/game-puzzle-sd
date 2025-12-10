<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Data Dummy Kategori
const categories = [
  { id: 1, name: "Hewan & Peliharaan", count: "120 Puzzles", img: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&auto=format&fit=crop" },
  { id: 2, name: "Alam & Pemandangan", count: "85 Puzzles", img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop" },
  { id: 3, name: "Seni & Lukisan", count: "45 Puzzles", img: "https://images.unsplash.com/photo-1579783902614-a3fb39279c42?w=500&auto=format&fit=crop" },
  { id: 4, name: "Makanan & Minuman", count: "60 Puzzles", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop" },
  { id: 5, name: "Arsitektur & Kota", count: "90 Puzzles", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&auto=format&fit=crop" },
  { id: 6, name: "Otomotif", count: "30 Puzzles", img: "https://images.unsplash.com/photo-1503376763036-066120622c74?w=500&auto=format&fit=crop" },
  { id: 7, name: "Bunga & Taman", count: "55 Puzzles", img: "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?w=500&auto=format&fit=crop" },
  { id: 8, name: "Fantasi & Sci-Fi", count: "40 Puzzles", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop" },
];

const goHome = () => router.push('/');
</script>

<template>
  <div class="categories-page">

    <div class="header-section">
      <button @click="goHome" class="back-link">← Kembali ke Beranda</button>
      <h1>📂 Jelajahi Kategori</h1>
      <p>Pilih topik favoritmu dan mulai menyusun kepingan cerita.</p>
    </div>

    <div class="categories-grid">
      <div v-for="cat in categories" :key="cat.id" class="category-card">

        <div class="card-bg" :style="{ backgroundImage: `url(${cat.img})` }">
          <div class="overlay"></div>
        </div>

        <div class="card-content">
          <h3>{{ cat.name }}</h3>
          <span class="puzzle-count">{{ cat.count }}</span>
          <button class="btn-browse">Lihat Semua ➝</button>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.categories-page {
  min-height: 100vh;
  background-color: #0f0c16;
  color: white;
  padding: 40px 80px;
  font-family: 'Poppins', sans-serif;
  background-image: radial-gradient(circle at top right, #2d1b4e 0%, #0f0c16 60%);
}

.back-link {
  background: none; border: none; color: #888; cursor: pointer; font-size: 14px; margin-bottom: 20px;
}
.back-link:hover { color: white; }

.header-section { margin-bottom: 50px; }
h1 { font-size: 2.5rem; margin: 0 0 10px 0; font-weight: 800; }
p { color: #a0a0b0; }

/* Grid Layout */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

/* Card Style */
.category-card {
  position: relative;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #333;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3); /* Glow Ungu */
  border-color: #8b5cf6;
}

/* Background Image dengan Overlay Gelap */
.card-bg {
  width: 100%; height: 100%;
  background-size: cover; background-position: center;
  transition: transform 0.5s;
}
.category-card:hover .card-bg { transform: scale(1.1); }

.overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2));
}

/* Teks di dalam Card */
.card-content {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 20px;
  display: flex; flex-direction: column;
}

h3 { margin: 0; font-size: 18px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
.puzzle-count { font-size: 12px; color: #ccc; margin-top: 4px; }

.btn-browse {
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255,255,255,0.4);
  color: white; padding: 8px 12px; border-radius: 8px;
  font-size: 12px; cursor: pointer; backdrop-filter: blur(5px);
  width: fit-content; opacity: 0; transform: translateY(10px);
  transition: all 0.3s;
}

/* Efek Hover Tombol Muncul */
.category-card:hover .btn-browse {
  opacity: 1; transform: translateY(0);
}
.btn-browse:hover { background: #8b5cf6; border-color: #8b5cf6; }
</style>
