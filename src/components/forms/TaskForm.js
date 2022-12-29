import React from 'react';
import { toast } from 'react-hot-toast';

const TaskForm = ({ data, refetch }) => {

  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const handlePostReq = (data, form) => {

    fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success(`Task added..`);
          form.reset();
        }
      })
      .catch(err => toast.error('Somthing is Wrong'))
  }


  const handlePatchReq = (handleData, form) => {

    fetch(`http://localhost:5000/tasks/${data?._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(handleData)
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


  const handleImageUpload = (image, formData, form) => {

    const imageData = new FormData();
    imageData.append('image', image);

    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: 'POST',
      body: imageData
    })
      .then(res => res.json())
      .then(data => {
        const imageURL = data.data.url;
        formData.image = imageURL;

        !data ?
          handlePostReq(formData, form)
          :
          handlePatchReq(formData, form)
      })
  }

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;
    const task = form.task.value;
    const image = form.image.files[0];

    const finalData = {
      description: task,
      image: data ? data?.image : ''
    }

    if (image) {
      handleImageUpload(image, finalData, form);
    }
    else {
      !data ?
        handlePostReq(finalData, form)
        :
        handlePatchReq(finalData, form)
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
            <div className='absolute top-0 right-0'>
              {
                data?.image ?
                  <img src={data?.image} className='w-[100px] max-h-[60px] object-fill' alt="" />
                  :
                  <p>No image found</p>
              }
            </div>
          }
        </div>

        <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-cyan-600">
          {data ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </>
  );
};

export default TaskForm;