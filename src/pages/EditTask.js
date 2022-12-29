import React from 'react';
import { useQuery } from 'react-query';
import { useLoaderData, useLocation } from 'react-router-dom';
import TaskForm from '../components/forms/TaskForm';
import Loading from '../components/Loading';

const EditTask = () => {
  const id = useLoaderData();
  const location = useLocation();

  const { data: task = [], refetch, isLoading } = useQuery({
    queryKey: ['tasks', location],
    queryFn: async () => {
      const res = await fetch(`https://task-management-server-app.vercel.app/tasks/${id}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('task-token')}`
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
    <TaskForm data={task} refetch={refetch}></TaskForm>
  );
};

export default EditTask;