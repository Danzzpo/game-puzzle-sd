<script setup>
import { useRouter } from 'vue-router';
import GamePuzzle from '../components/GamePuzzle.vue';

const router = useRouter();
const goHome = () => router.push('/');
</script>

<template>
  <div class="game-page">
    <button @click="goHome" class="back-btn">⬅ Kembali ke Beranda</button>

    <div class="game-content">
      <GamePuzzle />
    </div>
  </div>
</template>

<style scoped>
.game-page {
  min-height: 100vh;
  background-color: #130f1e; /* Pastikan background gelap agar game terlihat */
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-btn {
  align-self: flex-start;
  margin-bottom: 20px;
  background: transparent;
  border: 1px solid #666;
  color: #ccc;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
.back-btn:hover { color: white; border-color: white; }

.game-content {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
