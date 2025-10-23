<script setup>
const props = defineProps({
  text: {type: String, default: 'Lade Template...'},
  show: { type: Boolean, default: false }
});
</script>

<template>
<Transition name="fade">
  <div v-if="show" class="loader-overlay">
    <div class="spinner"></div>
    <p> {{text}} </p>
  </div>
</Transition>
</template>

<style scoped>
.loader-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--black100);
  opacity: 0.8;
  color: var(--white-soft);
  font-size: 1.1em;
  font-weight: 500;
  z-index: 999;
  border-radius: 6px;

}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border-color);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>