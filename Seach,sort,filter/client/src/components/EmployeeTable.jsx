// import React, { useEffect, useState } from "react";
// import { deleteEmployee, getEmployee } from "../service/employeeService";
// import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const EmployeeTable = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState("");
//   const [sortField, setSortField] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [employees, setEmployees] = useState([]);
//   const [page, setPage] = useState(1);
// const [limit, setLimit] = useState(5); // 5 items per page
// const [totalPages, setTotalPages] = useState(1);


//   const fetchData = async () => {
//     try {
//       const params = {
//         search: searchTerm,
//         role: filterRole,
//         sort: sortField,
//         order: sortOrder,
//         page,
//       limit,
//       };
//       const response = await getEmployee(params);
      
//         // 🛡 Protect against undefined
//     if (response && response.data && Array.isArray(response.data)) {
//       setEmployees(response.data);
//       setTotalPages(response.totalPages || 1); // fallback to 1
//     } else {
//       setEmployees([]);
//       setTotalPages(1);
//     } 
// }
// catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchTerm, filterRole, sortField, sortOrder,page, limit]);

//   const handleEdit = (emp) => {
//     navigate(`/employee/edit/${emp._id}`); // Navigate to edit form
//   };

//   const handleDelete = async (id) => {
//     try {
//       if (window.confirm("are you sure delete the person")) {
//         await deleteEmployee(id);
//         fetchData(); // Refresh after delete
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           {/* Table Header */}
//           <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Employee Directory
//             </h2>
//             <div className="text-sm text-gray-500">
//               Total: {employees.length} employees
//             </div>
//           </div>

//           {/* 🔍 Search, 🎯 Filter & ⬇️ Sort Controls */}
//           <div className="px-6 py-4 flex flex-col sm:flex-row gap-4 sm:items-center">
//             {/* 🔍 Search */}
//             <input
//               type="text"
//               placeholder="Search by name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full sm:w-64 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {/* 🎯 Filter by Role */}
//             <select
//               value={filterRole}
//               onChange={(e) => setFilterRole(e.target.value)}
//               className="w-full sm:w-48 px-4 py-2 border rounded-md"
//             >
//               <option value="">All Roles</option>
//               <option value="intern">Intern</option>
//               <option value="employee">Employee</option>
//               <option value="manager">Manager</option>
//               <option value="director">Director</option>
//             </select>

//             {/* ⬇️ Sort Field */}
//             <select
//               value={sortField}
//               onChange={(e) => setSortField(e.target.value)}
//               className="w-full sm:w-48 px-4 py-2 border rounded-md"
//             >
//               <option value="name">Sort by Name</option>
//               <option value="age">Sort by Age</option>
//               <option value="role">Sort by Role</option>
//             </select>

//             {/* ⬆️⬇️ Sort Order */}
//             <select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//               className="w-full sm:w-32 px-4 py-2 border rounded-md"
//             >
//               <option value="asc">Ascending</option>
//               <option value="desc">Descending</option>
//             </select>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     S.No
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Profile
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Age
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Role
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Skills
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Location
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {employees.map((emp, index) => (
//                   <tr
//                     key={emp._id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         {emp.profileImage ? (
//                           <img
//                             className="h-10 w-10 rounded-full object-cover"
//                             src={`http://localhost:7000${
//                               emp.profileImage.startsWith("/uploads")
//                                 ? emp.profileImage
//                                 : "/uploads/" +
//                                   emp.profileImage.split("\\").pop()
//                             }`}
//                             alt="Profile"
//                           />
//                         ) : (
//                           <FaUserCircle className="h-10 w-10 text-gray-400" />
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {emp.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {emp.age}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           emp.role === "manager"
//                             ? "bg-purple-100 text-purple-800"
//                             : emp.role === "director"
//                             ? "bg-blue-100 text-blue-800"
//                             : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {emp.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
//                       {emp.skills}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {emp.address}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex justify-end space-x-2">
//                         <button
//                           onClick={() => handleEdit(emp)}
//                           className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
//                           title="Edit"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(emp._id)}
//                           className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
//                           title="Delete"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
// <div className="px-6 py-4 flex justify-between items-center bg-gray-50 border-t">
//   <div className="text-sm text-gray-500">
//     Page {page} of {totalPages}
//   </div>
//   <div className="space-x-2">
//     <button
//       onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//       disabled={page === 1}
//       className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//     >
//       Previous
//     </button>
//     <button
//       onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//       disabled={page === totalPages}
//       className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//     >
//       Next
//     </button>
//   </div>
// </div>


//           {/* Table Footer */}
//           <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
//             Showing {employees.length} of {employees.length} records
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeTable;



import React, { useEffect, useState } from "react";
import { deleteEmployee, getEmployee } from "../service/employeeService";
import { FaEdit, FaTrash, FaUserCircle, FaSearch, FaSort, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const params = {
        search: searchTerm,
        role: filterRole,
        sort: sortField,
        order: sortOrder,
        page,
        limit,
      };
      const response = await getEmployee(params);
      
      if (response?.data && Array.isArray(response.data)) {
        setEmployees(response.data);
        setTotalPages(response.totalPages || 1);
      } else {
        setEmployees([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, filterRole, sortField, sortOrder, page, limit]);

  const handleEdit = (emp) => {
    navigate(`/employee/edit/${emp._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Employee Directory</h1>
                <p className="text-indigo-100 mt-1">Manage your team members</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button 
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md"
                >
                  + Add Employee
                </button>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="px-8 py-6 bg-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Role Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="">All Roles</option>
                  <option value="intern">Intern</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="director">Director</option>
                </select>
              </div>

              {/* Sort Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSort className="text-gray-400" />
                </div>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="name">Sort by Name</option>
                  <option value="age">Sort by Age</option>
                  <option value="role">Sort by Role</option>
                </select>
              </div>

              {/* Sort Order */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["#", "Profile", "Name", "Age", "Role", "Skills", "Location", "Actions"].map((header, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((emp, index) => (
                  <tr key={emp._id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1 + (page - 1) * limit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        {emp.profileImage ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                            src={`http://localhost:7000${
                              emp.profileImage.startsWith("/uploads")
                                ? emp.profileImage
                                : "/uploads/" + emp.profileImage.split("\\").pop()
                            }`}
                            alt="Profile"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FaUserCircle className="h-8 w-8 text-indigo-500" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {emp.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        emp.role === "manager" ? "bg-purple-100 text-purple-800" :
                        emp.role === "director" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {emp.skills}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {emp.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-start space-x-3">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
              <span className="font-medium">{Math.min(page * limit, employees.length)}</span> of{' '}
              <span className="font-medium">{employees.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-4 py-2 rounded-lg ${page === num ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;