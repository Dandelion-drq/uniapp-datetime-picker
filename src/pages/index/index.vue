<template>
  <view class="content">
    <view class="filter-date">
      <view class="filter-group">
        <view class="filter-group-title">统计时间</view>
        <view class="filter-group-options">
          <view
            class="filter-group-option-btn small"
            :class="{ selected: selectDateType == item.value }"
            v-for="(item, index) in dateTypes"
            :key="index"
            @tap="onTapDateType(item.value)"
            >{{ item.label }}</view
          >
        </view>

        <view class="date-seletor-wrapper">
          <DateSelector :mode="selectDateType" @onChange="onDateSelectorChange" @onSubmit="onDateSelectorSubmit" />
        </view>
      </view>
    </view>
  </view>
</template>

<script src="./index.js"></script>

<style scoped src="./index.css"></style>
