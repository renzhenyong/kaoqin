//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk/qqmap-wx-jssdk.js');
// 实例化API核心类
const wxMap = new QQMapWX({
  key: 'FDVBZ-3AAWW-BB6RT-OQLPQ-2GDXS-GMFMJ'
});
Page({
  data: {
    address:'',
    addrssDetail:'',
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
    console.log("that.data.mark");
    console.log(option.mark);
    let time = util.formatTime(new Date());
    let dakatime = util.dakaTime(new Date())
    if ('21:00' <= dakatime && '22:00'>=dakatime){
      this.setData({
        background: "#3F88FB",
        guiqin_daka:"归勤打卡"
      })
    }else{
      this.setData({
        background: "#9A999F",
        guiqin_daka: "未到打卡时间"
      })
    }
    console.log("option.mark");
    console.log(option);
    if (option==undefined){
    this.setData({
      time: time,
     dakatime: dakatime
    });
    }else{
      this.setData({
        time: time,
        dakatime: dakatime,
        mark: option.mark
      });
    }
  },
  /**经纬度逆解析 */
  reverseGeocoder() {
    var that=this;
    wxMap.reverseGeocoder({
      location: {
        // 你的经纬度
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      },
      success: function (res) {
        that.setData({
         address:res.result.address,
          addrssDetail: res.result.address_reference.landmark_l2.title
        })
      },
      fail: function (res) {
        console.log(res);
      }
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
          //赋值经纬度
          that.setData({
            latitude: parseFloat(res.latitude),
            longitude: parseFloat(res.longitude),
          })
          that.reverseGeocoder();
        }
      })
    } else {
      wx.reLaunch({
        url: '../login/index',
      })
    }
  
  },
  takePhoto(){
    let dakatime1 = util.dakaTime(new Date())
    console.log(dakatime1);
    if ('21:00' >= dakatime1 || '22:00' <= dakatime1) {
      wx.showModal({
        title: '提示',
        content: '请在21点到22点之间打卡',
      })
      return;
    }
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
  }, 
  sua () {
    this.onLoad();
  },
})