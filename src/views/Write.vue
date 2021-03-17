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
                <li class="square-inner" v-for="photo in photos" :key="photo.src" @click="showActionSheet(photo)">
                    <img :src="photo.webviewPath" v-if="photo.webviewPath"/>
                </li>
                    <li                            class="square-inner " v-if="photos.length < 6">
                        <div class="add-icon" @click="takePhoto(CameraSource.Photos)">
                            <svg
                                    width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="50" x2="100" y2="50" stroke="black"/>
                                <line x1="50" y1="0" x2="50" y2="100" stroke="black"/>
                            </svg>
                        </div>
                    </li>
            </ul>
            <ion-button expand="full" size="small" color="danger" @click="handleDelete" v-if="showDeleteButton">删除</ion-button>
            <ion-fab vertical="bottom" horizontal="center" slot="fixed">
                <ion-fab-button @click="takePhoto(CameraSource.Camera)">
                    <ion-icon :icon="camera"></ion-icon>
                </ion-fab-button>
            </ion-fab>
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
        IonCol,
        actionSheetController,
        IonFab,
        IonFabButton,
        IonIcon
    } from '@ionic/vue';
    import {reactive, onMounted, toRef} from 'vue';
    import {mapActions, useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import {cloneDeep} from 'lodash'
    import {usePhotoGallery} from "@/composables/usePhotoGallery";
    import {Photo} from "@/contracts/interface";
    import { camera, trash, close } from 'ionicons/icons';
    import {CameraSource} from "@capacitor/core";
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
            IonCol,
            IonFab,
            IonFabButton,
            IonIcon
        },
        setup() {
            const router = useRouter();
            const route = useRoute();
            const store = useStore();
            const { photos, takePhoto, deletePhoto } = usePhotoGallery();
            const showActionSheet = async (photo: Photo) => {
                const actionSheet = await actionSheetController.create({
                    header: 'Photos',
                    buttons: [{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            deletePhoto(photo);
                        }}, {
                        text: 'Cancel',
                        icon: close,
                        role: 'cancel',
                        handler: () => {
                            // Nothing to do, action sheet is automatically closed
                        }
                    }]
                });
                await actionSheet.present();
            }

            const state = reactive({
                form: DEFAULT_FORM
            })
            const form = toRef(state, "form")
            const Id = route.query.Id;
            onMounted(() => {
                if (Id) {
                    store.dispatch('home/getArticleById', Id).then((value) => {
                        state.form = value.data
                        photos.value = state.form.Image ? state.form.Image.split(',').map(
                            _ => {
                                return {
                                    webviewPath: _,
                                    filepath: ''
                                }
                            }
                        ) : []
                    })
                } else {
                    photos.value = []
                }
            })
            const handleSubmit = () =>{
                form.value.Image = photos.value.map(_ => _.webviewPath).join(",")
                if (Id) {
                    store.dispatch('home/updateArticle', form.value).then(() => {
                        state.form.Content = '';
                        state.form.Image = '';
                        state.form.Id = '';
                        router.back();
                    });
                } else {
                    store.dispatch('home/createArticle', form.value).then(() => {
                        state.form.Content = '';
                        state.form.Image = '';
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
            return {
                photos,
                router,
                route,
                form,
                handleSubmit,
                handleDelete,
                showDeleteButton: !!Id,
                camera,
                takePhoto,
                showActionSheet,
                CameraSource
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
