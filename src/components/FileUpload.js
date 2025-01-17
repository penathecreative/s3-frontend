import React, { useState, useEffect } from "react";
import "./FileUpload.css";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const S3_BASE_URL =
    "http://my-lambda-bucket-cf.s3-website.eu-central-1.amazonaws.com/";
  const API_BASE_URL =
    "http://MyCoolLoadBalancer-511038641.eu-central-1.elb.amazonaws.com";

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/files`);
      if (!response.ok) {
        throw new Error("Failed to fetch files.");
      }
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      setMessage("Error fetching files.");
      console.error("Error fetching files:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      setMessage("File uploaded successfully!");
      setFile(null); // Reset file input
      fetchFiles(); // Refresh file list
    } catch (error) {
      setMessage("Error uploading file.");
      console.error("Error uploading file:", error);
    }
  };

  // Separate files into groups
  const originalImages = files.filter((file) =>
    file.Key.startsWith("original-images/")
  );
  const resizedImages = files.filter((file) =>
    file.Key.startsWith("resized-images/")
  );
  const otherFiles = files.filter(
    (file) =>
      !file.Key.startsWith("original-images/") &&
      !file.Key.startsWith("resized-images/")
  );

  return (
    <div className="container">
      <h1 className="title">S3 File Manager</h1>

      {message && <div className="message">{message}</div>}

      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button
          className="upload-button"
          onClick={handleUpload}
        >
          Upload File
        </button>
      </div>

      <div className="files-section">
        <h2 className="subtitle">Original Images:</h2>
        <ul className="files-list">
          {originalImages.map((file) => (
            <li
              key={file.Key}
              className="file-item"
            >
              <div>
                <img
                  src={`${S3_BASE_URL}${file.Key}`}
                  alt={file.Key}
                  className="file-image"
                />
                <span className="file-info">
                  {file.Key.replace("original-images/", "")} -{" "}
                  {(file.Size / 1024).toFixed(2)} KB
                </span>
              </div>
              <button
                className="download-button"
                onClick={() =>
                  window.open(`${S3_BASE_URL}${file.Key}`, "_blank")
                }
              >
                Download
              </button>
            </li>
          ))}
        </ul>

        <h2 className="subtitle">Resized Images:</h2>
        <ul className="files-list">
          {resizedImages.map((file) => (
            <li
              key={file.Key}
              className="file-item"
            >
              <div>
                <img
                  src={`${S3_BASE_URL}${file.Key}`}
                  alt={file.Key}
                  className="file-image"
                />
                <span className="file-info">
                  {file.Key.replace("resized-images/", "")} -{" "}
                  {(file.Size / 1024).toFixed(2)} KB
                </span>
              </div>
              <button
                className="download-button"
                onClick={() =>
                  window.open(`${S3_BASE_URL}${file.Key}`, "_blank")
                }
              >
                Download
              </button>
            </li>
          ))}
        </ul>

        <h2 className="subtitle">Other Files:</h2>
        <ul className="files-list">
          {otherFiles.map((file) => (
            <li
              key={file.Key}
              className="file-item"
            >
              <div>
                <span className="file-info">
                  {file.Key} - {(file.Size / 1024).toFixed(2)} KB
                </span>
              </div>
              <button
                className="download-button"
                onClick={() =>
                  window.open(`${S3_BASE_URL}${file.Key}`, "_blank")
                }
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
