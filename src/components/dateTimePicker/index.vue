<template>
  <view class="datetime-picker">
    <PickerView :columns="dateConfig" :selectVals="selectVals" @onChange="onChangePickerValue" />
  </view>
</template>

<script src="./index.js"></script>

<style scoped></style>
