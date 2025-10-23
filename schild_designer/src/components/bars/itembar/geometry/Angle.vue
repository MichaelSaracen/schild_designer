<script setup>

import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";
import {computed, inject} from "vue";

const scene       = inject( 'scene' );
const angle           = computed( {
  get: () => scene.value?.states.angle || 0,
  set: (v) => { scene.value.setActiveObjectValue( 'angle', v ); }
} );

</script>

<template>
  <RowLayout :style="{ padding: 0 }" :gap="8" :align="'flex-end'">
    <IconTextField
        :header-text="'Rotation'"
        :min-value="-9999"
        :max-value="9999"
        :icon-source="'/icons/r_left.png'"
        :prefix="'X'" v-model="angle" />
    <div :style="{width: '100%'}"></div>
  </RowLayout>
</template>

<style scoped>

</style>