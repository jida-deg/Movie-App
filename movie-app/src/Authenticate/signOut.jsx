import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../components/AuthProvider';

function SignOut() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    // root path is redirected to /home by App so this lands on homepage
    navigate('/');
  }, []);

  return null;
}

export default SignOut;
