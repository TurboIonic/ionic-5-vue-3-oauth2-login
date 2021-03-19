<template>
  <ion-page>

    <ion-tabs>
      <ion-tab-bar slot="bottom" v-if="fullscreenStatus">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="triangle" />
          <ion-label>我的</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="ellipse" />
          <ion-label>家人</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="square" />
          <ion-label>互动</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage,IonHeader, IonToolbar
  ,IonTitle } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
import {computed} from 'vue'
import {useStore} from "vuex";
export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonHeader, IonToolbar
  ,IonTitle},
  setup() {
    const store = useStore()
    const fullscreenStatus = computed(() => {
      return store.state.home.fullscreenStatus
    })
    return {
      ellipse,
      square,
      triangle,
      fullscreenStatus
    }
  }
}
</script>
