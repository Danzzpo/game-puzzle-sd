<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue';

const gameState = ref('menu');
const gridSize = ref(3);
const moves = ref(0);
const timer = ref(0);
let timerInterval = null;

const imageSrc = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=600&fit=crop';

const pieces = ref([]);
// State untuk Drag (Desktop) dan Tap (Mobile)
const isDragging = ref(null);
const selectedPieceIndex = ref(null); // Untuk fitur Tap di HP

// Ukuran Board Dinamis (Default 400, nanti berubah sesuai layar)
const boardSize = ref(400);

// --- RESPONSIVE LOGIC ---
const updateBoardSize = () => {
  const width = window.innerWidth;
  // Jika layar kecil (HP), kurangi padding (misal lebar layar - 40px)
  // Jika layar besar, tetap 400px
  if (width < 500) {
    boardSize.value = width - 60;
  } else {
    boardSize.value = 400;
  }
};

onMounted(() => {
  updateBoardSize();
  window.addEventListener('resize', updateBoardSize);
});

onUnmounted(() => {
  stopTimer();
  window.removeEventListener('resize', updateBoardSize);
});

// --- GAME LOGIC ---
const startGame = (size) => {
  gridSize.value = size;
  gameState.value = 'playing';
  moves.value = 0;
  timer.value = 0;
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

const initPieces = () => {
  pieces.value = [];
  const count = gridSize.value * gridSize.value;
  // Gunakan .value untuk boardSize karena sekarang reactive
  const pieceSize = boardSize.value / gridSize.value;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / gridSize.value);
    const col = i % gridSize.value;
    pieces.value.push({
      id: i, currentPos: i,
      bgX: -col * pieceSize,
      bgY: -row * pieceSize
    });
  }
  shufflePieces();
};

const shufflePieces = () => {
  let shuffled = [...pieces.value];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  pieces.value = shuffled;
};

// --- LOGIKA INTERAKSI (SUPPORT DRAG & TAP) ---

// 1. Swap Helper
const swapPieces = (index1, index2) => {
  if (index1 === index2) return;
  const temp = pieces.value[index1];
  pieces.value[index1] = pieces.value[index2];
  pieces.value[index2] = temp;
  moves.value++;
  checkWin();
};

// 2. Drag (Desktop)
const onDragStart = (evt, index) => {
  isDragging.value = index;
  evt.dataTransfer.effectAllowed = 'move';
  evt.dataTransfer.dropEffect = 'move';
  evt.target.style.opacity = '0.5';
};
const onDragEnd = (evt) => {
  evt.target.style.opacity = '1';
  isDragging.value = null;
};
const onDrop = (evt, dropIndex) => {
  const dragIndex = isDragging.value;
  if (dragIndex !== null) {
    swapPieces(dragIndex, dropIndex);
  }
};

// 3. Tap/Klik (Mobile Friendly)
const onPieceClick = (index) => {
  // Jika belum ada yang dipilih, pilih kepingan ini
  if (selectedPieceIndex.value === null) {
    selectedPieceIndex.value = index;
  } else {
    // Jika sudah ada yang dipilih, tukar dengan yang baru diklik
    swapPieces(selectedPieceIndex.value, index);
    selectedPieceIndex.value = null; // Reset pilihan
  }
};

const checkWin = () => {
  const isWin = pieces.value.every((p, index) => p.id === index);
  if (isWin) { stopTimer(); gameState.value = 'won'; }
};

const resetGame = () => { gameState.value = 'menu'; stopTimer(); };
</script>

<template>
  <div class="game-container">

    <div v-if="gameState === 'menu'" class="menu-screen">
      <h2>Pilih Level</h2>
      <div class="levels">
        <button class="lvl" @click="startGame(3)">Mudah (3x3)</button>
        <button class="lvl" @click="startGame(4)">Sedang (4x4)</button>
        <button class="lvl" @click="startGame(5)">Sulit (5x5)</button>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="board-wrapper">
      <div class="stats">
        <span>⏱️ {{ formattedTime }}</span>
        <span>👣 {{ moves }}</span>
        <button @click="resetGame" class="btn-cancel">Batal</button>
      </div>

      <div
        class="puzzle-grid"
        :style="{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: boardSize + 'px',
          height: boardSize + 'px'
        }"
      >
        <div
          v-for="(piece, index) in pieces" :key="piece.id"
          class="piece-box"
          draggable="true"
          @dragstart="onDragStart($event, index)"
          @dragend="onDragEnd($event)"
          @dragover.prevent
          @drop="onDrop($event, index)"
          @click="onPieceClick(index)"
        >
          <div
            class="piece-content"
            :class="{
              'correct': piece.id === index,
              'selected': selectedPieceIndex === index
            }"
            :style="{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: `${piece.bgX}px ${piece.bgY}px`,
              backgroundSize: `${boardSize}px ${boardSize}px`
            }"
          >
            <span class="num">{{ piece.id + 1 }}</span>
          </div>
        </div>
      </div>
      <p class="hint-text">Geser atau <b>Ketuk 2 kotak</b> untuk menukar!</p>
    </div>

    <div v-else-if="gameState === 'won'" class="win-screen">
      <h1>🏆 Hore! Menang!</h1>
      <p>Waktu: {{ formattedTime }}</p>
      <button @click="resetGame" class="btn-replay">Main Lagi</button>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  background: #222; padding: 20px; border-radius: 15px; border: 2px solid #444;
  color: white; text-align: center; display: inline-block;

  /* CSS Responsive untuk Container Utama */
  max-width: 95vw; /* Maksimal 95% lebar layar HP */
  box-sizing: border-box;
}

.menu-screen h2 { color: #d946ef; margin-bottom: 20px; }
.levels { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.lvl { padding: 10px 20px; background: #333; color: white; border: 1px solid #555; border-radius: 8px; cursor: pointer; }
.lvl:hover { background: #00c853; border-color: #00c853; }

.stats { display: flex; justify-content: space-between; margin-bottom: 15px; font-family: monospace; font-size: 14px; }
.btn-cancel { background: #ff5252; border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; }

.puzzle-grid {
  display: grid;
  gap: 2px;
  background: #111;
  padding: 5px;
  border-radius: 5px;
  margin: 0 auto;

  /* Penting: Matikan touch action browser saat main game */
  touch-action: none;
}

.piece-box {
  width: 100%; height: 100%; position: relative; cursor: pointer;
  overflow: hidden; border-radius: 5px;
}

.piece-content {
  width: 100%; height: 100%; background-repeat: no-repeat; position: relative;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
  transition: transform 0.2s, border 0.2s;
}

.piece-content.correct { filter: brightness(1.1); box-shadow: inset 0 0 0 2px #00c853; }

/* Efek visual saat dipilih di HP (Tap to Swap) */
.piece-content.selected {
  box-shadow: inset 0 0 0 4px #d946ef; /* Border ungu tebal */
  transform: scale(0.95);
}

.num {
  position: absolute; top: 2px; left: 2px; font-size: 10px;
  color: rgba(255,255,255,0.7); background: rgba(0,0,0,0.5);
  padding: 1px 4px; border-radius: 4px; pointer-events: none;
}

.hint-text { margin-top: 10px; font-size: 12px; color: #888; }
.btn-replay { background: #00c853; padding: 10px 30px; border-radius: 20px; border: none; color: white; font-weight: bold; cursor: pointer; margin-top: 10px; }
</style>
