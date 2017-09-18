// pages/hotel/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '',
    integral:'1660'
  },

  switchChange: function (e) {
    var that = this;
    var price = that.data.price;
    var result = price - that.data.deductible;
    if (e.detail.value){
      that.setData({
        active: 'active',
        result: result
      });
    }else {
      that.setData({
        active: '',
        result: price
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      date:options.date,
      dateEnd:options.dateEnd,
      nightNum:options.nightNum
    });
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        that.setData({
          userName: nickName
        });
       }
    })
    wx.getStorage({
      key: 'singleHotel',
      success: function(res) {
        var hotel=res.data;
        that.setData({
          address:hotel.data.address,
          hotelName:hotel.name,
          phone:hotel.data.phone,
          id:hotel.data.id
        })
      },
    })
    // wx.getStorage({
    //   key: 'singleHotel',
    //   success: function (res) {
    //     var hotel = res.data;
    //   }  
    var integral = that.data.integral;//拥有积分
    var deductible=integral/10;//可抵扣的金额
    wx.getStorage({
      key: 'spec',
      success: function(res) {
        that.setData({
          price: res.data.price,
          deductible: deductible,
          result:res.data.price
        });
      },
    });
  },

  submit:function(){
    var that=this;
    var address=that.data.address;
    var check_in = that.data.date;
    var check_out = that.data.dateEnd;
    var hotel_name = that.data.hotelName;
    var price = that.data.result;
    var user_name = that.data.userName;
    var integral = that.data.integral;
    var hotel_id = that.data.id;
    var user_phone='18787312252'
    wx.setStorage({
      key: 'orderList',
      data: {user_phone, address, hotel_name, check_in, check_out, price, user_name, integral, hotel_id},
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