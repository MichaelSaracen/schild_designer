<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import CompositesModes from "@/components/bars/itembar/appearance/CompositesModes.vue";
import Fill from "@/components/bars/itembar/appearance/Fill.vue";
import Stroke from "@/components/bars/itembar/appearance/Stroke.vue";
import Display from "@/components/bars/itembar/appearance/Display.vue";


</script>

<template>
  <ColumnLayout :gap="8">
    <ToggleHeader :text="'Erscheinung'"/>
    <Fill/>
    <Stroke/>
    <Display/>
    <CompositesModes/>
  </ColumnLayout>
  <HorizontalSpacer/>
</template>

<style scoped>

</style>