<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import FontFamily from "@/components/bars/itembar/texts/FontFamily.vue";
import FontStyle from "@/components/bars/itembar/texts/FontStyle.vue";
import {ref, watch} from "vue";
import FontAlign from "@/components/bars/itembar/texts/FontAlign.vue";

const fontFamilyRef = ref( null );
const weights = ref([])

watch( () => fontFamilyRef.value?.currentFont, (v) => {
      weights.value = v.weights;
    }
)

</script>

<template>
  <ColumnLayout :gap="8">
    <ToggleHeader :text="'Text'"/>
    <FontFamily ref="fontFamilyRef"/>
    <FontStyle :font-weights="weights"/>
    <FontAlign/>
  </ColumnLayout>
  <HorizontalSpacer/>
</template>

<style scoped>

</style>