<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>External</ion-title>
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
          <ion-title size="large">External</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-list>
          <ion-card v-for="item in items" :key="item.id">
            <ion-card-header>
              <ion-card-subtitle>{{item.UpdatedTime}}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              {{item.Content}}
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
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonRefresher, IonRefresherContent, IonList,
    IonLabel, IonItem, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
  import { logOut, pin } from 'ionicons/icons';
  import {mapActions} from "vuex";
  import { useRouter } from 'vue-router';

  export default  {
    name: 'Tab2',
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
        pin
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
      async loadHomeData() {
        await this.loadArticles('External').then((res: any) => {
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
      }
    }
  }
</script>
