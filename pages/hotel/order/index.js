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
    console.log(result)
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
    var integral = that.data.integral;//拥有积分
    var deductible=integral/10;//可抵扣的金额
    wx.getStorage({
      key: 'price',
      success: function(res) {
        that.setData({
          price: res.data,
          deductible: deductible,
          result:res.data
        });
      },
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