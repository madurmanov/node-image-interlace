const fs = require('fs');
const gm = require('gm');
const path = require('path');
const isProgressive = require('is-progressive');

const images = [];
const enabledExtenssions = ['png', 'jpg', 'jpeg'];

fs.readdirSync(path.resolve(__dirname, './images')).forEach(file => {
  const fileSplit = file.split('.');
  const fileName = fileSplit[0].toLowerCase();
  const fileExtenssion = fileSplit[1].toLowerCase();
  if (enabledExtenssions.includes(fileExtenssion)) {
    images.push({
      path: file,
      name: fileName,
      extenssion: fileExtenssion,
    });
  }
});

images.forEach(image => {
  var writePath = path.resolve(__dirname, `./images/${image.name}@progressive.jpg`);
  gm(path.resolve(__dirname, `./images/${image.path}`))
    .strip()
    .interlace('Line')
    .quality(100)
    .write(writePath, err => {
      if (err) throw Error(err);

      console.log(`Converted ${image.path}`);
      isProgressive.file(writePath)
        .then(progressive => console.log('Is progressive:', progressive));
    });
});
