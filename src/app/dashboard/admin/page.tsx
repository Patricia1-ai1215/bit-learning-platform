export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        System overview and management tools.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary-600">248</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-2">Active Courses</h3>
          <p className="text-3xl font-bold text-primary-600">12</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-2">Lecturers</h3>
          <p className="text-3xl font-bold text-primary-600">8</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-2">Students</h3>
          <p className="text-3xl font-bold text-primary-600">240</p>
        </div>
      </div>
    </div>
  )
}
