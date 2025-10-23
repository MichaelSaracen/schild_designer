<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";
import {computed, inject, toRaw} from "vue";
import ColorTextField from "@/components/controls/buttons/ColorTextField.vue";

const scene = inject( 'scene' );
const selectedItem = computed( () => scene.value?.activeObject() ?? null );


const blendColor           = computed( {
  get: () => {
    const filters = scene.value?.states?.filters ?? [];
    const blendColor = filters.find( f => f && toRaw(f).type === 'BlendColor');
    return blendColor?.color ?? '#fff'
  },
  set: (v) =>  {
    const item = scene.value.canvas.getActiveObject();
    if ( !item && item.objectName !== 'SVGImageItem') return;
    scene.value.controller.imageFilterModel.setBlendColor(item, v) }
} );

const opacity           = computed( {
  get: () => scene.value?.states.opacity || 0,
  set: (v) =>  { scene.value.setActiveObjectValue('opacity', v); }
} );

</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :gap="8">
    <RowLayout :style="{ padding: 0 }" :gap="8" :align="'flex-end'">
      <ColorTextField
          v-if="selectedItem && selectedItem.objectName === 'SVGImageItem'"
          :header-text="'Füllung'" :stretch="true" v-model="blendColor" />
      <IconTextField
          :header-text="'Transparenz'"
          :min-value="0"
          :max-value="1"
          :input-type="'decimal'"
          :drag-step="0.01"
          :icon-source="'/icons/x.png'"
          v-model="opacity" />
    </RowLayout>
  </ColumnLayout>

</template>

<style scoped>

</style>