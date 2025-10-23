<script setup>

import IconButton from "@/components/controls/buttons/IconButton.vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import Icon from "@/components/controls/misc/Icon.vue";
import TextLabel from "@/components/controls/labels/TextLabel.vue";
import ItemBarHeader from "@/components/controls/labels/ItemBarHeader.vue";

const props = defineProps( {
  text: { type: String, default: 'Toggle Header' },
  iconSource: { type: String, default: '' },
  checked : { type: Boolean, default: true }
} )

const emit = defineEmits(['update:checked'])

</script>

<template>
  <RowLayout :min-height="24" :style="{ padding: 0}" :align-items="'center'" :fill-width="true">
    <Icon v-if="iconSource" :icon-source="iconSource" :icon-size="16"/>
    <ItemBarHeader :text="text" :stretch="true"/>
    <IconButton
        :checkable="true"
        :checked="checked"
      :icon-source=" checked ? '/icons/remove.png' : '/icons/add.png' "
      @update:checked ="(val) => emit('update:checked', val)"
    />
  </RowLayout>
</template>

<style scoped>

</style>