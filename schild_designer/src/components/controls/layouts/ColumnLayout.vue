<script setup>
const props = defineProps({
  paddingLeft: { type: [String, Number], default: 8 },
  paddingRight: { type: [String, Number], default: 8 },
  paddingBottom: { type: [String, Number], default: 8 },
  paddingTop: { type: [String, Number], default: 8 },
  gap: { type: Number, default: 4 },
  fillWidth: { type: Boolean, default: true },
  fillHeight: { type: Boolean, default: false },
  alignItems: { type: String, default: 'stretch' },             // z. B. start, center, end, stretch
  justifyItems: { type: String, default: 'flex-start' },
  minHeight: { type: Number, default: 1 },
});
</script>

<template>
  <div
      class="column-layout"
      :class="{ fillWidth, fillHeight}"
      :style="{
  paddingLeft: typeof paddingLeft === 'string' ? paddingLeft : paddingLeft + 'px',
  paddingRight: typeof paddingRight === 'string' ? paddingRight : paddingRight + 'px',
  paddingBottom: typeof paddingBottom === 'string' ? paddingBottom : paddingBottom + 'px',
  paddingTop: typeof paddingTop === 'string' ? paddingTop : paddingTop + 'px',
  gap: typeof gap === 'string' ? gap : gap + 'px',
  alignItems, justifyItems,
  minHeight: minHeight + 'px',
      }"
  >
    <slot/>
  </div>
</template>

<style scoped>
.column-layout {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  transition: background-color 0.3s ease ;
}

.fillWidth { width: 100% }

.fillHeight { height: 100%; }

.column-layout > * {
  flex: 1 1 auto; /* sorgt dafür, dass items den verfügbaren Platz füllen */
  min-height: 1px;  /* wichtig, verhindert overflow */
}

</style>