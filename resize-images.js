// resize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Define your source and destination directories
const sourceDir = path.join(__dirname, 'public', 'assets');
const outputDir = path.join(__dirname, 'public', 'resized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define the sizes you need
const sizes = [480];
const format = ['webp'];

fs.readdir(sourceDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const inputFile = path.join(sourceDir, file);
    const baseName = path.basename(file, path.extname(file));

    sizes.forEach((size) => {
      const outputFile = path.join(outputDir, `${baseName}-${size}.${format}`);

      sharp(inputFile)
        .resize(size)
        .toFile(outputFile)
        .then(() => {
          console.log(`Resized ${file} to ${size}px`);
        })
        .catch((err) => {
          console.error(`Error resizing ${file} to ${size}px: `, err);
        });
    });
  });
});
