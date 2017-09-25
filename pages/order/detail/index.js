// pages/order/detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
   imgUrl: "/img/detail1.jpg",
   foot:"foot"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      url: app.globalData.webSite + '/Home/Wechat/orderSelectById',
      data: {
        id: options.id
      },
      success: function (res) {
        var data = res.data;
        if (data.code == '200') {
          data.data.forEach(function (val, key) {
            if (val.id == options.id) {
              if (val.status == '0') {
                val.status = '待入住';
                that.setData({
                  imgUrl: "/img/detail1.jpg",
                  imgText: '您的房间已预约成功，我们期待您的入住'
                });
              }
              if (val.status == '1') {
                val.status = '已完成';
                that.setData({
                  imgUrl: "/img/detail2.jpg",
                  imgText: '感谢您光临嘉优隆精品酒店,期待您的下次入住'
                });
              }
              if (val.status == '2') {
                val.status = '退款中';
                that.setData({
                  imgUrl: "/img/detail3.jpg",
                  imgText: '我们正在飞速的为您处理退款，请稍后',
                  foot:"btns"
                });
              }
              if (val.status == '3') {
                val.status = '已退款';
                that.setData({
                  imgUrl: "/img/detail4.jpg",
                  imgText: '您的退款已经完成，给您带来的不便我们深感歉意',
                  foot:"btns"
                });
              }


            }
          });
          that.setData({
            hotel: data.data,
            price: data.data[0].price
          });
        }
        console.log("detail");
       console.log(that.data.hotel[0]);
       console.log(that.data.hotel[0].detail);
      }
    })
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