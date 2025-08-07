import { FiLogOut, FiUser, FiCalendar, FiSettings, FiBell, FiHome } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <FiBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                <FiUser className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">User</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "dashboard" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              <FiHome className="inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "profile" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              <FiUser className="inline mr-2" />
              My Profile
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "calendar" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              <FiCalendar className="inline mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "settings" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              <FiSettings className="inline mr-2" />
              Settings
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Welcome Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg md:col-span-2">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                      <FiUser className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Welcome back!</h3>
                      <p className="mt-1 text-sm text-gray-500">Here's what's happening with your account today.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Your Activity</h3>
                  <div className="mt-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Tasks completed</span>
                      <span className="text-sm font-medium">12/15</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Upcoming events</span>
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">Messages</span>
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                        {item === 1 ? 'A' : item === 2 ? 'B' : 'C'}
                      </div>
                      <div>
                        <p className="font-medium">Activity {item}</p>
                        <p className="text-gray-500 text-sm">Details about this activity</p>
                        <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Content */}
        {activeTab === "profile" && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">My Profile</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="max-w-lg mx-auto">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      defaultValue="user@example.com"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      rows={3}
                      defaultValue="I'm a user of this awesome platform!"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {(activeTab === "calendar" || activeTab === "settings") && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">{activeTab}</h3>
            </div>
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500">This section is coming soon!</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default UserPage;