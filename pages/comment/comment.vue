<template>
	<view class="container">
		<view class="item-group">
			<image class="thumbnail" :src="thumbnail"></image>
			<view class="title">{{title}}</view>
			<text class="item-rate">{{rate}}分</text>
		</view>
		<view class="comment-title">全部影评({{total}})</view>
		<onecomment v-for="(item,index) in comment" :key="index" :item="item"></onecomment>
		<view class="page-btn-group">
			<button class="page-btn" @tap="onPrePageTap" :disabled="start<=20" :loading="preLoading">上一页</button>
			<button class="page-btn" @tap="onNextPageTap" :loading="nexteLoading">下一页</button>
		</view>
	</view>
</template>

<script>
	import star from '@/components/star.vue';
	import {
		network
	} from '@/common/network.js';
	import onecomment from '@/components/onecomment.vue';
	export default {
		components: {
			star,
			onecomment
		},
		data() {
			return {
				id: "",
				type: "",
				thumbnail: "",
				rate: "",
				title: "",
				total: 0,
				comment: [],
				start: 1,
				count: 20,
				preLoading: false,
				nexteLoading: false
			}
		},
		methods: {

		},
		onLoad(options) {
			var that = this
			that.id = options.id
			that.type = options.type
			that.thumbnail = options.thumbnail
			that.rate = options.rate
			that.title = options.title
			that.getComments(1)
		},
		methods: {
			onPrePageTap(event) {
				var oldStart = this.start
				if ((oldStart - this.count) > 0){
					var start = oldStart - this.count
					this.start = start
					this.preLoading = true
					this.getComments(start)
				}
			},
			onNextPageTap(event) {
				var oldStart = this.start
				var start = oldStart + this.count
				this.start = start
				this.nexteLoading = true
				this.getComments(start)
			},
			getComments(start) {
				var that = this	
				network.getItemComment({
					type: that.type,
					id: that.id,
					start: start,
					count: 20,
					success: function(data) {
						that.total = data.total
						that.comment = data.comments
						that.nexteLoading = false
						that.preLoading = false
						uni.pageScrollTo({
							scrollTop:0
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx 30rpx;

		.item-group {
			display: flex;
			align-items: center;

			.thumbnail {
				width: 40rpx;
				height: 50rpx;
				margin: 0 10rpx;
			}

			.title {
				max-width: 400rpx;
				font-size: 36rpx;
				color: #41be57;
				margin-right: 10rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap; 
			}

			.item-rate {
				font-size: 28rpx;
				color: #3c3c3c;
			}
		}

		.comment-title {
			margin-top: 60rpx;
			font-size: 40rpx;
		}

		.page-btn-group {
			margin: 40rpx 0;
			display: flex;
			align-items: center;

			.page-btn {
				flex: 1;
				height: 60rpx;
				color: #898989;
				border-color: #898989;
				line-height: 60rpx;
			}
		}
	}
</style>
