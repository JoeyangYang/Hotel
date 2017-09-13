// pages/index/index.js
var data=new Date();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    dateEnd:'2016-09-02',
    flag:"true",
  nightNum:'1',
    datas: [
      [
        {
          id: '1',
          image: '../../img/hotel3.png',
          name: '汉庭酒店'
        },
        {
          id: '2',
          image: '../../img/hotel2.png',
          name: '汉庭酒店'
        },
        {
          id: '3',
          image: '../../img/hotel4.png',
          name: '汉庭酒店'
        }
      ]
      
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1500
  },
  bindDateChange: function (e) {
    var that = this;
    var startTime = new Date(e.detail.value).getTime();
    console.log(e.detail.value);
    that.setData({
      startTime: startTime,
      date: e.detail.value
    });
  },
  bindDateChangeEnd: function (e) {
    var that = this;
    var starTime = that.data.startTime;
    var endTime = new Date(e.detail.value).getTime();
      var result = ((((endTime - starTime ) / 1000) / 60) / 60) / 24;
    console.log(result);
    that.setData({
      nightNum: result,
      dateEnd: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //默认入住时间，离店时间
      var y = data.getFullYear();
      var m = data.getMonth() + 1;
      m = m < 10 ? '0' + m : m;  
      var d = data.getDate();
      var dd = d + 1;
      var ddS = dd < 10 ? ('0' + dd) : dd;
      var dS = d < 10 ? ('0' + d) : d;  
     
      var date=y + '-' + m + '-' + dS;
      var dateEnd = y + '-' + m + '-' + ddS;
      var startTime=new Date(date).getTime();
      var endTime = new Date(dateEnd).getTime();
      this.setData({
        today: date,
        date:date,
        dateEnd: dateEnd,
        startTime: startTime,
        endTime: endTime
      });
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})