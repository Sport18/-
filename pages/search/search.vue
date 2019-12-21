<template>
	<view>
		<searchbar @searchInput="onSearchInputEvent"></searchbar>
		<view class="history-list-group" v-if="historys.length > 0 && !subjects.length > 0 ">
			<view class="history-title">
				<view class="title">历史记录</view>
				<view class="clear" @tap="onClearEvent">清除</view>
			</view>
			<navigator class="history-group" v-for="(item,index) in historys" :key="index">{{item.title}}</navigator>
		</view>
		<view class="item-list-group">
			<view class="item-group" v-for="(item,index) in subjects" :key="index" @tap="onItemTapEvent(item)">
				<image class="thumbnail" :src="item.image"></image>
				<view class="info-group">
					<view class="title">{{item.title}}</view>
					<view class="rate-year">{{item.rating.average}}分/{{item.author}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchbar from '@/components/searchbar.vue';
	import {network} from '@/common/network.js';
	export default {
		components: {
			searchbar
		},
		data() {
			return { 
				subjects: {},
				historys: [],
			}
		},
		onLoad() {
			var that = this
			uni.getStorage({
			    key: 'searced',
			    success: function (res) {
					if (res.data){
						that.historys = res.data
					}else {
						that.historys = []
 					}
			        
			    }
			});
		},
		methods: {
			// 清除
			onClearEvent() {
				uni.removeStorage({
				    key: 'searced',
				    success: function (res) {
				        console.log('删除工程');
				    }
				});
				this.historys = []
			},
			onSearchInputEvent(event) {
				var that = this
				network.getSearch({
					q: event,
					success: function(subjects) {
						if(event){
							that.subjects = subjects
						}else {
							that.subjects = null
						}
					}
				})
			},
			onItemTapEvent (event){
				var that = this
				var historys = that.historys
				var id = event.id
				var title = event.title
				var isExisted = false
				for (let i = 0; i < historys.length; i++) {
					let book = historys[i]
					if (book.id === id) {
						isExisted = true
						break
					}
				}
				if(!isExisted){
					historys.push({id:id, title:title})
					uni.setStorage({	
					    key: 'searced',
					    data: historys,
					    success: function () {
					        console.log('缓存成功');
					    }
					});
					isExisted = false
				}
				uni.navigateTo({
					url: "../bookdetail/bookdetail?id=" + event.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.history-list-group{
		padding: 10rpx 20rpx;
		.history-title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0;
			background: #f9f9f9;
			font-size: 28rpx;
			color: #9e9e9e;
		}
		.history-group {
			font-size: 32rpx;
			padding: 20rpx 0;
			border-bottom: 1px solid #e4e4e4;
			
		}
	}
.item-list-group {
	padding: 10rpx 20rpx;
	.item-group {
		padding: 10rpx 0;
		border-bottom: 1px solid #e4e4e4;
		display: flex;
		.thumbnail {
			width: 80rpx;
			height: 100rpx;
			margin-right: 20rpx;
		}
		.info-group {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				font-size: 32rpx;
			}
			.rate-year {
				font-size: 28rpx;
				color: #7b7b7b;
			}
		}
	}
}
</style>
