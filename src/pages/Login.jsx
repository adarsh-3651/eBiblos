import React from 'react';
// Import the Login component from components directory
import { Login as loginComponent } from '../components';

function Login() {
  return (
    // Apply vertical padding to the container
    <div className='py-8'>
        {/* Render the Login component */}
        <loginComponent />
    </div>
  );
}

export default Login;
