import React from 'react';
import { toast } from 'react-hot-toast';
import Task from '../grids/Task';

const Tasks = ({ tasks, refetch }) => {

  const handleTaskDelete = (id) => {

    fetch(`https://task-management-server-app.vercel.app/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('task-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('Delete Successful..');
          refetch();
        }
      })
      .catch(err => toast.error('Delete Unsuccessful. Try Again..'))
  }

  const handleTaskEdit = (id, data) => {

    fetch(`https://task-management-server-app.vercel.app/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('task-token')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('Task Updated..');
          refetch();
        }
      })
      .catch(err => toast.error('Somthing is Wrong. Try Again..'))
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
      {
        tasks?.data.map(task =>
          <Task
            key={task._id}
            task={task}
            handleTaskDelete={handleTaskDelete}
            handleTaskEdit={handleTaskEdit}
          ></Task>
        )
      }
    </div>
  )
};

export default Tasks;