<script setup>

import {inject} from "vue";
import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import IconButton from "@/components/controls/buttons/IconButton.vue";

const posController = inject('positionController');

</script>

<template>
  <ColumnLayout :style="{ padding: 0 }" :margin-top="8" >

    <TextLabel text="Ausrichtung horizontal" :font-size="10" :font-weight="600" :opacity="0.8"  :padding-left="0" :padding-bottom="0"/>
      <RowLayout :style="{ padding: 0 }" :gap="1" :align="'flex-end'">
        <IconButton
                    :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                    :style="{ borderTopRightRadius: '0', borderBottomRightRadius: '0'}"
                    @click="posController.align('left')"
                    :icon-source="'/icons/a_l.png'"
        />
        <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                    :style="{ borderRadius: '0'}"
                    @click="posController.align('leftRight')"
                    :icon-source="'/icons/a_r.png'"
        />
        <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                    :style="{ borderRadius: '0'}"
                    @click="posController.align('centerX')"
                    :icon-source="'/icons/a_cx.png'"
        />
        <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                    :style="{ borderRadius: '0'}"
                    @click="posController.align('rightLeft')"
                    :icon-source="'/icons/a_l.png'"
        />
        <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                    :style="{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}"
                    @click="posController.align('right')"
                    :icon-source="'/icons/a_r.png'"
        />

      </RowLayout>
    <TextLabel text="Ausrichtung vertical"  :style="{marginTop: '8px'}" :font-size="10" :font-weight="600" :opacity="0.8"  :padding-left="0" :padding-bottom="0"/>
    <RowLayout :style="{ padding: 0 }" :gap="1" :align="'flex-end'">
      <IconButton :background-color="'#363636'" :height="24" :icon-size="16" :fill-width="true"
                  :style="{ borderTopRightRadius: '0', borderBottomRightRadius: '0'}"
                  @click="posController.align('top')"
                  :icon-source="'/icons/a_t.png'"
      />
      <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                  :style="{ borderRadius: '0'}"
                  @click="posController.align('topBottom')"
                  :icon-source="'/icons/a_b.png'"
      />
      <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                  :style="{ borderRadius: '0'}"
                  @click="posController.align('centerY')"
                  :icon-source="'/icons/a_cv.png'"
      />
      <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                  :style="{ borderRadius: '0'}"
                  @click="posController.align('bottomTop')"
                  :icon-source="'/icons/a_t.png'"
      />
      <IconButton :background-color="'#363636'" :width="24" :height="24" :icon-size="16" :fill-width="true"
                  :style="{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}"
                  @click="posController.align('bottom')"
                  :icon-source="'/icons/a_b.png'"
      />
    </RowLayout>
  </ColumnLayout>
</template>

<style scoped>

</style>