<script setup>


import TextLabel from "@/components/controls/labels/TextLabel.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import Icon from "@/components/controls/misc/Icon.vue";

const props = defineProps( {
  backgroundColor: { type: String, default: "var(--black300)"},
  hoverColor: { type: String, default: "#4b4b4b"},
  checkedColor: { type: String, default: "var(--accent-op)"},
  enabled: { type: Boolean, default: true },
  height: { type: [String, Number], default: 24 },
  width: { type: [String, Number], default: 'auto' },
  text: { type: [String, Number], default: "MenuButton" },
  shortCut: { type: String, default: "" },
  stretch: { type: Boolean, default: false },
  checkable: { type: Boolean, default: true },
  checked: { type: Boolean, default: false },
  iconSource: { type: String, default: ''},
  iconsSize: { type: [String, Number], default: 16},
  marginTop: { type: [String, Number], default: 0},
  marginBottom: { type: [String, Number], default: 0},
  marginRight: { type: [String, Number], default: 0},
  marginLeft: { type: [String, Number], default: 0},
  paddingTop: { type: [String, Number], default: 0},
  paddingBottom: { type: [String, Number], default: 0},
  paddingRight: { type: [String, Number], default: 0},
  paddingLeft: { type: [String, Number], default: 0},
  iconVisible: { type: Boolean, default: true },
  fontFamily: { type: String, default: 'Segoe UI'}
} );

const emit = defineEmits(["update:checked", "click"]);

function onClick( e ) {
  if ( !props.enabled ) return;

  emit("click", e);
  if( props.checkable ) {
    emit("update:checked", !props.checked );
  }
}

</script>

<template>
  <div
      @click="onClick"
      class="menu-button"
      :class="{
         enabled: enabled,
         checked: checked
      }"
      :style="{
        '--background-color': backgroundColor,
        '--hover-color' : hoverColor,
        '--checked-color' : checkedColor,
        height: height.type === 'string' ? height : height + 'px',
        width: width.type === 'string' ? width : width + 'px',
        flex: stretch ? 1 : 'none',
        fontFamily,
        marginTop: marginTop.type === 'string' ? marginTop : marginTop + 'px',
        marginBottom: marginBottom.type === 'string' ? marginBottom : marginBottom + 'px',
        marginRight: marginRight.type === 'string' ? marginRight : marginRight + 'px',
        marginLeft: marginLeft.type === 'string' ? marginLeft : marginLeft + 'px',
        paddingTop: paddingTop.type === 'string' ? paddingTop : paddingTop + 'px',
        paddingBottom: paddingBottom.type === 'string' ? paddingBottom : paddingBottom + 'px',
        paddingRight: paddingRight.type === 'string' ? paddingRight : paddingRight + 'px',
        paddingLeft: paddingLeft.type === 'string' ? paddingLeft : paddingLeft + 'px',
      }"
  >
    <RowLayout :padding="0" :gap="4" :align-items="'center'" >
      <Icon v-if="iconSource && iconVisible" :icon-source="iconSource" :icon-size="iconsSize"/>
      <div
          class="empty-icon"
          v-else
          :style="{
    width: typeof  !iconVisible ? '0px' : iconsSize === 'string' ? iconsSize : iconsSize + 'px',
    height: typeof !iconVisible ? '0px' : iconsSize === 'string' ? iconsSize : iconsSize + 'px'
  }"
      />
      <TextLabel :stretch="true" :font-size="11" :text="text" :font-weight="checked ? 'bold' : 'normal'"  />
      <TextLabel :stretch="false" :opacity="0.5" :font-size="11" :text="shortCut"/>
    </RowLayout>

  </div>
</template>

<style scoped>
.empty-icon {
  box-sizing: border-box;
  background: transparent;
}

.menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.menu-button.enabled {
  background-color: var(--background-color);
}

.menu-button.enabled:not(.checked):hover {
  background-color: var(--hover-color);
}

.menu-button:not(.enabled ) {
  opacity: 0.25;
}
.checked.enabled {
  background-color: var(--checked-color);
}

.row:first-child { margin-left: 8px; }
.row:last-child { margin-right: 8px; }


</style>