<template>
  <view class="date-selector">
    <view class="select-date-wrapper">
      <view class="select-date" :class="{ active: activeDate == 'startDate' }" @tap="onTapStartDate">
        <view class="select-date-value" v-if="startDate">{{ startDate }}</view>
        <view class="select-date-placeholder" v-else>请选择时间</view>
      </view>
      <view style="margin: 0 16px;">至</view>
      <view class="select-date" :class="{ active: activeDate == 'endDate' }" @tap="onTapEndDate">
        <view class="select-date-value" v-if="endDate">{{ endDate }}</view>
        <view class="select-date-placeholder" v-else>请选择时间</view>
      </view>
    </view>

    <DateTimePicker
      v-if="showStartDatePicker"
      @onChange="onChangeStartDate"
      :defaultDate="startDate"
      :maxDate="endDate || ''"
      :mode="mode"
    />
    <DateTimePicker v-if="showEndDatePicker" @onChange="onChangeEndDate" :defaultDate="endDate" :minDate="startDate || ''" :mode="mode" />
  </view>
</template>

<script src="./indexMod.js"></script>

<style lang="css" scoped>
.date-selector {
    width: 100%;
    font-size: 12px;
    color: #333;
}

.select-date-wrapper {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.select-date {
    padding: 10px;
    flex: 1;
    border-radius: 2px;
    border: 1px solid rgba(6, 7, 46, 0.05);
    font-size: 12px;
}

.select-date.active {
    border-color: #6a7bff;
}

.select-date-placeholder {
    color: rgba(6, 7, 46, 0.3);
}
</style>
