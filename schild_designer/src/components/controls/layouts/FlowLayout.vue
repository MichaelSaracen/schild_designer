<script setup>
const props = defineProps({
  gap: { type: [String, Number], default: 0 },
  padding: { type: [String, Number], default: 8 },
  align: { type: String, default: "flex-start" }, // align-items
  justify: { type: String, default: "flex-start" }, // justify-content
  marginTop: { type: [String, Number], default: 0 },
  marginBottom: { type: [String, Number], default: 0 },
  stretch: { type: Boolean, default: false },
  minHeight: { type: [String, Number], default: 'fit-content' },
  maxHeight: { type: [String, Number], default: 'none' },
  maxWidth: { type: [String, Number], default: 'none' },
})
</script>

<template>
  <div
      class="flow"
      :class="{ stretch: stretch }"
      :style="{
      flex: stretch ? 1 : 'none',
      gap: gap + 'px',
      padding: padding + 'px',
      alignItems: align,
      justifyContent: justify,
      marginTop: marginTop + 'px',
      marginBottom: marginBottom + 'px',
      minHeight: typeof minHeight === 'string' ? minHeight : minHeight + 'px',
      maxHeight: typeof maxHeight === 'string' ? maxHeight : maxHeight + 'px',
      maxWidth: typeof maxWidth === 'string' ? maxWidth : maxWidth + 'px'
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.flow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}


.flow.stretch {
  flex: 1 1 auto;
  width: 100%;
}
</style>
