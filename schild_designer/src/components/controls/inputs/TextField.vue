<script setup>
import { ref, watch, nextTick } from "vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";

const props = defineProps({
  text: { type: String, default: "" },
  stretch: { type: Boolean, default: true },
});

const emit = defineEmits(["update:text"]);

const isEditing = ref(false);
const editValue = ref(props.text);

// 🔁 Synchronisieren, wenn Parent Text ändert (z. B. extern)
watch(
    () => props.text,
    (v) => {
      if (!isEditing.value) editValue.value = v;
    }
);

function startEdit() {
  isEditing.value = true;
  editValue.value = props.text;
  nextTick(() => {
    const input = document.querySelector(".text-field");
    input?.focus();
    input?.select();
  });
}

function finishEdit() {
  isEditing.value = false;
  emit("update:text", editValue.value); // 🔥 sendet nach oben
}
</script>

<template>
  <!-- Anzeige -->
  <TextLabel
      v-if="!isEditing"
      :text="props.text"
      :padding-left="0"
  :stretch="stretch"
  @dblclick="startEdit"
  />

  <!-- Eingabe -->
  <input
      v-else
      class="text-field"
      :class="{ stretch }"
      type="text"
      v-model="editValue"
      @keydown.enter="finishEdit"
      @blur="finishEdit"
  />
</template>

<style scoped>
.text-field {
  display: flex;
  height: 24px;
  align-items: center;
  box-sizing: border-box;
  font-size: 11px;
  background-color: transparent;
  border: 1px solid var(--accent);
  border-radius: var(--border-radius-small);
  padding-left: 8px;
  color: var(--text-normal);
  outline: none;
  transition: background-color 0.3s ease ;
}

.stretch {
  width: 100%;
}
</style>
