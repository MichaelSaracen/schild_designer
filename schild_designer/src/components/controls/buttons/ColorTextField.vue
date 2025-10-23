<script setup>

import {ref, watch} from "vue";
import ColorButton from "@/components/controls/buttons/ColorButton.vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";

const inputRef = ref( null );

const props = defineProps({
  modelValue: { type: String },
  headerText: { type: String, default: '' },
  stretch: { type: Boolean, default: false },
  height: { type: Number, default: 24 },
  prefix: { type: String, default: 'W' },
  iconSource: { type: String, default: ''},
  maxLength: { type: Number, default: 8 },
});

const localValue = ref(props.modelValue);

watch( () => props.modelValue, value => {
  if ( value !== localValue.value ) localValue.value = value;
});

const emit = defineEmits(["update:modelValue"])

function onInput(e) {
  let val = e.target.value.trim();

  // Auto-Hash hinzufügen
  if (val && !val.startsWith("#")) {
    val = "#" + val;
  }

  // Nur gültige HEX-Zeichen
  val = val.replace(/[^#0-9a-fA-F]/g, "");

  emit("update:modelValue", val);
}

function editingFinished( e ) {
  let val = e.target.value;
  val = val.replace(/[^a-fA-F0-9]/g, "");

  emit("update:modelValue", val);
  localValue.value = val;
  e.target.value = val;
}

function setValue( val ) {
  localValue.value = val;
  emit("update:modelValue", val);
}

</script>

<template>
  <ColumnLayout :style="{ padding: 0}" :gap="4" :fill-width="true">
    <TextLabel
        :text="headerText"
        v-if="headerText"
        :font-size="10"
        :font-weight="600"
        :opacity="0.8"
        :padding-left="0" :padding-bottom="0"
    />

    <div class="icon-input-wrapper">
      <input
          ref="inputRef"
          class="icon-text-field"
          type="text"
          :style="{ height: height + 'px' }"
          :value="localValue"
          :maxlength="maxLength"
          @blur="editingFinished"
          @keyup.enter="inputRef.blur()"
      />
      <ColorButton :width="18" :height="18" class="icon-prefix" :model-value="localValue" @update:modelValue="setValue"/>
    </div>
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
  left: 4px;
  color: var(--white-mute);

  font-size: 10px;
  line-height: 1;
}

.icon-img {
  left: 6px;
  width: 12px;
  height: 12px;
  object-fit: contain; /* 👈 Bild bleibt proportional */

}

.icon-text-field {
  width: 100%;
  background-color: var(--black-hover);
  outline: none;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
  border-radius: 4px;
  padding-left: 24px; /* 👈 Platz für das Prefix */
  color: var(--white);
  box-sizing: border-box;
  font-size: 10px;
  cursor: default;
}
.icon-text-field:focus {
  border: 2px solid var(--accent);
}
.icon-text-field-wrapper {
  position: absolute;
}

</style>