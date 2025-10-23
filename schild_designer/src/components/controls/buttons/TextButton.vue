<script setup>

const props = defineProps( {
  text: { type: String, default: 'TextButton'},
  backgroundColor: { type: String, default: 'var(--black300)' },
  hoverColor: { type: String, default: 'var(--black-hover)' },
  checkedColor: { type: String, default: 'var(--black-checked)' },
  checked: { type: Boolean, default: false },
  paddingLeft: { type: [String, Number], default: 8 },
  paddingRight: { type: [String, Number], default: 8 },
  paddingBottom: { type: [String, Number], default: 4 },
  paddingTop: { type: [String, Number], default: 4 },
  fontSize: { type: [String, Number], default: 11 },
  height: { type: [String, Number], default: 32 },
  enabled: { type: Boolean, default: true },
} );

const emit = defineEmits(["click", "update:checked"])

function onClick( e ) {
  if ( !props.enabled ) return;
  emit('click', e );
  emit('update:checked', !props.checked );
}

</script>

<template>
  <button
      class="text-button"
      :class=" { checked, enabled }"
      :style="{
        '--bg-color': backgroundColor,
        '--hover-color': hoverColor,
        '--checked-color': checkedColor,
        paddingLeft: paddingLeft.type === 'string' ? paddingLeft : paddingLeft + 'px',
        paddingRight: paddingRight.type === 'string' ? paddingRight : paddingRight + 'px',
        paddingBottom: paddingBottom.type === 'string' ? paddingBottom : paddingBottom + 'px',
        paddingTop: paddingTop.type === 'string' ? paddingTop : paddingTop + 'px',
        fontSize: fontSize.type === 'string' ? fontSize : fontSize + 'px',
        height: typeof props.height === 'string' ? props.height : props.height + 'px'
      }"
      @click="onClick"
  >
    {{ text }}
  </button>
</template>

<style scoped>
.text-button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: var(--text-dark);
  border: none;
  font-weight: bold;
  background-color: var(--bg-color);
  border-radius: var(--border-radius-small);
  transition: all 0.3s ease;
}

.enabled {
  opacity: 1;
}

.text-button:not(.enabled ) {
  opacity: 0.25;
}


.text-button.checked {
  color: var(--text-normal);
  background-color: var(--checked-color);
}

.text-button.enabled:hover,
.text-button:not(.checked):hover {
  background-color: var(--hover-color);
}



</style>