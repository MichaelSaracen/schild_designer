<script setup>

import { ref, onBeforeUnmount } from "vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";

const inputRef = ref(null);

const props = defineProps({
  modelValue: [String, Number],
  headerText: { type: String, default: "" },
  stretch: { type: Boolean, default: false },
  height: { type: Number, default: 24 },
  prefix: { type: String, default: "W" },
  iconSource: { type: String, default: "" },
  maxLength: { type: Number, default: 4 },
  inputType: { type: String, default: "number" },
  maxValue: Number,
  minValue: Number,
  dragStep: { type: Number, default: 1 },
});

const emit = defineEmits(["update:modelValue"]);

let startVal = 0;
let isLocked = false;
let modifierStep = 1;

// 🔹 Fake-Cursor Geometry
const cursorX = ref(window.innerWidth / 2);
const cursorY = ref(window.innerHeight / 2);
const showFakeCursor = ref(false);

function editingFinished(e) {
  let val = e.target.value;
  if (props.inputType === "number" || props.inputType === "decimal") {
    if (!val) val = 0;
    if (props.inputType === "number") val = parseInt(val);
    else val = parseFloat(val);
    if (props.minValue != null && val < props.minValue) val = props.minValue;
    if (props.maxValue != null && val > props.maxValue) val = props.maxValue;
  }
  emit("update:modelValue", val);
  e.target.value = val;
}

function selectAll(e) {
  e.target.select();
}

// 🧩 Figma-Style Infinite Drag mit Pointer Lock + Modifier Keys
function onMouseDown(e) {
  startVal = parseFloat(props.modelValue) || 0;
  const el = e.target;
  el.requestPointerLock();
  isLocked = true;
  showFakeCursor.value = true;

  // starte Fake-Cursor an aktueller Mausposition
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("keydown", onKeyChange);
  window.addEventListener("keyup", onKeyChange);
}

function onMouseMove(e) {
  if (!isLocked) return;
  const delta = e.movementX;
  const step = props.dragStep * modifierStep;

  let newVal = startVal + delta * step;
  startVal = newVal;

  if (props.minValue != null && newVal < props.minValue) newVal = props.minValue;
  if (props.maxValue != null && newVal > props.maxValue) newVal = props.maxValue;

  if ( props.inputType === "decimal" ) {
    newVal = parseFloat(newVal.toFixed( 2 ))
  }
  emit("update:modelValue", newVal);

  // Fake-Cursor bewegt sich sichtbar
  cursorX.value += e.movementX;
  cursorY.value += e.movementY;

  // Wrap-around: bleibt sichtbar auch wenn über Rand
  if (cursorX.value < 0) cursorX.value = window.innerWidth;
  if (cursorX.value > window.innerWidth) cursorX.value = 0;
  if (cursorY.value < 0) cursorY.value = window.innerHeight;
  if (cursorY.value > window.innerHeight) cursorY.value = 0;
}

function onKeyChange(e) {
  // 🧠 Shift = schneller (x10), Alt = langsamer (x0.1)
  if (e.shiftKey && e.altKey) {
    modifierStep = 1; // neutralisieren, wenn beide gedrückt
  } else if (e.shiftKey) {
    modifierStep = 10;
  } else if (e.altKey) {
    modifierStep = 0.1;
  } else {
    modifierStep = 1;
  }
}

function onMouseUp() {
  if (document.pointerLockElement) document.exitPointerLock();
  isLocked = false;
  showFakeCursor.value = false;
  modifierStep = 1;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
  window.removeEventListener("keydown", onKeyChange);
  window.removeEventListener("keyup", onKeyChange);
}

onBeforeUnmount(() => {
  if (document.pointerLockElement) document.exitPointerLock();
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
  window.removeEventListener("keydown", onKeyChange);
  window.removeEventListener("keyup", onKeyChange);
});
</script>

<template>
  <ColumnLayout :style="{padding: 0, height: 'auto'}" :fill-height="stretch"  :gap="0">
    <TextLabel
        v-if="headerText"
        :text="headerText"
        :font-size="10"
        :font-weight="600"
        :opacity="0.8"
        :padding-left="0" :padding-bottom="0"
    />

      <div class="icon-input-wrapper">
      <span
          v-if="!iconSource"
          class="icon-prefix draggable-icon"
          @mousedown.prevent="onMouseDown"
          title="Ziehen zum Anpassen (Shift = schnell, Alt = fein)"
      >
        {{ prefix }}
      </span>
      <img
          v-else
          class="icon-prefix icon-img draggable-icon"
          :src="iconSource"
          alt=""
          @mousedown.prevent="onMouseDown"
          title="Ziehen zum Anpassen (Shift = schnell, Alt = fein)"
      />

      <input
          ref="inputRef"
          class="icon-text-field"
          type="text"
          :style="{ height: height + 'px' }"
          :value="modelValue"
          :maxlength="maxLength"
          @focus="selectAll"
          @blur="editingFinished"
          @keyup.enter="inputRef.blur()"
      />
    </div>

    <!-- 🧠 Fake Cursor (sichtbar während PointerLock) -->
    <div
        v-if="showFakeCursor"
        class="fake-cursor"
        :style="{
        left: cursorX + 'px',
        top: cursorY + 'px',
      }"
    ></div>
  </ColumnLayout>
</template>

<style scoped>
.icon-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.icon-prefix {
  position: absolute;
  left: 10px;
  color: var(--white-mute);
  pointer-events: all;
  font-size: 10px;
  line-height: 1;
  user-select: none;
}

.icon-img {
  left: 6px;
  width: 12px;
  height: 12px;
  object-fit: contain;
  cursor: ew-resize;
}

.draggable-icon:hover {
  cursor: ew-resize;
  color: var(--accent);
}

.icon-text-field {

  width: 100%;
  background-color: var(--black-hover);
  outline: none;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
  border-radius: 4px;
  padding-left: 24px;
  color: var(--white);
  box-sizing: border-box;
  font-size: 10px;
  cursor: default;
}

.icon-text-field:focus {
  border: 2px solid var(--accent);
}

/* 🎯 Fake Cursor Style */
.fake-cursor {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--white);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px var(--accent);
}
</style>
