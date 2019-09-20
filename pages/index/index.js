//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    modalHidden: true,
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
  onReady: function () {
  },
  onLoad: function (options) {

  },
  onShow: function () {
    app.hasLogin();
    this.data.sid = wx.getStorageSync('uid');
    console.log(22);
    console.log(this.data.sid);
    if (this.data.sid != '') {
    } else {
      wx.reLaunch({
        url: '../login/index',
      })
    }
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
  takePhoto(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          modalHidden: false
        })
      }
    })
    },
  marks(){
    wx.navigateTo({
      url: '../index/marks'
    })
  },
know(){
  console.log(888);
  var that = this
  that.setData({
    modalHidden: true
  })
}
})