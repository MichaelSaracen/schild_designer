<script setup>

import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ImageFilter from "@/components/bars/itembar/images/ImageFilter.vue";
import BlendColor from "@/components/bars/itembar/images/BlendColor.vue";
import {computed, inject} from "vue";
import CompositesModes from "@/components/bars/itembar/appearance/CompositesModes.vue";

const scene       = inject( 'scene' );
const selectedItem = computed( () => scene.value?.activeObject() ?? null );

</script>

<template>
  <ColumnLayout :gap="8">
    <ToggleHeader :text="'Bild'"/>
    <BlendColor />
    <CompositesModes/>
    <ImageFilter/>
  </ColumnLayout>
</template>
<HorizontalSpacer/>
<style scoped>

</style>