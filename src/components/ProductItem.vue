<template lang="html">
    <div class="product"
        :data-id='productData.id'
        data-reviews="http://smktesting.herokuapp.com/api/reviews/">

        <div class="product__data">
            <img  :alt="productData.title"
            :src="imgUrl+ productData.img"
            >
            <div class="product__info">
                <span class="product__caption">{{productData.title}}</span>
                <div class="product__description">
                    <span class="product__mark">
                        Description:
                    </span>
                    {{productData.text}}
                </div>
            </div>
        </div>

        <div class="product__reviews">
            <h3>Reviews</h3>
            <!-- Компонент блока поста комментариев -->
            <PostReview :ProductId="productData.id" v-if="authState"  @postreview="getReviews"/>

            <div class="product__status" v-if="!authState">
                Post review can just login users, please <a href="/authorization" class="link">Login</a>
            </div>

            <div class="product__reviews-list">
                <div v-for="item in reviewsList" :key="item.id" :id="item.id" class="review-item">
                    <span class="review-item__caption" :user-id="item.created_by.id">{{item.created_by.username}}</span>
                    <span class="review-item__date">{{item.created_at}}</span>
                    <span class="review-item__rate" :rate="item.rate">
                        Raiting:
                        {{item.rate}}
                    </span>
                    <div class="review-item__text">
                        {{item.text}}
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
/* eslint-disable no-console */

import PostReview from './PostReview.vue';

export default {
    data() {
        return {
            title: 'asd',
            reviewsList: [],
            imgUrl: 'http://smktesting.herokuapp.com/static/',
            authState: false
        }
    },
    components: {
        PostReview
    },
    props:['productData'],
    mounted() {
        this.getReviews();
        this.checkTokenStatus();
    },
    methods: {
        /**
        * Рендерим список комментариев в товаре
        */
        getReviews() {
            // Урл апи комментариев + айли товара
            this.url = this.$el.getAttribute('data-reviews') + this.$el.getAttribute('data-id');

            fetch(this.url,{
                method: 'GET'
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this._data.reviewsList = [].concat(data).reverse();
            })
            .catch((error) => {
                console.log(error);
            })
        },
        /**
        * Проверяем, залогинен ли пользователь, если нет, то запрещаем комментировать
        */
        checkTokenStatus() {
            if(sessionStorage.token) {
                this.authState = true;
            }
        }
    }
}
</script>
