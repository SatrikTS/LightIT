<template lang="html">
    <div class="review-post" :data-id="ProductId" data-url="http://smktesting.herokuapp.com/api/reviews/">

        <span class="review-post__mark">Rate it <sup>*</sup></span>

        <div class="raiting js-raiting" data-rate>
            <span class="raiting__star js-raiting-star"
                @click="getStars(item, i)" v-for="(item, i) in rate" :key="i"
                :class="{ active: i === activeItem}">
                {{item}}
            </span>
        </div>
        
        <textarea name="name" rows="8" cols="80" placeholder="Leave a review" @input="getValue"></textarea>

        <button type="button"
            name="button"
            class="btn btn--succes"
            @click="sendReviews"
            :disabled="isDisabled">
            Submit review

        </button>

         <div class="review-post__msg" v-if="showMsg">
            Your feedback was a published
         </div>

    </div>
</template>

<script>

/* eslint-disable no-console */
export default {
    data() {
        return {
            token: sessionStorage.token,
            reviewPost: {
                "rate": '',
                "text": ''
            },
            rate: [1, 2, 3, 4, 5],
            isDisabled: true,
            activeItem: null,
            showMsg: false
        }
    },
    props: ['ProductId'],
    methods: {
        /**
        *  Работа с блоком оценки
        */
        getStars(item, i) {
            this.reviewPost.rate = item;
            this.isDisabled = false;
            this.activeItem = i;
        },
        /**
        *  Забираем значение с текстового поля
        */
        getValue() {
            this.reviewPost.text = this.$el.querySelector('textarea').value;
        },
        /**
        * Сбрасываем все данные после отправки комментария
        */
        resetReviewData() {
            this.isDisabled = true;
            this.activeItem = null;
            this.reviewPost = {
                "rate": '',
                "text": ''
            };
            this.$el.querySelector('textarea').value = '';
        },
        /**
        * Пост нового комментария
        */
        sendReviews() {
            this.url = this.$el.getAttribute('data-url') + this.$el.getAttribute('data-id');
            this.getValue();

            fetch(this.url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Token ' + this.token,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.reviewPost)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.success) {
                    this.showMsg = true;
                    this.$emit('postreview', this);
                    this.resetReviewData();
                }
            })
            .then(() => {
                // Скрыываем сообщение об отправке комментария чере 1.5 сек
                setTimeout(() => {
                    this.showMsg = false;
                }, 1500)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>
