// index.js
const app = getApp()
Page({
  
  onLoad(){
    wx.cloud.callFunction({
      name:"getCurrentUserName",
      data:{
        _id:app.globalData._id
      }
    })
    .then(res=>{
      console.log("当前用户的积分获取成功",res)
      this.setData({
        code:res.result.data

      }) 
    })
    .catch(err=>{
      console.log("当前用户的积分获取失败",err)
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  gotoaccident(){
    wx.navigateTo({
      url: '/pages/accident/accident',
    })
  },
  gotomy(){
    wx.navigateTo({
      url: '/pages/my/my',
    })
  },
  gotoindex(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  gotogift(){
    wx.navigateTo({
      url: '/pages/gift/gift',
    })
  },
  gotoexam(){
    wx.navigateTo({
      url: '/pages/exam/exam',
    })
  },
})
