let util = {
  // 格式化时间
  formatTime({ date = new Date(), Yseparator = '-', Tseparator = ':', formatter = 'yy-mm-dd hh:mm:ss', addZero = true } = {}) {

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    formatter = formatter.toLocaleLowerCase();
    var Yarr = [], Tarr = [];
    switch (formatter) {
      case 'yy-mm':
        Yarr = [year, month];
        break;
      case 'yy-mm-dd':
        Yarr = [year, month, day];
        break;
      case 'yy-mm-dd hh':
        Yarr = [year, month, day];
        Tarr = [hour];
        break;
      case 'yy-mm-dd hh:mm':
        Yarr = [year, month, day];
        Tarr = [hour, minute];
        break;
      default:
        Yarr = [year, month, day];
        Tarr = [hour, minute, second];
    }
    let t;
    if (Tarr.length == 0) {
      t = '';
    } else if (addZero) {
      t = ' ' + Tarr.map(this.formatNumber).join(Tseparator);
    } else {
      t = ' ' + Tarr.join(Tseparator);
    }
    return addZero ? Yarr.map(this.formatNumber).join(Yseparator) : Yarr.join(Yseparator) + t;
  },
  //
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
}
module.exports = util;
