<script setup>

import Icon from "@/components/controls/misc/Icon.vue";

const props = defineProps( {
  text: { type: String, default: 'NavButton' },
  iconsSource: { type: String, default: '/icons/layer.png'},
  checked: { type: Boolean, default: false }
} );

const emit = defineEmits( ['click', 'update:checked'] )

function onClicked( ) {
  emit('click');
  emit('update:checked', !props.checked );
}

</script>

<template>
<div class="navbar-button" :class="{ checked }" @click="onClicked">
  <Icon :icon-source="props.iconsSource"/>
  <span class="navbar-button-text"> {{ text }} </span>
</div>
</template>

<style scoped>
.navbar-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: transparent;
  opacity: 0.75;
  transition: all 0.3s ease;
}

.navbar-button:not(.checked):hover {
  background-color: var(--black-hover);
}

.checked {
  background-color: var(--accent-op);
  opacity: 1;
}


.navbar-button-text {
  font-size: 10px;
}
</style>






















