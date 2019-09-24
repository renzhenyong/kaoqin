//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
  
    pic:'',
    modalHidden: true,
    latitude: "",
    longitude: "",
    scale: 16,
    markers: [{
      iconPath: "../../img/marker.png",
      id: 1,
      latitude: 37.5563241118,
      longitude: 121.2498164177,
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
  onLoad: function (option) {
    console.log("name");
    console.log(option.mark);

    let time = util.formatTime(new Date());
    let dakatime = util.dakaTime(new Date())
    this.setData({
      time: time,
     dakatime: dakatime,
      mark:option.mark
    });
  },
  onShow: function () {
    var that = this;
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
        wx.uploadFile({
          url: app.globalData.api + 'uploadImg',  //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            sid: that.data.sid
          },
          success(res) {
            var imgres = JSON.parse(res.data);
            console.log("that.data.mark");
            console.log(that.data.mark);
            wx.request({
              url: 'https://banpai.chxgk.com/api/Sushe/huoti',
              data: {
                sid: that.data.sid,
                latitude: that.data.latitude,
                longitude: that.data.longitude,
                currentime: util.currentTime(new Date()),
                remark: that.data.mark,
                pic1: imgres.data,
              },
              method: "POST",
              success: res => {
                var ht_endtime = util.formatTime(new Date());
                that.setData({
                  modalHidden: false,
                  ht_endtime: ht_endtime,
                  score: res.data.Score
                })
              }
            })

          }
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
  var that = this
  that.setData({
    modalHidden: true
  })
}
})