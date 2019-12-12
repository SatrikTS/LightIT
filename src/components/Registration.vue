<template>
    <div class="registration">
        <span class="caption">{{title}}</span>
        <form class="" action="http://smktesting.herokuapp.com/api/register/"
            method="post" @submit="getInputsValue">

            <div class="form-group" :class="{'is-invalid': $v.username.$error}">
                <input type="text"
                    name="username" id="username"
                    v-model.trim="$v.username.$model"
                    placeholder="Your name">
                <span class="invalid-feedback" v-if="!$v.username.required">This field is required</span>
                <span class="invalid-feedback" v-if="!$v.username.minLength">This field must be minimum {{$v.username.$params.minLength.min}} charachters</span>
            </div>

            <div class="form-group" :class="{'is-invalid': $v.password.$error}">
                <input type="password" name="password"
                    id="password"
                    v-model="password"
                    v-model.trim="$v.password.$model"
                    placeholder="Password">
                <span class="invalid-feedback" v-if="!$v.password.required">This field is required</span>
                <span class="invalid-feedback" v-if="!$v.password.minLength">Password must be minimum {{$v.password.$params.minLength.min}} charachters</span>
            </div>

            <div class="form-group" :class="{'is-invalid': $v.repeatPassword.$error}">
                <input type="password" name="password"
                    id="password"
                    v-model="repeatPassword"
                    v-model.trim="$v.repeatPassword.$model"
                    placeholder="Repeat password">
                <span class="invalid-feedback" v-if="!$v.repeatPassword.sameAsPassword">Password is not same</span>
            </div>

            <button type="submit" name="button" class="btn" v-if="1" :disabled="$v.$invalid">Registration</button>
        </form>
        <a href="/authorization" class="link link--success">Or authorization</a>
    </div>
</template>

<script>
    /* eslint-disable no-console */
    import { required, minLength, sameAs } from 'vuelidate/lib/validators'
    export default {
        name: 'registration',
        data() {
            return {
                title: 'Registration',
                userRegistration: {
                    "username": "",
                    "password": "",
                },
                isRegistartion: true,
                username: '',
                password: '',
                repeatPassword: ''
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
            },
            repeatPassword: {
                sameAsPassword: sameAs('password')
            }
        },
        methods: {
            /**
            * Собираем данные с инпутов
            */
            getInputsValue: function(e) {
                e.preventDefault();
                e.target.forEach((item) => {
                    if(item.name === 'username') {
                        this.userRegistration.username = item.value;
                    }

                    if(item.name === 'password') {
                        this.userRegistration.password = item.value;
                    }
                });
                this.sendForm(e.target.action);
            },
            /**
            * Отправляем форму на регистрацию
            */
            sendForm() {
                const url = this.$el.querySelector('form').action;
                fetch(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(this.userRegistration)
                })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    this.$emit('registration', response);
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            clearForm() {
                this.username = '';
                this.password = '';
                this.repeatPassword = '';
            }
        }
    }
</script>
