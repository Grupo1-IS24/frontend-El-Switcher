import useRouteNavigation from '../hooks/useRouteNavigation';

const NotFoundPage = () => {
  const { redirectToHomePage } = useRouteNavigation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        La página solicitada no existe.
      </p>
      <button
        onClick={redirectToHomePage}
        className="px-4 py-2 bg-black text-white font-medium rounded border border-transparent hover:bg-gray-800"
      >
        Ir al inicio
      </button>
    </div>
  );
};

export default NotFoundPage;
