//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("res.code");
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("res.userInfo");
              console.log(res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    api: 'https://banpai.chxgk.com/api/attend/',
    imgurl: 'https://banpai.chxgk.com/'
  },
  loading: () => {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
  },
  post: function (route, data, success, fail, complete) {
    data.token = this.globalData.sid;
    wx.request({
      url: this.globalData.api + route,
      data: data,
      method: 'POST',
      success: res => {
        console.log(res);
        if (success)
          success(res);
      },
      fail: err => {
        console.log(err);
        if (fail)
          fail(err);
      },
      complete: function () {
        if (!data.noload) {
          wx.hideLoading();
        }
        if (complete)
          complete();
      },
    })
  },
  /**
 * 验证是否已登录
 */
  hasLogin: function () {
    var that = this;
    //判断session是否有效
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        var uid = wx.getStorageSync('uid');
        if (uid) {
          //判断是否合法
          that.post('isAuth', { sid: uid }, res => {
            if (res.data.code == 0) {
              console.log('登录状态失效了');
              //登录失效，重新登录
              wx.reLaunch({
                url: '/pages/login/index',
              })
            }
          })
          that.globalData.uid = uid;
          //用户已经登录
        } else {
          return false;
          //未登录 跳转到登录界面
          wx.navigateTo({
            url: '/pages/login/index'
          })
          return false;

        }
      },
      fail() {
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }
    })

  }
})