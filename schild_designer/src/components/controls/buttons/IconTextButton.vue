<!-- IconTextButton.vue -->
<script setup>
import Icon from "@/components/controls/misc/Icon.vue";
import ToolTip from "@/components/controls/labels/ToolTip.vue";
import { ref, onMounted, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();

const props = defineProps({
  backgroundColor: { type: String, default: "transparent" },
  hoverColor: { type: String, default: "var(--black-hover)" },
  checkedColor: { type: String, default: "var(--black-checked)" },
  width: { type: [String, Number], default: '100%' },
  height: { type: [String, Number], default: 48 },
  checked: { type: Boolean, default: false },
  checkable: { type: Boolean, default: false },
  iconSource: { type: String, default: "/icons/add.png" },
  iconSize: { type: [String, Number], default: 24 },
  text: { type: String, default: "" },
  textColor: { type: String, default: "var(--text-normal)" },
  tooltip: { type: String, default: "" },
  fontSize: { type: [String, Number], default: 10 },
  padding:  { type: [String, Number], default: 0 },
});

const emit = defineEmits(["click", "update:checked", "loading"]);
const buttonRef = ref(null);
const isMounted = ref(false);

function onClicked(e) {
  emit("click", e);
  if (props.checkable) emit("update:checked", !props.checked);
}

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <button
      v-bind="attrs"
      ref="buttonRef"
      @click="onClicked"
      class="icon-text-button"
      :class="{ checked }"
      :style="{
      '--bg-color': props.backgroundColor,
      '--hover-color': hoverColor,
      '--checked-color': checkedColor,
      '--text-color': textColor,
      '--font-size': typeof fontSize === 'string' ? fontSize : fontSize + 'px',
      width: typeof width === 'string' ? width : width + 'px',
      height: typeof height === 'string' ? height : height + 'px',
      padding: typeof props.padding === 'string' ? props.padding : props.padding + 'px'
    }"
  >
    <Icon :icon-source="iconSource" :icon-size="iconSize" @loading="emit('loading')" />
    <span v-if="text" class="button-text">{{ text }}</span>
  </button>

  <!-- Tooltip -->
  <ToolTip v-if="isMounted && tooltip" :target="buttonRef" :text="tooltip" />
</template>

<style scoped>
.icon-text-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  border-radius: var(--border-radius-small);
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: var(--font-size);

  transition: background-color 0.3s ease, color 0.3s ease;
  padding: 6px 4px;
}

.icon-text-button:not(.checked):hover {
  background-color: var(--hover-color);
}

.icon-text-button.checked {
  background-color: var(--checked-color);
  color: var(--text-normal);
}

.button-text {
  line-height: 1.2;
  text-align: center;
  user-select: none;
}
</style>
