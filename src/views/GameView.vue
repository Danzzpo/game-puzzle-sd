<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GamePuzzle from '../components/GamePuzzle.vue';

const route = useRoute();
const router = useRouter();
const puzzleImage = ref('');

onMounted(() => {
  puzzleImage.value = route.query.img || '';
  if (!puzzleImage.value) {
    router.replace('/');
  }
});
</script>

<template>
  <div class="game-view-layer">

    <div class="blobs-container">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
      <div class="blob b3"></div>
    </div>

    <main class="game-container">
      <transition name="zoom-fade" appear>
        <GamePuzzle
          v-if="puzzleImage"
          :imageSrc="puzzleImage"
        />
      </transition>
    </main>

  </div>
</template>

<style scoped>
/* ========================
   LAYER UTAMA (FULL SCREEN)
   ======================== */
.game-view-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;

  /* WARNA & TRANSISI (KUNCI AGAR SELARAS) */
  background-color: var(--bg-color);
  color: var(--text-main);

  /* Samakan durasi transisi ini dengan App.vue agar berubah bareng */
  transition: background-color 0.3s ease, color 0.3s ease;

  z-index: 99999; /* Menutupi Navbar Home */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ========================
   BLOBS DEKORASI
   ======================== */
.blobs-container {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
}
.blob {
  position: absolute; border-radius: 50%; filter: blur(80px); opacity: var(--blob-opacity);
  transition: opacity 0.3s ease; /* Transisi opacity blob saat ganti tema */
}
.b1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--accent); }
.b2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: #3b82f6; }
.b3 { top: 40%; left: 30%; width: 30vw; height: 30vw; background: #ec4899; opacity: 0.2; }

/* ========================
   LAYOUT GAME
   ======================== */
.game-container {
  flex: 1;
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========================
   ANIMASI MASUK (POP-UP)
   ======================== */
.zoom-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
</style>
