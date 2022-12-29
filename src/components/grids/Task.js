import { format } from 'date-fns';
import React from 'react';
import { FaCheckSquare, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';
import 'react-photo-view/dist/react-photo-view.css';


const Task = ({ task, handleTaskDelete, handleTaskEdit }) => {
  return (
    <div className='flex bg-gray-50 border'>
      <div className='basis-full'>
        <div className='flex justify-between border-b px-3 py-1 text-sm text-gray-400 capitalize'>
          <span>Status: {task?.status}</span>
          <span>issued: {format(new Date(task.issued), 'dd-MM-yyyy HH:mm a')}</span>
        </div>
        <div className='p-3'>
          <p>{task?.description}</p>
        </div>
        {
          (task?.image || task?.completed) &&
          <div className='flex justify-between border-t px-3 py-1 text-sm text-gray-400 capitalize'>
            <span>
              {
                task.status === 'completed' &&
                <>Completed: {format(new Date(task.completed), 'dd-MM-yyyy HH:mm a')}</>
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
      <div className='basis-16 border-l p-3 text-gray-600'>
        <div className='flex flex-col items-center gap-2'>
          <Link to={`/dashboard/my-tasks/${task?._id}`}><FaEdit></FaEdit></Link>
          <FaTrashAlt onClick={() => handleTaskDelete(task?._id)}></FaTrashAlt>
          {
            task?.status !== 'completed' &&
            <FaCheckSquare
              onClick={() => handleTaskEdit(task?._id, {
                status: 'completed',
                completed: new Date().toISOString()
              })}
            ></FaCheckSquare>
          }
        </div>
      </div>
    </div>
  );
};

export default Task;