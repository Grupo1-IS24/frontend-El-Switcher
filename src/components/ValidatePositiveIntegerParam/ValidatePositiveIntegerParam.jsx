import { Navigate, useParams } from 'react-router-dom';

/**
 * Component that validates a URL parameter as a positive integer.
 * If the parameter is invalid, it redirects to a "Not Found" page.
 *
 * NOTE: This component validates that the URL parameter is a positive integer.
 * After validation, the parameter will be accessible as a string in child components
 * via the useParams() hook, even though it was validated as an integer here.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components to render if the parameter is valid.
 * @param {string} props.paramName - The name of the URL parameter to validate.
 *
 * @returns {ReactNode} - The children components if the parameter is valid, or a <Navigate /> to the Not Found page if invalid.
 */
const ValidatePositiveIntegerParam = ({ children, paramName }) => {
  const paramString = useParams()[paramName];

  const parsedInteger = parseInt(paramString, 10);
  const isValidInteger = !isNaN(parsedInteger) && parsedInteger >= 0;

  if (!isValidInteger) return <Navigate to="/*" />;

  return children;
};

export default ValidatePositiveIntegerParam;
