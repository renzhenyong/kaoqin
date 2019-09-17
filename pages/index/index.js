//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    latitude: "",
    longitude: "",
    scale: 16,
    markers: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res.latitude);
        console.log(res.longitude);
        //赋值经纬度
        that.setData({
          latitude: parseFloat(res.latitude),
          longitude: parseFloat(res.longitude),
        })
      }
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  logout: function (e) {
    wx.clearStorageSync();
    console.log(136);
    wx.redirectTo({
      url: '../login/index'
    })
  },
})
