<template>
  <div class="cartcontrol">
    <transition name="decrease">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart">
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    // console.log(this.food)
  },
  methods: {
    addCart(e) {
      if (!e._constructed) {
        return 
      }
      if (!this.food.count) {
        // console.log(1)
        Vue.set(this.food, 'count', 1)
        console.log(this.food)
        // this.food.count = 1
      } else {
        this.food.count++
        console.log(this.food.count)
      }
    },
    decreaseCart(e) {
      if (!e._constructed) {
        return 
      }
      this.food.count--
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    font-size 0
    .decrease-enter, .decrease-leave-to
      transform translateX(36px) rotate(180deg)
      opacity 0
    .decrease-enter-active, .decrease-leave-active
      transition all .5s
    .cart-decrease,.cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
    .cart-count
      display inline-block
      width 12px
      padding-top 6px
      line-height 24px
      font-size 10px
      text-align center
      vertical-align top
      color rgb(147, 153, 159)
    // .cart-dscrease

    // .cart-add
      
</style>

