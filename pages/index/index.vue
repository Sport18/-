<template>
	<view class="content">
		<searchbar :isnavigator="true"></searchbar>
		
		<!-- 电影 -->
		<index-module :items="movies" type="movies" :title="Title[0]" moreUrl="/pages/list/list?type=movies"></index-module>
		<!-- 书籍 -->
		<index-module :items="book" type="book" :title="Title[1]" moreUrl="/pages/list/list?type=book"></index-module>
		<!-- 音乐 -->
		<index-module :items="music" type="music" :title="Title[2]" :isMisic="true" moreUrl="/pages/list/list?type=music"></index-module>
	</view>
</template>

<script>
	import searchbar from '@/components/searchbar.vue';
	import indexModule from '@/components/indexModule.vue';
	import {network} from '@/common/network.js';
	export default {
		components: {
			searchbar,
			indexModule
		},
		data() {
			return {
				movies: {},
				book: {},
				music: {},
				Title: ['电影', '书籍', '音乐']
				
			};
		},
		onLoad() {
			var that = this
			// 电影
			network.getMovieList({
				success: function(movies){
					that.movies = movies.subjects
				}
			});
			// 图书
			network.getBookList({
				success: function(book){
					that.book = book.books
				}
			});
			// 音乐
			network.getMusicList({
				success: function(music){
					that.music = music.musics
				}
			});
		},
		methods: {},
	};
</script>

<style lang="scss">
	
</style>
