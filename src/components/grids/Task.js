import { format } from 'date-fns';
import React from 'react';
import { FaEdit, FaMinusSquare, FaTrashAlt } from 'react-icons/fa';
import { BsCheckSquareFill } from 'react-icons/bs';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';
import 'react-photo-view/dist/react-photo-view.css';


const Task = ({ task, handleTaskDelete, handleTaskEdit }) => {
  return (
    <div className='task flex bg-gray-50 border'>
      <div className='task-body basis-full'>
        <div className='task-body-top flex justify-between items-end border-b px-3 py-1 text-sm text-gray-400 capitalize'>
          <span>Status: <span className='block md:inline'>{task?.status}</span></span>
          <span>issued: <span className='block md:inline'>{format(new Date(task.issued), 'dd-MM-yyyy HH:mm a')}</span></span>
        </div>
        <div className='task-body-main p-3'>
          <p>{task?.description}</p>
        </div>
        {
          (task?.image || task?.completed) &&
          <div className='task-body-bottom flex justify-between items-end border-t px-3 py-1 text-sm text-gray-400 capitalize'>
            <span>
              {
                task.status === 'completed' &&
                <>Completed: <span className='block md:inline'>{format(new Date(task.completed), 'dd-MM-yyyy HH:mm a')}</span></>
              }
            </span>
            {
              task?.image &&
              <PhotoProvider>
                <PhotoView src={task?.image}>
                  <span className='underline cursor-pointer'>View Image</span>
                </PhotoView>
              </PhotoProvider>
            }
          </div>
        }
      </div>
      <div className='task-action basis-16 border-l p-3 text-gray-600'>
        <div className='flex flex-col items-center gap-2'>
          <Link to={`/dashboard/my-tasks/${task?._id}`}><FaEdit></FaEdit></Link>
          <button onClick={() => handleTaskDelete(task?._id)}><FaTrashAlt></FaTrashAlt></button>
          {
            task?.status !== 'completed' &&
            <button onClick={() => handleTaskEdit(task?._id, {
              status: 'completed',
              completed: new Date().toISOString()
            })}>
              <BsCheckSquareFill></BsCheckSquareFill>
            </button>
          }
          {
            task?.status === 'completed' &&
            <button onClick={() => handleTaskEdit(task?._id, {
              status: 'processing',
              completed: ''
            })}>
              <FaMinusSquare></FaMinusSquare>
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Task;