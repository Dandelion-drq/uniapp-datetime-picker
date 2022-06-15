# uniapp-datetime-picker 日期时间选择器

适用于 `uni-app` 的日期时间选择器，兼容 H5、小程序。

- 支持多种日期模式，包括年月日/年月日时分秒/年月/年份。
- 支持配置默认选中日期，不传则默认 `new Date()`。
- 支持配置最小最大日期范围。
- 支持嵌套在页面中使用，不强制固定在页面底部弹窗选择。

## `DateTimePicker` 日期选择器

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| mode | Number | 1 | 日期模式，1：年月日，2：年月，3：年份，4：年月日时分秒 |
| minDate | String | '' | 可选的最小日期，不传则默认当前日期时间的十年前 |
| maxDate | String | '' | 可选的最大日期，不传则默认当前日期时间的十年后 |
| defaultDate | String | '' | 默认选中日期（注意要跟日期模式 `mode` 对应） |

### 事件
| 事件 | 说明 |
| ---- | ---- |
| @onChange | 日期改变时触发该事件，返回与 `mode` 对应的格式化后的日期字符串 |

### 使用方式

将 `components` 目录下的组件引入到你的项目，或者去 [DCLOUD插件市场](https://ext.dcloud.net.cn/plugin?id=7381) 下载安装。

### 代码演示

```html
<DateTimePicker
  :defaultDate="startDate"
  :maxDate="endDate"
  :mode="mode"
  @onChange="onChangeStartDate"
/>
```

```js
import DateTimePicker from '../dateTimePicker/index.vue';

export default {
  components: {
    DateTimePicker
  },
  data() {
    return {
      startDate: '2022-02-04',
      endDate: '',
      mode: 1
    };
  },
  methods: {
    onChangeStartDate(date) {
      console.log('onChangeDate', date);
      this.startDate = date;
    }
  }
}
```


## `DateSelector` 日期范围选择组件

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| mode | Number | 1 | 日期模式，1：年月日，2：年月，3：年份，4：年月日时分秒 |
| defaultStartDate | String | '' | 默认开始日期 |
| defaultEndDate | String | '' | 默认结束日期 |
| minDate | String | '' | 可选的最小日期 |
| maxDate | String | '' | 可选的最大日期 |

### 事件

| 事件 | 说明 |
| ---- | ---- |
| @onChange({startDate, endDate}) | 开始日期或结束日期变更时触发该事件，返回开始日期 `startDate` 和结束日期 `endDate` |
| @onSubmit({startDate, endDate}) | 点击确定按钮并且当前选择时间范围校验通过时触发该事件，返回开始日期 `startDate` 和结束日期 `endDate` |

### 代码演示

```html
<DateSelector
  :mode="selectDateType"
  @onChange="onDateSelectorChange"
  @onSubmit="onDateSelectorSubmit"
  minDate="2020-2-3"
  maxDate="2025-10-11"
  defaultStartDate="2021-1-10"
  defaultEndDate="2022-10-30"
/>
```

```js
import DateSelector from '@/components/dateSelector/index.vue';

export default {
  components: {
    DateSelector
  },
  methods: {
    onDateSelectorChange({ startDate, endDate }) {
      console.log('onDateSelectorChange', startDate, endDate);
    },
    onDateSelectorSubmit({ startDate, endDate }) {
      console.log('onDateSelectorSubmit', startDate, endDate);
    }
  }
}
```


## 效果演示

- 完整功能

  ![demo](/docs/imgs/demo.gif)


- 年月日模式

  ![demo](/docs/imgs/date.jpg)


- 年月日时分秒模式

  ![demo](/docs/imgs/datetime.jpg)


- 年月模式

  ![demo](/docs/imgs/monthRange.jpg)
