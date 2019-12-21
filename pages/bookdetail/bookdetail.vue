<template>
	<view>
		<view class="item-header">
			<view class="item-title">{{item.title}}</view>
			<view class="item-detail">
				<view class="left-detail">
					<view class="item-rate">
						<star :rate="item.rating.average" :starsize="30" :fontsize="30" :fontcolor="595959"></star>
						<text class="comment-persons">{{item.rating.numRaters}}人评价</text>
					</view>
					<view class="item-sub-rate">
						<view class="item-type">
							作者：{{item.author[0]}}
						</view>
						<view class="item-show">
							出版年：{{item.pubdate}}
						</view>
						<view class="item-actors">
							出版社：{{item.publisher}}
						</view>
						<view class="item-actors">
							丛书：{{item.series.title}}
						</view>
					</view>
				</view>
				<view class="right-detail">
					<image :src="item.images.small"></image>
				</view>
			</view>
		</view>
		<view class="item-tags">
			<view class="item-tags-title">豆瓣成员常用标签</view>
			<view class="item-tags-list">
				<text v-for="(item1, index) in item.tags" :key="index">{{item1}}</text>
			</view>
		</view>
		<!-- <view class="comment-list-group">
			<view class="comment-title">短评(45364)</view>
			<view class="comment-group">
				<view class="left-comment">
					<image class="avatar" src="https://img9.doubanio.com/icon/u155944117-16.jpg"></image>
				</view>
				<view class="right-comment">
					<view class="username-rate">
						<text class="username">羚锐</text>
						<star :rate="5" :starsize="30" :istext="false"></star>
					</view>
					<view class="release-time">2018-5-13 12:00 12:22:22</view>
					<view class="content">由汉斯·皮特尔·默兰德指导的影片《外出偷马》获得第69届柏林国际电影节杰出艺术贡献银熊奖。《外出偷马》改编自Per.Petterson的小说《Out Stealing
						Horses》，《Out Stealing
						Horses》是一部优秀的小说，但在这里只对电影进行一些探讨。本片用极简纯粹的视听，接近于记录片的画面和原声，讲述了一段传统的父与子、暮年回首往事的故事。但其内部对立不断闪回的剪辑、意识与现实交融、自然而又原始的剧情流动，让人潸然泪下、惆怅不已。</view>
				</view>
			</view>
		</view>
		<navigator class="more-comment">查看更多短评</navigator> -->
	</view>
</template>

<script>
	import star from '@/components/star.vue';
	import {
		network
	} from '@/common/network.js';
	export default {
		components: {
			star,
		},
		data() {
			return {
				item: {},
				comment: {}
			}
		},
		onLoad(options) {
			var that = this
			var id = options.id
			network.getItemDetail({
				type: 'book',
				id: id,
				success: function(item) {
					var tags = []
					for (let i = 0; i < item.tags.length; i++) {
						tags[i] = item.tags[i].name
					}
					item.tags = tags
					that.item = item
				}
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.item-header {
		padding: 60rpx 30rpx;

		.item-title {
			font-size: 50rpx;
			color: #41be57;
		}

		.item-detail {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;

			.left-detail {
				flex: 1;
				margin-right: 20rpx;

				.item-rate {
					display: flex;
					align-items: center;

					.comment-persons {
						font-size: 28rpx;
						color: #ccc;
						margin-left: 20rpx;
					}
				}

				.item-sub-rate {
					margin-top: 40rpx;
					font-size: 32rpx;

					view {
						margin-bottom: 10rpx;
					}
				}
			}

			.right-detail {
				width: 200rpx;
				height: 300rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.item-tags {
		padding: 0 30rpx;

		.item-tags-title {
			color: #b3b3b3;
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}

		.item-tags-list {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;

			text {
				padding: 10rpx 20rpx;
				background: #f5f5f5;
				font-size: 32rpx;
				color: #353535;
				text-align: center;
				border-radius: 40rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}

	}

	.comment-list-group {
		padding: 60rpx 30rpx;

		.comment-title {
			font-size: 32rpx;
			color: #b3b3b3;
		}

		.comment-group {
			display: flex;
			justify-content: flex-start;

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
	}

	.more-comment {
		margin-bottom: 60rpx;
		font-size: 36rpx;
		color: #41be57;
		display: flex;
		justify-content: center;
	}
</style>
