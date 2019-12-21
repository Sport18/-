<template>
	<view class="page">
		<navigator class="item-navigator" v-if="item" :url="itemurl">
			<view class="item-group">
				<view class="thumbnail-group">
					<image class="thumbnail" :src="isMisic ? item.image : item.images.small"></image>
				</view>
				<view class="item-title">{{item.title}}</view>
				<star :rate="item.rating.average"></star>
			</view>
		</navigator>
		<view v-else class="item-navigator"></view>
	</view>

</template>

<script>
	import star from '@/components/star.vue';
	export default {
		components: {
			star,
		},
		props: {
			item: {
				type: Object,
				default: {}
			},
			isMisic: {
				type: Boolean,
				default: false
			},
			itemurl: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: ""
			},
		},
		data() {
			return {

			};
		},
		onLoad() {
			console.log(this.type);
		}
	}
</script>

<style lang="scss">
	.page {
		margin-right: 20rpx;
		display: inline-block;
		.item-navigator {
			width: 200rpx;
			.item-group {
				width: 100%;
				.thumbnail-group {
					width: 100%;
					height: 284rpx;
					.thumbnail {
						width: 100%;
						height: 100%;
					}
				}
				.item-title {
					font-size: 28rpx;
					text-align: center;
					margin: 20rpx 0;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}
</style>
