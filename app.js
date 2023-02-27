// app.js
App({
  onLaunch: function (){
    wx.cloud.init({
      env:"cloud1-1ga64t1b02464356"
    })
  },
  globalData:{
    userInfo:null,
    cartList:[],
    _id:''
  }
})
