// pages/hotel/order_pay/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      result: options.result
    });
  },

  switchTab:function(e){
    // wx.switchTab({
    //   url: '/pages/me/index/index'
    // });
    var that = this;
    wx.getStorage({
      key: 'orderList',
      success: function(res) {
        wx.getStorage({
          key: 'spec',
          success: function (spec) {
            //生成order_number
            var order_number = '';
            for (var i = 0; i < 32; i++) {
              order_number += parseInt(Math.random() * 10)
            }

            //生成detail
            var detail = '';
            var specData = spec.data;
            specData.spec.forEach(function (val, key) {
              detail += val + ' ';
            });
            specData.member.forEach(function(val,key) {
              detail += val + ' ';
            });
            // console.log('+++++++++++++++++++++');
            // console.log('order_number:'+order_number);
            // console.log('hotel_id:' + res.data.hotel_id);
            // console.log('hotel_name:' + res.data.hotel_name);
            // console.log('address:' + res.data.address);
            // console.log('check_in:' + res.data.check_in);
            // console.log('check_out:' + res.data.check_out);
            // console.log('detail:' + detail);
            // console.log('price:' + res.data.price);
            // console.log('status:' + 0);
            // console.log('user_name:' + res.data.user_name);
            // console.log('user_phone:' + res.data.user_phone);
            wx.request({
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: app.globalData.webSite + '/Home/Wechat/orderAdd',
              method: 'POST',
              data: {
                order_number: order_number,
                hotel_id: res.data.hotel_id,
                hotel_name: res.data.hotel_name,
                address: res.data.address,
                check_in: res.data.check_in,
                check_out: res.data.check_out,
                detail: detail,
                price: res.data.price,
                status: 0,
                user_name: res.data.user_name,
                user_phone: res.data.user_phone,
              },
              success: function (res) {
                // console.log(res.data);
                var code = res.data.code;
                if(code==200){
                   wx.switchTab({
                   url: '/pages/me/index/index'
                });
                }
              }
            })
          }
        });
      }
    });
  },

  clickChecked:function(){
    var that=this;
    var checked;
    if(checked==false){
      that.setData({
        active:''
      });
    }else{
      that.setData({
        active: 'active'
      });
    }
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