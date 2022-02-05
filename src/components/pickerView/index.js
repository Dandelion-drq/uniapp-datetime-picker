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
