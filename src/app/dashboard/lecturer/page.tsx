export default function LecturerDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Lecturer Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Welcome back! Manage your courses and track student progress.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-2">Active Courses</h3>
          <p className="text-3xl font-bold text-primary-600">5</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-primary-600">142</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-2">Avg. Completion</h3>
          <p className="text-3xl font-bold text-primary-600">68%</p>
        </div>
      </div>
    </div>
  )
}
