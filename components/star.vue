<template>
	<view class="rate-group">
		<image src="../../static/images/rate_light.png" v-for="i in light" :key="i" :style="{ width: starsize + 'rpx', height: starsize + 'rpx'}"></image>
		<image src="../../static/images/rate_half.png" v-for="i in half" :key="i" :style="{ width: starsize + 'rpx', height: starsize + 'rpx'}"></image>
		<image src="../../static/images/rate_gray.png" v-for="i in gray" :key="i" :style="{ width: starsize + 'rpx', height: starsize + 'rpx'}"></image>
		<text :style="[{ fontSize: fontsize + 'rpx', color: '#' + fontcolor}]" v-if="istext">{{ratetext}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			rate: {
				type: Number,
				default: 0,
				
			},
			starsize: {
				type: Number,
				default: 20
			},
			fontsize: {
				type: Number,
				default: 20
			},
			fontcolor: {
				type: String,
				default: "ccc"
			},
			istext: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				light: 0,
				half: 0,
				gray: 0,
				ratetext: 0
			};
		},
		created() {
			this.attached()
		},
		watch: {
			rate(newValue, oldValue) {
				this.attached()
			}
		},
		methods: {
			attached() {
				var rate = this.rate
				var intRate = parseInt(rate)
				var light = parseInt(intRate / 2) //满星
				var half = intRate % 2 // 半星
				var gray = 5 - light - half // 灰星
				// 格式化评分
				var ratetext = rate && rate > 0 ? rate.toFixed(1) : '未评分'
				this.light = light
				this.half = half
				this.gray = gray
				this.ratetext = ratetext
			}
		}
	}
</script>

<style lang="scss">
	.rate-group {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20rpx;
		color: #cccccc;

		image {
			width: 20rpx;
			height: 20rpx;
		}
	}
</style>
