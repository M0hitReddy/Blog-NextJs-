"use client";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;

    // Convert file to base64 string for upload
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64String = reader.result;

      setLoading(true);

      // Send the file to the server-side upload API
      const response = await axios.post<ApiResponse<string>>(
        "http://localhost:3000/api/upload",
        JSON.stringify({ file: base64String })
      );

      const data = response.data;
      console.log(data);
      if (data.url) {
        setImageUrl(data.url); // Set the URL for displaying the image
      } else {
        setImageUrl(null); // Handle the case where URL is undefined
      }
      setLoading(false);
    };
  };

  return (
    <div>
      <h1>Upload an image to Cloudinary</h1>
      <input type="file" onChange={handleFileUpload} />
      {loading && <p>Uploading...</p>}

      {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={imageUrl} alt="Uploaded" width="500" height="500" />
        </div>
      )}
    </div>
  );
}
