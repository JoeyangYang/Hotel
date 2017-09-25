// pages/hotel/order/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: ''
  },

  switchChange: function (e) {
    var that = this;
    var price = that.data.price;
    var deductible;//积分抵扣金额
    var result = price - that.data.deductible;
    var now_score;
    if (e.detail.value == true){
      if(result<0){
        that.setData({
          result:"0",
          active: 'active',
          now_score: result*-10,
          deductible:price,
        })
      }else{
        that.setData({
          active: 'active',
          result: result,
          now_score: '0'
        });
      }  
    }else {
      that.setData({
        active: '',
        result: price,
        now_score: that.data.integral
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var integral;
    var phone=app.globalData.userInfo.phone;
    that.setData({
      integral:app.globalData.userInfo.score,
      date:options.date,
      dateEnd:options.dateEnd,
      nightNum:options.nightNum,
      phone:phone
    });
    wx.getUserInfo({
      success: function (res) {
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
        var hotel_phone;
        var cost_price;
        that.setData({
          address: res.data.address,
          hotelName: res.data.name,
          id: res.data.id,
          hotel_phone:res.data.phone,
          cost_price:res.data.price
        });
      },
    })  
    var integral = that.data.integral;//拥有积分
    var deductible=integral/10;//可抵扣的金额
    var theme;//房间类型
    wx.getStorage({
      key: 'spec',
      success: function(res) {
        that.setData({
          theme:res.data.theme,
          price: res.data.price,
          deductible: deductible,
          result:res.data.price
        });
      },
    });
  },
  //提交订单
  submit:function(){
    var that=this;
    var address=that.data.address;//酒店地址
    var check_in = that.data.date;//入住时间
    var check_out = that.data.dateEnd;//离宿时间
    var hotel_name = that.data.hotelName;//酒店名字
    var price = that.data.result;//酒店预定实际价格
    var user_name = that.data.userName;//入住人昵称
    var used_score = that.data.integral;//会员积分
    var hotel_id = that.data.id;//酒店id
    var user_phone=that.data.phone;//入住人电话
    var hotel_phone = that.data.hotel_phone;//酒店电话
    var theme=that.data.theme;//酒店房间类型
    var cost_price = that.data.cost_price;//酒店原价格
    var now_score = that.data.now_score;//剩余积分
    wx.setStorage({
      key: 'orderList',
      data: { user_phone, hotel_phone, address, hotel_name, check_in, check_out, price, user_name, used_score, hotel_id, theme, cost_price, now_score},
      success:function(res){
        wx.navigateTo({
          url: '/pages/hotel/order_pay/index'
        })
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