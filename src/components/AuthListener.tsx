// src/components/AuthListener.tsx
import { useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../store/userStore.ts';
import { useNavigate } from 'react-router-dom';

const AuthListener = () => {

  const { addUser, removeUser, setLoading } = useUserStore();

const navigate = useNavigate();
  
useEffect(() => {

    const checkAuthState = async () => {
     
      console.log('Checking authentication state...');
      setLoading(true);
      
      try {
        // Check if user has valid JWT cookie
        const response = await axios.get(
          'http://localhost:3000/api/auth/profile',
          { withCredentials: true }
        );
        
        console.log('User is authenticated:', response.data);
        
        addUser(response.data.user);
        navigate("/browse")
        
      } catch (error) {
        console.log('User is not authenticated');
                removeUser();
        
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
    
  }, [addUser, removeUser, setLoading]);

  // This component doesn't render anything, it just handles auth state
  return null;
};

export default AuthListener;

/*
 RUNS ON APP LOAD:
   - Checks if user has valid JWT cookie
   - If valid → addUser() to store
   - If invalid → removeUser() from store
   */