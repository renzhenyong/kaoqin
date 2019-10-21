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
    hidedaka:false,
    hidejiadaka: true,
    address: '',
    addrssDetail: '',
    daka_pic: '',
    modalHidden: true,
    daka_endtime: '',
    dakastatu: '',
    latitude: "",
    longitude: "",
    scale: 16,
    isrange: "",
    rangcolor: "#1AAD19",
    markers: [{
      iconPath: "../../img/marker.png",
      id: 1,
      latitude: 37.5563241118,
      longitude: 121.2498164177,
      width: 18,
      height: 18,
      label: {
        content: '打卡地点',
        color: '#1AAD19',
        fontSize: 14
      }
    }],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function() {},
  onLoad: function(option) {
    app.hasLogin();
    let time = util.formatTime(new Date());
    let dakatime = util.dakaTime(new Date())
    if (option == undefined) {
      this.setData({
        time: time,
        dakatime: dakatime
      });
    } else {
      this.setData({
        time: time,
        dakatime: dakatime,
        mark: option.mark
      });
    }
  },
  /**经纬度逆解析 */
  reverseGeocoder() {
    var that = this;
    wxMap.reverseGeocoder({
      location: {
        // 你的经纬度
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      },
      success: function(res) {
        that.setData({
          address: res.result.address,
          addrssDetail: res.result.address_reference.landmark_l2.title
        })
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },

  onShow: function() {
    var that = this;

    this.data.sid = wx.getStorageSync('uid');
    // 当前学校经纬度
    app.post('schoolInfo', {
      sid: that.data.sid
    }, res => {
      if (res.data.code == 1) {
        that.setData({
          shoolname: res.data.data.name,
          //  suselat:res.data.data.lat,
          //  suselng: res.data.data.lng,
        })
        that.data.markers[0].latitude = res.data.data.lat;
        that.data.markers[0].longitude = res.data.data.lng;
        wx.setStorageSync('shoolname', res.data.data.name);
      }
    })


    if (this.data.sid != '') {
      var that = this
      //获取当前的地理位置、速度
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function(res) {
          //赋值经纬度
          that.setData({
              latitude: parseFloat(res.latitude),
              longitude: parseFloat(res.longitude),
            }),
            // 是否在考勤范围内
            app.post('inSignDistance', {
              sid: that.data.sid,
              lng: that.data.longitude,
              lat: that.data.latitude
            }, res => {
              if (res.data.code == 1) {
                that.setData({
                  isrange: "您已在考勤范围内",
                  rangcolor: "#1AAD19"
                })
              } else {
                that.setData({
                  isrange: "您未在考勤范围内",
                  rangcolor: "#E64340"
                })
              }
            })
          //是否到打卡时间 
          app.post('inSignTime', {
            sid: that.data.sid
          }, res => {
            if (res.data.code == 1) {
              that.setData({
                guiqin_daka: "归勤打卡",
                background: "#3F88FB",
              })
            } else {
              that.setData({
                guiqin_daka: "未到考勤时间",
                background: "#9A999F",

              })
            }
            that.setData({
              start_time: res.data.data.start_time.slice(0, 5),
              end_time: res.data.data.end_time.slice(0, 5),
            })

          })
          //是否已打卡
          app.post('hadSign', {
            sid: that.data.sid
          }, res => {
            if (res.data.code == 0) {
              that.setData({
                guiqin_daka: "已打卡",
                background: "#3F88FB"
              })
            }
          })
          that.reverseGeocoder();
        },
        fail() {
          console.log("fail");
          wx.getSetting({
            success: function(res) {
              console.log(res);
              if (res.authSetting['scope.userLocation'] == false) {
                wx.showModal({
                  title: '',
                  content: '请点击右上方"..."->"设置"->"地理位置"设为允许',
                })
              }

            }
          })
        }
      })

    } else {
      wx.reLaunch({
        url: '../login/index',
      })
    }
  },
  takePhoto() {
    var that = this
    let dakatime1 = util.dakaTime(new Date())
    // if (that.data.start_time >= dakatime1 || that.data.end_time <= dakatime1) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请在规定时间内打卡',
    //   })
    //   return;
    // } else if (that.data.guiqin_daka == '已打卡') {
    //   wx.showModal({
    //     title: '今天已打卡',
    //     content: '请勿重复打卡，好好休息',
    //   })
    //   return;
    // }
    // if (that.data.isrange == '您未在考勤范围内') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '您未在考勤范围内',
    //   })
    //   return;
    // }
    let tim = util.currentTime(new Date());
    let timestamp = Date.parse(tim)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          hidedaka:true,
          hidejiadaka:false
        })
        wx.showLoading({
          title: '正在上传...',
          mask: true
        })
        wx.uploadFile({
          url: app.globalData.api + 'uploadImg', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            image: tempFilePaths[0],
            sid: that.data.sid,
            lat: that.data.latitude,
            lng: that.data.longitude,
            sign_time: timestamp,
            remark: "",
          },
          success(res) {  
            if (res.statusCode == 200) {
              that.setData({
                hidedaka: false,
                hidejiadaka: true
              })
              let imgobj = JSON.parse(res.data);
              if (imgobj.code==1) {
              var ht_endtime = util.dakaTime(new Date())
              that.setData({
                modalHidden: false,
                daka_pic: imgobj.data.pic,
                daka_endtime: ht_endtime,
              })
                 wx.hideLoading();
              console.log(imgobj.data.sign_status);
              if (imgobj.data.sign_status == 1) {
                that.setData({
                  dakastatu: '正常',
                  daka_background: "#3F88FB",
                  knowcolor: "#4188FE"
                });
              } else {
                that.setData({
                  dakastatu: '晚归',
                  daka_background: "#E64340",
                  knowcolor: "#E64340"
                });
              }
            }else{  
                wx.showModal({
                  title: '错误提示',
                  content: imgobj.msg,
                })
                  wx.hideLoading();
            }
            }
          },

          fail: function(res) {
            // wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function(res) {}
            })
          }
        })

      }
    })
  },

  marks() {
    wx.navigateTo({
      url: '../index/marks'
    })
  },

  know() {
    var that = this
    that.setData({
      modalHidden: true
    })
  },
  updatedaka() {
    var that = this
    that.takePhoto();
  },
  sua() {
    this.onLoad();
  },
  gqgz() {
    wx.navigateTo({
      url: '../index/regular'
    })
  }
})