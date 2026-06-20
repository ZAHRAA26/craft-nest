import { useSelector, useDispatch } from 'react-redux';
import { 
  selectUser, 
  selectIsAuthenticated, 
  selectIsAdmin, 
  logoutUser 
} from '../store/slices/authSlice';

/**
 * Custom hook to manage auth state easily in components
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  const logout = () => dispatch(logoutUser());

  return {
    user,
    isAuthenticated,
    isAdmin,
    logout,
  };
};
