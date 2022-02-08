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
    defaultStartDate: {
      type: String,
      default: ''
    },
    defaultEndDate: {
      type: String,
      default: ''
    }
  },
  watch: {
    mode() {
      // 每次筛选模式更换了，把日期都清空
      this.startDate = '';
      this.endDate = '';
      this.activeDate = 'startDate';
      this.showStartDatePicker = false;
      this.showEndDatePicker = false;
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
    defaultStartDate(val) {
      this.startDate = val;
    },
    defaultEndDate(val) {
      this.endDate = val;
    }
  },
  methods: {
    onTapStartDate() {
      this.showEndDatePicker = false;
      if (!this.startDate) {
        if (this.mode == 2) {
          this.startDate = DateUtil.formatDate(new Date(), 'YYYY-MM');
        } else if (this.mode == 3) {
          this.startDate = DateUtil.formatDate(new Date(), 'YYYY');
        } else if (this.mode == 4) {
          this.startDate = DateUtil.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
        } else {
          this.startDate = DateUtil.formatDate(new Date(), 'YYYY-MM-DD');
        }
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
        this.showToastInfo('请选择开始时间');
        return false;
      } else if (!this.endDate) {
        this.showToastInfo('请选择结束时间');
        return false;
      } else if (DateUtil.isAfter(this.startDate, this.endDate)) {
        this.showToastInfo('结束时间不能小于开始时间');
        return false;
      }
      return true;
    }
  }
};
