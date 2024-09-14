import { Navigate, useParams } from 'react-router-dom';

const ValidateIntegerParam = ({ children, paramName }) => {
  const paramString = useParams()[paramName];

  const integerParam = parseInt(paramString, 10);
  const isValidParam = !isNaN(integerParam) && integerParam >= 0;

  if (!isValidParam) return <Navigate to="/*" />;

  return children;
};

export default ValidateIntegerParam;
