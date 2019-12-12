<template>
    <div class="popup"  v-on:click="closePopup">
        <div class="popup-item">
            <h3>{{title}}</h3>
        </div>
    </div>
</template>

<script>

/* eslint-disable no-console */
export default {
    data() {
        return {
        }
    },
    props: ['title'],
    methods: {
        closePopup() {
            this.$emit('closePopup', this);
        }
    }
}

</script>
