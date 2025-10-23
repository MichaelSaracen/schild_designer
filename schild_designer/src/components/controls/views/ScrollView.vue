<script setup >

const props = defineProps({
  padding: { type: [Number, String], default: 0 },
  marginTop: { type: [String, Number], default: 0 },
  marginBottom: { type: [String, Number], default: 0 },
  marginLeft: { type: [String, Number], default: 0 },
  marginRight: { type: [String, Number], default: 0 },
  gap:  { type:  [String, Number], default: 0 },
  overflowY: { type: String, default: 'auto' }
})


</script>

<template>
  <div
      class="scroll-view"

      :style="{
    overflowY,
          padding: typeof padding === 'number' ? padding + 'px' : padding,
          marginTop: typeof marginTop === 'string' ? marginTop : marginTop + 'px',
          marginBottom: typeof marginBottom === 'string' ? marginBottom : marginBottom + 'px',
          marginLeft: typeof marginLeft === 'string' ? marginLeft : marginLeft + 'px',
          marginRight: typeof marginRight === 'string' ? marginRight : marginRight + 'px',
          gap: typeof gap === 'string' ? gap : gap + 'px',

    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.scroll-view {
  display: flex;
  flex-direction: column;
  height: 100%;          /* 🔥 sorgt dafür, dass max-height nicht limitiert */
  min-height: 0;         /* 🔥 verhindert Overflow durch Flex-Kinder */
  width: 100%;

  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--border-color);

}

.scroll-view > * {
  min-height: fit-content !important;
}


</style>