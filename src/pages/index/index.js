import DateSelector from '@/components/dateSelector/index.vue';

// 日期范围类型
const DATE_TYPES = [
  {
    label: '年月日',
    value: 1
  },
  {
    label: '年月',
    value: 2
  },
  {
    label: '年',
    value: 3
  },
  {
    label: '年月日时分秒',
    value: 4
  },
  {
    label: '时分秒',
    value: 5
  },
  {
    label: '时分',
    value: 6
  }
];

export default {
  components: {
    DateSelector
  },
  data() {
    return {
      dateTypes: DATE_TYPES, // 日期范围类型
      selectDateType: 1 // 选中的日期类型
    };
  },
  methods: {
    onTapDateType(type) {
      this.selectDateType = type;
    },
    onDateSelectorChange({ startDate, endDate }) {
      console.log('onDateSelectorChange', startDate, endDate);
    },
    onDateSelectorSubmit({ startDate, endDate }) {
      console.log('onDateSelectorSubmit', startDate, endDate);
    }
  }
};
