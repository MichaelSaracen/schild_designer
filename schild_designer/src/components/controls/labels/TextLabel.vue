<script setup>
const props = defineProps( {
  text: { type: String, default: 'TextLabel'},
  paddingLeft: { type: [String, Number], default: 8 },
  paddingRight: { type: [String, Number], default: 8 },
  paddingBottom: { type: [String, Number], default: 0 },
  paddingTop: { type: [String, Number], default: 0 },
  fontSize: { type: [String, Number], default: 11 },
  fontWeight: { type: [String, Number], default: 'bold'},
  stretch: { type: Boolean, default: true },
  opacity: { type: Number, default: 0.8 }
} );


</script>

<template>
  <span
      class="text-label"
      :class="{ stretch }"
    :style="{
        paddingLeft: paddingLeft.type === 'string' ? paddingLeft : paddingLeft + 'px',
        paddingRight: paddingRight.type === 'string' ? paddingRight : paddingRight + 'px',
        paddingBottom: paddingBottom.type === 'string' ? paddingBottom : paddingBottom + 'px',
        paddingTop: paddingTop.type === 'string' ? paddingTop : paddingTop + 'px',
        fontSize: fontSize.type === 'string' ? fontSize : fontSize + 'px',
        fontWeight, opacity
    }"
  >
    {{ text }}
  </span>
</template>

<style scoped>

.text-label {
  display: flex;
  height: 24px;
  align-items: center;
  box-sizing: border-box;

}

.stretch { width: 100%; }

</style>