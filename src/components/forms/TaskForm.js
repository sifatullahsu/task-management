import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsArrowClockwise } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContextComp';

const TaskForm = ({ data, refetch }) => {

  const { user } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_IMGBB_API;
  const [imgDelete, setImgDelete] = useState(false);

  const handlePostReq = (event, imageURL) => {

    const form = event.target;
    const task = form.task.value;
    const image = imageURL ? imageURL : '';
    const date = new Date().toISOString();

    const finalData = {
      description: task,
      image: image,
      status: 'processing',
      issued: date,
      deadline: '',
      completed: '',
      author: user.uid
    }

    fetch(`https://task-management-server-app.vercel.app/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('task-token')}`
      },
      body: JSON.stringify(finalData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('Task added..');
          form.reset();
        }
      })
      .catch(err => toast.error('Somthing is Wrong'))
  }


  const handlePatchReq = (event, imageURL) => {

    const form = event.target;
    const task = form.task.value;
    const image = imageURL ? imageURL : imgDelete === false ? data?.image : '';

    const finalData = {
      description: task,
      image: image,
    }

    fetch(`https://task-management-server-app.vercel.app/tasks/${data?._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('task-token')}`
      },
      body: JSON.stringify(finalData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success(`Task updated..`);
          refetch();
        }
      })
      .catch(err => toast.error('Somthing is Wrong'))
  }


  const handleImageUpload = (image, event) => {

    const imageData = new FormData();
    imageData.append('image', image);

    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: 'POST',
      body: imageData
    })
      .then(res => res.json())
      .then(result => {
        const imageURL = result.data.url;

        !data ?
          handlePostReq(event, imageURL)
          :
          handlePatchReq(event, imageURL)
      })
  }

  const handleForm = (event) => {
    event.preventDefault();

    const image = event.target.image.files[0];

    if (image) {
      handleImageUpload(image, event);
    }
    else {
      !data ?
        handlePostReq(event)
        :
        handlePatchReq(event)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">{data ? 'Update' : 'Add'} Task</h1>
      <form onSubmit={handleForm} className="space-y-6 ng-untouched ng-pristine ng-valid">
        <div className="space-y-1 text-sm">
          <label htmlFor="task" className="block text-gray-600">Add Your Task..</label>
          <textarea name="task" id="task" rows="3" className="w-full px-4 py-3 border-gray-300 bg-white border text-gray-800 focus:border-cyan-600" defaultValue={data?.description} required></textarea>
        </div>

        <div className='relative'>
          <div className="space-y-1 text-sm">
            <label htmlFor="title" className="block text-gray-600">Image</label>
            <input type="file" name='image' className="file-input file-input-bordered w-full max-w-xs" />
          </div>

          {
            data &&
            <div className='task-image-preview absolute top-0 right-0 flex'>
              <div>
                {
                  data?.image ?
                    <>
                      {
                        !imgDelete &&
                        <img src={data?.image} className='w-[100px] max-h-[60px] object-fill' alt="" />
                      }
                    </>
                    :
                    <p>No image found</p>
                }
              </div>
              {
                data?.image &&
                <div className='bg-gray-100 h-[60px] flex items-center p-2 border'>
                  {
                    imgDelete === false ?
                      <button type="button" onClick={() => setImgDelete(true)}><FaTrashAlt></FaTrashAlt></button>
                      :
                      <button type="button" onClick={() => setImgDelete(false)}><BsArrowClockwise></BsArrowClockwise></button>
                  }
                </div>
              }
            </div>
          }
        </div>

        <button type='submit' className="block w-full p-3 text-center rounded-sm text-gray-50 bg-cyan-600">
          {data ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </>
  );
};

export default TaskForm;