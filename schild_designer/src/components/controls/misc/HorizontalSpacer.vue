<script setup>
const props = defineProps( {
  marginTop: { type: [String, Number], default: 0 },
  marginBottom: { type: [String, Number], default: 0 },
} );


</script>

<template>
<div
    :style="{
  marginTop: typeof props.marginTop === 'string' ? props.marginTop : props.marginTop + 'px',
  marginBottom: typeof props.marginBottom === 'string' ? props.marginBottom : props.marginBottom + 'px',
    }"
    class="horizontal-spacer">

</div>
</template>

<style scoped>
.horizontal-spacer {
  width: 100%;
  display: block;

  box-sizing: border-box;
  flex-shrink: 0;
  max-height: 1px;
  height: 1px;
  min-height: 1px;
  background-color: var(--border-color);
}
</style>