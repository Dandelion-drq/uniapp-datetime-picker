<template>
	<view class="content">
		<DateSelector/>
	</view>
</template>

<script>
	import DateSelector from '@/components/dateSelector/index.vue'

	export default {
		components: {
			DateSelector
		}
	}
</script>

<style scoped>
.content {
	margin-top: 50px;
}
</style>
