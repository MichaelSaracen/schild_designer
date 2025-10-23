<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import ToggleHeader from "@/components/controls/labels/ToggleHeader.vue";
import ItemAlign from "@/components/bars/itembar/layout/ItemAlign.vue";


</script>

<template>
  <ColumnLayout :gap="8">
    <ToggleHeader :text="'Layout'"/>
    <ItemAlign/>
  </ColumnLayout>
  <HorizontalSpacer/>
</template>

<style scoped>

</style>