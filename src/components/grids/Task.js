import React from 'react';
import { FaCheckSquare, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Task = ({ task, handleTaskDelete, handleTaskEdit }) => {
  return (
    <div className='flex bg-gray-50 border'>
      <div className='basis-full p-5'>
        <p>{task?.description}</p>

      </div>
      <div className='basis-16 border-l p-3 text-gray-600'>
        <div className='flex flex-col items-center gap-2'>
          <Link to={`/dashboard/my-tasks/${task?._id}`}><FaEdit></FaEdit></Link>
          <FaTrashAlt onClick={() => handleTaskDelete(task?._id)}></FaTrashAlt>
          {
            task?.status !== 'completed' &&
            <FaCheckSquare onClick={() => handleTaskEdit(task?._id, { status: 'completed' })}></FaCheckSquare>
          }
        </div>
      </div>
    </div>
  );
};

export default Task;