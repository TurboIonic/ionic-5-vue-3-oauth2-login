<template>
  <ion-app>
    <ion-router-outlet :animated="false"/>
    <image-preview v-if="previewStatus" :list="previewList" @click="setOpen(false)"/>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {defineComponent, ref, computed} from 'vue';
import ImagePreview from "@/components/ImagePreview.vue";
import {useStore} from "vuex";

export default defineComponent({
  name: 'App',
  components: {
    ImagePreview,
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const store = useStore()
    const previewStatus = computed(() => {
      return store.state.home.previewStatus
    })
    const previewList = computed(() => {
      return store.state.home.previewList
    })
    const setOpen = (state: boolean) => {
      store.dispatch("home/changePreviewStatus", state)
      store.dispatch("home/changeFullscreenStatus", !state)
    };
    return {
      previewStatus, previewList,setOpen
    }
  }
});
</script>
