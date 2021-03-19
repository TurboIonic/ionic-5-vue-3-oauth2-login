<template>
    <ul class="square">
        <li class="square-inner" v-for="(photo, i) in list" :key="photo" @click.stop="handleClickPhoto(photo, i, list)">
            <img :src="photo" v-if="photo"/>
        </li>
    </ul>
</template>
<script lang="ts">
    import {useStore} from "vuex";

    export default {
        name: 'Collage',
        props: {
            list: () => []
        },
        setup() {
            const store = useStore()
            const handleClickPhoto = (item,i, list) => {
                store.dispatch('home/changePreviewList', list)
                store.dispatch('home/changePreviewIndex', i)
                store.dispatch('home/changePreviewStatus', true)
            }
            return {
                handleClickPhoto
            }
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
    img {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
</style>
