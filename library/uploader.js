// 使用multer中间件创建上传实例

var multer = require('multer');
var fs = require('fs');
var util = require('./util');
// memoryStorage()内存存储模式 内存存储引擎会以Buffer的形式将文件保存在内存中。该方法没有任何参数。
// diskStorage()硬盘存储模式

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
  // destination用于设置文件的存储目录。
  // 若未提供该参数，将使用系统的临时目录。
  // 注意: 如果你提供的 destination 是一个函数，你需要负责创建文件夹。当提供一个字符串，multer 将确保这个文件夹是你创建的。
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, uploadFolder);
  },
  // filename用于设置文件名。若未提供该参数，将使用一个随机字符串，且文件名中不包含扩展名。我们可以用 filename 函数来定制对所接收文件的重命名功能。
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 2147483647_wz_.jpg
    cb(null, Date.now() + "_wz_" + file.originalname);
  }
});

// 创建文件夹
var createFolder = function (folder) {
  try {
    // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出错误"no such file or directory"
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);// 文件夹不存在，以同步的方式创建文件目录。
  }
};

// 以日期为文件夹名称 2018_09_06
var postfix = util.formatTime({ Yseparator: '_', formatter: 'yy-mm-dd' })
var uploadFolder = './assets/upload/' + postfix;
createFolder(uploadFolder);

// 创建 multer 实例
var upload = multer({ storage: storage });

// 导出模块（在 app.js 中引入）
module.exports = upload;
