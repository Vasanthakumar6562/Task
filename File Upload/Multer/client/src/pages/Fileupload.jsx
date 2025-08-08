import React, { useState, useRef } from "react";
import axios from "axios";

const skillsOptions = ["React", "Node.js", "MongoDB", "Express", "TailwindCSS", "JavaScript"];

const FileUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: [],
    profilePic: null
  });
  const [preview, setPreview] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null); // ref for file input

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePic: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const alreadySelected = prev.skills.includes(skill);
      return {
        ...prev,
        skills: alreadySelected
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("bio", formData.bio);
      data.append("profilePic", formData.profilePic);
      formData.skills.forEach((skill) => data.append("skills[]", skill));

      const res = await axios.post("http://localhost:7001/api/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Uploaded successfully:", res.data);
      alert("Profile uploaded successfully!");

      // Reset form after successful upload
      setFormData({
        name: "",
        email: "",
        bio: "",
        skills: [],
        profilePic: null,
      });
      setPreview(null);
      setDropdownOpen(false);

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading profile");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create Your Profile</h2>

        {/* Name */}
        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name} // controlled
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Email */}
        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email} // controlled
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Bio */}
        <label className="block text-gray-700 font-medium mb-2">Bio</label>
        <textarea
          name="bio"
          value={formData.bio} // controlled
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Tell us about yourself..."
        ></textarea>

        {/* Skills Dropdown */}
        <label className="block text-gray-700 font-medium mb-2">Skills</label>
        <div className="relative mb-4">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border rounded-lg px-4 py-2 flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-blue-400"
          >
            {formData.skills.length > 0
              ? formData.skills.join(", ")
              : "Select Skills"}
            <span className="ml-2">▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
              {skillsOptions.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    className="mr-2"
                  />
                  {skill}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          ref={fileInputRef} // ref for manual reset
          onChange={handleChange}
          className="mb-4"
        />

        {/* Image Preview */}
        {preview && (
          <div className="mb-4 flex justify-center">
            <img
              src={preview}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border object-cover shadow-md"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
