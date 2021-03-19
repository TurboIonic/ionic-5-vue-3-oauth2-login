<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>我的</ion-title>
        <ion-buttons slot="end">
          <ion-button color="secondary" @click="handleSignOut">
            <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false">
      <ion-content>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-list>
          <ion-header collapse="condense">
            <ion-toolbar>
              <ion-title size="large">我的</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-card v-for="item in items" :key="item.id" @click="handleEdit(item)">
            <ion-card-header>
              <ion-card-subtitle>{{item.UpdatedTime}}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p>{{item.Content}}</p>
              <ul class="square" v-if="item.Image">
                <li class="square-inner" v-for="(photo, i) in item.Image.split(',')" :key="photo" @click.stop="handleClickPhoto(photo, i, item.Image.split(','))">
                  <img :src="photo" v-if="photo"/>
                </li>
              </ul>
              <ion-chip @click.stop="">
                <ion-icon :icon="heart" :color="item.LikeNum === 0 ? `medium`: `danger`"/>
                <ion-label>{{item.LikeNum}}</ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card>
        </ion-list>
        <ion-infinite-scroll
                @ionInfinite="loadData($event)"
                threshold="100px"
                id="infinite-scroll"
                :disabled="isDisabled"
        >
          <ion-infinite-scroll-content
                  loading-spinner="bubbles"
                  loading-text="Loading more data...">
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button @click="handleWrite">
            <ion-icon :icon="cameraOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButtons,
    IonButton,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonLabel,
    IonItem,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonFabButton, IonFab, IonChip, IonModal, IonThumbnail, IonMenuButton, menuController
  } from '@ionic/vue';
import { logOut, pin, cameraOutline, arrowUpOutline,heart, menuOutline } from 'ionicons/icons';
  import {mapActions, useStore} from "vuex";
import { useRouter } from 'vue-router';
  import ImagePreview from "@/components/ImagePreview.vue";
  import Collage from "@/components/Colllage.vue";
  export default  {
  name: 'Tab1',
  components: {
    Collage,
    ImagePreview, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonButtons, IonButton, IonRefresher, IonRefresherContent, IonList
  , IonLabel, IonItem, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent,  IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonFab,IonFabButton, IonChip, IonModal,IonThumbnail,IonMenuButton },
  data() {
    return {
      msg: "",
      items: [],
      isDisabled: true
    }
  },
  setup() {
    const router = useRouter();
    const store = useStore()
    const handleClickPhoto = (item,i, list) => {
      store.dispatch('home/changePreviewList', list)
      store.dispatch('home/changePreviewIndex', i)
      store.dispatch('home/changePreviewStatus', true)
    }
    return {
      router,
      logOut,
      pin,
      cameraOutline,
      arrowUpOutline,
      heart,
      menuOutline,
      handleClickPhoto
    };
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    ...mapActions("home", ["loadArticles"]),
    async handleSignOut() {
      await this.signOut().then(() => {
        this.router.push("/login");
      });
    },
    handleWrite() {
      this.router.push("/write");
    },
    async loadHomeData() {
      await this.loadArticles('Mine').then((res: any) => {
        this.items = res.data;
      });
    },
    ionViewWillEnter() {
      this.loadHomeData();
    },
     async doRefresh(event: CustomEvent) {
       await this.loadHomeData()
       // @ts-ignore
       event.target.complete();
     },
    loadData(event: CustomEvent) {
      setTimeout(() => {
        console.log('Loaded data');
        // @ts-ignore
        event.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.items.length == 1000) {
          // @ts-ignore
          event.target.disabled = true;
        }
      }, 500);
    },
    handleEdit(item: any) {
      this.$router.push({ path: '/write',  query:{Id:item.Id} })
    },
  }
}
</script>
<style scoped>
  .square{
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
  }
  .square-inner{
    width: calc(98%/ 3); /* calc里面的运算符两边要空格 */
    height: 0;
    padding-bottom: calc(98%/ 3);
    margin-right: 1%;
    margin-bottom: 1%;
    overflow: hidden;
    position: relative;
  }
  .square-inner:nth-of-type(3n) {
    margin-right: 0;
  }
  .square-inner img {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>
