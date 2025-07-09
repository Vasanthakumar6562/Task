// import React, { useEffect, useState } from "react";
// import { createEmployee, getSingleEmployee, updateEmployee} from "../service/employeeService";
// import {useNavigate} from 'react-router-dom'
// import { useParams } from 'react-router-dom';

// const EmployeeForm = () => {
//     const navigate = useNavigate()
//     const { id } = useParams(); // Get id from route if editing

//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     role: "",
//     skills: "",
//     address: "",
//     profileImage: null,
//   });
//   const [getEmployee,setGetEmployee] = useState([])
//   const [previewImage, setPreviewImage] = useState(null);

//  const handleChange = (e) => {
//   const { name, value, files } = e.target;

//   if (name === "profileImage") {
//     const file = files[0];

//     if (file) {
//       setFormData((prev) => ({ ...prev, profileImage: file }));

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result); // <- this updates preview immediately
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData((prev) => ({ ...prev, profileImage: null }));
//       setPreviewImage(null);
//     }
//   } else {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }
// };


//   const handleReset = () => {
//     setFormData({
//       name: "",
//       age: "",
//       role: "",
//       skills: "",
//       address: "",
//       profileImage: null,
//     });
//     setPreviewImage(null);
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();



//   const data = new FormData();
//   data.append("name", formData.name);
//   data.append("age", formData.age);
//   data.append("role", formData.role);
//   data.append("skills", formData.skills);
//   data.append("address", formData.address);
//   if (formData.profileImage) data.append("profileImage", formData.profileImage);

//   try {
//     if (id) {
//       await updateEmployee(id, data);
//       alert("Employee updated successfully!");
//     } else {
//       await createEmployee(data);
//       alert("Employee added successfully!");
//     }
//     handleReset();
//     navigate("/employee");
//   } catch (error) {
//     console.error(error);
//     alert("Error submitting form");
//   }
// };


//   useEffect(() => {
//   if (id) {
//     const fetchEmployee = async () => {
//       try {
//         const data = await getSingleEmployee(id);
//         setFormData({
//           name: data.name,
//           age: data.age,
//           role: data.role,
//           skills: data.skills,
//           address: data.address,
//           profileImage: null, // don't preload file input
//         });

//         // Set preview image
//         if (data.profileImage) {
//           const imagePath = data.profileImage.startsWith("/uploads")
//             ? `http://localhost:7000${data.profileImage}`
//             : `http://localhost:7000/uploads/${data.profileImage.split("\\").pop()}`;
//           setPreviewImage(imagePath);
//         }
//       } catch (error) {
//         console.log("Edit fetch error:", error);
//       }
//     };

//     fetchEmployee();
//   }
// }, [id]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//            {id ? "Edit Employee" : "Employee Registration"}
//           </h1>
//           <p className="text-gray-600">
//             Fill in the details to add a new team member
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <form onSubmit={handleSubmit} className="p-6 sm:p-8">
//             <div className="space-y-8">
//               {/* Personal Info Section */}
//               <div>
//                 <h2 className="text-lg font-medium text-gray-900 border-b pb-3 mb-6">
//                   Personal Information
//                 </h2>
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                   {/* Name */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       placeholder="John Doe"
//                     />
//                   </div>

//                   {/* Age */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age *
//                     </label>
//                     <input
//                       type="number"
//                       name="age"
//                       value={formData.age}
//                       onChange={handleChange}
//                       required
//                       min="18"
//                       max="65"
//                       className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       placeholder="28"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Professional Info Section */}
//               <div>
//                 <h2 className="text-lg font-medium text-gray-900 border-b pb-3 mb-6">
//                   Professional Information
//                 </h2>
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                   {/* Role */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Role *
//                     </label>
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       required
//                       className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                     >
//                       <option value="">Select a role</option>
//                       <option value="intern">Intern</option>
//                       <option value="employee">Employee</option>
//                       <option value="manager">Manager</option>
//                       <option value="director">Director</option>
//                     </select>
//                   </div>

//                   {/* Skills */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Skills *
//                     </label>
//                     <input
//                       type="text"
//                       name="skills"
//                       value={formData.skills}
//                       onChange={handleChange}
//                       required
//                       className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       placeholder="React, Node.js, Design"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Info Section */}
//               <div>
//                 <h2 className="text-lg font-medium text-gray-900 border-b pb-3 mb-6">
//                   Contact Information
//                 </h2>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Address *
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                     placeholder="123 Main St, City, Country"
//                   />
//                 </div>
//               </div>

//               {/* Profile Image Section */}
//               <div>
//                 <h2 className="text-lg font-medium text-gray-900 border-b pb-3 mb-6">
//                   Profile Photo
//                 </h2>
//                 <div className="flex flex-col sm:flex-row gap-6 items-start">
//                   {/* Upload Area */}
//                   <label className="flex flex-col items-center justify-center w-full sm:w-48 h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors overflow-hidden bg-gray-50">
//                     {previewImage ? (
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="text-center p-4">
//                         <div className="text-4xl mb-2 text-gray-400">+</div>
//                         <p className="text-sm text-gray-600">Upload photo</p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           PNG, JPG up to 2MB
//                         </p>
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       name="profileImage"
//                       onChange={handleChange}
//                       accept="image/*"
//                     //   required
//                       className="hidden"
//                     />
//                   </label>

//                   {/* Instructions */}
//                   <div className="flex-1 bg-blue-50 p-4 rounded-lg">
//                     <h3 className="text-sm font-medium text-gray-900 mb-2">
//                       Photo Requirements
//                     </h3>
//                     <ul className="text-sm text-gray-700 space-y-2">
//                       <li className="flex items-start">
//                         <span className="inline-block w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-2 text-center font-bold">
//                           ✓
//                         </span>
//                         <span>High quality image</span>
//                       </li>
//                       <li className="flex items-start">
//                         <span className="inline-block w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-2 text-center font-bold">
//                           ✓
//                         </span>
//                         <span>Face clearly visible</span>
//                       </li>
//                       <li className="flex items-start">
//                         <span className="inline-block w-5 h-5 bg-blue-100 text-blue-800 rounded-full mr-2 text-center font-bold">
//                           ✓
//                         </span>
//                         <span>Neutral background preferred</span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-8">
//                 <button
//                   type="button"
//                   onClick={handleReset}
//                   className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
//                 >
//                   Clear Form
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
//                 >
//                  {id ? "Update Employee" : "Add Employee"}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeForm;



import React, { useEffect, useState } from "react";
import { createEmployee, getSingleEmployee, updateEmployee } from "../service/employeeService";
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    role: "",
    skills: "",
    address: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      const file = files[0];
      if (file) {
        setFormData(prev => ({ ...prev, profileImage: file }));
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      } else {
        setFormData(prev => ({ ...prev, profileImage: null }));
        setPreviewImage(null);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      age: "",
      role: "",
      skills: "",
      address: "",
      profileImage: null,
    });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      if (id) {
        await updateEmployee(id, data);
      } else {
        await createEmployee(data);
      }
      navigate("/employee");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const data = await getSingleEmployee(id);
          setFormData({
            name: data.name,
            age: data.age,
            role: data.role,
            skills: data.skills,
            address: data.address,
            profileImage: null,
          });
          if (data.profileImage) {
            const imagePath = data.profileImage.startsWith("/uploads")
              ? `http://localhost:7000${data.profileImage}`
              : `http://localhost:7000/uploads/${data.profileImage.split("\\").pop()}`;
            setPreviewImage(imagePath);
          }
        } catch (error) {
          console.error("Edit fetch error:", error);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-t shadow-xl overflow-hidden ">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-8 py-8">
            <h1 className="text-center text-white text-3xl font-bold">
              {id ? "Update Employee Details" : "Register New Employee"}
            </h1>
            <p className="text-indigo-100 mt-3 text-center">
              {id ? "Edit the employee information" : "Fill in the details to add a new team member"}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-lg overflow-hidden ">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pl-10"
                        placeholder="John Doe"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">👤</span>
                      </div>
                    </div>
                  </div>

                  {/* Age Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="18"
                        max="65"
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pl-10"
                        placeholder="28"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">🎂</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
                  Professional Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none pl-10"
                      >
                        <option value="">Select a role</option>
                        <option value="intern">Intern</option>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="director">Director</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">💼</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Skills <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pl-10"
                        placeholder="React, Node.js, Design"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">🛠️</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
                  Contact Information
                </h2>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pl-10"
                      placeholder="123 Main St, City, Country"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">🏠</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Photo Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
                  Profile Photo
                </h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Upload Area */}
                  <div className="flex-1">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors overflow-hidden bg-gray-50">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-6">
                          <div className="text-5xl mb-4 text-gray-400">📷</div>
                          <p className="text-sm font-medium text-gray-600">Click to upload photo</p>
                          <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                        </div>
                      )}
                      <input
                        type="file"
                        name="profileImage"
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Requirements */}
                  <div className="flex-1 bg-indigo-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Photo Guidelines</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-indigo-100 text-indigo-800 rounded-full mr-3 text-center font-bold">1</span>
                        <span className="text-gray-700">High resolution image (min 500x500px)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-indigo-100 text-indigo-800 rounded-full mr-3 text-center font-bold">2</span>
                        <span className="text-gray-700">Face clearly visible with neutral expression</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-indigo-100 text-indigo-800 rounded-full mr-3 text-center font-bold">3</span>
                        <span className="text-gray-700">Plain background preferred</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-indigo-100 text-indigo-800 rounded-full mr-3 text-center font-bold">4</span>
                        <span className="text-gray-700">No filters or heavy editing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-8">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg w-full sm:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                      Processing...
                    </span>
                  ) : id ? (
                    "Update Employee"
                  ) : (
                    "Register Employee"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
