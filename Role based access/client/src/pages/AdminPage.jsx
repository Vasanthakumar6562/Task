import { FiLogOut, FiUsers, FiSettings, FiBarChart2, FiFileText, FiHome } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>
        <div className="flex flex-col flex-grow p-4 overflow-auto">
          <nav className="flex-1 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left transition-colors ${activeTab === "dashboard" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <FiHome className="mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left transition-colors ${activeTab === "users" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <FiUsers className="mr-3" />
              User Management
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left transition-colors ${activeTab === "reports" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <FiBarChart2 className="mr-3" />
              Reports
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left transition-colors ${activeTab === "content" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <FiFileText className="mr-3" />
              Content
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center px-4 py-3 rounded-lg w-full text-left transition-colors ${activeTab === "settings" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <FiSettings className="mr-3" />
              Settings
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Admin</h1>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <FiLogOut />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activeTab.replace("-", " ")}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <span className="sr-only">Notifications</span>
                  <div className="h-6 w-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    3
                  </div>
                </button>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats cards */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                <p className="text-3xl font-bold mt-2">1,254</p>
                <p className="text-green-500 text-sm mt-1">+12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Active Sessions</h3>
                <p className="text-3xl font-bold mt-2">342</p>
                <p className="text-red-500 text-sm mt-1">-3% from yesterday</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
                <p className="text-3xl font-bold mt-2">$8,420</p>
                <p className="text-green-500 text-sm mt-1">+24% from last month</p>
              </div>

              {/* Recent activity */}
              <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                        <FiUsers />
                      </div>
                      <div>
                        <p className="font-medium">New user registered</p>
                        <p className="text-gray-500 text-sm">John Doe created an account</p>
                        <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">User Management</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((user) => (
                      <tr key={user}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                              {user === 1 ? 'A' : user === 2 ? 'B' : user === 3 ? 'C' : 'U'}
                            </div>
                            <div>
                              <div className="font-medium">User {user}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">user{user}@example.com</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${user === 1 ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
                            {user === 1 ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other tabs would have similar content sections */}
          {activeTab !== "dashboard" && activeTab !== "users" && (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2 capitalize">{activeTab.replace("-", " ")}</h3>
              <p className="text-gray-500">This section is under development</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;