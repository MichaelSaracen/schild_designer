<!-- Tooltip.vue -->
<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";

const props = defineProps({
  target: { type: Object, required: true },
  text: { type: String, required: true },
  timeout: { type: Number, default: 5000 },
  offsetX: { type: Number, default: 10 },
  offsetY: { type: Number, default: 10 },
  delay: { type: Number, default: 1000 },
  direction: { type: String, default: 'right' },
});

const visible = ref(false);
const entered = ref(false);
const pos = ref({ x: 0, y: 0 });
let hideTimer = null;
let enterTimer = null;
let autoHideTimer = null;

function show() {
  clearTimeout(hideTimer);
  clearTimeout(enterTimer);
  clearTimeout(autoHideTimer);
  visible.value = true;

  autoHideTimer = setTimeout(() => {
    visible.value = false;
    entered.value = false;
  }, props.timeout);
}

function hide() {
  entered.value = false;
  clearTimeout(autoHideTimer);
  hideTimer = setTimeout(() => (visible.value = false), 100);
}

function setupListeners() {
  if (!props.target || props.target.__tooltipBound) return;

  props.target.__tooltipBound = true;

  props.target.addEventListener("mouseenter", () => {
    entered.value = true;
    const rect = props.target.getBoundingClientRect();

    if (props.direction === "right") {
      pos.value = {
        x: rect.right + props.offsetX,
        y: rect.top + rect.height / 2, // vertikal mittig
      };
    } else if (props.direction === "top") {
      pos.value = {
        x: rect.left -80, // horizontal mittig
        y: rect.top - 50,   // oberhalb des Buttons
      };
    }

    enterTimer = setTimeout(() => {
      if (entered.value) show();
    }, props.delay);
  });

  props.target.addEventListener("mouseleave", hide);
}


onMounted(async () => {
  await nextTick(); // Warten, bis Ref gesetzt ist
  setupListeners();
});

watch(
    () => props.target,
    (t) => {
      if (t) setupListeners();
    }
);

onUnmounted(() => {
  clearTimeout(hideTimer);
  clearTimeout(autoHideTimer);
  clearTimeout(enterTimer);
});
</script>

<template>
  <!-- 🔥 Teleport = Tooltip bleibt sichtbar auch in transformierten Containern -->
  <Teleport to="body">
    <transition name="fade">
      <div
          v-if="visible"
          class="tooltip"
          :style="{ top: pos.y + 'px', left: pos.x + 'px' }"
          v-html="text"
      />
    </transition>
  </Teleport>
</template>

<style scoped>
.tooltip {
  position: fixed;
  background: var(--black200);
  color: var(--text-normal-darker);
  padding: 8px 10px;
  border-radius: 4px;
  max-width: 220px;
  font-size: 11px;
  line-height: 1.4;
  pointer-events: none;
  opacity: 1;
  z-index: 9999;
  white-space: normal;
  text-align: left;
  border: 1px solid var(--border-color);
  transform: translateY(-50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.tooltip:deep(b),
.tooltip:deep(strong) {
  display: block;
  font-weight: bold;
  margin-bottom: -8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
