<template lang="html">
    <div class="">
    <h1>{{title}}</h1>
        <a href="/authorization" class="btn">Login</a>
        <br>
        <a href="/registration" class="btn btn--succes">Registration</a>
    </div>
</template>

<script>
/* eslint-disable no-console */
export default {
    data() {
        return {
            title: 'Please login or register'
        }
    },
    mounted() {
        // Если сессия открыта, то редиректим на списко продуктов
        if(sessionStorage.token) {
            this.$router.push({path: 'products'});
        }
    }

}
</script>

<style lang="css" scoped>
</style>
