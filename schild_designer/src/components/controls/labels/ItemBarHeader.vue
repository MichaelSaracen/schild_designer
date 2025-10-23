
<script setup>

const props = defineProps({
  text: { type: String, default: "Header" },
  stretch: { type: Boolean, default: false},
  marginTop: { type: [String, Number], default: 0},
  marginBottom: { type: [String, Number], default: 0},
  marginLeft: { type: [String, Number], default: 0},
  marginRight: { type: [String, Number], default: 0},
  fontSize: { type: [String, Number], default: 12},
  fontWeight: { type: String, default: "bold" },
})

</script>

<template>
  <span
      :class="{ stretch: stretch }"
      :style="{

        marginTop: marginTop + 'px',
        marginBottom: marginBottom + 'px',
        marginLeft:  marginLeft + 'px',
        marginRight: marginRight + 'px',
        fontSize: fontSize.type === 'string' ? fontSize : fontSize + 'px',
         fontWeight: fontWeight ,
      }"
      class="item-bar-header">
    <slot>{{ text }}</slot>
  </span>
</template>


<style scoped>

.item-bar-header {
  display: flex;
  color: var(--text-normal);
  height: 24px;
  align-items: center;
  line-height: 1em;
}

.stretch {
  width: 100%;
}

</style>