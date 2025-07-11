# 🚀 S3 File Manager

A full-stack application to upload, store, and manage files in AWS S3 with real-time updates. Automatically categorizes and displays original images, resized images, and other files.


---



## 📁 Features

- 📤 Upload files directly to your S3 bucket
- 📸 Auto-preview of original and resized images
- 📂 Organized listing of file types
- 🔁 Real-time refresh after upload
- 🧰 Built with React (frontend) and Node.js + AWS SDK (backend)


---



## 🧪 Tech Stack

**Frontend:**
- React
- CSS Modules

**Backend:**
- Express.js
- AWS SDK (S3)
- Node.js
- CORS + Multer middleware

**Infrastructure:**
- AWS S3
- AWS Lambda 
- AWS Elastic Load Balancer



---



## 🚀 Getting Started

### 🔧 Backend Setup

1. Clone the backend repo:
   ```bash
   git clone https://github.com/your-username/s3-backend.git
   cd s3-backend
   npm install
   npm start
   ```


2. Add your environment variables to .env:
   ```bash
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=eu-central-1
S3_BUCKET=my-lambda-bucket-cf
```


---



## 💻 Frontend Setup
1.Clone the frontend repo:
```bash
git clone https://github.com/your-username/s3-frontend.git
cd s3-frontend
npm install
npm start
```

2.The frontend is configured to call the backend via:
```js
const API_BASE_URL = "http://MyCoolLoadBalancer-xxxxxxx.eu-central-1.elb.amazonaws.com";
```


---



## 🖼️ File Organization on S3

- original-images/ – unprocessed uploaded images
  
- resized-images/ – resized/optimized versions

- others/ – other file types (e.g. PDFs, videos)


