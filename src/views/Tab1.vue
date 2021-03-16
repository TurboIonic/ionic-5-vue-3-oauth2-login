<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mine</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="secondary" @click="handleSignOut">
            <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mine</ion-title>
          <ion-button color="secondary" @click="handleWrite" slot="end" size="small">
            <ion-icon slot="icon-only" :icon="cameraOutline"></ion-icon>
          </ion-button>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-list>
          <ion-card v-for="item in items" :key="item.id" @click="handleEdit(item)">
            <ion-card-header>
              <ion-card-subtitle>{{item.UpdatedTime}}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              {{item.Content}}
            </ion-card-content>
            <ul class="square" v-if="item.Image">
              <li class="square-inner" v-for="photo in item.Image.split(',')" :key="photo" >
                <img :src="photo" v-if="photo"/>
              </li>
            </ul>
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
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonRefresher, IonRefresherContent, IonList,
  IonLabel, IonItem, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { logOut, pin, cameraOutline } from 'ionicons/icons';
import {mapActions} from "vuex";
import { useRouter } from 'vue-router';

export default  {
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonButtons, IonButton, IonRefresher, IonRefresherContent, IonList
  , IonLabel, IonItem, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent,  IonCardHeader, IonCardTitle, IonCardSubtitle},
  data() {
    return {
      msg: "",
      items: [],
      isDisabled: true
    }
  },
  setup() {
    const router = useRouter();
    return {
      router,
      logOut,
      pin,
      cameraOutline
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
    }
  }
}
</script>
<style>
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
  .add-icon {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  svg {
    width: 100%;
  }
  img {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
