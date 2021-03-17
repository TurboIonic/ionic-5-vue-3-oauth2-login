<template>
    <div class="ip-wrapper">
        <div class="ip-overlay"></div>
        <div class="ip-container">
            <ion-slides pager="true" :options="slideOpts">
                <ion-slide v-for="item in list" :key="item">
                                <img  :src="item"/>
                </ion-slide>
            </ion-slides>
        </div>
    </div>
</template>
<script lang="ts">
    import {IonSlide, IonSlides} from "@ionic/vue";

    export default {
        name: 'ImagePreview',
        props: {
          list: {
              default: () => {
                  return [
                      // "http://go-img.oss-cn-beijing.aliyuncs.com/1e12b170-05df-421f-b73e-fa48b00aaf8b",
                      // "http://go-img.oss-cn-beijing.aliyuncs.com/44c291a2-38a1-4ef1-afb1-415b3cf2af03",
                  ]
              }
          }
        },

        components: {
            IonSlides,
            IonSlide
        },
        setup() {
            const slideOpts = {
                initialSlide: 1,
                speed: 400
            };
            return {
                slideOpts
            }
        }
    }
</script>
<style>
    .ip-wrapper {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 9999;
    }
    .ip-overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #000000;
    }
    .ip-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>
