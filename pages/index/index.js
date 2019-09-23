//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    modalHidden: true,
    latitude: "",
    longitude: "",
    scale: 16,
    markers: [{
      iconPath: "../../img/marker.png",
      id: 1,
      latitude: 37.5598900000,
      longitude: 121.2530500000,
      width: 18,
      height: 18,
      label: { content: '打卡地点', color: '#1AAD19', fontSize:14}
    }],
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
    console.log(new Date());
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
  },
  onShow: function () {
    app.hasLogin();
    this.data.sid = wx.getStorageSync('uid');
    if (this.data.sid != '') {
      var that = this
      //获取当前的地理位置、速度
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
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
    } else {
      wx.reLaunch({
        url: '../login/index',
      })
    }

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
        console.log(tempFilePaths);
        console.log("sid" + app.globalData.api);
        wx.uploadFile({
          url: app.globalData.api + 'uploadImg',  //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            sid: that.data.sid
          },
          success(res) {
            console.log("图像1");
            console.log(res.data);
            var imgres = JSON.parse(res.data);
            //do something
          }
        })


        // that.setData({
        //   modalHidden: false
        // })
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