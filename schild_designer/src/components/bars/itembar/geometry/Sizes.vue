<script setup>

import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";
import {computed, inject} from "vue";

const scene       = inject( 'scene' );
const dpiUnit     = inject(  'dpiUnit' );

const width           = computed( {
  get: () => Math.round(dpiUnit.value?.pxToMM(scene.value?.states.width) )|| 0,
  set: (v) => { scene.value.setActiveObjectValueOnGrid( 'width',  v); }
} );

const height           = computed( {
  get: () => Math.round(dpiUnit.value?.pxToMM(scene.value?.states.height) )|| 0,
  set: (v) => { scene.value.setActiveObjectValueOnGrid( 'height', v ); }
} );

</script>

<template>
  <RowLayout :style="{ padding: 0 }" :gap="8" :align="'flex-end'">
    <IconTextField
        :header-text="'Breite (mm)'"
        :min-value="-9999"
        :max-value="9999"
        :icon-source="'/icons/width.png'"
        :prefix="'B'" v-model="width" />
    <IconTextField
        :header-text="'Höhe (mm)'"
        :min-value="-9999"
        :max-value="9999"
        :stretch="true"
        :icon-source="'/icons/height.png'"
        :prefix="'H'" v-model="height"/>
  </RowLayout>
</template>

<style scoped>

</style>