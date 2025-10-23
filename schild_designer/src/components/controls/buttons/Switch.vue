<script setup>
import { computed } from "vue";

const props = defineProps({
  checked: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  checkedColor: { type: String, default: "var(--accent-op)" },
  uncheckedColor: { type: String, default: "var(--black300)" },
  thumbColor: { type: String, default: "#fff" },
  width: { type: [String, Number], default: 56 },
  height: { type: [String, Number], default: 24 },
  transitionDuration: { type: Number, default: 250 },
});

const emit = defineEmits(["update:checked"]);

function toggleSwitch() {
  if (!props.enabled) return;
  emit("update:checked", !props.checked);
}

// Dynamisches Styling mit computed
const switchStyle = computed(() => ({
  '--checked-color': props.checkedColor,
  '--unchecked-color': props.uncheckedColor,
  '--thumb-color': props.thumbColor,
  '--duration': props.transitionDuration + 'ms',
  width: typeof props.width === 'string' ? props.width : props.width + 'px',
  height: typeof props.height === 'string' ? props.height : props.height + 'px',
}));
</script>

<template>
  <div
      class="switch-container"
      :class="{ enabled: enabled, checked: checked }"
      :style="switchStyle"
      @click="toggleSwitch"
  >
    <div class="track"></div>
    <div class="thumb"></div>
  </div>
</template>

<style scoped>
.switch-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border-radius: 999px;
  transition: opacity 0.3s ease;
}

.switch-container:not(.enabled) {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Hintergrund (Track) */
.track {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background-color: var(--unchecked-color);
  transition: background-color var(--duration) ease;
}

/* Schalter (Thumb) */
.thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% / 2 - 4px);
  height: calc(100% - 4px);
  border-radius: 999px;
  background-color: var(--thumb-color);
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

/* Wenn aktiviert */
.switch-container.checked .track {
  background-color: var(--checked-color);
}

.switch-container.checked .thumb {
  transform: translateX(100%);
}
</style>
