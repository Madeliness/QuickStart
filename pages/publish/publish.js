//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    address: '点击选择，要勾选哦~',
    success: false
  },
  staticData: {
    longitude: '',
    latitude: '',
    type: 'buy'
  },
  handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooselocationSucc.bind(this)

    })
  },
  handleChooselocationSucc(res) {
    this.setData({
      address: res.address
    })
    Object.assign(this.staticData, {
      latitude: res.latitude,
      longitude: res.longitude
    })
  },
  handleChange(e) {
    this.staticData.type = e.detail.value
    console.log(this.data)
    console.log(this.staticData)
  },
  handleInputMsg(e) {
    this.staticData.message = e.detail.value
  },
  handleInputNum(e) {
    this.staticData.contact = e.detail.value
    console.log(this.staticData)
  },
  handleSubmit() {
    if (!this.data.address || this.data.address === '点击选择，要勾选哦~') {
      wx.showToast({
        title: '请填写地址',
        icon: 'loading',
        duration: 2000
      })
      return
    }
    if (!this.staticData.message) {
      wx.showToast({
        title: '请填写说明信息',
        icon: 'loading',
        duration: 2000
      })
      return
    }
    if (!this.staticData.contact) {
      wx.showToast({
        title: '请填写联系人信息',
        icon: 'loading',
        duration: 2000
      })
      return
    }
    const data = Object.assign({}, this.staticData, { address: this.data.address, distinct: app.globalData.distinct})
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item',
      method: 'post',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: this.handleSubmitSucc.bind(this)
    })
  },
  handleSubmitSucc(res) {
    console.log(res.data)
    if (res.data && res.data.ret) {
      this.setData({
        success: true
      })
    }
  },
  handleBack() {
    // 在C页面内 navigateBack，将返回A页面
    wx.navigateBack()
  }
})