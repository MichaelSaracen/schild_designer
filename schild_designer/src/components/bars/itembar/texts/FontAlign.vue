<script setup>

import {computed, inject} from "vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconButton from "@/components/controls/buttons/IconButton.vue";

const scene = inject('scene');

const textAlign = computed( { get: () => scene.value?.states.textAlign || 'left', });

function setAlign( align ) {
  scene.value.setActiveObjectValue('textAlign', align);
}


</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :margin-top="8" >

    <TextLabel text="Text Ausrichtung" :font-size="10" :font-weight="600" :opacity="0.8"  :padding-left="0" :padding-bottom="0"/>
    <RowLayout :style="{ padding: 0 }" :gap="1" :align="'flex-end'">
      <IconButton
                :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                :style="{ borderTopRightRadius: '0', borderBottomRightRadius: '0'}"
                :checkable="true"
                :checked="textAlign === 'left'"
                @click="setAlign('left')"
                :icon-source="'/icons/ta_left.png'"
      />
      <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                  :style="{ borderRadius: '0'}"
                  :checkable="true"
                  :checked="textAlign === 'center'"
                  @click="setAlign('center')"
                  :icon-source="'/icons/ta_center.png'"
      />
      <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                  :style="{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}"
                  :checkable="true"
                  :checked="textAlign === 'right'"
                  @click="setAlign('right')"
                  :icon-source="'/icons/ta_right.png'"
      />

    </RowLayout>
  </ColumnLayout>
</template>

<style scoped>

</style>