<script setup>
const props = defineProps({
  columns: { type: [String, Number], default: '1fr 1fr 1fr' },  // z. B. '250px 1fr 250px'
  rows: { type: [String, Number], default: 'auto' },            // z. B. 'auto 1fr auto'
  gap: { type: [String, Number], default: 0 },                  // Abstand zwischen Grid-Zellen
  columnGap: { type: [String, Number], default: null },         // optional
  rowGap: { type: [String, Number], default: null },            // optional
  alignItems: { type: String, default: 'stretch' },             // z. B. start, center, end, stretch
  justifyItems: { type: String, default: 'stretch' },           // z. B. start, center, end, stretch
  fullHeight: { type: Boolean, default: true },
  fullWidth: { type: Boolean, default: true },
  backgroundColor: { type: String, default: 'transparent' },
  padding: { type: [String, Number], default: 0 }
});
</script>

<template>
  <div
      class="grid-layout"
      :style="{
        display: 'grid',
        gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
        gridTemplateRows: typeof rows === 'number' ? `repeat(${rows}, auto)` : rows,
        gap: typeof gap === 'number' ? gap + 'px' : gap,
        columnGap: columnGap ? (typeof columnGap === 'number' ? columnGap + 'px' : columnGap) : undefined,
        rowGap: rowGap ? (typeof rowGap === 'number' ? rowGap + 'px' : rowGap) : undefined,
        alignItems,
        justifyItems,
        backgroundColor,
        width: fullWidth ? '100%' : 'auto',
        height: fullHeight ? '100%' : 'auto',
        padding: typeof padding === 'number' ? padding + 'px' : padding,
        gridAutoRows: (typeof rows === 'string' && rows.endsWith('px')) ? rows : undefined,
      }"
  >
    <slot/>
  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  min-width: 1px;
  min-height: 1px;


}
</style>
