<script setup>

import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import {computed, inject, toRaw, watch} from "vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import ColorTextField from "@/components/controls/buttons/ColorTextField.vue";
import IconTextField from "@/components/controls/inputs/IconTextField.vue";
import ItemBarHeader from "@/components/controls/labels/ItemBarHeader.vue";


const scene       = inject( 'scene' );
const selectedItem = computed( () => scene.value?.activeObject() ?? null );

const blur           = computed( {
  get: () => {
    const blurFilter = selectedItem.value?.filters?.find(f => f && toRaw(f).type === 'Blur');
    return blurFilter?.blur ?? 0;
  },
  set: (v) =>  {
    const item = selectedItem.value
    if ( !item ) return;
    const blurFilter = selectedItem.value.filters.find(f => f && toRaw(f).type === 'Blur');
    if ( !blurFilter ) scene.value.controller.imageFilterModel.addFilter( item, 'Blur')
    if ( blurFilter ) {
      blurFilter.blur = v;
      scene.value.controller.imageFilterModel.setBlur(item, v);
    }
  }
} );

const brightness           = computed( {
  get: () => {
    const filter = selectedItem.value?.filters?.find(f => f && toRaw(f).type === 'Brightness');
    return filter?.brightness ?? 0;
  },
  set: (v) =>  {
    const item = selectedItem.value
    if ( !item ) return;
    const filter = selectedItem.value.filters.find(f => f && toRaw(f).type === 'Brightness');
    if ( !filter ) scene.value.controller.imageFilterModel.addFilter( item, 'Brightness')
    if ( filter ) {
      filter.brightness = v;
      scene.value.controller.imageFilterModel.setBrightness(item, v);
    }
  }
} );




</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :gap="8">
    <ItemBarHeader :text="'Filter'" :margin-bottom="-8" :margin-top="8"/>
    <IconTextField
        :header-text="'Blur'"
        :min-value="0"
        :max-value="2"
        :input-type="'decimal'"
        :drag-step="0.01"
        :icon-source="'/icons/clip.png'"
        v-model:model-value="blur" />
    <IconTextField
        :header-text="'Helligkeit'"
        :min-value="-1"
        :max-value="1"
        :input-type="'decimal'"
        :drag-step="0.01"
        :icon-source="'/icons/clip.png'"
        v-model:model-value="brightness" />
  </ColumnLayout>
</template>
<HorizontalSpacer/>
<style scoped>

</style>