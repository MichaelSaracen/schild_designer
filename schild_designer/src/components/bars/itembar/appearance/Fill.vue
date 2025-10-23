<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";
import {computed, inject} from "vue";
import ColorTextField from "@/components/controls/buttons/ColorTextField.vue";

const scene       = inject( 'scene' );


const fillColor           = computed( {
  get: () => scene.value?.states.fill ?? '#fff',
  set: (v) =>  { scene.value.setActiveObjectValue('fill', v); }
} );

</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :gap="8">
    <RowLayout :style="{ padding: 0 }" :gap="8" :align="'flex-end'">
      <ColorTextField :header-text="'Füllung'" :stretch="true" v-model="fillColor" />
      <div :style="{ width: '100%' }"></div>
    </RowLayout>
  </ColumnLayout>

</template>

<style scoped>

</style>