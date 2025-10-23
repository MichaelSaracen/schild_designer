<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";

const props = defineProps({
  backgroundColor: { type: String, default: 'var(--black200)'},
  borderLeftVisible: { type: Boolean, default: false },
  borderRightVisible: { type: Boolean, default: false },
  borderColor: { type: String, default: 'var(--border-color)'},
});

</script>

<template>
  <div
      class="side-bar"
      :style="{
    backgroundColor: backgroundColor,
    borderLeft: borderLeftVisible ? `1px solid ${borderColor}` : 'none',
    borderRight: borderRightVisible ? `1px solid ${borderColor}` : 'none',
      }"
  >
    <ColumnLayout :gap="4" :padding-left="0" :padding-right="0" :padding-bottom="0" :padding-top="0">
      <slot/>
    </ColumnLayout>
  </div>
</template>

<style scoped>

.side-bar {

  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* optional */
  min-height: 0;

}


</style>