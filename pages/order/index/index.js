// pages/order/index/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    on: 'on0',
    animation:'animation0',
    show:'show',
    flag:true,
  },
  //事件处理
  orderNavClick: function(e) {
    var that = this;
    //获取导航index值(1开始)
    var index = e.currentTarget.dataset.active;  
    var on = 'on' + index;
    var animation='animation'+index;
    that.setData({
      on: on,
      animation: animation
    });
    index -= 1;
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        url: app.globalData.webSite + '/Home/Wechat/orderSelectByStatus',
        data: {
          status: index
        },
        success: function (res) {
          var data = res.data;
          //订单状态翻译
          if (data.code == '200') {
            data.data.forEach(function (val, key) {
              if (val.status == '0') {
                data.data[key].status = '待入住';
                data.data[key].refund = 'show';
              }
              if (val.status == '1') {
                data.data[key].status = '已完成';
                data.data[key].refund = 'show';
              }
              if (val.status == '2') {
                data.data[key].status = '退款中';
              }
              if (val.status == '3') {
                data.data[key].status = '已退款';
              }
            });
            
           
          }else{
            data.data=[];
          }
          //set数据
          that.setData({
            hotelList: data.data
          });
        }
      })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this;
    var index=options.status;
    var animation = 'animation' + index;
    var on = 'on' + index;
     index -= 1;
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        url: app.globalData.webSite + '/Home/Wechat/orderSelectByStatus',
        data: {
          status: index
        },
        success: function (res) {
          var data = res.data;
          //订单状态翻译
          if (data.code == '200') {
            data.data.forEach(function (val, key) {
              if (val.status == '0') {
                data.data[key].status = '待入住';
                data.data[key].refund = 'show';
              }
              if (val.status == '1') {
                data.data[key].status = '已完成';
                data.data[key].refund = 'show';
              }
              if (val.status == '2') {
                data.data[key].status = '退款中';
                
              }
              if (val.status == '3') {
                data.data[key].status = '已退款';
              }
            });
            
          }else{
           data.data=[];
          }
          //set数据
          that.setData({
            hotelList: data.data,
            animation: animation,
            on: on
          });
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