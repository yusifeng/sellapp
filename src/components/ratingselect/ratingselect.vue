<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{'active':mySelectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active':mySelectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{'active':mySelectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':myOnlyContent===true}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  data() {
    return {
      myOnlyContent: this.onlyContent,
      mySelectType: this.selectType
    }
  },

  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },

    selectType: {
      type: Number,
      default: ALL
    },

    onlyContent: {
      type: Boolean,
      default: false
    },

    desc: {
      type:Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    select(type, e) {
      if (!e._constructed) {
        return 
      }
      this.mySelectType = type
      this.$emit('chooseSelectType', this.mySelectType)
    },

    toggleContent(e) {
      if (!e._constructed) {
        return 
      }
      this.myOnlyContent = !this.myOnlyContent
      this.$emit('toggleContent', this.myOnlyContent)
    }
  },

  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },

    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'


  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px
      font-size 0
      border-1px(rgba(7, 17, 27, .1))
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        font-size 12px
        color rgb(77, 85, 93)
        border-radius 3px
        &.active
          color #fff
        .count
          font-size 8px
          margin-left 2px
          line-height 16px
        &.positive
          background rgba(0, 160, 220, .2)
          &.active
            background rgba(0, 160, 220, 1)
        &.negative
          background rgba(77, 85, 93, .2)
          &.active
            background rgba(77, 85, 93, 1)
    .switch
      padding 12px 18px 10px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, .1)
      color rgb(147, 153, 159)
      font-size 0
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        font-size 24px
        margin-right 4px
      .text
        font-size 12px



</style>

