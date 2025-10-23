<script setup>

import ColumnLayout from "@/components/controls/layouts/ColumnLayout.vue";
import ItemBarHeader from "@/components/controls/labels/ItemBarHeader.vue";
import {computed, inject, ref} from "vue";
import RowLayout from "@/components/controls/layouts/RowLayout.vue";
import HorizontalSpacer from "@/components/controls/misc/HorizontalSpacer.vue";
import Switch from "@/components/controls/buttons/Switch.vue";
import MultiLineText from "@/components/controls/labels/MultiLineText.vue";

const scene             = inject('scene' );

const backgroundImage   = inject('backgroundImage');

const appSettings       = inject('appSettings');


const bleed           = computed( {
  get: () => appSettings.value?.viewOptions.bleedVisible || false,
  set:( v ) => { appSettings.value.setBleedVisible(v) } })

const bgSnap          = computed( {
  get: () => appSettings.value?.viewOptions.backgroundSnap || false,
  set:( v ) => { appSettings.value.setBackgroundSnap(v) } })

const snap            = computed( {
  get: () => appSettings.value?.viewOptions.snapEnabled || false,
  set:( v ) => { appSettings.value.setSnapEnabled(v) } })

const grid            = computed( {
  get: () => appSettings.value?.viewOptions.gridVisible || false,
  set:( v ) => { appSettings.value.setGridVisible(v) } })

const holes           = computed( {
  get: () => appSettings.value?.viewOptions.holesVisible || false,
  set:( v ) => { appSettings.value.setHolesVisible(v) } })




</script>

<template>
  <ColumnLayout :style="{padding: 0}" :fill-height="true" :gap="4">
    <ColumnLayout :style="{padding: 8, flexShrink: 0}">
      <ItemBarHeader :text="'Einstellungen'"/>

    </ColumnLayout>
    <HorizontalSpacer/>


    <ColumnLayout :style="{padding: 0, marginTop: '8px', flexShrink: 0}" :gap="0">
      <RowLayout :style="{ flexShrink: 0 }"  :padding-top="0" :padding-bottom="0" :min-height="32">
        <ItemBarHeader :text="`Randbeschnitt ${bleed ? 'ausblenden' : 'anzeigen' }`" :stretch="true"/>
        <Switch
            :checked="bleed" v-model:checked="bleed"
        />
      </RowLayout>
      <MultiLineText
        :text="'Schaltet die gestrichelte <b>magenta</b> Linie auf dem Arbeitsbereich ein und aus.'"
      />
    </ColumnLayout>


    <ColumnLayout :style="{padding: 0, marginTop: '16px', flexShrink: 0}" :gap="0">
      <RowLayout :style="{ flexShrink: 0 }"  :padding-top="0" :padding-bottom="0" :min-height="32">
        <ItemBarHeader :text="`Hintergrund Snap ${bgSnap ? 'aus' : 'an' }`" :stretch="true"/>
        <Switch
            :checked="bgSnap" v-model:checked="bgSnap"
        />
      </RowLayout>
      <MultiLineText
          :text="'Bestimmt, ob der <b>Arbeitsbereich</b> beim Bewegen ein gerastert werden soll.'"
      />
    </ColumnLayout>


    <ColumnLayout :style="{padding: 0, marginTop: '16px', flexShrink: 0}" :gap="0">
      <RowLayout :style="{ flexShrink: 0 }"  :padding-top="0" :padding-bottom="0" :min-height="32">
        <ItemBarHeader :text="`Grid Snap ${ snap ? 'aus' : 'an' }`" :stretch="true"/>
        <Switch
            :checked="snap" v-model:checked="snap"
        />
      </RowLayout>
      <MultiLineText
          :text="'Ermöglicht das <b>Snapping</b> der Objekte im Arbeitsbereich.'"
      />
    </ColumnLayout>

    <ColumnLayout :style="{padding: 0, marginTop: '16px', flexShrink: 0}" :gap="0">
      <RowLayout :style="{ flexShrink: 0 }"  :padding-top="0" :padding-bottom="0" :min-height="32">
        <ItemBarHeader :text="`Gitternetz ${ grid ? 'aus' : 'an' }`" :stretch="true"/>
        <Switch
            :checked="grid" v-model:checked="grid"
        />
      </RowLayout>
      <MultiLineText
          :text="'Bei einem Zoom von <b>1000%</b>, kann das Gitternetz ein bzw ausgeschaltet werden.'"
      />
    </ColumnLayout>


    <ColumnLayout :style="{padding: 0, marginTop: '16px', flexShrink: 0}" :gap="0">

      <RowLayout :style="{ flexShrink: 0 }"  :padding-top="0" :padding-bottom="0" :min-height="32">
        <ItemBarHeader :text="`Bohrlöcher ${ holes ? 'ausblenden' : 'anzeigen' }`" :stretch="true"/>
        <Switch
            :checked="holes" v-model:checked="holes"
        />
      </RowLayout>
      <MultiLineText
          :text="'<b>Bohrlöcher</b> können versteckt werden'"
      />
    </ColumnLayout>




  </ColumnLayout>
</template>

<style scoped>

</style>