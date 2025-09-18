



export default function Loader() {
  return (
 <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Loader */}
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Text */}
        <p className="text-lg font-semibold text-gray-700">
          Signing you in, please wait...
        </p>
      </div>
    </div>

  )}      