<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import VanillaTilt from 'vanilla-tilt';

// Import Ikon
import {
  PhStar, PhMedal, PhTrophy,
  PhTimer, PhFootprints, PhArrowCounterClockwise, PhXCircle,
  PhBrain, PhFire, PhLightning, PhArrowLeft, PhGameController, PhSmiley
} from '@phosphor-icons/vue';

const router = useRouter();

// --- STATE ---
const gameState = ref('menu');
const gridSize = ref(3);
const moves = ref(0);
const timer = ref(0);
let timerInterval = null;

const [gridRef] = useAutoAnimate();
const imageSrc = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&h=800&fit=crop';
const pieces = ref([]);
const selectedPiece = ref(null);

// --- LOGIC TILT ---
onMounted(() => {
  initTilt();
});

const initTilt = () => {
  nextTick(() => {
    if (window.innerWidth > 768) {
      const cards = document.querySelectorAll('.tilt-card');
      if (cards.length) {
        VanillaTilt.init(cards, {
          max: 12,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
          scale: 1.03
        });
      }
    }
  });
};

// --- NAVIGATION ---
const goHome = () => {
  router.push('/');
};

// --- GAME LOGIC ---
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
  setTimeout(() => initTilt(), 100);
};

onUnmounted(() => { stopTimer(); });
</script>

<template>
  <div class="game-container">

    <div class="blobs-internal">
      <div class="blob-i blob-1"></div>
      <div class="blob-i blob-2"></div>
      <div class="blob-i blob-3"></div>
    </div>

    <div class="decorations">
      <PhStar class="float-icon i1" weight="fill" />
      <PhGameController class="float-icon i2" weight="duotone" />
      <PhLightning class="float-icon i3" weight="fill" />
      <PhSmiley class="float-icon i4" weight="duotone" />
    </div>

    <div v-if="gameState === 'menu'" class="menu-screen">

      <div class="header-actions">
        <button class="btn-back-menu" @click="goHome">
          <PhArrowLeft weight="bold" :size="20" />
          <span>Kembali</span>
        </button>
      </div>

      <div class="menu-header">
        <h2 class="menu-title">Pilih Tantangan</h2>
        <p class="menu-subtitle">Mulai petualangan asah otakmu!</p>
      </div>

      <div class="level-grid">
        <div class="tilt-card level-card easy" @click="startGame(3)">
          <div class="card-bg-icon"><PhBrain /></div>
          <div class="card-content">
            <div class="icon-badge"><PhStar :size="32" weight="fill" /></div>
            <div class="text-info">
              <h3>Mudah</h3>
              <p>Grid 3x3</p>
            </div>
            <button class="btn-play-small">Main</button>
          </div>
        </div>

        <div class="tilt-card level-card medium" @click="startGame(4)">
          <div class="card-bg-icon"><PhLightning /></div>
          <div class="card-content">
            <div class="icon-badge"><PhMedal :size="32" weight="fill" /></div>
            <div class="text-info">
              <h3>Sedang</h3>
              <p>Grid 4x4</p>
            </div>
            <button class="btn-play-small">Main</button>
          </div>
        </div>

        <div class="tilt-card level-card hard" @click="startGame(5)">
          <div class="card-bg-icon"><PhFire /></div>
          <div class="card-content">
            <div class="icon-badge"><PhTrophy :size="32" weight="fill" /></div>
            <div class="text-info">
              <h3>Sulit</h3>
              <p>Grid 5x5</p>
            </div>
            <button class="btn-play-small">Main</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="board-wrapper">
      <div class="stats-bar">
        <div class="stat-item">
          <PhTimer :size="20" weight="duotone" class="stat-icon" />
          <span>{{ formattedTime }}</span>
        </div>
        <div class="stat-item">
          <PhFootprints :size="20" weight="duotone" class="stat-icon" />
          <span>{{ moves }} Langkah</span>
        </div>
        <button @click="resetGame" class="btn-quit" title="Menyerah">
          <PhXCircle :size="28" weight="fill" />
        </button>
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
      <p class="guide">Ketuk kotak untuk menukar posisi.</p>
    </div>

    <div v-else-if="gameState === 'won'" class="win-screen">
      <div class="trophy-anim">🏆</div>
      <h1>Luar Biasa!</h1>
      <p class="win-desc">Puzzle <b>{{ gridSize }}x{{ gridSize }}</b> Selesai!</p>

      <div class="win-stats">
        <div class="win-stat-box">
          <span class="label">Waktu</span>
          <span class="value">{{ formattedTime }}</span>
        </div>
        <div class="win-stat-box">
          <span class="label">Langkah</span>
          <span class="value">{{ moves }}</span>
        </div>
      </div>

      <button @click="resetGame" class="btn-replay">
        <PhArrowCounterClockwise :size="20" weight="bold" />
        Main Lagi
      </button>
    </div>

  </div>
</template>

<style scoped>
.game-container {
  width: 100%; position: relative; overflow: hidden;
  border-radius: 20px;
}

/* --- BACKGROUND BLOBS (INTERNAL) --- */
.blobs-internal {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
  opacity: 0.6; /* Tidak terlalu mencolok */
}
.blob-i {
  position: absolute; border-radius: 50%;
  filter: blur(60px); animation: floatBlobI 10s infinite alternate ease-in-out;
}
.blob-1 { top: -20%; left: -10%; width: 250px; height: 250px; background: #a855f7; }
.blob-2 { bottom: -10%; right: -10%; width: 200px; height: 200px; background: #ec4899; animation-delay: -2s; }
.blob-3 { top: 40%; left: 40%; width: 180px; height: 180px; background: #22c55e; animation-duration: 12s; opacity: 0.4; }

@keyframes floatBlobI {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 40px) scale(1.1); }
}

/* --- DECORATIONS --- */
.decorations { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden; }
.float-icon { position: absolute; font-size: 2rem; opacity: 0.15; animation: floatAnim 6s infinite ease-in-out alternate; }
.i1 { top: 10%; left: 5%; color: #fbbf24; animation-delay: 0s; font-size: 3rem; }
.i2 { top: 80%; left: 10%; color: #d946ef; animation-delay: 1s; font-size: 4rem; }
.i3 { top: 20%; right: 8%; color: #38bdf8; animation-delay: 2s; font-size: 2.5rem; }
.i4 { top: 70%; right: 5%; color: #4ade80; animation-delay: 1.5s; font-size: 3.5rem; }

@keyframes floatAnim {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-20px) rotate(15deg); }
}

/* --- MENU SCREEN --- */
.menu-screen { text-align: center; animation: fadeIn 0.6s ease-out; position: relative; z-index: 2; padding-top: 10px; }

/* HEADER ACTIONS */
.header-actions {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-top: 10px;
}

/* TOMBOL KEMBALI */
.btn-back-menu {
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  border: 1px solid rgba(255,255,255,0.3);
  color: var(--text-color);
  padding: 10px 24px;
  border-radius: 50px;
  cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  font-size: 1rem;
  font-weight: 700;
  transition: 0.3s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  backdrop-filter: blur(5px);
}
:global(body.light-theme) .btn-back-menu {
  background: white; color: #333; border-color: #ddd; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.btn-back-menu:hover {
  background: rgba(255,255,255,0.3);
  transform: translateX(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}

.menu-title {
  font-size: 2rem; font-weight: 800; margin-bottom: 5px; margin-top: 5px;
  background: linear-gradient(to right, #fff, #d8b4fe);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
:global(body.light-theme) .menu-title {
  background: linear-gradient(to right, #4c1d95, #7c3aed);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.menu-subtitle { font-size: 1rem; color: var(--text-sec); margin-bottom: 30px; }

/* GRID KARTU */
.level-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
  padding: 0 10px;
}

/* KARTU LEVEL (GLASS STYLE) */
.level-card {
  position: relative;
  background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);

  border-radius: 24px;
  padding: 25px 20px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  min-height: 180px;
  display: flex; flex-direction: column; justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.easy { border-bottom: 4px solid #4ade80; }
.medium { border-bottom: 4px solid #fbbf24; }
.hard { border-bottom: 4px solid #f43f5e; }

:global(body.light-theme) .level-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
  border-color: rgba(0,0,0,0.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.card-bg-icon {
  position: absolute; top: -15px; right: -15px;
  font-size: 8rem; opacity: 0.1; color: white;
  transform: rotate(15deg); pointer-events: none; transition: 0.3s;
}
:global(body.light-theme) .card-bg-icon { color: #000; opacity: 0.05; }
.level-card:hover .card-bg-icon { transform: rotate(0deg) scale(1.1); opacity: 0.15; }

.card-content { position: relative; z-index: 2; transform: translateZ(20px); }

.icon-badge {
  width: 60px; height: 60px; margin: 0 auto 15px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  background: rgba(255,255,255,0.25);
}

.easy .icon-badge { color: #22c55e; }
.medium .icon-badge { color: #f59e0b; }
.hard .icon-badge { color: #ef4444; }

.text-info h3 { font-size: 1.3rem; font-weight: 800; margin: 0; color: var(--text-color); }
.text-info p { font-size: 0.95rem; color: var(--text-sec); margin-bottom: 15px; }

.btn-play-small {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: var(--text-color); padding: 8px 20px; border-radius: 50px;
  font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: 0.2s;
}
.level-card:hover .btn-play-small { background: white; color: black; transform: scale(1.05); border-color: white; }

/* --- RESPONSIVE MOBILE --- */
@media (max-width: 768px) {
  .level-grid {
    grid-template-columns: 1fr; /* Susun ke bawah */
    gap: 15px;
  }

  .level-card {
    min-height: auto;
    padding: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }

  .card-content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 15px;
  }

  .icon-badge { margin: 0; width: 50px; height: 50px; flex-shrink: 0; }
  .text-info { flex-grow: 1; }
  .text-info h3 { font-size: 1.1rem; }
  .text-info p { margin-bottom: 0; font-size: 0.85rem; }

  .btn-play-small { padding: 6px 15px; font-size: 0.8rem; }
  .card-bg-icon { font-size: 5rem; top: -5px; right: -5px; opacity: 0.1; }
}

/* --- BOARD & WIN --- */
.board-wrapper { animation: zoomIn 0.4s ease-out; position: relative; z-index: 2; }
.stats-bar { display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 10px 20px; border-radius: 50px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1); }
:global(body.light-theme) .stats-bar { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.05); }
.stat-item { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.95rem; color: var(--text-color); }
.stat-icon { color: #d946ef; }
.btn-quit { background: transparent; border: none; color: #ef4444; cursor: pointer; transition: 0.2s; }
.btn-quit:hover { transform: scale(1.1); color: #dc2626; }

.puzzle-grid { display: grid; gap: 3px; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 12px; width: 100%; aspect-ratio: 1 / 1; box-shadow: inset 0 0 20px rgba(0,0,0,0.2); }
.puzzle-piece { width: 100%; height: 100%; background-repeat: no-repeat; border-radius: 6px; cursor: pointer; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15); transition: transform 0.1s; }
.puzzle-piece:active { transform: scale(0.95); }
.puzzle-piece.is-selected { z-index: 10; box-shadow: 0 0 0 3px #d946ef, 0 5px 15px rgba(0,0,0,0.5); transform: scale(1.05); border-radius: 8px; }
.puzzle-piece.is-correct { filter: brightness(1.1); box-shadow: inset 0 0 0 2px #22c55e; }
.guide { text-align: center; margin-top: 15px; font-size: 0.85rem; color: var(--text-sec); opacity: 0.8; }

.win-screen { text-align: center; animation: popUp 0.5s ease-out; position: relative; z-index: 2; }
.trophy-anim { font-size: 4rem; margin-bottom: 10px; animation: bounce 2s infinite; }
.win-screen h1 { font-size: 2rem; margin-bottom: 5px; color: #fbbf24; }
.win-desc { color: var(--text-sec); margin-bottom: 25px; }
.win-stats { display: flex; gap: 15px; justify-content: center; margin-bottom: 30px; }
.win-stat-box { background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; width: 100px; border: 1px solid rgba(255,255,255,0.1); }
:global(body.light-theme) .win-stat-box { background: rgba(0,0,0,0.03); border-color: rgba(0,0,0,0.05); }
.win-stat-box .label { display: block; font-size: 0.8rem; color: var(--text-sec); margin-bottom: 5px; }
.win-stat-box .value { display: block; font-size: 1.2rem; font-weight: 800; color: var(--text-color); }
.btn-replay { background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 12px 30px; border-radius: 50px; font-weight: 700; font-size: 1rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); transition: 0.3s; }
.btn-replay:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4); }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes zoomIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes popUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
</style>
