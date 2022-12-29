import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import Tasks from '../components/loops/Tasks';
import { AuthContext } from '../contexts/AuthContextComp';

const CompletedTasks = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const { data: tasks = [], refetch, isLoading } = useQuery({
    queryKey: ['tasks', location],
    queryFn: async () => {
      const res = await fetch(`https://task-management-server-app.vercel.app/tasks/uid/${user?.uid}?status=completed`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('task-token')}`
        }
      });
      const data = await res.json();

      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Completed Tasks</h1>
      <Tasks tasks={tasks} refetch={refetch}></Tasks>
    </>
  );
};

export default CompletedTasks;