//app.js
App({
 
  onLaunch: function() {
    var that = this;
    wx.request({
      url: 'http://www.jago.com:8090/jiayoulong/Home/Wechat/hotelSelectAll',
      success: function(res) {
        console.log(res);
      }
    })
    // 登录
    wx.login({
      success: function(res) {
        if(res.code) {
          //登录成功
          wx.request({
            url: that.globalData.webSite + '/Home/Wechat/userLogin',
            data: {
              code: res.code
            },
            success: function(res) {
              //全局添加openId seesionKey
              var data = JSON.parse(res.data);
              that.globalData.openId = data.openid;
              that.globalData.sessionKey = data.session_key;
              // console.log(that);

              //全局添加userInfo
              wx.getUserInfo({
                success: function(res) {
                  that.globalData.userInfo = res.userInfo;

                  //登录状态验证
                  wx.request({
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    url: that.globalData.webSite + '/Home/Wechat/userLoginStatusConfirm',
                    data: { open_id: that.globalData.openId },
                    success: function (res) {
                      var data = res.data;
                      if(data.code == '200') {
                        that.globalData.loginStatus = true;
                        that.globalData.userInfo.score = data.data.score;
                        that.globalData.userInfo.phone = data.data.phone;
                      }
                      console.log(that);
                    }
                  });
                }
              });
            }
          });

        }else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    openId: '',
    loginStatus: false,
    webSite: 'http://hyu3181730001.my3w.com'
  }
})
