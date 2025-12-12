<script setup>
import { ref, computed, onUnmounted } from 'vue';

const gameState = ref('menu');
const gridSize = ref(3);
const moves = ref(0);
const timer = ref(0);
let timerInterval = null;

// Gambar Kucing Lucu (Link Stabil)
const imageSrc = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=600&fit=crop';

const pieces = ref([]);
const isDragging = ref(null);

// Ukuran Board Tetap (400px) agar perhitungan CSS mudah
const BOARD_SIZE = 400;

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
  // Ukuran per keping dalam Pixel
  const pieceSize = BOARD_SIZE / gridSize.value;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / gridSize.value);
    const col = i % gridSize.value;

    pieces.value.push({
      id: i,
      currentPos: i,
      // Posisi Background
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

const onDragStart = (evt, index) => {
  isDragging.value = index;
  evt.dataTransfer.effectAllowed = 'move';
  evt.target.style.opacity = '0.5';
};

const onDragEnd = (evt) => {
  evt.target.style.opacity = '1';
  isDragging.value = null;
}

const onDrop = (evt, dropIndex) => {
  const dragIndex = isDragging.value;
  if (dragIndex === null || dragIndex === dropIndex) return;
  const temp = pieces.value[dragIndex];
  pieces.value[dragIndex] = pieces.value[dropIndex];
  pieces.value[dropIndex] = temp;
  moves.value++;
  checkWin();
};

const checkWin = () => {
  const isWin = pieces.value.every((p, index) => p.id === index);
  if (isWin) { stopTimer(); gameState.value = 'won'; }
};

const resetGame = () => { gameState.value = 'menu'; stopTimer(); };
onUnmounted(() => { stopTimer(); });
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
          width: BOARD_SIZE + 'px',
          height: BOARD_SIZE + 'px'
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
        >
          <div
            class="piece-content"
            :class="{ 'correct': piece.id === index }"
            :style="{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: `${piece.bgX}px ${piece.bgY}px`,
              backgroundSize: `${BOARD_SIZE}px ${BOARD_SIZE}px`
            }"
          >
            <span class="num">{{ piece.id + 1 }}</span>
          </div>
        </div>
      </div>
      <p class="hint-text">Geser kotak untuk menyusun gambar singa!</p>
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
}

/* Menu Style */
.menu-screen h2 { color: #d946ef; margin-bottom: 20px; }
.levels { display: flex; gap: 10px; justify-content: center; }
.lvl { padding: 10px 20px; background: #333; color: white; border: 1px solid #555; border-radius: 8px; cursor: pointer; }
.lvl:hover { background: #00c853; border-color: #00c853; }

/* Board Style */
.stats { display: flex; justify-content: space-between; margin-bottom: 15px; font-family: monospace; font-size: 16px; }
.btn-cancel { background: #ff5252; border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; }

/* Grid & Pieces */
.puzzle-grid {
  display: grid;
  gap: 2px; /* Gap kecil agar potongan terlihat terpisah */
  background: #111;
  padding: 5px;
  border-radius: 5px;
  margin: 0 auto;
}

.piece-box {
  width: 100%; height: 100%;
  position: relative;
  cursor: grab;
  overflow: hidden; /* Penting agar gambar tidak bocor */
  border-radius: 5px; /* Membuat sudut sedikit tumpul */
}

.piece-content {
  width: 100%; height: 100%;
  background-repeat: no-repeat;
  position: relative;

  /* BENTUK PUZZLE SIMPEL TAPI RAPI (Kotak tumpul + Shadow) */
  /* Kita tidak pakai clip-path rumit karena sering error di posisi gambar */
  box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
  transition: transform 0.2s;
}

/* Efek saat posisi benar */
.piece-content.correct { filter: brightness(1.1); box-shadow: inset 0 0 0 2px #00c853; }

.num {
  position: absolute; top: 5px; left: 5px;
  font-size: 10px; color: rgba(255,255,255,0.7);
  background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 4px;
  pointer-events: none;
}

.hint-text { margin-top: 10px; font-size: 12px; color: #888; }
.btn-replay { background: #00c853; padding: 10px 30px; border-radius: 20px; border: none; color: white; font-weight: bold; cursor: pointer; margin-top: 10px; }
</style>
