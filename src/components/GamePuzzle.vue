<script setup>
import { ref, computed, onUnmounted } from 'vue';

// --- STATE GAME ---
const gameState = ref('menu'); // 'menu', 'playing', 'won'
const gridSize = ref(3);
const moves = ref(0);
const timer = ref(0);
let timerInterval = null;

// LINK GAMBAR STABIL (Unsplash)
const imageSrc = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&h=800&fit=crop';

const pieces = ref([]);
const isDragging = ref(null);
const selectedPiece = ref(null); // Variabel untuk fitur "Ketuk" di HP

// --- 1. MEMULAI GAME ---
const startGame = (size) => {
  gridSize.value = size;
  gameState.value = 'playing';
  moves.value = 0;
  timer.value = 0;
  selectedPiece.value = null;
  startTimer();
  initPieces();
};

const startTimer = () => {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => { timer.value++; }, 1000);
};

const stopTimer = () => { clearInterval(timerInterval); };

const formattedTime = computed(() => {
  const m = Math.floor(timer.value / 60).toString().padStart(2, '0');
  const s = (timer.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

// --- 2. LOGIKA PEMOTONGAN GAMBAR ---
const initPieces = () => {
  pieces.value = [];
  const total = gridSize.value * gridSize.value;

  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / gridSize.value);
    const col = i % gridSize.value;

    // RUMUS MATEMATIKA PERSENTASE (Agar Responsif di Semua Layar)
    // Menghitung posisi background dalam persen (%)
    const bgX = (col / (gridSize.value - 1)) * 100;
    const bgY = (row / (gridSize.value - 1)) * 100;

    pieces.value.push({
      id: i,           // ID Asli (Posisi Benar)
      bgPos: `${bgX}% ${bgY}%` // Posisi Gambar
    });
  }
  shufflePieces();
};

const shufflePieces = () => {
  // Acak posisi potongan
  let shuffled = [...pieces.value];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  pieces.value = shuffled;
};

// --- 3. INTERAKSI (DRAG & TAP) ---

// Fungsi Tukar Posisi (Core Logic)
const swapPieces = (index1, index2) => {
  // Tukar isi array
  const temp = pieces.value[index1];
  pieces.value[index1] = pieces.value[index2];
  pieces.value[index2] = temp;

  moves.value++;
  checkWin();
};

// A. Fitur Drag & Drop (Untuk Laptop/Mouse)
const onDragStart = (evt, index) => {
  isDragging.value = index;
  evt.dataTransfer.effectAllowed = 'move';
  evt.dataTransfer.dropEffect = 'move';
  evt.target.style.opacity = '0.5'; // Efek transparan saat ditarik
};

const onDragEnd = (evt) => {
  evt.target.style.opacity = '1';
  isDragging.value = null;
};

const onDrop = (evt, dropIndex) => {
  const dragIndex = isDragging.value;
  if (dragIndex !== null && dragIndex !== dropIndex) {
    swapPieces(dragIndex, dropIndex);
  }
};

// B. Fitur Tap/Ketuk (Untuk HP/Touchscreen)
const onPieceClick = (index) => {
  // 1. Jika belum ada yang dipilih -> Pilih kotak ini
  if (selectedPiece.value === null) {
    selectedPiece.value = index;
  }
  // 2. Jika kotak yang sama diklik lagi -> Batalkan pilihan
  else if (selectedPiece.value === index) {
    selectedPiece.value = null;
  }
  // 3. Jika kotak berbeda diklik -> Tukar!
  else {
    swapPieces(selectedPiece.value, index);
    selectedPiece.value = null; // Reset setelah tukar
  }
};

// --- 4. CEK MENANG ---
const checkWin = () => {
  // Cek apakah semua ID berurutan sesuai indexnya
  const isWin = pieces.value.every((p, index) => p.id === index);
  if (isWin) {
    stopTimer();
    gameState.value = 'won';
  }
};

const resetGame = () => {
  gameState.value = 'menu';
  stopTimer();
};

onUnmounted(() => { stopTimer(); });
</script>

<template>
  <div class="game-container">

    <div v-if="gameState === 'menu'" class="menu-screen">
      <h2>Pilih Level</h2>
      <p>Pilih tingkat kesulitan untuk memulai.</p>
      <div class="level-btn-container">
        <button class="lvl-btn easy" @click="startGame(3)">Mudah (3x3)</button>
        <button class="lvl-btn medium" @click="startGame(4)">Sedang (4x4)</button>
        <button class="lvl-btn hard" @click="startGame(5)">Sulit (5x5)</button>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="board-wrapper">

      <div class="stats-bar">
        <div class="stat">⏱️ {{ formattedTime }}</div>
        <div class="stat">👣 {{ moves }} Langkah</div>
        <button @click="resetGame" class="btn-cancel">Batal</button>
      </div>

      <div
        class="puzzle-grid"
        :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }"
      >
        <div
          v-for="(piece, index) in pieces"
          :key="piece.id"
          class="puzzle-cell"
          :class="{ 'is-selected': selectedPiece === index }"
          draggable="true"
          @dragstart="onDragStart($event, index)"
          @dragend="onDragEnd($event)"
          @dragover.prevent
          @drop="onDrop($event, index)"
          @click="onPieceClick(index)"
        >
          <div
            class="image-fragment"
            :class="{ 'is-correct': piece.id === index }"
            :style="{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: piece.bgPos,
              backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`
            }"
          >
            <span class="hint-number">{{ piece.id + 1 }}</span>
          </div>
        </div>
      </div>

      <p class="guide-text">
        💻 <b>Desktop:</b> Tarik & Lepas kotak.<br>
        📱 <b>HP:</b> Ketuk kotak A, lalu ketuk kotak B untuk menukar.
      </p>
    </div>

    <div v-else-if="gameState === 'won'" class="win-screen">
      <div class="trophy">🏆</div>
      <h2>Luar Biasa!</h2>
      <p>Waktu: <b>{{ formattedTime }}</b> | Langkah: <b>{{ moves }}</b></p>
      <button @click="resetGame" class="btn-replay">Main Lagi</button>
    </div>

  </div>
</template>

<style scoped>
/* CONTAINER UTAMA (RESPONSIF) */
.game-container {
  background: #222;
  padding: 20px;
  border-radius: 16px;
  border: 2px solid #444;
  color: white;
  text-align: center;

  /* Ukuran Responsif: Max 500px di laptop, tapi 95% lebar di HP */
  width: 95%;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

/* MENU SCREEN */
.menu-screen h2 { color: #d946ef; margin-bottom: 10px; }
.menu-screen p { color: #aaa; margin-bottom: 20px; font-size: 14px; }
.level-btn-container { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
.lvl-btn {
  padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold; color: white; transition: transform 0.2s;
}
.lvl-btn:hover { transform: translateY(-2px); }
.easy { background: #00c853; }
.medium { background: #ffb74d; color: #333; }
.hard { background: #ff5252; }

/* STATS BAR */
.stats-bar {
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(0,0,0,0.3); padding: 10px 15px; border-radius: 8px;
  margin-bottom: 15px; font-family: monospace; font-size: 14px;
}
.stat { color: #a5b4fc; font-weight: bold; }
.btn-cancel { background: #ff5252; color: white; border: none; padding: 5px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; }

/* GRID PUZZLE (CORE STYLE) */
.puzzle-grid {
  display: grid;
  gap: 2px; /* Jarak antar kotak */
  background: #111;
  padding: 5px;
  border-radius: 8px;

  /* Agar selalu KOTAK SEMPURNA (1:1) */
  width: 100%;
  aspect-ratio: 1 / 1;

  /* Optimasi sentuhan HP */
  touch-action: manipulation;
}

.puzzle-cell {
  position: relative;
  width: 100%; height: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px; /* Sudut sedikit tumpul */
  transition: transform 0.1s, box-shadow 0.1s;
}

/* Efek saat dipilih di HP (Border Ungu) */
.puzzle-cell.is-selected {
  z-index: 10;
  box-shadow: 0 0 0 3px #d946ef;
  transform: scale(0.95);
}

.image-fragment {
  width: 100%; height: 100%;
  background-repeat: no-repeat;
  /* Transisi halus saat pindah */
  transition: filter 0.3s;
}

/* Efek visual jika posisi benar (sedikit lebih terang) */
.image-fragment.is-correct {
  filter: brightness(1.15);
  box-shadow: inset 0 0 0 1px rgba(0, 200, 83, 0.5);
}

/* Nomor Bantuan */
.hint-number {
  position: absolute; top: 2px; left: 2px;
  font-size: 10px; font-weight: bold; color: rgba(255,255,255,0.8);
  background: rgba(0,0,0,0.5); padding: 1px 5px; border-radius: 3px;
  pointer-events: none;
}

.guide-text { margin-top: 20px; font-size: 12px; color: #888; line-height: 1.5; }

/* WIN SCREEN */
.win-screen .trophy { font-size: 50px; margin-bottom: 10px; animation: bounce 2s infinite; }
.win-screen h2 { color: #00c853; margin-bottom: 10px; }
.btn-replay { background: linear-gradient(90deg, #00c853, #00e676); border: none; padding: 12px 30px; border-radius: 20px; color: white; font-weight: bold; cursor: pointer; margin-top: 15px; }

@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
</style>
