var shareData = {
  img_url		: "assets/images/share.jpg",
	site_link	: 'http://promo.itechrich.cn/content/redirect',
  messageDesc	: '假如世界上没有e电通，生活将会失去很多乐趣！',
	circleDesc	: '假如世界上没有e电通',
  title		: '假如世界上没有e电通'
};

wx.ready(function() {
	//朋友圈
	wx.updateTimelineShareData({
		title	: shareData.circleDesc,
		link	: shareData.site_link,
		imgUrl	: shareData.img_url,
		success	: function () {	},
		cancel	: function () {}
	});
	//好友
	wx.updateAppMessageShareData({
		title	: shareData.title,
		desc	: shareData.messageDesc, 
		link	: shareData.site_link, 
		imgUrl	: shareData.img_url,
		success	: function () {},
		cancel	: function () {}
	});
	wx.hideMenuItems({
		menuList: [
			'menuItem:share:QZone', /*阅读模式*/
			"menuItem:share:weiboApp", /*分享到朋友圈*/
			"menuItem:copyUrl", /*复制链接*/
			"menuItem:openWithQQBrowser",
			"menuItem:openWithSafari",
			"menuItem:share:email",
			"menuItem:share:qq",
			"menuItem:readMode",
			"menuItem:originPage",
		],
		success: function (res) {},
		fail: function (res) {}
	});
});

//取得签名
$.ajax({
	type	: "GET",
    url		: 'share/getJssdkConfig',//
	async	:false,
	cache	:false,
	success	:function(result) {
		result = result.data;
		wx.config({
			debug		: false,
			appId		: result.appId,
			timestamp	: result.timestamp,
			nonceStr	: result.nonceStr,
			signature	: result.signature,	
			jsApiList	: [
				'checkJsApi',
				'updateTimelineShareData',
				'updateAppMessageShareData',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'translateVoice',
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'onVoicePlayEnd',
				'pauseVoice',
				'stopVoice',
				'uploadVoice',
				'downloadVoice',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'getNetworkType',
				'openLocation',
				'getLocation',
				'hideOptionMenu',
				'showOptionMenu',
				'closeWindow',
				'scanQRCode',
				'chooseWXPay',
				'openProductSpecificView',
				'addCard',
				'chooseCard',
				'openCard']
		});
	},
	fail :function(e){
		console.log(e)
	}
});