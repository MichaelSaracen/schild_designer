<!-- IconButton.vue -->
<script setup>
import Icon from "@/components/controls/misc/Icon.vue";
import ToolTip from "@/components/controls/labels/ToolTip.vue";
import {ref, onMounted, useAttrs, nextTick} from "vue";

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const props = defineProps({
  backgroundColor: { type: String, default: "transparent" },
  hoverColor: { type: String, default: "var(--black-hover)" },
  checkedColor: { type: String, default: "var(--black-checked)" },
  width: { type: [String, Number], default: 24 },
  height: { type: [String, Number], default: 24 },
  checked: { type: Boolean, default: false },
  checkable: { type: Boolean, default: false },
  iconSource: { type: String, default: "/icons/add.png" },
  iconSize: { type: [String, Number], default: 18 },
  tooltip: { type: String, default: "" }, // 🔥 Neues Tooltip-Prop
  fillWidth: { type: Boolean, default: false },
  toolTipdirection: { type: String, default: 'right' },
});

const emit = defineEmits(["click", "update:checked"]);

const buttonRef = ref(null);
const isMounted = ref( null )

function onClicked(e) {
  emit("click", e);
  if (props.checkable) emit("update:checked", !props.checked);
}

onMounted(async () => {
  await nextTick();
  isMounted.value = true;
});

</script>

<template>
    <button
        v-bind="attrs"
        ref="buttonRef"
        @click="onClicked"
        class="icon-button"
        :class="{ checked, fillWidth }"
        :style="{
        '--bg-color': backgroundColor,
        '--hover-color': hoverColor,
        '--checked-color': checkedColor,
        width: props.fillWidth ? '100%' :  typeof props.width === 'string' ? props.width : props.width + 'px',
        height: typeof height === 'string' ? height : height + 'px',
      }"
    >
      <Icon :icon-source="iconSource" :icon-size="iconSize" />
    </button>

    <!-- Tooltip automatisch einfügen, falls text vorhanden -->
    <ToolTip v-if="isMounted && tooltip" :direction="toolTipdirection" :target="buttonRef" :text="tooltip" />

</template>

<style scoped>
.icon-button {
  display: flex;
  border: none;
  border-radius: var(--border-radius-small);
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  transition: background-color 0.3s ease ;
}

.icon-button:not(.checked):hover {
  background-color: var(--hover-color);
}

.icon-button.checked {
  color: var(--text-normal);
  background-color: var(--checked-color);
}

.fillWidth {
  width: 100%;
}

</style>
