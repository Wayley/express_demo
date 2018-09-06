var express = require('express');
var router = express.Router();
// multer中间件
var multer = require("multer");
var upload = require('../uploader');

/* GET users listing. */
router.get('/', function (req, res, next) {
  // 使用render方法  render(模板名字,模板数据)
  res.render('user', { title: 'users pages' });
  // res.send('respond with a resource');
});
//
router.get('/process_get', function (req, res, next) {
  var response = {
    u_name: req.query.u_name,// GET获取参数是query
    u_age: req.query.u_age
  }
  console.log(req.query);
  res.send(JSON.stringify(response))
})
//
router.post('/process_post', function (req, res, next) {
  var response = {
    data: {
      first_name: req.body.first_name,// POST获取参数是body
      last_name: req.body.last_name
    },
    code: 1
  }
  console.log(req.body);
  res.send(JSON.stringify(response))
})
// 单文件上传 image为input的name属性
router.post('/file_upload_single', upload.single('image'), function (req, res, next) {
  console.log(req.file);  // 上传的文件信息 注意是req.file不是files
  var response = {};
  res.send(req.file);
})
// 多文件上传(1:设置一个input的multiple属性;2:多个同name的input)
router.post('/file_upload_multiple', upload.array('images', 3), function (req, res, next) {
  var response = req.files;// 使用的是req.files
  console.log(response, 99);
  res.send(JSON.stringify(response));
})
// 混合上传
var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
//一个表单中 name为avatar的input做多可以为1个  name为gallery的input做多可以为8个
router.post('/file_upload_mixed', cpUpload, function (req, res, next) {
  var response = req.files;// 使用的是req.files
  console.log(response, 100);
  res.send(JSON.stringify(response));
})






module.exports = router;