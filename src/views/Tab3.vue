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
    <ion-content :fullscreen="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">互动</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="false" :scrollEvents="true" ref="listRef">
        <ion-list class="ion-padding-top ion-padding-end" lines="none" style="padding-bottom: 120px">
          <div v-for="item in list" :key="item.Id">
            <ion-item  v-if="item.Owner === user.Username">
              <ion-thumbnail slot="end">
                <img :src="item.Logo">
              </ion-thumbnail>
              <ion-label>
                <ion-text color="dark">
                  <h5 class="ion-text-end ion-text-wrap">{{item.Content}}</h5>
                </ion-text>
              </ion-label>
            </ion-item>
            <ion-item v-else>
              <ion-thumbnail slot="start">
                <img :src="item.Logo">
              </ion-thumbnail>
              <ion-label>
                <ion-text color="dark">
                  <h5 class="ion-text-left ion-text-wrap">{{item.Content}}</h5>
                </ion-text>
              </ion-label>
            </ion-item>
          </div>
        </ion-list>
      </ion-content>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-item class="ion-padding-end">
          <ion-label position="stacked">请输入</ion-label>
          <ion-input v-model="msg" @keydown.enter="handleSendMsg"></ion-input>
        </ion-item>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonInput,
    IonText, IonFooter, IonTextarea, IonBackdrop
  } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import {mapActions, useStore} from "vuex";
import { logOut } from 'ionicons/icons';
import { onMounted, reactive, ref, computed } from 'vue';
import {TokenService} from "@/services/token.service";
import ReconnectingWebSocket from 'reconnecting-websocket';

export default  {
  name: 'Tab3',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonInput, IonText, IonFooter, IonTextarea,IonBackdrop },
  setup(props, context) {
    const ws = new ReconnectingWebSocket(process.env.VUE_APP_WS + `?Authorization="${TokenService.getToken()}"`);
    const msg = ref("")
    const list: any = ref([])
    const store = useStore()
    const user = computed(() => {
      return store.state.auth.user;
    })
    const listRef = ref()
    onMounted(
            () => {
              ws.onopen = function()
              {
                console.log('已连接')
              };
              ws.onclose = function (evt) {
                console.log('已断开')
              };
              ws.onmessage = function (evt) {
                console.log(JSON.parse(evt.data))
                list.value.push(JSON.parse(evt.data))
                msg.value = ''
                listRef.value.$el.scrollToBottom(1000)
              }
            }
    )
    const handleSendMsg = () => {
      ws.send(msg.value)
    }
    return {
      logOut,
      msg,
      list,
      user,
      handleSendMsg,
      listRef
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
