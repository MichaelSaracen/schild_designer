<script setup>
import { Colors } from "@/canvas/utils/theme.js";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: Colors.blue },
  height: { type: Number, default: 24 },
  width: { type: Number, default: 24 },
  border: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue"]);

// Lokale Kopie (damit der ColorPicker nicht direkt auf Props schreibt)
const localColor = ref(props.modelValue);

// Wenn sich der Prop von außen ändert → auch hier aktualisieren
watch(
    () => props.modelValue,
    (val) => {
      if (val !== localColor.value) localColor.value = val;
    }
);

function onChange(color) {
  localColor.value = color;
  emit("update:modelValue", color);
}
</script>

<template>
  <div class="color-picker-inline">
    <ColorPicker
        :style="{
      width: props.width + 'px',
      height: props.height + 'px'
        }"
        class="picker"
        v-model:pureColor="localColor"
        format="hex8"
        :disableAlpha="false"
        @pureColorChange="onChange"
    />
  </div>
</template>

<style scoped>
.color-picker-inline {
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  border: 0 solid var(--border);
  width: v-bind(width + 'px');
  height: v-bind(height + 'px');

}

.picker {
  border-radius: var(--border-radius-small);


}
</style>
