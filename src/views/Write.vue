<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-text color="secondary" @click="handleSubmit">
                        Submit
                    </ion-text>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-textarea placeholder="Enter more information here..." v-model="form.Content"></ion-textarea>
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
        IonText
    } from '@ionic/vue';
    import {mapActions} from "vuex";
    import {useRouter} from "vue-router";
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
            IonText
        },
        data() {
            return {
                form: {
                    Content: ''
                }
            }
        },
        setup() {
            const router = useRouter();
            return {
                router,
            };
        },
        methods: {
            ...mapActions("home", ["createArticle"]),
            handleSubmit() {
                this.createArticle(this.form).then(() => {
                    this.form.Content = '';
                    this.router.push("/");
                });
            }
        }
    }
</script>
