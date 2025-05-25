import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CompleteDataContext } from "../context/completeData";
import { supabase } from "../utils/config";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  event: yup.string().required("Event name is required"),
  location: yup.string().required("Location is required"),
  category: yup
    .string()
    .oneOf(["Family", "Education", "Wedding", "Party"], "Select a valid category")
    .required("Category is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "Image size too large (max 2MB)", value => {
      return value && value[0] && value[0].size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", value => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
      );
    }),
});

export default function NEWLOAN() {
  const [savedData, setSavedData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isReview, setIsReview] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ loading state
  const { sessiondata } = useContext(CompleteDataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchImage]);

  const onSubmit = (data) => {
    const imageFile = data.image[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSavedData({ ...data, imagePreview: reader.result });
      setIsReview(true);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleEdit = () => {
    setIsReview(false);
  };

  const handleFinalSubmit = async () => {
    if (!savedData || !savedData.image) {
      toast.error("Missing form data or image");
      return;
    }

    setLoading(true); // ✅ start loading
    const imageFile = savedData.image[0];
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `event-images/${fileName}`;

    try {
      // Upload to Supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        toast.error("Image upload failed");
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      const imageUrl = publicURLData?.publicUrl;

      if (!imageUrl) {
        toast.error("Could not retrieve image URL");
        return;
      }

      const { error: insertError } = await supabase.from("EVENTS").insert({
        NAME: savedData.name,
        EMAIL: savedData.email,
        LOCATION: savedData.location,
        CATEGORY: savedData.category,
        IMAGE: imageUrl,
        USERID: sessiondata?.user?.id,
        STATUS: "pending",
      });

      if (insertError) {
        console.error("Insert error:", insertError);
        toast.error("Failed to save data");
        return;
      }

      toast.success("Event submitted successfully!");
      setIsReview(false);
      setSavedData(null);
      setImagePreview(null);
      reset(); // ✅ refresh the form
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false); // ✅ end loading
    }
  };

  if (isReview && savedData) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Review Your Submission</h2>
        {[
          ["Name", savedData.name],
          ["Email", savedData.email],
          ["Event", savedData.event],
          ["Location", savedData.location],
          ["Category", savedData.category],
        ].map(([label, value]) => (
          <div key={label} style={styles.reviewItem}>
            <strong>{label}:</strong> {value}
          </div>
        ))}

        <div style={styles.reviewItem}>
          <strong>Image Preview:</strong>
          <div>
            <img
              src={savedData.imagePreview}
              alt="Preview"
              style={{ maxWidth: "300px", borderRadius: "8px", marginTop: "0.5rem" }}
            />
          </div>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <button onClick={handleEdit} style={styles.editBtn}>
            Edit
          </button>
          <button
            onClick={handleFinalSubmit}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Confirm & Submit"}
          </button>
        </div>

        <ToastContainer position="top-center" />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Event Registration Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Event", name: "event", type: "text" },
          { label: "Location", name: "location", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name} style={{ marginBottom: "1rem" }}>
            <label style={styles.label}>{label}</label>
            <input type={type} {...register(name)} style={styles.input} />
            <p style={styles.error}>{errors[name]?.message}</p>
          </div>
        ))}

        <div style={{ marginBottom: "1rem" }}>
          <label style={styles.label}>Category</label>
          <select
            {...register("category")}
            defaultValue=""
            style={{ ...styles.input, backgroundColor: "#f0f8ff" }}
          >
            <option value="" disabled>Select category</option>
            <option value="Family">Family</option>
            <option value="Education">Education</option>
            <option value="Wedding">Wedding</option>
            <option value="Party">Party</option>
          </select>
          <p style={styles.error}>{errors.category?.message}</p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={styles.label}>Upload Image</label>
          <div style={styles.fileUploadWrapper}>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              id="image-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload" style={styles.uploadLabel}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "150px", borderRadius: "8px" }}
                />
              ) : (
                <div style={styles.uploadPlaceholder}>
                  Click or drag image here to upload
                </div>
              )}
            </label>
          </div>
          <p style={styles.error}>{errors.image?.message}</p>
        </div>

        <button type="submit" style={styles.submitBtn}>
          Submit
        </button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    margin: "2rem auto",
    padding: "2rem",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 255, 0.1)",
    fontFamily: "Segoe UI, sans-serif",
    maxWidth: "500px",
  },
  title: {
    color: "#003366",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  label: {
    color: "#003366",
    fontWeight: "bold",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.25rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
    marginTop: "0.25rem",
  },
  submitBtn: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#003366",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  editBtn: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#999",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  reviewItem: {
    marginBottom: "1rem",
    fontSize: "1.1rem",
    color: "#003366",
  },
  fileUploadWrapper: {
    border: "2px dashed #003366",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
  },
  uploadLabel: {
    cursor: "pointer",
    display: "inline-block",
    width: "100%",
  },
  uploadPlaceholder: {
    color: "#003366",
    fontWeight: "bold",
    fontSize: "1rem",
  },
};
