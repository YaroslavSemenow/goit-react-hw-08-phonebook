import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

export default function PublicRoute({ children, restricted = false }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;

  return <>{shouldRedirect ? <Navigate to="/contacts" /> : children}</>;
}
