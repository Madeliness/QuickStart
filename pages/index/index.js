//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude: '',
    latitude: '',
    markers: [],
    control: [{
        id: 1,
        position: {
          left: (app.globalData.windowWidth / 2) - 18,
          top: ((app.globalData.windowHeight - 24) / 2) - 20,
          width: 24,
          height: 24
        },
        iconPath: '/resource/icon1.jpg',
        clickable: false
      },
      {
        id: 2,
        position: {
          left: 10,
          top: 400,
          width: 31,
          height: 31
        },
        iconPath: '/resource/icon2.jpg',
        clickable: true
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

  },
  onReady: function() {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  // moveToLocation: function () {
  //   this.mapCtx.moveToLocation()
  // },
  onShow: function() {
    // console.log('onshow')
    this.getLocation()
    // this.getMessages()
  },
  getMessages() {
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_list',
      method: 'get',
      data: {
        distinct: app.globalData.distinct
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        const markers = res.data.data.map((v, i) => {
          return {
            iconPath: '/resource/animal.png',
            id: v.id,
            longitude: v.longitude,
            latitude: v.latitude,
            width: 40,
            height: 40
          }
        })
        this.setData({
          markers: markers
        })
      }
    })
  },
  onHide: function() {
    console.log('hide')
  },
  onPullDownRefresh: function() {
    console.log('下拉刷新')
  },
  onReachBottom: function() {
    console.log('上拉加载')
  },
  onShareAppMessage: function(res) {
    return {
      title: '萌宠交易平台',
      path: '/page/index/index'
    }
  },
  onPageScroll: function() {
    // 页面滚动时的业务逻辑
    console.log('滚动')
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocationSucc.bind(this)
    })
  },
  handleGetLocationSucc(res) {
    // console.log(res)
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
  },
  controltap(e) {
    console.log(e)
    this.mapCtx.moveToLocation()
  },
  handleMarkerTap(e) {
    wx.navigateTo({
      url: 'pages/detail/detail?id=' + e.markerId
    })
  }
})