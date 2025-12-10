<script setup>
import { ref, onMounted } from 'vue';

// --- KONFIGURASI ---
const gridSize = 3; // Ukuran 3x3
const imageSrc = 'https://picsum.photos/600/600'; // Gambar random dari internet

// State (Data yang bisa berubah)
const pieces = ref([]);

// Fungsi: Menyiapkan Potongan Puzzle
const initGame = () => {
  pieces.value = [];

  // Kita buat loop dari 0 sampai 8 (total 9 kotak)
  for (let i = 0; i < gridSize * gridSize; i++) {
    pieces.value.push({
      id: i,
      // Rumus matematika untuk menentukan posisi potongan gambar
      x: (i % gridSize) * 100,
      y: Math.floor(i / gridSize) * 100
    });
  }
};

// Jalankan fungsi saat halaman dibuka pertama kali
onMounted(() => {
  initGame();
});
</script>

<template>
  <div class="game-wrapper">
    <h1 class="title">🧩 Puzzle Anak Ceria</h1>

    <div class="puzzle-board" :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }">

      <div
        v-for="piece in pieces"
        :key="piece.id"
        class="puzzle-piece"
      >
        <div
          class="image-fragment"
          :style="{
            backgroundImage: `url(${imageSrc})`,
            backgroundPosition: `-${piece.x}% -${piece.y}%`,
            backgroundSize: `${gridSize * 100}%`
          }"
        >
          <span class="number-hint">{{ piece.id + 1 }}</span>
        </div>
      </div>

    </div>

    <button class="btn-start" @click="initGame">Reset Gambar</button>
  </div>
</template>

<style scoped>
.game-wrapper {
  max-width: 400px; /* Ukuran game dibatasi */
  margin: 0 auto;
  text-align: center;
  font-family: 'Comic Sans MS', sans-serif;
  padding: 20px;
}

.title { color: #FF6B6B; margin-bottom: 20px; }

.puzzle-board {
  display: grid;
  gap: 2px; /* Jarak antar kotak */
  background: #4ECDC4; /* Warna garis pembatas */
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.puzzle-piece {
  aspect-ratio: 1 / 1; /* Agar kotak selalu persegi */
  position: relative;
  overflow: hidden;
  background-color: white;
}

.image-fragment {
  width: 100%;
  height: 100%;
  /* Animasi halus saat gambar digeser nanti */
  transition: all 0.3s ease;
}

.number-hint {
  position: absolute;
  top: 5px;
  left: 5px;
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.btn-start {
  background-color: #FFE66D;
  border: none;
  padding: 12px 30px;
  font-size: 18px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  color: #555;
  box-shadow: 0 4px #d4c348;
}

.btn-start:active {
  transform: translateY(2px);
  box-shadow: 0 0 #d4c348;
}
</style>
