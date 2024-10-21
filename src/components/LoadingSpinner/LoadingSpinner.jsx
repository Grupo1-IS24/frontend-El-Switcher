const LoadingSpinner = () => (
  <div
    className='fixed inset-0 flex justify-center items-center'
    data-testid='loading-spinner'
  >
    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200'></div>
  </div>
);

export default LoadingSpinner;
