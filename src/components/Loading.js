import React from 'react';

const Loading = (isCenter, isHeight) => {
  return (
    <div className={`flex items-center space-x-2 ${isCenter && 'justify-center'} ${isHeight && 'loading-height'}`}>
      <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-600"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-600"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-cyan-600"></div>
    </div>
  );
};

export default Loading;