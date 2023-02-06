import React, {useState, useEffect, useRef} from 'react';

const CommentsForm = () => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentElement = useRef();
  const nameElement = useRef();
  const emailElement = useRef();
  const storeDataElement = useRef();


  const handleCommentSubmission = () => {
    setError(false);

    const {value: comment} = commentElement.current;
    const {value: name} = nameElement.current;
    const {value: email} = emailElement.current;
    const {checked: storeData} = storeDataElement.current;

    if(!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {name, email, comment, slug};

    if(storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('name', name);
      localStorage.removeItem('name', name);
    }
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl font-semibold border-b pb-4 mb-8'>Comments Form</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          name='comment'
          placeholder='Comment'
          id='comment'
          ref={commentElement}
          className="p-4 outline-none rounded-lg w-full focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input 
          type="text" 
          name='name'
          placeholder='Name'
          id='name'
          ref={nameElement}
          className="py-2 px-4 outline-none rounded-lg w-full focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
        />
        <input 
          type="email" 
          name='email'
          placeholder='Email Id'
          id='email'
          ref={emailElement}
          className="py-2 px-4 outline-none rounded-lg w-full focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
        />
      </div>

      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input type="checkbox" name="storeData" id="storeData" ref={storeDataElement} value="true"/>
          <label htmlFor="storeData" className='text-gray-500 cursor-pointer ml-2'>Save my email and name for the next time</label>
        </div>
      </div>

      {error && <p className='text-xs text-red-500'>All Fields Required</p>}
      <div className='mt-8'>
        <button 
          type='submit' 
          onClick={handleCommentSubmission}
          className="transition duration-500 ease-in hover:bg-indigo-900 inline-block bg-pink-600 text-xl rounded-full text-white px-8 py-3 cursor-pointer"
        >Post Comment</button>
        {showSuccessMessage && <span className='text-xl float-right mt-3 text-green-500 font-semibold'>Comment Submitted for Review</span>}
      </div>
    </div>
  )
}

export default CommentsForm