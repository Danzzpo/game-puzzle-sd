<script setup>
import { ref, computed, onUnmounted } from 'vue'; // PERBAIKAN: onMounted dihapus
import { useAutoAnimate } from '@formkit/auto-animate/vue';

// --- STATE GAME ---
const gameState = ref('menu'); // 'menu', 'playing', 'won'
const gridSize = ref(3);
const moves = ref(0);
const timer = ref(0);
let timerInterval = null;

// AKTIFKAN AUTO ANIMATE (Animasi mulus saat kotak pindah)
const [gridRef] = useAutoAnimate();

const imageSrc = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&h=800&fit=crop';

const pieces = ref([]);
const selectedPiece = ref(null);

// --- LOGIC ---
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

// LOGIKA GRID
const initPieces = () => {
  pieces.value = [];
  const total = gridSize.value * gridSize.value;

  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / gridSize.value);
    const col = i % gridSize.value;

    const bgX = (col / (gridSize.value - 1)) * 100;
    const bgY = (row / (gridSize.value - 1)) * 100;

    pieces.value.push({
      id: i,
      style: {
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: `${bgX}% ${bgY}%`,
        backgroundSize: `${gridSize.value * 100}% ${gridSize.value * 100}%`
      }
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

const swapPieces = (idx1, idx2) => {
  const temp = pieces.value[idx1];
  pieces.value[idx1] = pieces.value[idx2];
  pieces.value[idx2] = temp;
  moves.value++;
  checkWin();
};

const onPieceClick = (index) => {
  if (selectedPiece.value === null) {
    selectedPiece.value = index;
  } else if (selectedPiece.value === index) {
    selectedPiece.value = null;
  } else {
    swapPieces(selectedPiece.value, index);
    selectedPiece.value = null;
  }
};

const checkWin = () => {
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
      <div class="levels">
        <button class="lvl-btn" @click="startGame(3)">🟢 3x3</button>
        <button class="lvl-btn" @click="startGame(4)">🟡 4x4</button>
        <button class="lvl-btn" @click="startGame(5)">🔴 5x5</button>
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
        ref="gridRef"
        :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }"
      >
        <div
          v-for="(piece, index) in pieces" :key="piece.id"
          class="puzzle-piece"
          :class="{
            'is-selected': selectedPiece === index,
            'is-correct': piece.id === index
          }"
          :style="piece.style"
          @click="onPieceClick(index)"
        ></div>
      </div>

      <p class="guide">Ketuk 1 kotak, lalu ketuk kotak lain untuk menukar.</p>
    </div>

    <div v-else-if="gameState === 'won'" class="win-screen">
      <h1>🎉 Selesai!</h1>
      <p>Waktu: {{ formattedTime }} | Langkah: {{ moves }}</p>
      <button @click="resetGame" class="btn-replay">Main Lagi</button>
    </div>

  </div>
</template>

<style scoped>
.game-container {
  background: #222; padding: 20px; border-radius: 16px; border: 1px solid #444;
  color: white; text-align: center;
  width: 100%; max-width: 450px; margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.menu-screen h2 { color: #d946ef; margin-bottom: 20px; }
.levels { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.lvl-btn { background: #333; color: white; border: 1px solid #555; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.2s; }
.lvl-btn:hover { background: #00c853; border-color: #00c853; transform: translateY(-2px); }

.stats { display: flex; justify-content: space-between; margin-bottom: 15px; font-family: monospace; font-size: 14px; }
.btn-cancel { background: #ff5252; border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; }

/* GRID */
.puzzle-grid {
  display: grid;
  gap: 2px;
  background: #111;
  padding: 5px;
  border-radius: 8px;
  width: 100%;
  aspect-ratio: 1 / 1;
}

.puzzle-piece {
  width: 100%; height: 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  cursor: pointer;
  /* Shadow dalam agar terlihat timbul sedikit */
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
}

.puzzle-piece.is-selected { z-index: 10; box-shadow: 0 0 0 3px #d946ef; transform: scale(0.95); }
.puzzle-piece.is-correct { filter: brightness(1.1); box-shadow: inset 0 0 0 1px #00c853; }

.guide { margin-top: 15px; font-size: 13px; color: #888; }
.btn-replay { background: #00c853; border: none; padding: 12px 30px; border-radius: 20px; color: white; font-weight: bold; cursor: pointer; margin-top: 15px; }
</style>
