<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="(item, index) in goods" class="food-list" ref="foodListHook" >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.price}}</span>
                </div>
                <div class="price">
                  <span class="now">${{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">${{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" 
              :select-foods="selectFoods"
              :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>
<script>
  import Shopcart from 'components/shopcart/shopcart'
  import Cartcontrol from 'components/cartcontrol/cartcontrol'
  import Food from 'components/food/food'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import { ERROR_OK } from 'common/js/config'
  export default {
    components: {
      Shopcart,
      Cartcontrol,
      Food
    },
    props: {
      seller: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [0],
        scrollY: 0,
        selectedFood: {}
      }
    },
    created() {
      this.classMap = ['desrease', 'discount', 'special', 'invoice', 'guarantee']
      this._getGoods()
      setTimeout(() => {
        this._initScroll()
        this._calculateHeight()
      }, 20)
      
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
      },
      selectFoods() {
          let foods = []
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
          })
          return foods
        }
    },
    methods: {
      _getGoods() {
        axios.get('/api/goods').then((res) => {
          if (res.data.erron === ERROR_OK) {
            this.goods = res.data.data
          }
        })
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foods, {
          probeType: 3,
          click: true
        })
       this.foodsScroll.on('scroll', (pos) => {
         this.scrollY = Math.abs(Math.round(pos.y))
       })
      },
      selectMenu(index, e) {
        if (!e._constructed) {
          return
        }
        let el = this.$refs.foodListHook[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _calculateHeight() {
        let height = 0
        let foodListHook = this.$refs.foodListHook
        foodListHook.forEach((item) => {
          height += item.clientHeight
          this.listHeight.push(height)
        })
      },
      selectFood(food, e) {
        if (!e._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      }
    },
    
  }
</script>

<style scoped lang="stylus" >
  @import '../../common/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    top 176px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, .1))
          font-size 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.desrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.special
              bg-image('special_3')
            &.invoice
              bg-image('invoice_3')
            &.guarantee
              bg-image('guarantee_3')
    .foods-wrapper
      flex 1
      ul
        .food-list
          .title
            padding-left 14px
            height 26px
            line-height 26px
            border-left 1px solid #d9dde1
            font-size 12px
            color rgb(147, 153, 159)
            background #f3f5f7
          ul
            .food-item
              display flex
              margin 18px
              padding-bottom: 18px
              border-1px(rgba(7, 17, 27, .1))
              &:last-child
                border-none()
                margin-bottom 0
              .icon
                flex 0 0 57px
                margin-right 10px
              .content
                flex 1
                .name
                  margin 2px 0 8px 0
                  height 14px
                  line-height 14px
                  font-size 14px
                  color rgb(7, 17, 27)
                .desc, .extra
                  
                  line-height 10px
                  font-size 10px
                  color rgb(147, 153, 159)
                .desc
                  margin-bottom 8px
                  line-height 12px
                .extra
                  .count
                    margin-right 12px
                .price
                  font-weight 700
                  line-height 24px
                  .now
                    margin-right 8px
                    font-size 14px
                    color rgb(240, 20, 20)
                  .old
                    text-decoration line-through
                    font-size 10px
                    color rgb(147, 153, 159)
                .cartcontrol-wrapper
                  position absolute
                  right 0
                  bottom 12px




</style>


