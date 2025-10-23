<script setup>

import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";
import {computed, inject} from "vue";

const scene       = inject( 'scene' );
const dpiUnit     = inject(  'dpiUnit' );

const x           = computed( {
  get: () => parseFloat(dpiUnit.value?.pxToMM(scene.value?.states.left).toFixed(1)) || 0,
  set: (v) =>  { scene.value.setActiveObjectValueOnGrid('left', v); }
} );

const y           = computed( {
  get: () => parseFloat(dpiUnit.value?.pxToMM(scene.value?.states.top).toFixed(1))|| 0,
  set: (v) =>  { scene.value.setActiveObjectValueOnGrid('top', v); }
} );



</script>

<template>

    <RowLayout :style="{ padding: 0 }" :gap="8" :align="'flex-end'">
      <IconTextField
          :header-text="'Links (mm)'"
          :min-value="-9999"
          :max-value="9999"
          :input-type="'decimal'"
          :drag-step="0.1"
          :icon-source="'/icons/x.png'"
          :prefix="'X'" v-model="x" />
      <IconTextField
          :header-text="'Oben (mm)'"
          :min-value="-9999"
          :max-value="9999"
          :input-type="'decimal'"
          :drag-step="0.1"
          :icon-source="'/icons/y.png'"
          :stretch="true"
          :prefix="'Y'" v-model="y"/>

    </RowLayout>


</template>

<style scoped>

</style>