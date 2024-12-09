const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('../models/ImageModel'); 

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp
  },
});

const upload = multer({ storage });

// Route to upload images
router.post('/uploadImage', upload.array('file'), async (req, res) => {
  try {
    const images = req.files.map(file => ({
      filename: file.filename,
    }));

    await Image.insertMany(images); // Save image metadata to the database
    res.json({ message: 'Images uploaded successfully', images });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Error uploading images' });
  }
});

// Route to get images
router.get('/getImage', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send(error);
  }
});

// Route to delete an image
router.delete('/deleteImage/:imageName', async (req, res) => {
  const { imageName } = req.params;
  try {
    await Image.deleteOne({ filename: imageName }); // Remove from the database
    fs.unlink(path.join(__dirname, '../uploads', imageName), err => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Image deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).send(error);
  }
});

// Route to download a specific image
router.get('/download/:imageName', (req, res) => {
  const { imageName } = req.params;
  const file = path.join(__dirname, '../uploads', imageName);
  res.download(file); // Set disposition and send it to the client
});

// Route to download all images as a ZIP
router.get('/download-all-images', (req, res) => {
  const archiver = require('archiver');
  const archive = archiver('zip');
  res.attachment('images.zip');

  archive.on('error', err => {
    res.status(500).send({ error: err.message });
  });

  archive.pipe(res);
  archive.directory('uploads/', false); // Add the uploads directory to the archive
  archive.finalize();
});

module.exports = router;