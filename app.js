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
  },
  gotoaccident(){
    wx.redirectTo({
      url: '/pages/accident/accident',
    })
  },
  gotomy(){
    wx.redirectTo({
      url: '/pages/my/my',
    })
  },
  gotoindex(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  gotogift(){
    wx.redirectTo({
      url: '/pages/gift/gift',
    })
  },
  gotoexam(){
    wx.redirectTo({
      url: '/pages/exam/exam',
    })
  },
})
