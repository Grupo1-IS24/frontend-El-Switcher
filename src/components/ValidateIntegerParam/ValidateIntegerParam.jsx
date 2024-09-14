import { Navigate, useParams } from 'react-router-dom';

/**
 * Component that validates a URL parameter as a non-negative integer.
 * If the parameter is invalid, it redirects to a "Not Found" page.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components to render if the parameter is valid.
 * @param {string} props.paramName - The name of the URL parameter to validate.
 *
 * @returns {ReactNode} - The children components if the parameter is valid, or a <Navigate /> to the Not Found page if invalid.
 */
const ValidateIntegerParam = ({ children, paramName }) => {
  const paramString = useParams()[paramName];

  const integerParam = parseInt(paramString, 10);
  const isValidParam = !isNaN(integerParam) && integerParam >= 0;

  if (!isValidParam) return <Navigate to="/*" />;

  return children;
};

export default ValidateIntegerParam;
