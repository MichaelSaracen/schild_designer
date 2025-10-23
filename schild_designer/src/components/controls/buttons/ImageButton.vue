<script setup>

const props = defineProps( {
  imageSource: { type: String, required: true },
  width: { type: [String, Number], default: '100%' },
  height: { type: [String, Number], default: 60 },
} );

const emit = defineEmits( ['click'] )


</script>

<template>
  <div
      class="image-item"
      :style="{
          width: typeof props.width === 'string' ? props.width : props.width + 'px',
          height: typeof props.height === 'string' ? props.height : props.height + 'px',
      }"
      @click="emit('click')"
  >
    <img :src="props.imageSource" alt="" />
  </div>
</template>

<style scoped>
.image-item {
  box-sizing: border-box;
  border-radius: var(--border-radius-small);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  opacity: 0.75;
  transition: all 0.1s ease;
  border: 0 solid var(--accent-op);
}

.image-item:hover {
  opacity: 1;
  border: 4px solid var(--magenta-op);
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

</style>