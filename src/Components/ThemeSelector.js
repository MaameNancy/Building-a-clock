import React, { useState, useEffect } from "react";

const ThemeSelector = ({ onChangeTheme }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");

  useEffect(() => {
    // Cleanup object URLs on component unmount
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleThemeChange = (event) => {
    onChangeTheme({ theme: event.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file.type.match(/^image\/(png|jpg|jpeg|gif)$/)) {
      alert("Only PNG, JPG, JPEG, and GIF images are allowed.");
      return;
    }

    const maxSizeMB = 5; // Increase the file size limit (e.g., 5MB)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setFileSizeError(`Image size should be less than ${maxSizeMB}MB.`);
      return;
    } else {
      setFileSizeError(""); // Clear any previous error message
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      onChangeTheme({ theme: "custom", image: e.target.result });
    };
    reader.onerror = () => {
      alert("Failed to read the file.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="theme-selector">
      <h2>Select Theme</h2>
      <div>
        <button
          value="light"
          onClick={handleThemeChange}
          aria-label="Select Light Theme"
        >
          Light
        </button>
        <button
          value="dark"
          onClick={handleThemeChange}
          aria-label="Select Dark Theme"
        >
          Dark
        </button>
      </div>
      <div>
        <label
          htmlFor="image-upload"
          aria-describedby="image-upload-description"
        >
          Upload Image
        </label>
        <input
          id="image-upload"
          type="file"
          onChange={handleImageUpload}
          aria-label="Upload Image"
        />
        <span id="image-upload-description">
          Upload a custom image for your clock theme. (PNG, JPG, JPEG, GIF,
          &lt;5MB)
        </span>
        {fileSizeError && <p style={{ color: "red" }}>{fileSizeError}</p>}
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              width="100"
              height="100"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSelector;
