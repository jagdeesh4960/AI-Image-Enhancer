import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full">
           <div className='animate-spin border-4 w-12 h-12 rounded-full border-gray-300 border-t-transparent'></div>
        </div>
    );
};

export default Loading;