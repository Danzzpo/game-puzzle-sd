<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import confetti from 'canvas-confetti';
import {
  PhTimer, PhFootprints, PhArrowCounterClockwise, PhXCircle,
  PhBrain, PhFire, PhLightning, PhArrowLeft, PhPlay, PhStar
} from '@phosphor-icons/vue';

const props = defineProps({ imageSrc: String });
const router = useRouter();

// --- SOUND EFFECTS ---
// Menggunakan link audio CDN gratis untuk efek suara
const sfxMove = new Audio('https://cdn.freesound.org/previews/613/613867_11672322-lq.mp3');
const sfxWin = new Audio('https://cdn.freesound.org/previews/270/270402_5123851-lq.mp3');


const playSound = (audio) => {
  audio.currentTime = 0;
  audio.volume = 0.5;
  audio.play().catch(() => {}); // Catch error jika user belum interaksi
};

// --- STATE ---
const gameState = ref('menu');
const gridSize = ref(3);
const moves = ref(0);
const timer = ref(0);
const starRating = ref(0);
let timerInterval = null;

const pieces = ref([]);
const selectedPiece = ref(null);

// --- LOGIC ---
const startGame = (size) => {
  gridSize.value = size;
  gameState.value = 'playing';
  moves.value = 0; timer.value = 0;
  startTimer(); initPieces();
};

const startTimer = () => {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => { timer.value++; }, 1000);
};
const stopTimer = () => clearInterval(timerInterval);

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
    pieces.value.push({
      id: i, // ID asli (posisi benar)
      currentPos: i, // Posisi saat ini (untuk animasi)
      style: {
        backgroundImage: `url(${props.imageSrc})`,
        backgroundPosition: `${(col / (gridSize.value - 1)) * 100}% ${(row / (gridSize.value - 1)) * 100}%`,
        backgroundSize: `${gridSize.value * 100}% ${gridSize.value * 100}%`
      }
    });
  }
  shufflePieces();
};

const shufflePieces = () => {
  // Fisher-Yates Shuffle
  let shuffled = [...pieces.value];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  pieces.value = shuffled;
};

// Cek apakah kepingan berada di posisi yang benar
const isCorrectPosition = (index) => {
  return pieces.value[index].id === index;
};

const onPieceClick = (index) => {
  if (selectedPiece.value === null) {
    selectedPiece.value = index;
    // Feedback haptic/suara klik
    playSound(sfxMove);
  } else if (selectedPiece.value === index) {
    selectedPiece.value = null; // Batal pilih
  } else {
    // SWAP LOGIC
    const temp = pieces.value[selectedPiece.value];
    pieces.value[selectedPiece.value] = pieces.value[index];
    pieces.value[index] = temp;

    selectedPiece.value = null;
    moves.value++;
    playSound(sfxMove); // Suara geser
    checkWin();
  }
};

const calculateStars = () => {
  // Logika sederhana: Bintang berdasarkan jumlah langkah
  // Ideal langkah = (grid * grid) * 1.5. Lebih dari itu bintang berkurang.
  const idealMoves = (gridSize.value * gridSize.value) * 2;
  if (moves.value <= idealMoves) return 3;
  if (moves.value <= idealMoves * 1.5) return 2;
  return 1;
};

const checkWin = () => {
  if (pieces.value.every((p, i) => p.id === i)) {
    stopTimer();
    starRating.value = calculateStars();
    gameState.value = 'won';
    playSound(sfxWin);

    // Confetti Kiri & Kanan
    const duration = 3000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  }
};

const resetGame = () => { gameState.value = 'menu'; stopTimer(); };
onUnmounted(() => stopTimer());
</script>

<template>
  <div class="game-wrapper">

    <div v-if="gameState === 'menu'" class="screen menu-screen">
      <div class="top-nav">
        <button class="back-pill" @click="router.back()">
          <PhArrowLeft weight="bold"/> Kembali
        </button>
      </div>

      <div class="center-content">
        <div class="header">
          <h2 class="animate-pop">Pilih Level</h2>
          <p>Tentukan tantanganmu hari ini</p>
        </div>

        <div class="level-list">
          <button class="lvl-card easy" @click="startGame(3)">
            <div class="icon-box"><PhBrain weight="duotone" size="32"/></div>
            <div class="info"><h3>Mudah</h3><span>Grid 3x3</span></div>
            <PhPlay weight="fill" class="play-icon"/>
          </button>

          <button class="lvl-card medium" @click="startGame(4)">
            <div class="icon-box"><PhLightning weight="duotone" size="32"/></div>
            <div class="info"><h3>Sedang</h3><span>Grid 4x4</span></div>
            <PhPlay weight="fill" class="play-icon"/>
          </button>

          <button class="lvl-card hard" @click="startGame(5)">
            <div class="icon-box"><PhFire weight="duotone" size="32"/></div>
            <div class="info"><h3>Sulit</h3><span>Grid 5x5</span></div>
            <PhPlay weight="fill" class="play-icon"/>
          </button>
        </div>
      </div>
    </div>

    <div v-if="gameState === 'playing'" class="screen play-screen">
      <div class="hud">
        <div class="hud-item"><PhTimer weight="bold"/> {{ formattedTime }}</div>
        <div class="hud-item"><PhFootprints weight="bold"/> {{ moves }}</div>
        <div class="hud-item star-preview"><PhStar weight="fill" class="gold"/> ?</div>
        <button class="close-btn" @click="resetGame"><PhXCircle weight="fill" size="28"/></button>
      </div>

      <div class="board-frame">
        <TransitionGroup
          name="puzzle-shuffle"
          tag="div"
          class="puzzle-grid"
          :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }"
        >
          <div
            v-for="(p, i) in pieces"
            :key="p.id"
            class="tile"
            :class="{
              'active': selectedPiece === i,
              'correct': isCorrectPosition(i) && selectedPiece !== i
            }"
            @click="onPieceClick(i)"
          >
            <div class="tile-img" :style="p.style"></div>
            <div class="tile-shine"></div>
            <div v-if="isCorrectPosition(i)" class="correct-indicator"></div>
          </div>
        </TransitionGroup>
      </div>

      <p class="guide">Pilih satu kotak, lalu pilih kotak lain untuk <b>menukar</b>.</p>
    </div>

    <div v-if="gameState === 'won'" class="screen win-screen">
      <div class="trophy-anim">🏆</div>

      <div class="stars-result">
        <PhStar v-for="n in 3" :key="n" weight="fill"
          :class="['star-icon', n <= starRating ? 'filled' : 'empty']"
        />
      </div>

      <h2>Luar Biasa!</h2>
      <p class="win-subtitle">Kamu menyelesaikan puzzle <b>{{ gridSize }}x{{ gridSize }}</b></p>

      <div class="stats-result-box">
        <div class="res-item">
          <span>Waktu</span>
          <strong>{{ formattedTime }}</strong>
        </div>
        <div class="res-item">
          <span>Langkah</span>
          <strong>{{ moves }}</strong>
        </div>
      </div>

      <button class="btn-main" @click="resetGame">
        <PhArrowCounterClockwise weight="bold"/> Main Lagi
      </button>
    </div>

  </div>
</template>

<style scoped>
/* GLOBAL */
.game-wrapper {
  width: 100%; height: 100%;
  color: var(--text-main); font-family: inherit; position: relative;
}
.screen { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 20px; }

/* MENU */
.top-nav { margin-bottom: 10px; }
.back-pill {
  background: var(--card-bg); border: 1px solid var(--card-border);
  color: var(--text-main); padding: 10px 20px; border-radius: 30px;
  cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600;
  box-shadow: var(--card-shadow); transition: 0.2s;
}
.back-pill:hover { border-color: var(--accent); color: var(--accent); }

.center-content {
  flex: 1; display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  width: 100%; max-width: 400px; margin: 0 auto;
}
.header { text-align: center; margin-bottom: 30px; }
.header h2 { font-size: 2rem; margin: 0; color: var(--text-main); }
.header p { color: var(--text-muted); margin-top: 5px; }

.level-list { width: 100%; display: flex; flex-direction: column; gap: 15px; }
.lvl-card {
  display: flex; align-items: center; gap: 15px;
  background: var(--card-bg); border: 1px solid var(--card-border);
  padding: 20px; border-radius: 16px; color: var(--text-main);
  cursor: pointer; text-align: left; box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}
.lvl-card:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
.lvl-card:active { transform: scale(0.98); }

.lvl-card.easy { border-left: 6px solid #4ade80; }
.lvl-card.medium { border-left: 6px solid #fbbf24; }
.lvl-card.hard { border-left: 6px solid #ef4444; }
.icon-box { color: var(--text-muted); }
.info { flex: 1; }
.info h3 { margin: 0; font-size: 1.1rem; }
.info span { color: var(--text-muted); font-size: 0.85rem; }
.play-icon { color: var(--accent); opacity: 0.5; }

/* PLAYING */
.play-screen { align-items: center; justify-content: center; }

.hud {
  display: flex; gap: 10px; align-items: center; justify-content: space-between;
  background: var(--card-bg); padding: 8px 15px; border-radius: 50px;
  margin-bottom: 25px; box-shadow: var(--card-shadow); border: 1px solid var(--card-border);
  width: 100%; max-width: 380px;
}
.hud-item { font-weight: bold; display: flex; align-items: center; gap: 6px; font-size: 0.9rem; }
.star-preview { color: #fbbf24; }
.close-btn { background: none; border: none; color: #ef4444; cursor: pointer; transition: 0.2s; }
.close-btn:hover { transform: scale(1.1); }

.board-frame {
  background: var(--card-bg); padding: 10px; border-radius: 16px;
  border: 1px solid var(--card-border); box-shadow: var(--card-shadow);
  width: min(90vw, 360px); height: min(90vw, 360px); /* Kunci Ukuran */
}

.puzzle-grid {
  display: grid; gap: 3px; width: 100%; height: 100%;
}

/* KEPINGAN PUZZLE (JUICY) */
.tile {
  position: relative; cursor: pointer; border-radius: 6px; overflow: hidden;
  background: var(--card-bg); box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  /* Penting untuk animasi FLIP */
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
}

.tile.active {
  transform: scale(0.9); box-shadow: 0 0 0 3px var(--accent); z-index: 10; border-radius: 8px;
}

/* Jika posisi benar, beri efek visual halus */
.tile.correct::after {
  content: ''; position: absolute; inset: 0;
  border: 2px solid #4ade80; border-radius: 6px; pointer-events: none; opacity: 0.5;
}

.tile-img { width: 100%; height: 100%; background-repeat: no-repeat; filter: contrast(1.05); }
.tile-shine {
  position: absolute; inset: 0; pointer-events: none;
  box-shadow: inset 2px 2px 0 rgba(255,255,255,0.3), inset -2px -2px 0 rgba(0,0,0,0.3);
}

/* Animasi Swap (Vue TransitionGroup) */
.puzzle-shuffle-move {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.guide { margin-top: 25px; color: var(--text-muted); font-size: 0.9rem; text-align: center; }

/* WON SCREEN */
.win-screen { align-items: center; justify-content: center; text-align: center; }
.trophy-anim { font-size: 5rem; margin-bottom: 10px; animation: bounce 2s infinite; }
.stars-result { display: flex; gap: 10px; margin-bottom: 20px; }
.star-icon { font-size: 2.5rem; color: var(--card-border); transition: 0.5s; }
.star-icon.filled { color: #fbbf24; animation: popStar 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
.star-icon:nth-child(2) { animation-delay: 0.2s; }
.star-icon:nth-child(3) { animation-delay: 0.4s; }

.win-screen h2 { font-size: 2rem; margin: 0; color: var(--text-main); }
.win-subtitle { color: var(--text-muted); margin-bottom: 30px; }

.stats-result-box {
  display: flex; gap: 20px; margin-bottom: 30px;
  background: var(--card-bg); padding: 15px 30px; border-radius: 12px; border: 1px solid var(--card-border);
}
.res-item { display: flex; flex-direction: column; }
.res-item span { font-size: 0.8rem; color: var(--text-muted); }
.res-item strong { font-size: 1.2rem; color: var(--text-main); }

.btn-main {
  background: var(--accent); color: white; border: none;
  padding: 14px 40px; border-radius: 30px;
  font-weight: bold; cursor: pointer; font-size: 1rem;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: 0.2s;
}
.btn-main:hover { transform: scale(1.05); }

@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes popStar { 0% { transform: scale(0); } 100% { transform: scale(1); } }
</style>
