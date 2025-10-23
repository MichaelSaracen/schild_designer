<script setup>

import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";
import {computed, inject} from "vue";


const scene       = inject( 'scene' );
const dpiUnit     = inject(  'dpiUnit' );

const opacity           = computed( {
  get: () => scene.value?.states.opacity || 0,
  set: (v) =>  { scene.value.setActiveObjectValue('opacity', v); }
} );

const borderRadius           = computed( {
  get: () => scene.value?.states.rx || 0,
  set: (v) =>  {
    scene.value.setActiveObjectValue('rx', v);
    scene.value.setActiveObjectValue('ry', v);
  }
} );



</script>

<template>
    <RowLayout :style="{ padding: 0 }" :gap="8" :align="'flex-end'">
      <IconTextField
          :header-text="'Transparenz'"
          :min-value="0"
          :max-value="1"
          :input-type="'decimal'"
          :drag-step="0.01"
          :icon-source="'/icons/x.png'"
          v-model="opacity" />
      <IconTextField
          :header-text="'Ecken'"
          :min-value="0"
          :max-value="9999"
          :icon-source="'/icons/y.png'"
          :stretch="true"
          :prefix="'Y'" v-model="borderRadius"/>

    </RowLayout>
</template>

<style scoped>

</style>