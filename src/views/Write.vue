<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button text="返回"></ion-back-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-text color="secondary" @click="handleSubmit">
                        提交
                    </ion-text>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-textarea placeholder="Enter more information here..." v-model="form.Content"></ion-textarea>
            <ul class="square">
                <li class="square-inner" v-for="item in items" :key="item.src">
                    <img :src="item.src" v-if="item.src"/>
                </li>
                    <li                            class="square-inner " v-if="items.length < 6">
                        <div class="add-icon">
                            <svg
                                    width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="50" x2="100" y2="50" stroke="black"/>
                                <line x1="50" y1="0" x2="50" y2="100" stroke="black"/>
                            </svg>
                        </div>
                    </li>
            </ul>
            <ion-button expand="full" size="small" color="danger" @click="handleDelete" v-if="showDeleteButton">删除</ion-button>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
    import {
        IonBackButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonPage,
        IonTextarea,
        IonText,
        IonButton,
        IonList,
        IonItem,
        IonThumbnail,
        IonImg,
        IonGrid,
        IonRow,
        IonCol
    } from '@ionic/vue';
    import {reactive, onMounted, toRef} from 'vue';
    import {mapActions, useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import {cloneDeep} from 'lodash'
    const DEFAULT_FORM = cloneDeep({
        Content: '',
        Id: '',
        Owner: '',
        Title: '',
        Description: '',
        Image: '',
        UpdatedTime: '',
        CreatedTime: ''
    })
    export default {
        name: 'Write',
        components: {
            IonBackButton,
            IonButtons,
            IonContent,
            IonHeader,
            IonTitle,
            IonToolbar,
            IonPage,
            IonTextarea,
            IonText,
            IonButton,
            IonList,
            IonItem,
            IonThumbnail,
            IonImg,
            IonGrid,
            IonRow,
            IonCol
        },
        setup() {
            const router = useRouter();
            const route = useRoute();
            const store = useStore();
            const state = reactive({
                form: DEFAULT_FORM
            })
            const form = toRef(state, "form")
            const Id = route.query.Id;
            onMounted(() => {
                if (Id) {
                    store.dispatch('home/getArticleById', Id).then((value) => {
                        state.form = value.data
                    })
                }
            })
            const handleSubmit = () =>{
                if (Id) {
                    store.dispatch('home/updateArticle', form.value).then(() => {
                        state.form.Content = '';
                        state.form.Id = '';
                        router.back();
                    });
                } else {
                    store.dispatch('home/createArticle', form.value).then(() => {
                        state.form.Content = '';
                        state.form.Id = '';
                        router.back();
                    });
                }
            }
            const handleDelete = () => {
                store.dispatch('home/deleteArticle', Id).then(() => {
                    state.form.Content = '';
                    state.form.Id = '';
                    router.back();
                });
            }
            const items = [{
                'text': 'Item 1',
                'src': 'https://images.unsplash.com/photo-1613329284267-4b59c5a78deb?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8YWV1NnJMLWo2ZXd8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            }];
            return {
                items,
                router,
                route,
                form,
                handleSubmit,
                handleDelete,
                showDeleteButton: !!Id
            };
        },
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
        height: 100%;
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
