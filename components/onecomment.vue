<template>
	<view class="comment-group">
		<view class="left-comment">
			<image class="avatar" :src="item.author.avatar"></image>
		</view>
		<view class="right-comment">
			<view class="username-rate">
				<text class="username">{{item.author.name}}</text>
				<star :rate="item.rating.value" :starsize="30" :istext="false"></star>
			</view>
			<view class="release-time">{{item.created_at}}</view>
			<view class="content">{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	import star from '@/components/star.vue';
	import {network} from '../common/network.js';
	export default {
		components: {
			star
		},
		props:{
			item: {
				type: String,
				value: {}
			}
		},
		data() {
			return {
				
			};
		},
		onLoad(options) {
			
		}
	}
</script>

<style lang="scss">
.comment-group {
			display: flex;
			justify-content: flex-start;
			padding: 20rpx 0;
			.left-comment {
				width: 70rpx;
				margin-right: 20rpx;

				image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}
			}

			.right-comment {
				flex: 1;

				.username-rate {
					display: flex;
					align-items: center;

					.username {
						font-size: 36rpx;
						margin-right: 20rpx;
					}
				}

				.release-time {
					color: #b3b3b3;
					font-size: 32rpx;
					margin-top: 10rpx;
				}

				.content {
					font-size: 32rpx;
					color: #353535;
					margin-top: 10rpx;
				}
			}
		}
</style>
