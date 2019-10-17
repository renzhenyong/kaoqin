// pages/xwsq/buka.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['本人'],
    index: 0,
    choice1: false,
    buka_date: '',
    reason: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (typeof(options) == "object") {
      this.setData({
        choice1: false,
      })

    } else {
      this.setData({
        choice1: true,
        buka_date: options.clickdate,
      })
    }
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
    var that = this;
    app.hasLogin();
    this.data.sid = wx.getStorageSync('uid');
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

  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindbukaDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      choice1: true,
      buka_date: e.detail.value
    })
  },
  bindWordLimit: function(e) {
    console.log(e.detail.value)
    this.setData({
      reason: e.detail.value,
    })
  },
  tijiao() {
    let that = this
    if (that.data.buka_date == '') {
      console.log(11);
      wx.showModal({
        title: '提示',
        content: "请填写补卡时间",
      })
      return;
    } else if (that.data.reason == '') {
      console.log(22);
      wx.showModal({
        title: '提示',
        content: "请填写补卡原因",
      })
      return;
    }


    app.post('askFill', {
      sid: this.data.sid,
      remark: that.data.reason,
      date: that.data.buka_date
    }, res => {
      if (res.data.code == 1) {
        wx.navigateTo({
          url: '../xwsq/buka_success',
        })
      } else {
        wx.showModal({
          title: '错误提示',
          content: res.data.msg,
        })
      }
    })

  }
})