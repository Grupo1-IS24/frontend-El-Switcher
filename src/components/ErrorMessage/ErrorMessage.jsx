const ErrorMessage = ({ error }) => (
  <div className='flex justify-center items-center h-screen'>
    <div className='bg-red-500 text-white p-5 rounded-lg shadow-lg animate-bounce'>
      Error al cargar las partidas: {error.message}
    </div>
  </div>
);

export default ErrorMessage;
