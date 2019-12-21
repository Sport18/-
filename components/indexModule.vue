<template>
	<!-- 电影 -->
	<view class="module-group">
		<view class="module-top">
			<view class="module-title">{{title}}</view>
			<navigator class="module-more" :url="moreUrl">更多</navigator>
		</view>
		<scroll-view scroll-x="true" class="module-scroll-view">
			<itemview v-for="(item,index) in items" :key="index" :isMisic="isMisic" :item="item" :itemurl=" url + type + '&id=' + item.id"></itemview>
		</scroll-view>
	</view>
</template>

<script>
	import itemview from './itemview.vue';
	export default {
		components: {
			itemview
		},
		props: {
			title: {
				type: String,
				default: ""
			},
			moreUrl: {
				type: String,
				default: ""
			},
			items: {
				type: Array,
				default: []
			},
			isMisic: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				url: ""
			};
		},
		created() {
			this.geturl()
		},
		methods: {
			geturl() {
				var type = this.type
				if (type === 'movies') {
					this.url = '/pages/detail/detail?type='
				} else if(type === 'book') {
					this.url = '/pages/bookdetail/bookdetail?type='
				}else {
					this.url = '/pages/musicdetail/musicdetail?type='
				}
			}
		}
	}
</script>

<style lang="scss">
	.module-group {
		padding: 10rpx 30rpx;
		background-color: #ffffff;

		.module-top {
			font-size: 36rpx;
			display: flex;
			justify-content: space-between;

			.module-title {
				color: #494949;
			}

			.module-more {
				color: #41be57;
			}
		}

		.module-scroll-view {
			margin-top: 40rpx;
			width: 100%;
			height: 400rpx;
			white-space: nowrap;
		}
	}
</style>
