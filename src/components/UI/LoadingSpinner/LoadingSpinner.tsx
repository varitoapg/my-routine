const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-75">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
  </div>
);

export default LoadingSpinner;
