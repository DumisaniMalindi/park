import { useState, useRef } from "react";
import "../styles/UploadCard.css";

function UploadCard({ title, buttonText, onUpload }) {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [plate, setPlate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");

  const fileInputRef = useRef(null);

    const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
    setImageFile(file);

    setPlate("");
    setUploading(false);
    setProcessing(false);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
        });
    };



    const handleUpload = async () => {
        if (!imageFile) return;

        setUploading(true);

        try {
            const base64Image = await convertToBase64(imageFile);
            console.log("Image File:", imageFile);
            console.log("Base64 Length:", base64Image?.length);

            const response = await fetch(
            "https://z2c4g9t5s6.execute-api.us-west-1.amazonaws.com/parking",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                action: title,
                image: base64Image,
                fileName: imageFile.name,
                timestamp: new Date().toISOString(),
                }),
            }
        );

        const data = await response.json();

        console.log("AWS Response:", data);
        setUploadedFile(data.fileName);

        setUploading(false);
        setProcessing(true);

        setTimeout(() => {
            setProcessing(false);

            const detectedPlate = data.plate || "No plate detected";

            console.log("Detected Plate:", detectedPlate);
    

            setPlate(detectedPlate);

            onUpload(detectedPlate);

            setTimeout(() => {
                setImage(null);
                setImageFile(null);
                setPlate("");

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }, 3000);
            }, 2000);

        } catch (error) {
            console.error(error);
            alert("AWS connection failed");
            setUploading(false);
        }
    };

  return (
    <div className="upload-card">

      <h2>{title}</h2>

      <div className="upload-box">

        {image ? (
          <img
            src={image}
            alt="Vehicle"
            className="preview-image"
          />
        ) : (
          <p>📷 No image selected</p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

      </div>
        {uploadedFile && (
            <div className="plate-info">
                <p>
                📁 Uploaded:
                <strong>{uploadedFile}</strong>
                </p>
            </div>
        )}

      {uploading && (
        <div className="plate-info">
          <h3>☁ Uploading image...</h3>
        </div>
      )}

      {processing && (
        <div className="plate-info">
          <h3>🤖 Processing image...</h3>
          <p>Reading license plate...</p>
        </div>
      )}

      {plate && (
        <div className="plate-info">
          <h3>Detected Plate</h3>
          <h2>{plate}</h2>
          <p className="status">✅ Authorized</p>
        </div>
      )}

      <button
        disabled={!image || uploading || processing}
        onClick={handleUpload}
      >
        {uploading
          ? "Uploading..."
          : processing
          ? "Processing..."
          : buttonText}
      </button>

    </div>
  );
}

export default UploadCard;