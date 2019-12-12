<template>
    <div class="authorization">
        <span class="caption">{{title}}</span>
        <form class="" action="http://smktesting.herokuapp.com/api/login/" method="post" @submit="getInputsValue">

            <div class="form-group" :class="{'is-invalid': $v.username.$error}">
                <input type="text"
                    name="username" id="username"
                    v-model.trim="$v.username.$model"
                    placeholder="Your name">
                <span class="invalid-feedback" v-if="!$v.username.required">This field is required</span>
                <span class="invalid-feedback" v-if="!$v.password.minLength">This field must be minimum {{$v.username.$params.minLength.min}} charachters</span>
            </div>

            <div class="form-group" :class="{'is-invalid': $v.password.$error}">
                <input type="password" name="password"
                    id="password"
                    v-model="password"
                    v-model.trim="$v.password.$model"
                    placeholder="Your password">
                <span class="invalid-feedback" v-if="!$v.password.required">This field is required</span>
                <span class="invalid-feedback" v-if="!$v.password.minLength">Password must be minimum {{$v.password.$params.minLength.min}} charachters</span>
            </div>
            <div class="error-msg" v-if="errorMsg">
                {{errorMsg}}
            </div>
            <button type="submit" name="button" class="btn btn--succes" :disabled="$v.$invalid">Login</button>
        </form>
        <a href="/registration" class="link">Or registration</a>
    </div>
</template>

<script>
/* eslint-disable no-console */
    import { required, minLength } from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                title: 'Login',
                userAuthorization: {
                    "username": '',
                    "password": '',
                },
                isSignin: false,
                errorMsg: '',
                username: '',
                password: ''
            }
        },
        validations: {
            username: {
                required: required,
                minLength: minLength(2)
            },
            password: {
                required: required,
                minLength: minLength(6)
            }
        },
        methods: {
            /**
            * Забираем значения с инпутов
            */
            getInputsValue: function(e) {
                e.preventDefault();
                e.target.forEach((item) => {
                    if(item.name === 'username') {
                        this.userAuthorization.username = item.value;
                    }

                    if(item.name === 'password') {
                        this.userAuthorization.password = item.value;
                    }
                });
                this.sendForm(e.target.action);
            },
            /**
            * Отправка данных на сервер
            */
            sendForm() {
                const url = this.$el.querySelector('form').action;
                fetch(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(this.userAuthorization)
                })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    if(response.success) {
                        sessionStorage.setItem('token', response.token);
                        this.$router.push({path: 'products'});
                    } else {
                        this.errorMsg = response.message;
                        setTimeout(() => {
                            this.errorMsg = '';
                        }, 3000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>
