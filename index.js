const spritezero = require('@mapbox/spritezero');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const dirOut = path.resolve(__dirname, '/dist');
const dirIn = path.resolve(__dirname,'/svg/*.svg');

const svgs = glob.sync(dirIn).map((f) => {
  return {
    svg: fs.readFileSync(f),
    id: path.basename(f).replace('.svg', ''),
    name: path.basename(f)
  };
});


[1,2,4].forEach((pxRatio) => {
  const rbase = pxRatio === 1;
  const pngPath = path.join(
    dirOut,
    rbase ? `sprite.png` : `sprite@${pxRatio}x.png`
  );
  const jsonPath = path.join(
    dirOut,
    rbase ? `sprite.json` : `sprite@${pxRatio}x.json`
  );

  spritezero.generateLayout(
    {imgs: svgs, pixelRatio: pxRatio, format: true},
    (err, dataLayout) => {
      if (err) {
        return;
      }
      for (var i in dataLayout) {
        /**
        * Hack ?
        */
        dataLayout[i].sdf = true;
      }
      fs.writeFileSync(jsonPath, JSON.stringify(dataLayout));
    }
  );

  spritezero.generateLayout(
    {imgs: svgs, pixelRatio: pxRatio, format: false},
    (err, imageLayout) => {
      spritezero.generateImage(imageLayout, (err, image) => {
        if (err) {
          return;
        }
        fs.writeFileSync(pngPath, image);
      });
    }
  );
});
