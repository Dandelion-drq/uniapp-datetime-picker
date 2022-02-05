<template>
  <view class="datetime-picker">
    <PickerView :columns="dateConfig" :selectVals="selectVals" @onChange="onChangePickerValue" />
  </view>
</template>

<script>
import PickerView from '../pickerView/index.vue';
const dayjs = require('dayjs');

export default {
  components: {
    PickerView
  },
  props: {
    // 日期模式，1：年月日，2：年月，3：年份，4：年月日时分秒
    mode: {
      type: Number,
      default: 1
    },
    // 可选的最小日期，默认十年前
    minDate: {
      type: String,
      default: ''
    },
    // 可选的最大日期，默认十年后
    maxDate: {
      type: String,
      default: ''
    },
    // 默认选中日期（注意要跟日期模式对应）
    defaultDate: {
      type: [String, Number], // 年份模式下可能传数字（比如2022），其他情况下都是
      default: ''
    }
  },
  data() {
    return {
      selectYear: dayjs().year(),
      selectMonth: dayjs().month() + 1, // 选中的月份，1~12
      selectDay: dayjs().date(),
      selectHour: dayjs().hour(),
      selectMinute: dayjs().minute(),
      selectSecond: dayjs().second()
    };
  },
  watch: {
    defaultDate(val) {
      // console.log('defaultDate', val);
      if (val) {
        let date = dayjs(val);
        if (this.mode == 2) {
          this.selectYear = date.year();
          this.selectMonth = date.month() + 1;
        } else if (this.mode == 3) {
          this.selectYear = date.year();
        } else if (this.mode == 4) {
          this.selectYear = date.year();
          this.selectMonth = date.month() + 1;
          this.selectDay = date.date();
          this.selectHour = date.hour();
          this.selectMinute = date.minute();
          this.selectSecond = date.second();
        } else {
          this.selectYear = date.year();
          this.selectMonth = date.month() + 1;
          this.selectDay = date.date();
        }
      }
    }
  },
  computed: {
    minDateDayjsObj() {
      let minDate = this.minDate;
      if (!minDate) {
        minDate = dayjs().subtract(10, 'year').format('YYYY-MM-DD HH:mm:ss');
      }
      return dayjs(minDate);
    },
    maxDateDayjsObj() {
      let maxDate = this.maxDate;
      if (!maxDate) {
        maxDate = dayjs().add(10, 'year').format('YYYY-MM-DD HH:mm:ss');
      }
      return dayjs(maxDate);
    },
    years() {
      let years = [];
      let minYear = this.minDateDayjsObj.year();
      let maxYear = this.maxDateDayjsObj.year();
      for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
      }

      return years;
    },
    months() {
      let months = [];
      let minMonth = 1;
      let maxMonth = 12;

      // 如果选中的年份刚好是最小可选日期的年份，那月份就要从最小日期的月份开始
      if (this.selectYear == this.minDateDayjsObj.year()) {
        minMonth = this.minDateDayjsObj.month() + 1;
      }
      // 如果选中的年份刚好是最大可选日期的年份，那月份就要在最大日期的月份结束
      if (this.selectYear == this.maxDateDayjsObj.year()) {
        maxMonth = this.maxDateDayjsObj.month() + 1;
      }

      for (let i = minMonth; i <= maxMonth; i++) {
        months.push(i);
      }

      return months;
    },
    days() {
      // 一年中12个月每个月的天数
      let monthDaysConfig = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      // 闰年2月有29天
      if (this.selectMonth == 2 && this.selectYear % 4 == 0) {
        monthDaysConfig[1] = 29;
      }

      let minDay = 1;
      let maxDay = monthDaysConfig[this.selectMonth - 1];

      if (this.selectYear == this.minDateDayjsObj.year() && this.selectMonth == this.minDateDayjsObj.month() + 1) {
        minDay = this.minDateDayjsObj.date();
      }
      if (this.selectYear == this.maxDateDayjsObj.year() && this.selectMonth == this.maxDateDayjsObj.month() + 1) {
        maxDay = this.maxDateDayjsObj.date();
      }

      let days = [];
      for (let i = minDay; i <= maxDay; i++) {
        days.push(i);
      }

      return days;
    },
    hours() {
      let hours = [];
      let minHour = 0;
      let maxHour = 23;

      if (
        this.selectYear == this.minDateDayjsObj.year() &&
        this.selectMonth == this.minDateDayjsObj.month() + 1 &&
        this.selectDay == this.minDateDayjsObj.date()
      ) {
        minHour = this.minDateDayjsObj.hour();
      }
      if (
        this.selectYear == this.maxDateDayjsObj.year() &&
        this.selectMonth == this.maxDateDayjsObj.month() + 1 &&
        this.selectDay == this.maxDateDayjsObj.date()
      ) {
        maxHour = this.maxDateDayjsObj.hour();
      }

      for (let i = minHour; i <= maxHour; i++) {
        hours.push(i);
      }

      return hours;
    },
    minutes() {
      let mins = [];
      let minMin = 0;
      let maxMin = 59;

      if (
        this.selectYear == this.minDateDayjsObj.year() &&
        this.selectMonth == this.minDateDayjsObj.month() + 1 &&
        this.selectDay == this.minDateDayjsObj.date() &&
        this.selectHour == this.minDateDayjsObj.hour()
      ) {
        minMin = this.minDateDayjsObj.minute();
      }
      if (
        this.selectYear == this.maxDateDayjsObj.year() &&
        this.selectMonth == this.maxDateDayjsObj.month() + 1 &&
        this.selectDay == this.maxDateDayjsObj.date() &&
        this.selectHour == this.maxDateDayjsObj.hour()
      ) {
        maxMin = this.maxDateDayjsObj.minute();
      }

      for (let i = minMin; i <= maxMin; i++) {
        mins.push(i);
      }

      return mins;
    },
    seconds() {
      let seconds = [];
      let minSecond = 0;
      let maxSecond = 59;

      if (
        this.selectYear == this.minDateDayjsObj.year() &&
        this.selectMonth == this.minDateDayjsObj.month() + 1 &&
        this.selectDay == this.minDateDayjsObj.date() &&
        this.selectHour == this.minDateDayjsObj.hour() &&
        this.selectMinute == this.minDateDayjsObj.minute()
      ) {
        minSecond = this.minDateDayjsObj.second();
      }
      if (
        this.selectYear == this.maxDateDayjsObj.year() &&
        this.selectMonth == this.maxDateDayjsObj.month() + 1 &&
        this.selectDay == this.maxDateDayjsObj.date() &&
        this.selectHour == this.maxDateDayjsObj.hour() &&
        this.selectMinute == this.maxDateDayjsObj.minute()
      ) {
        maxSecond = this.maxDateDayjsObj.second();
      }

      for (let i = minSecond; i <= maxSecond; i++) {
        seconds.push(i);
      }

      return seconds;
    },
    // 传给pickerView组件的数组，根据mode来生成不同的数据
    dateConfig() {
      if (this.mode == 2) {
        // 年月模式
        let years = this.years.map((y) => y + '年');
        let months = this.months.map((m) => m + '月');
        return [years, months];
      } else if (this.mode == 3) {
        // 只有年份模式
        let years = this.years.map((y) => y + '年');
        return [years];
      } else if (this.mode == 4) {
        // 年月日时分秒模式
        let years = this.years.map((y) => y + '年');
        let months = this.months.map((m) => m + '月');
        let days = this.days.map((d) => d + '日');
        let hours = this.hours.map((h) => h + '时');
        let minutes = this.minutes.map((m) => m + '分');
        let seconds = this.seconds.map((s) => s + '秒');
        return [years, months, days, hours, minutes, seconds];
      } else {
        // 默认，年月日模式
        let years = this.years.map((y) => y + '年');
        let months = this.months.map((m) => m + '月');
        let days = this.days.map((d) => d + '日');
        return [years, months, days];
      }
    },
    selectVals() {
      if (this.mode == 2) {
        return [this.selectYear + '年', this.selectMonth + '月'];
      } else if (this.mode == 3) {
        return [this.selectYear + '年'];
      } else if (this.mode == 4) {
        return [
          this.selectYear + '年',
          this.selectMonth + '月',
          this.selectDay + '日',
          this.selectHour + '时',
          this.selectMinute + '分',
          this.selectSecond + '秒'
        ];
      } else {
        return [this.selectYear + '年', this.selectMonth + '月', this.selectDay + '日'];
      }
    }
  },
  methods: {
    onChangePickerValue(e) {
      const { value } = e;
      // console.log('onChangePickerValue', value);
      if (this.mode == 2) {
        // 年月模式
        this.selectYear = Number((value[0] + '').replace('年', ''));
        this.selectMonth = Number((value[1] + '').replace('月', ''));
      } else if (this.mode == 3) {
        // 只有年份模式
        this.selectYear = Number((value[0] + '').replace('年', ''));
      } else if (this.mode == 4) {
        // 年月日时分秒模式
        this.selectYear = Number((value[0] + '').replace('年', ''));
        this.selectMonth = Number((value[1] + '').replace('月', ''));
        this.selectDay = Number((value[2] + '').replace('日', ''));
        this.selectHour = Number((value[3] + '').replace('时', ''));
        this.selectMinute = Number((value[4] + '').replace('分', ''));
        this.selectSecond = Number((value[5] + '').replace('秒', ''));
      } else {
        // 默认，年月日模式
        this.selectYear = Number((value[0] + '').replace('年', ''));
        this.selectMonth = Number((value[1] + '').replace('月', ''));
        this.selectDay = Number((value[2] + '').replace('日', ''));
      }

      let formatTmpl = 'YYYY-MM-DD';
      if (this.mode == 2) {
        formatTmpl = 'YYYY-MM';
      } else if (this.mode == 3) {
        formatTmpl = 'YYYY';
      } else if (this.mode == 4) {
        formatTmpl = 'YYYY-MM-DD HH:mm:ss';
      }

      this.$emit(
        'onChange',
        dayjs(
          `${this.selectYear}-${this.selectMonth}-${this.selectDay} ${this.selectHour}:${this.selectMinute}:${this.selectSecond}`
        ).format(formatTmpl)
      );
    }
  }
};
</script>

<style scoped></style>
