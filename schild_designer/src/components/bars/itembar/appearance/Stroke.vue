<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";
import {computed, inject} from "vue";
import ColorTextField from "@/components/controls/buttons/ColorTextField.vue";

const scene       = inject( 'scene' );
const dpiUnit     = inject(  'dpiUnit' );

const width           = computed( {
  get: () => scene.value?.states.strokeWidth || 0,
  set: (v) =>  { scene.value.setActiveObjectValue('strokeWidth', v); }
} );

const strokeColor           = computed( {
  get: () => scene.value?.states.stroke ?? '#fff',
  set: (v) =>  { scene.value.setActiveObjectValue('stroke', v); }
} );



</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :gap="8">
    <RowLayout :style="{ padding: 0 }" :gap="8" :align="'flex-end'">
      <ColorTextField :header-text="'Rahmen'" :stretch="true" v-model="strokeColor" />
      <IconTextField
          :header-text="'Breite (mm)'"
          :min-value="-9999"
          :max-value="9999"
          :icon-source="'/icons/border.png'"
          :prefix="'X'" v-model="width" />


    </RowLayout>
      </ColumnLayout>
</template>

<style scoped>

</style>