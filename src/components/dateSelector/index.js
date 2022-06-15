import DateTimePicker from '../dateTimePicker/index.vue';
import DateUtil from '../dateTimePicker/dateUtil';

export default {
  components: {
    DateTimePicker
  },
  data() {
    return {
      showStartDatePicker: false,
      showEndDatePicker: false,
      startDate: '',
      endDate: '',
      activeDate: 'startDate' // 正在处理哪一个日期值，startDate/endDate
    };
  },
  props: {
    // 日期筛选模式，1：年月日，2：年月，3：年，4：年月日时分秒
    mode: {
      type: Number,
      default: 1
    },
    // 默认开始日期
    defaultStartDate: {
      type: String,
      default: ''
    },
    // 默认结束日期
    defaultEndDate: {
      type: String,
      default: ''
    },
    // 可选的最小日期
    minDate: {
      type: String,
      default: ''
    },
    // 可选的最大日期
    maxDate: {
      type: String,
      default: ''
    }
  },
  watch: {
    mode() {
      // 筛选模式更换时清空一下数据
      this.resetData();
    },
    startDate() {
      this.$emit('onChange', {
        startDate: this.startDate,
        endDate: this.endDate
      });
    },
    endDate() {
      this.$emit('onChange', {
        startDate: this.startDate,
        endDate: this.endDate
      });
    },
    defaultStartDate: {
      handler(defaultStartDate) {
        if (!defaultStartDate) {
          return;
        }
        if (DateUtil.isBefore(defaultStartDate, this.minDate)) {
          console.warn(`默认开始日期不可小于最小可选日期，已把默认开始日期设为最小可选日期。默认开始日期：${defaultStartDate}，最小可选日期：${this.minDate}`);
          this.startDate = this.getModeFormatDateString(this.minDate);
        } else {
          this.startDate = this.getModeFormatDateString(defaultStartDate);
        }
      },
      immediate: true
    },
    defaultEndDate: {
      handler(defaultEndDate) {
        if (!defaultEndDate) {
          return;
        }
        if (DateUtil.isAfter(defaultEndDate, this.maxDate)) {
          console.warn(`默认结束日期不可大于最大可选日期，已把默认结束日期设为最大可选日期。默认结束日期：${defaultEndDate}，最大可选日期：${this.maxDate}`);
          this.endDate = this.getModeFormatDateString(this.maxDate);
        } else {
          this.endDate = this.getModeFormatDateString(defaultEndDate);
        }
      },
      immediate: true
    }
  },
  methods: {
    onTapStartDate() {
      this.showEndDatePicker = false;
      if (!this.startDate) {
        this.startDate = this.getModeFormatDateString(new Date());
      }
      this.activeDate = 'startDate';
      this.showStartDatePicker = true;
    },
    onTapEndDate() {
      this.showStartDatePicker = false;
      if (!this.endDate) {
        this.endDate = this.startDate;
      }
      this.activeDate = 'endDate';
      this.showEndDatePicker = true;
    },
    onChangeStartDate(date) {
      this.startDate = date;
    },
    onChangeEndDate(date) {
      this.endDate = date;
    },
    validDate() {
      if (!this.startDate) {
        uni.showToast({
          title: '请选择开始时间',
          icon: 'none'
        });
        return false;
      } else if (!this.endDate) {
        uni.showToast({
          title: '请选择结束时间',
          icon: 'none'
        });
        return false;
      } else if (DateUtil.isAfter(this.startDate, this.endDate)) {
        uni.showToast({
          title: '结束时间不能小于开始时间',
          icon: 'none'
        });
        return false;
      }
      return true;
    },
    onCancel() {
      this.resetData();
    },
    onConfirm() {
      if (this.validDate()) {
        this.$emit('onSubmit', {
          startDate: this.startDate,
          endDate: this.endDate
        });
        this.showStartDatePicker = false;
        this.showEndDatePicker = false;
      }
    },
    resetData() {
      this.startDate = '';
      this.endDate = '';
      this.activeDate = 'startDate';
      this.showStartDatePicker = false;
      this.showEndDatePicker = false;
    },
    // 返回对应日期模式的时间字符串
    getModeFormatDateString(date) {
      let ret = '';
      if (this.mode == 2) {
        ret = DateUtil.formatDate(date, 'YYYY-MM');
      } else if (this.mode == 3) {
        ret = DateUtil.formatDate(date, 'YYYY');
      } else if (this.mode == 4) {
        ret = DateUtil.formatDate(date, 'YYYY-MM-DD HH:mm:ss');
      } else {
        ret = DateUtil.formatDate(date, 'YYYY-MM-DD');
      }
      return ret;
    }
  }
};
