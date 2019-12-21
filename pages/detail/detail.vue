<template>
	<view>
		<view class="item-header">
			<view class="item-title">{{item.title}}({{item.year}})</view>
			<view class="item-detail">
				<view class="left-detail">
					<view class="item-rate">
						<star :rate="item.rating.average" :starsize="30" :fontsize="30" :fontcolor="595959"></star>
						<text class="comment-persons">{{item.ratings_count}}人评价</text>
					</view>
					<view class="item-sub-rate">
						<view class="item-type">
							{{item.durations[0]}} {{item.genres}}
						</view>
						<view class="item-show">
							{{item.pubdates}} {{item.countries[0]}}
						</view>
						<view class="item-actors">
							{{item.directors[0].name}}（导演）{{item.actors}}
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
		<view class="comment-list-group">
			<view class="comment-title">短评({{comment.total}})</view>
			<onecomment v-for="(item,index) in comment" :key="index" :item="item"></onecomment>
		</view>
		<navigator class="more-comment" :url="'../comment/comment?id=' + id + '&type=' + type + '&thumbnail=' + item.images.small + '&rate=' + rate + '&title=' + item.title">查看更多短评</navigator>
	</view>
</template>

<script>
	import star from '@/components/star.vue';
	import {network} from '@/common/network.js';
	import onecomment from '@/components/onecomment.vue';
	export default {
		components: {
			star,
			onecomment
		},
		data() {
			return {
				item: {},
				comment: {},
				type: "",
				id: "",
				rate: ""
			}
		},
		onShow() {
			uni.pageScrollTo({
				scrollTop:0
			})
		},
		onLoad(options) {
			var that = this
			var type = options.type
			var id = options.id
			that.type = type
			that.id = id
			network.getItemDetail({
				type: type,
				id: id,
				success: function(item) {
					// 类型
					var genres = item.genres.join("/")
					item.genres = genres
					// 标题
					var title = item.title
					var original_title = item.original_title
					if (title !== original_title){
						title = title + ' ' + original_title
						item.title = title
					}
					// 上映时间
					item.pubdates = item.pubdates.slice(-1)
					// 演员
					var actors = item.casts
					if (actors.length > 3) {
						actors = actors.slice(0,3)
						for (let i = 0; i < actors.length; i++) {
							actors[i] = actors[i].name
						}
						actors = actors.join("/")
					}else {
						for (let i = 0; i < actors.length; i++) {
							actors[i] = actors[i].name
						}
						actors = actors.join("/")
					}
					// 评分
					var rate = item.rating.average
					item.actors = actors
					that.item = item
					that.rate = rate
				}
			})
			network.getItemComment({
				type: type,
				id: id,
				success: function(data){
					that.comment = data.comments
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

	}

	.more-comment {
		margin-bottom: 60rpx;
		font-size: 36rpx;
		color: #41be57;
		display: flex;
		justify-content: center;
	}
</style>
