<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>互动</ion-title>
        <ion-buttons slot="end">
          <ion-button color="secondary" @click="handleSignOut">
            <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">互动</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list class="ion-padding-top ion-padding-end">
          <ion-item>
            <ion-thumbnail slot="start">
              <img src="https://images.unsplash.com/photo-1561141249-189f1b37e6e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=556&q=80">
            </ion-thumbnail>
            <ion-label>hi</ion-label>
          </ion-item>
          <ion-item>
            <ion-thumbnail slot="end">
              <img src="https://images.unsplash.com/photo-1613988958430-75932db23fbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80">
            </ion-thumbnail>
            <ion-label>hi</ion-label>
          </ion-item>
        </ion-list>
        <ion-item class="ion-padding-end">
          <ion-label position="stacked">请输入</ion-label>
          <ion-input v-model="msg" @keydown.enter="handleSendMsg"></ion-input>
        </ion-item>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonInput } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import {mapActions, useStore} from "vuex";
import { logOut } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
import {TokenService} from "@/services/token.service";

export default  {
  name: 'Tab3',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonInput},
  setup() {
    const ws = new WebSocket(process.env.VUE_APP_WS);
    const msg = ref("")
    onMounted(
            () => {
              ws.onopen = function()
              {
                console.log('已连接')
              };
              ws.onclose = function (evt) {

              };
              ws.onmessage = function (evt) {
                alert(evt.data)
              }
            }
    )
    const handleSendMsg = () => {
      ws.send(msg.value)
    }
    return {
      logOut,
      msg,
      handleSendMsg
    }
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    async handleSignOut() {
      await this.signOut().then(() => {
        this.router.push("/login");
      });
    },
  }
}
</script>
