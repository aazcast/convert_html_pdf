const GError = require('../handlers/error/gerror');
const wkhtmltopdf = require('wkhtmltopdf');
const streamToBuffer = require('stream-to-buffer')

let optionsFinal = {};
optionsFinal.pageSize = 'Letter';
optionsFinal.footerCenter = 'Página [sitepage] de [sitepages]';
optionsFinal.footerFontName = 'Helvetica';
optionsFinal.footerFontSize = 10;
optionsFinal.marginLeft = 0;
optionsFinal.marginRight = 0;
optionsFinal.marginTop = 15;

exports.createPdf = async (data) => {
  try {
    const pdf = await _generatePDF(data.html, optionsFinal);
    return pdf;
  } catch(err) {
    throw err;
  }
}

const _generatePDF = (html, options) => {
  return new Promise(function (resolve, reject) {
    //create pdf with wkhtmltopdf
    const data = wkhtmltopdf(html, options);
    streamToBuffer(data, async (err, buffer) => {
      const pdf64 = buffer.toString('base64');
      resolve(pdf64);
    });
  });
};