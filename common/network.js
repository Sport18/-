const network = {
	getMovieList: function(params) {
		params.type = "movies"
		this.getItemList(params)
	},
	getBookList: function(params) {
		params.type = "book"
		this.getItemList(params)
	},
	getMusicList: function(params) {
		params.type = "music"
		this.getItemList(params)
	},
	// 获取内容
	getItemList: function(params) {
		var url = ""
		if (params.type === 'movies') {
			url = "https://douban.uieee.com/v2/movie/in_theaters"
		} else if (params.type === "book") {
			url = "https://douban.uieee.com/v2/book/search?q=虚构类"
		} else {
			url = "https://douban.uieee.com/v2/music/search?q=欧美"
		}
		var count = params.count ? params.count : 7
		uni.request({
			url: url,
			method: 'GET',
			header: {
				"content-type": "json"
			},
			data: {
				start: 0,
				count: count,
				city: '杭州'
			},
			success: res => {
				var items = res.data
				if (params && params.success) {
					params.success(items)
				}
			},
			fail: () => {},
			complete: () => {}
		});
	},
	// 获取详情
	getItemDetail: function(params) {
		var type = params.type
		var id = params.id
		var url = ""
		if (type === "movies") {
			url = "https://douban.uieee.com/v2/movie/subject/" + id
		}else if (type === 'book'){
			url = "https://douban.uieee.com/v2/book/" + id
		}else {
			url = "https://douban.uieee.com/v2/music/" + id
		}
		uni.request({
			url: url,
			method: 'GET',
			header: {
				"Content-Type":"application/xml"
			},
			success: res => {
				var item = res.data
				if (params.success){
					params.success(item)
				}
			},
			fail: () => {},
			complete: () => {}
		});
	}, 
	// 获取评论
	getItemComment: function(params) {
		var id = params.id
		var type = params.type
		var start = params.start ? params.start : 0
		var count = params.count ? params.count : 3
		var url = "https://douban.uieee.com/v2/movie/subject/" + id + "/comments?start=" + start + "&count=" + count
		
		uni.request({
			url: url,
			method: 'GET',
			header: {
				"Content-Type":"application/xml"
			},
			success: res => {
				var data = res.data
				if (params.success){
					params.success(data)
				}
			},
			fail: () => {},
			complete: () => {}
		});
	},
	// 搜索
	getSearch: function(params) {
		var q = params.q
		var url = 'https://douban.uieee.com/v2/book/search?q=' + q + '&count=20'
		uni.request({
			url: url,
			method: 'GET',
			header: {
				"Content-Type":"application/xml"
			},
			success: res => {
				var subjects = res.data.books
				if (params.success){
					params.success(subjects)
				}
			},
			fail: () => {},
			complete: () => {}
		});
	}
}

export {
	network
}
