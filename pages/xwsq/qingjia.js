var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp();
Page({
  data: {
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTimeArray2: null,
    startDate:"",
    endDate:"",
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    choice: false,
    choice1: false,
    choice2: true,
    choice3: false,
    choice4: true,
    array: ['病假', '事假'],
    inputValue: '',
    reason: ''
  },
  onLoad(){
      this.data.sid = wx.getStorageSync('uid');
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      dateTimeArray2: obj1.dateTimeArray,
      dateTime2: obj1.dateTime,
    });
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      reason: e.detail.value,
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      choice: true,
      index: e.detail.value
    })
  },
  changeDateTime1(e) {
    console.log(e.detail.value);
    this.setData({
      choice1: true,
      choice2: false,
    })
    this.setData({
       dateTime1: e.detail.value,
      startDate: this.data.dateTimeArray1[0][this.data.dateTime1[0]] + "-" + this.data.dateTimeArray1[1][this.data.dateTime1[1]] 
        + "-" + this.data.dateTimeArray1[2][this.data.dateTime1[2]] + " " + this.data.dateTimeArray1[3][this.data.dateTime1[3]] + ":" + this.data.dateTimeArray1[4][this.data.dateTime1[4]],
        });

    var al = new Date(this.data.startDate.replace(/-/g, "/")).getTime();
    var a2 = new Date(this.data.endDate.replace(/-/g, "/")).getTime();
    var num = (a2 - al) / (1000 * 3600) ;
    var hours = num.toFixed(1)
    if (hours < 0) {
      wx.showModal({
        title: '提醒',
        content: '开始时间不能大于结束时间',
      })
      return;
    }
    if (this.data.endDate == "") {
      this.setData({
  
        hours: "0",
      })
    } else {
      this.setData({

        hours: Math.abs(hours)
      })
    }
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({ 
      dateTimeArray1: dateArr,
      dateTime1: arr,
    });
  },
    changeDateTime2(e) {
    this.setData({
      choice3: true,
      choice4: false,
    })
    this.setData({
      dateTime2: e.detail.value,
      endDate: this.data.dateTimeArray2[0][this.data.dateTime2[0]] + "-" + this.data.dateTimeArray2[1][this.data.dateTime2[1]]
        + "-" + this.data.dateTimeArray2[2][this.data.dateTime2[2]] + " " + this.data.dateTimeArray2[3][this.data.dateTime2[3]] + ":" + this.data.dateTimeArray2[4][this.data.dateTime2[4]]
    });
      var al = new Date(this.data.endDate.replace(/-/g, "/")).getTime();
      var a2 = new Date(this.data.startDate.replace(/-/g, "/")).getTime();
      var num = (al - a2) / (1000 * 3600);
      var hours = num.toFixed(1)
      if (hours < 0) {
        wx.showModal({
          title: '提醒',
          content: '开始时间不能大于结束时间',
        })
        return;
      }
      if (this.data.startDate == "") {
        this.setData({
        
          hours: "0",
        })
      } else {
        this.setData({
        
          hours: Math.abs(hours),
        })
      }
  },

  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime2, dateArr = this.data.dateTimeArray2;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray2: dateArr,
      dateTime2: arr,
    });
  },

  tijiao() {
    var al = new Date(this.data.startDate).getTime();
    var a2 = new Date(this.data.endDate).getTime();
    console.log(a2 - al);
    if (this.data.index == 5) {
      wx.showModal({
        title: '提醒',
        content: '请输入请假类型',
      })
      return;
    } else if (a2 - al < 0) {
      console.log(555);
      wx.showModal({
        title: '提醒',
        content: '结束时间不能小于开始时间',
      })
      return;
    } else if (this.data.reason == "") {
      wx.showModal({
        title: '提醒',
        content: '请输入请假原因',
      })
      return;
    }
    app.post('askLeave', {
      sid: this.data.sid,
      leave_type: 1,
      start_date: this.data.startDate,
      end_date: this.data.endDate,
      day_length: this.data.hours,
      remark: this.data.reason
    }, res => {
      if (res.data.code == 1) {
        wx.navigateTo({
          url: '../xwsq/buka_success',
        })
        wx.setNavigationBarTitle({
          title: '成功'
        })
      } else {
        wx.showModal({
          title: '提醒',
          content: '未找到数据',
        })
      }
    });

  }
})
