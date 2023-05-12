// index.js
const app = getApp()
Page({
  data:{
    trafficsigntype:'',
    materialimages:'',
    photoUrl:''
  },
  onLoad(){
    this.getType(),
    this.getImages()
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
  getType(){
    wx.cloud.callFunction({
      name: 'getType'
    }).then(res =>{
        console.log('获取交通标志类别云函数调用成功',res)
        this.setData({
          trafficsigntype: res.result.data
        })
        console.log(this.data)
    }).catch(res=>{
      console.log('失败',res)
    })
  },
  getImages(){
    wx.cloud.callFunction({
      name: 'getImages'
    }).then(res =>{
        console.log('获取图片素材云函数调用成功',res)
        this.setData({
          materialimages: res.result.data
        })
        console.log(this.data)
    }).catch(res=>{
      console.log('失败',res)
    })
  },
  chooseImage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0],
          encoding: 'base64',
          success: res => {
            const fileContent = res.data
            wx.cloud.callFunction({
              name: 'uploadImage',
              data: { fileContent },
              success: res => {
                console.log('上传成功', res)
                const fileId = res.result
                // 获取图片链接，展示图片
                this.getPhotoUrl(fileId)
              },
              fail: console.error
            })
          },
          fail: console.error
        })
      },
      fail: console.error
    })
  },
  getPhotoUrl: function(fileId) {
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        this.setData({
          photoUrl:res.fileList[0].tempFileURL + '?t=' + Math.random()
        })
      },
      fail: console.error
    })
  }
})
