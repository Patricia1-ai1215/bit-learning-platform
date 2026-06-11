export default function StudentDashboardPage() {
  const courses = [
    { id: "1", title: "Introduction to Programming", progress: 75 },
    { id: "2", title: "Web Development Basics", progress: 45 },
    { id: "3", title: "Database Fundamentals", progress: 20 },
  ]

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-400 dark:text-gray-500 mb-8 tracking-wider">
        MY COURSES
      </h1>
      
      <div className="space-y-6 max-w-2xl">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {course.title}
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-2xl font-semibold text-gray-600 dark:text-gray-400 min-w-[4rem] text-right">
                {course.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
