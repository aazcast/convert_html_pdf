exports.toBase64 = (data) => {
  return new Promise((resolve, reject) => {
    let buf = Buffer.from(data);
    let encodedData = buf.toString('base64');
    resolve(encodedData);
  })
}

exports.decodeBase64 = (data) => {
  return new Promise((resolve, reject) => {
    let buff = Buffer.from(data, 'base64');
    let text = buff.toString();
    resolve(text);
  })
}

exports.isArray = (array) => {
  return new Promise((resolve, reject) => {
    let result = false;
    if (Array.isArray(array) && array.length) {
      result = true;
    };
    resolve(result);
  })
}

exports.isNull = (value) => {
  return new Promise((resolve, reject) => {
   let result = typeof value === "object" && !value;
   resolve(result);
  })
}