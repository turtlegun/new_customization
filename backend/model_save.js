const fs = require('fs');

// Asynchronously read the file
fs.readFile("./models/model1.gltf", 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading GLTF file:', err);
    return;
  }

  // Data is available here inside the callback function
  console.log(data);

  const gltfObject = JSON.parse(data);

  try {
    // Write the string to a file with a .gltf extension
    fs.writeFileSync('model7.gltf', JSON.stringify(gltfObject, null, 2), 'utf8');
    console.log('GLTF file saved successfully.');
  } catch (err) {
    console.error('Error saving GLTF file:', err);
  }
});

console.log("hello");
