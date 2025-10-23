<script setup>


import MultiLineText from "@/components/controls/labels/MultiLineText.vue";

const props = defineProps( {
  headerText: { type: String },
  headerSize: { type: Number, default: 16 },
  headerFamily: { type: String, default: 'Vegur' },
  headerAlign: { type: String, default: 'left' },

  text: { type: String },
  textSize: { type: Number, default: 12 },
  textFamily: { type: String, default: 'Vegur' },
  textAlign: { type: String, default: 'left' },
} );

const emit = defineEmits(['click'])

</script>

<template>
<div
    class="text-shape-button"
    @click="() => emit('click')"
>
  <MultiLineText
      :align="props.headerAlign"
      :font-size="props.headerSize + 'px'" :font-family="props.headerFamily"
      :text="props.headerText" :padding-left="0" :padding-right="0"
  />
  <MultiLineText
      v-if="text"
      :align="props.textAlign"
      :font-size="props.textSize + 'px'" :font-family="props.textFamily"
      :text="props.text" :padding-left="0" :padding-right="0"/>
</div>


</template>

<style scoped>
.text-shape-button {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 2px;
  width: 100%;

  aspect-ratio: 1 / 1;
  background-color: transparent;
  border-radius: var(--border-radius-small);
  opacity: 0.75;
  transition: all 0.3s ease;
  padding: 8px;
}

.text-shape-button:hover {
  background-color: var(--black-hover);
}
</style>