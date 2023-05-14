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
        var tempFPaths = res.tempFilePaths[0];
        // 将图片转换为base64编码
        var base64 = wx.getFileSystemManager().readFileSync(tempFPaths, "base64");
        // 在这里可以使用base64编码向服务器发送请求
        console.log("这里是图片64编码: "+base64)
        this.getPredict(base64)
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
  },
  getPredict(imagesBase){
    wx.request({
      url: "https://7d61f1ba.r9.cpolar.top/predict/Trafficsign-Predict",
      method: 'POST',
      data: {
        images: imagesBase
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        // 在此处处理API返回的预测结果
      },
      fail: function (res) {
        console.log(res);
        // 在此处处理API请求失败的情况
      }
    });
  }
})
