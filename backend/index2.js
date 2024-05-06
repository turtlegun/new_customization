const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Handle file upload
app.post('/upload', upload.single('model'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const formData = req.body;
  const filePath = req.file.path;
  const originalName = req.file.originalname;

console.log(originalName)

  // Move the uploaded file to a permanent location
  const newFilePath = path.join(__dirname, 'models', originalName);
  fs.renameSync(filePath, newFilePath);

  res.send('File uploaded successfully.');
});



/* 

// Route to download the uploaded model
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'models', filename);

  // Set headers for file download
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/octet-stream');

  // Stream the file as the response to the client
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});
*/




app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
