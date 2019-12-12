<template lang="html">
        <div class="product-list" data-url="http://smktesting.herokuapp.com/api/products/">
            <h1>{{title}}</h1>

            <div class="product-list__wrap">
                <span class="product-list__item" v-for="(item, i) in productList"
                    v-bind:key="i"
                    :data-id="item.id"
                    @click="showProduct(item.id, i)"
                    :class="{ active: i === activeItem}">
                    {{item.title}}
                </span>
            </div>

            <div class="" v-for="item in someArr" v-bind:key="item.id">
                <ProductItem :productData="item" @postreview="loadReview($event)"/>
            </div>

        </div>
</template>

<script>
    /* eslint-disable no-console */
    import ProductItem from './ProductItem.vue';

    export default {
        name: 'product-list',
        components: {
        ProductItem
        },
        data() {
            return {
                title: 'Product List',
                productList: [],
                someArr: [],
                activeItem: null
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            showProduct(id, i) {
                const currentList = this.productList[id -1];
                this.someArr = [];
                this.someArr.push(currentList);
                this.activeItem = i;
            },
            /**
            * Получаем список товаров
            */
            getList() {
                const url = this.$el.getAttribute('data-url');
                fetch(url,{})
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    data.forEach(function(item){
                        this._data.productList.push(item)
                    }.bind(this));
                    this.$emit('productlist', this)
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>
