import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextComp';

const DashPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Welcome {user?.email}</h1>
      <p>Here you'll add tasks as much as you can.</p>
    </div>
  );
};

export default DashPage;