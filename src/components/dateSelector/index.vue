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

<style lang="css" scoped src="./indexStyle.css"></style>
