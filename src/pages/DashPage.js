import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextComp';

const DashPage = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div>

    </div>
  );
};

export default DashPage;