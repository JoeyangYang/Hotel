// pages/hotel/order/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '',
    used_score:'0',
    deductible:'0'
  },

  switchChange: function (e) {
    var that = this;
    var price = parseFloat(that.data.price);
    var deductible = that.data.deductibles;//积分抵扣金额
    var result = (price*100 - deductible*100)/100; 
    // var now_score = that.data.now_score - used_score;
    if (e.detail.value == true){
      //积分抵用金额与酒店实际价格做比较
      if (deductible > price){
        if (result <= 0) {
          //判断实际价格是否小于0
          that.setData({
            result: "0.01",
            active: 'active',
            deductible: price - 0.01,
          });
        } else {
          that.setData({
            active: 'active',
            result: result,
          });
        }
        //积分抵用情况
        var used_score = parseFloat(price * 10);
        that.setData({
          now_score: that.data.integral - used_score + 0.1,
          used_score: used_score - 0.1,
        })
      }else{
        //判断实际价格是否小于0
        if (result <= 0) {
          that.setData({
            result: "0.01",
            active: 'active',
            deductible: price,
          });
        } else {
          that.setData({
            active: 'active',
            result: result,
          });
        }
        //判断用户拥有积分是否为0,积分抵用情况
        if (parseFloat(app.globalData.userInfo.score) == 0){
          that.setData({
            now_score: price,
            used_score: that.data.integral,
          })
        }else{
          that.setData({
            now_score: '0',
            used_score: that.data.integral,
          })
        }
      }
      // if(result<=0){
      //   that.setData({
      //     result:"0",
      //     active: 'active',
      //     deductible:price,
      //   });
      // }else{
      //   that.setData({
      //     active: 'active',
      //     result: result,
      //   });
      // }  
    }else {
      wx.getStorage({
        key: 'spec',
        success: function (res) {
          that.setData({
            active: '',
            result: price,
            used_score: '0',
            deductible: '0',
            now_score: parseFloat(that.data.integral) + parseFloat(res.data.price),
          });
        }
      })      
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
    var integral = parseFloat(app.globalData.userInfo.score);//拥有积分
    var deductible=integral/10;//可抵扣的金额
    // var used_score = deductible*10;//抵扣的积分
    var theme;//房间类型
    wx.getStorage({
      key: 'spec',
      success: function(res) {
        that.setData({
          theme:res.data.theme,
          price: res.data.price,
          now_score: integral - that.data.used_score + parseFloat(res.data.price),
          deductibles: deductible,
          result:res.data.price,
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
    var used_score = that.data.used_score;//已使用积分
    var hotel_id = that.data.id;//酒店id
    var user_phone=that.data.phone;//入住人电话
    var hotel_phone = that.data.hotel_phone;//酒店电话
    var theme=that.data.theme;//酒店房间类型
    var cost_price = that.data.cost_price;//酒店原价格
    var now_score = that.data.now_score;//剩余积分
    console.log('--------------------------');
        console.log(now_score);
        console.log(used_score);
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