const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const faceAPI = require('face-api.js');
const connectDB = require('./config/db');
const User = require('./userModel'); // Assuming you have a User model defined
const {v4: uuidv4} = require('uuid')
const { Canvas, Image, ImageData } = require('canvas');
const fs = require('fs');


const app = express();
connectDB();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// API endpoint for user registration
app.post('/register', async (req, res) => {
  const { facialEncoding } = req.body;
  
  try {
    const userId = generateUserId(); // Generate unique user ID
    console.log(userId)
    // Save user data to MongoDB
    const user = new User({
      userId,
      facialEncoding
    });

    await user.save();
    console.log("user registered")
    res.json({ success: true, message: 'User registered successfully', userId });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error registering user' });
  }
});

// Function to generate unique user ID (replace with actual implementation)
function generateUserId() {
  // Implement logic to generate a unique user ID (e.g., UUID)
  return uuidv4(); // Replace with actual ID
}



app.post('/login', async (req, res) => {
  const { faceImageData } = req.body;
  
  try {
    // Convert base64 image data to Buffer
    const imageBuffer = Buffer.from(faceImageData, 'base64');
    
    // Create a new Image object
    const img = new Image();
    
    // Listen for the 'load' event before proceeding
    img.onload = async () => {
      try {
        
        // Create a canvas and draw the image on it
        const canvas = new Canvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Convert canvas to HTML element
        const faceImageElement = canvas;
       
        // Retrieve all users from the database
        const users = await User.find({}, 'facialEncoding');
        

        if (!users || users.length === 0) {
          return res.status(404).json({ message: 'No users found' });
        }

        
        // Process image data using face-api.js for face detection and recognition
        const detections = await faceAPI.detectAllFaces(faceImageElement);
        
        if (detections.length === 0) {
          return res.json({ message: 'No face detected' });
        }

        
        // Compute facial encoding of the detected face
        const detectedEncoding = await faceAPI.computeFaceDescriptor(detections[0].descriptor);


        // Set a threshold for recognizing faces (adjust based on accuracy needs)
        const recognitionThreshold = 0.6;

        // Iterate through each user's facial encoding and compare with the detected encoding
        for (const user of users) {
          const cachedEncoding = user.facialEncoding;

          // Calculate distance between encodings using face-api.js
          const distance = faceAPI.euclideanDistance(detectedEncoding, cachedEncoding);

          if (distance < recognitionThreshold) {
            return res.json({ message: `Login successful: Welcome ${user.userId}` });
          }
        }

        return res.json({ message: 'Face not recognized' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    };

    // Set the image source after attaching the 'load' event listener
    img.src = imageBuffer;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => console.log(`Server listening on port ${port}`));
