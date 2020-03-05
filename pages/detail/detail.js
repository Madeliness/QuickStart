// pages/detail.js
//获取应用实例
const app = getApp()
const header = require('../../components/header/header.js')
const data = Object.assign({}, header.data, {
  address: '',
  type: 'sell',
  contact: '',
  message: ''
})
const config = Object.assign({}, header, {

  /**
   * 页面的初始数据
   */
  data: data,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.getDetailInfo(options.id)
  },
  getDetailInfo(id) {
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_item',
      method: 'post',
      data: {
        distinct: app.globalData.distinct,
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: this.getDetailSucc.bind(this)
    })
  },
  getDetailSucc: function(res) {
    const result = res.data.data
    this.setData({
      address: result.address,
      type: result.type,
      contact: result.contact,
      message: result.message
    })
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
Page(config)