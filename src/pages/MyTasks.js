import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import Tasks from '../components/loops/Tasks';

const MyTasks = () => {

  const location = useLocation();

  const { data: tasks = [], refetch, isLoading } = useQuery({
    queryKey: ['tasks', location],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/tasks`);
      const data = await res.json();

      return data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <Tasks tasks={tasks} refetch={refetch}></Tasks>
    </div>
  );
};

export default MyTasks;