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
    daka_pic:'',
    modalHidden: true,
    daka_endtime:'',
    dakastatu:'',
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
    if ('13:00' <= dakatime && '22:00'>=dakatime){
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
    if ('13:00' >= dakatime1 || '22:00' <= dakatime1) {
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
            sid: that.data.sid,
            latitude: that.data.latitude,
            longitude: that.data.longitude,
            currentime: util.currentTime(new Date()),
            remark: that.data.mark,
          },
          success(res) {
            console.log("photo");
            if (res.statusCode==200){
              let imgobj = JSON.parse(res.data);
              var ht_endtime = util.dakaTime(new Date())
              that.setData({
                modalHidden: false,
                daka_pic:imgobj.data,
                daka_endtime: ht_endtime,
              })
              if (ht_endtime > '21:00' && ht_endtime < '22:00') {
                that.setData({
                  dakastatu: '正常',
                  daka_background: "#3F88FB",
                  knowcolor:"#4188FE"
                });
              } else if (ht_endtime > '22:00' && ht_endtime < '23:00') {
                that.setData({
                  dakastatu: '迟到',
                  daka_background: "#EEB536",
                  knowcolor: "#EEB536"
                });
              } else {
                that.setData({
                  dakastatu: '晚归',
                  daka_background: "#3F88FB",
                  knowcolor: "#E64340"
                });
              }

            }
       
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
  updatedaka(){
    var that = this
    that.takePhoto();
  },
  sua () {
    this.onLoad();
  },
  gqgz(){
    wx.navigateTo({
      url: '../index/regular'
    })
  }
})