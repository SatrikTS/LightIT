<template>
    <div id="app" >
        <router-view
         @registration="onRegistration($event)"
        ></router-view>
        <Popup v-if="isShowPopup" @closePopup="onClosePopup" :title="popupTitle" />
    </div>
</template>

<script>

/* eslint-disable no-console */
import Popup from './components/Popup.vue';

export default {
  name: 'app',
  components: {
    Popup,
    },
    data() {
        return {
            isShowPopup: false,
            popupTitle: 'You have successfully registered'
        }
    },
    methods: {
        onRegistration(data) {
            if (!data.success) {
                this.popupTitle = data.message;
            }
            this.isShowPopup = true;
        },
        onClosePopup() {
            this.isShowPopup = false;
            this.$router.push({path: 'authorization'});
        }
    }
}

</script>
