<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import {computed, inject} from "vue";
import Axis from "@/components/bars/itembar/geometry/Axis.vue";
import Angle from "@/components/bars/itembar/geometry/Angle.vue";
import Sizes from "@/components/bars/itembar/geometry/Sizes.vue";


</script>

<template>
  <ColumnLayout :gap="8">
    <ToggleHeader :text="'Geometrie'"/>
    <Axis/>
    <Sizes/>
    <Angle/>
  </ColumnLayout>
  <HorizontalSpacer/>
</template>

<style scoped>

</style>