<script setup>

const props = defineProps({
      text: { type: String },
  fontSize: { type: [String, Number], default: 10 },
  fontFamily: { type: String },
  opacity: { type:  Number, default: 0.8 },
  paddingLeft: { type: [String, Number], default: 8 },
  paddingRight: { type: [String, Number], default: 8 },
  align: { type: String, default: 'start' }
})

</script>

<template>
  <span
      class="multi-line-text"
      v-html="text"
      :style="{
        fontSize: typeof props.fontSize === 'string' ? props.fontSize : props.fontSize + 'px',
        paddingLeft: typeof props.paddingLeft === 'string' ? props.paddingLeft : props.paddingLeft + 'px',
        paddingRight: typeof props.paddingRight === 'string' ? props.paddingRight : props.paddingRight + 'px',
        fontFamily,
        opacity,
      textAlign: align
      }"
  >

  </span>

</template>

<style scoped>
.multi-line-text {
  box-sizing: border-box;
  height: auto;
  color: var(--text-normal);
  display: block; /* wichtig für text-align */
}

.multi-line-text:deep(b) {
  font-weight: bold;
}

</style>