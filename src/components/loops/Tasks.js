import React from 'react';
import { toast } from 'react-hot-toast';
import Task from '../grids/Task';

const Tasks = ({ tasks, refetch }) => {
  console.log(tasks.data);

  const handleTaskDelete = (id) => {

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
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

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
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
    <div className='grid grid-cols-2 gap-3'>
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