# 🚀 S3 File Manager

A React-based file management system that interfaces with AWS S3 for storing and managing files. This component provides functionality to upload files, view them in categorized lists, and download them directly from S3.

## Features

- File upload to AWS S3
- Automatic file categorization (Original Images, Resized Images, Other Files)
- File preview for images
- Direct file download functionality
- File size display
- Real-time file list updates

## Prerequisites

- React.js (16.8+ for Hooks support)
- AWS S3 bucket configured with appropriate permissions
- API endpoint for file management

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Configuration

Update the following constants in `FileUpload.js` with your AWS S3 and API endpoints:

```javascript
const S3_BASE_URL = "YOUR_S3_BUCKET_URL";
const API_BASE_URL = "YOUR_API_ENDPOINT";
```

## Component Structure

The component consists of:

- File upload section with file input and upload button
- Three categorized file lists:
  - Original Images
  - Resized Images
  - Other Files
- Status message display for user feedback

## API Endpoints Required

The component expects the following API endpoints:

- `GET /api/files` - Retrieves list of files from S3
- `POST /api/upload` - Handles file upload to S3

## Usage

```javascript
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div>
      <FileUpload />
    </div>
  );
}
```

## File Object Structure

Files are expected to have the following structure:

```javascript
{
  Key: string,    // File path in S3
  Size: number    // File size in bytes
}
```

## Styling

The component uses a separate CSS file (`FileUpload.css`) for styling. Ensure this file is imported and contains the necessary styles for:

- `.container`
- `.title`
- `.message`
- `.upload-section`
- `.files-section`
- `.subtitle`
- `.files-list`
- `.file-item`
- `.file-image`
- `.file-info`
- `.upload-button`
- `.download-button`

## Error Handling

The component includes error handling for:

- Failed file uploads
- Failed file list fetching
- Missing file selection

## Security Considerations

- Ensure proper CORS configuration on your S3 bucket
- Implement appropriate authentication for API endpoints
- Validate file types and sizes before upload
- Use signed URLs for secure file access
