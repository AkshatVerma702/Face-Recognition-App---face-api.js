# Face Recognition Authentication System

This project implements a facial recognition authentication system using a MERN stack (MongoDB, Express.js, React.js, Node.js) along with the face-api.js library for face detection and recognition.

## Features

- **User Registration**: Users can register by capturing their face image using the webcam. The facial encoding of the captured image is stored in the MongoDB database along with a unique user ID generated for each user.

- **User Login**: Registered users can log in by capturing their face image using the webcam. The system compares the facial encoding of the captured image with the stored facial encodings in the database to authenticate the user.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Face Detection and Recognition**: face-api.js
- **Other Libraries**: axios, body-parser, cors

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository_url>
Navigate to the project directory:

bash

cd FaceRecognitionAuthentication

Install dependencies for both the server and the client:

bash

cd server
npm install
cd ../client
npm install

Start the server:

bash

cd ../server
npm start

Start the client:

bash

    cd ../client
    npm start

    The application should now be running. Open your web browser and navigate to http://localhost:3000 to access the application.

## Usage

- To register as a new user, click on the "Switch to Register" button, then click on the "Start Video" button to capture your face image, and finally click on the "Register" button.
- To log in as an existing user, click on the "Switch to Login" button, then click on the "Start Video" button to capture your face image, and finally click on the "Login" button.


## Notes

  - This project is for demonstration purposes only and should not be used in production environments without proper security measures and testing.
  - The accuracy of the face recognition system may vary depending on factors such as lighting conditions and the quality of the captured images.
