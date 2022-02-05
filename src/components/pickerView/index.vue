<template>
  <picker-view class="picker-view" :value="indexArr" @change="onChange">
    <picker-view-column class="picker-view-column" v-for="(col, colIdx) in columns" :key="colIdx">
      <view v-for="(item, idx) in col" :key="idx">{{ item }}</view>
    </picker-view-column>
  </picker-view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    // 所有列选项数据
    columns: {
      type: Array,
      default: () => []
    },
    // 每一列默认选中值数组，不传默认选中第一项
    selectVals: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 每一列选中项的索引，当默认选中值变化的时候这个值也要变化
    indexArr: {
      // 多维数组，深度监听
      cache: false,
      get() {
        if (this.selectVals.length > 0) {
          return this.columns.map((col, cIdx) => {
            return col.findIndex((i) => i == this.selectVals[cIdx]);
          });
        } else {
          return [].fill(0, 0, this.columns.length);
        }
      }
    }
  },
  methods: {
    onChange(e) {
      const { value } = e.detail;
      let ret = this.columns.map((item, index) => {
        let idx = value[index] || 0;
        return item[idx];
      });
      // console.log('选中值', ret);
      this.$emit('onChange', {
        value: ret
      });
    }
  }
};
</script>

<style lang="css" scoped>
.picker-view {
  height: 356rpx;
}

.picker-view-column {
  font-size: 14px;
  line-height: 34px;
  text-align: center;
  background: var(--filter-bar-content-bg);
  color: var(--c-main);
}
</style>
