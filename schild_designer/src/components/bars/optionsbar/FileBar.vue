<script setup >

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import NewLayer from "@/components/bars/optionsbar/filebar/NewLayer.vue";
import {computed, inject, ref} from "vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import LayerBar from "@/components/bars/optionsbar/filebar/LayerBar.vue";

const scene = inject('scene');

</script>

<template>

  <ColumnLayout :fill-height="false" :style="{ padding: 0 }">
    <NewLayer />
    <HorizontalSpacer/>
    <LayerBar/>
  </ColumnLayout>

</template>

<style scoped>

</style>