<template>
	<view>
		<searchbar :isnavigator="true"></searchbar>
		<view class="content">
			<itemview v-for="(item,index) in items" :key="index" :item="item" :isMisic="isMisic" 
			:itemurl=" url + type + '&id=' + item.id"></itemview>
		</view>
	</view>
</template>

<script>
	import searchbar from '@/components/searchbar.vue';
	import {network} from '@/common/network.js';
	import itemview from '@/components/itemview.vue';
	export default {
		components: {
			searchbar,
			itemview
		},
		data() {
			return {
				items: {},
				isMisic: false,
				type: "",
				url: ""
			};
		},
		onLoad(options) {
			var that = this
			var type = options.type
			that.type = type
			var title = ""
			uni.showLoading({
			    title: '正在加载中...'
			});
			if (type === "movies") {
				// 请求电影数据
				title = "电影"
				network.getMovieList({
					success: function(movies) {
						var items = movies.subjects
						var leng = items.length % 3
						if (leng === 2) {
							items.push(null)
						}
						that.items = items
						uni.hideLoading()
					},
					count: 8
				});
			} else if (type === "book") {
				// 请求书籍
				title = "书籍"
				network.getBookList({
					success: function(book) {
						var items = book.books
						var leng = items.length % 3
						if (leng === 2) {
							items.push(null)
						}
						that.items = book.books
						uni.hideLoading()
					},
					count: 100
				});
			} else {
				// 请求音乐
				title = "音乐"
				that.isMisic = true
				network.getMusicList({
					success: function(music) {
						var items = music.musics
						var leng = items.length % 3
						if (leng === 2) {
							items.push(null)
						}
						that.items = music.musics
						uni.hideLoading()
					},
					count: 100
				});
			}
			uni.setNavigationBarTitle({
				title: title
			});
		},
		mounted() {
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
		},
	}
</script>

<style lang="scss">
	.content {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>
