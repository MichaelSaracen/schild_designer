<script setup>
import { ref } from "vue";

const props = defineProps({
  iconSource: { type: String, default: "/icons/add.png" },
  iconSize: { type: [String, Number], default: 24 },
  padding: { type: [String, Number], default: 0 },
});

const emit = defineEmits(["loading"]);

const isLoaded = ref(false);

// 🔹 Wird aufgerufen, wenn das Bild fertig geladen ist
function onImageLoad() {
  isLoaded.value = true;
  emit("loading");
}
</script>

<template>
  <div
      class="icon-wrapper" :class="{ loaded: isLoaded }">
    <img
        :src="iconSource"
        alt=""
        loading="lazy"
        @load="onImageLoad"
        :style="{
        height: typeof iconSize === 'string' ? iconSize : iconSize + 'px',
        width: typeof iconSize === 'string' ? iconSize : iconSize + 'px',
        padding: typeof padding === 'string' ? padding : padding + 'px',
      }"
    />
  </div>
</template>

<style scoped>
.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  border-radius: var(--border-radius-small);
  overflow: hidden;
  flex: 0 0 auto; /* <<< NEU */
}

/* 🔹 Shimmer Overlay */
.icon-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.05) 75%
  );
  animation: shimmer 1.5s infinite;
  background-size: 200% 100%;

}

/* 🔹 Wenn geladen: Shimmer ausblenden */
.icon-wrapper.loaded::before {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon-wrapper img {
  object-fit: contain;
  display: block;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.icon-wrapper.loaded img {
  opacity: 1;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
