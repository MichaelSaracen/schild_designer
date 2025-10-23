<script setup>


import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";

const props = defineProps({
  headerText: { type: String, default: 'Header' },
  stretch: { type: Boolean, default: false },
  height: { type: Number, default: 24 },
  prefix: { type: String, default: 'W' },
  iconSource: { type: String, default: ''},
  text: { type: String, default: "IconLabelText" },
  iconDisplay: { type: String, default: "left"},
  hoverEnabled: { type: Boolean, default: true },
  hoverColor: { type: String, default: "#4b4b4b"},
  backgroundColor: { type: String, default: "var(--black-mute)"},
  checkable: { type: Boolean, default: true },
  checked: { type: Boolean, default: false },
  marginTop: { type: [String, Number], default: 0},
  marginBottom: { type: [String, Number], default: 0},
});

const emit = defineEmits(["update:checked", "click"]);

function onClick( e ) {
  emit("click", e);
  if( props.checkable ) {
    emit("update:checked", !props.checked );
  }
}

</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :fill-height="false" :gap="4" :margin-bottom="marginBottom + 'px'" :margin-top="marginTop + 'px'">
    <TextLabel
        :text="headerText"
        :font-size="10"
        :font-weight="600"
        :opacity="0.8"
        :style="{padding: 0}"
    />

    <div class="icon-input-wrapper"  >
      <span v-if="!iconSource" class="icon-prefix">{{ prefix }}</span>
      <img
          v-else
          :class="{ iconLeft: iconDisplay === 'left', iconRight: iconDisplay === 'right' }"
          class="icon-prefix icon-img"
          :src="iconSource"
          alt="">
      <span
          :class="{
        hoverEnabled: hoverEnabled,
        textLeft: iconDisplay === 'left',
        textRight: iconDisplay === 'right',
        checked: checked
      }"
          class="icon-text-field"
          @click="onClick"
          :style="{ '--bg-color': backgroundColor, height: height + 'px', '--hover-bg': hoverColor }">
        {{ text }}
      </span>
    </div>
  </ColumnLayout>

</template>

<style scoped>
.icon-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

}

.icon-prefix {
  position: absolute;
  color: var(--white-mute);
  pointer-events: none; /* nicht klickbar */
  font-size: 10px;
  line-height: 1;
}

.icon-img {
  width: 12px;
  height: 12px;
  object-fit: contain;
}

.iconLeft {
  left: 6px;
}

.iconRight {
  right: 6px;
}

.icon-text-field {
  display: flex;
  align-items: center;
  padding-left: 6px;
  width: 100%;
  border: 2px solid transparent;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  border-radius: 4px;
  background-color: var(--black-checked);
  color: var(--white);
  box-sizing: border-box;
  font-size: 10px;
  cursor: default;
}

.checked {
  background-color: var(--accent);
}

.textLeft {
  padding-left: 24px !important;
}

.hoverEnabled:hover:not(.checked) {
  background-color: var(--black-hover-lighter);
}

.icon-text-field:focus {
  border: 2px solid var(--accent);
}
.icon-text-field-wrapper {
  position: absolute;
}

</style>