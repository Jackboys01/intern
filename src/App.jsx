import React, { useEffect, useState } from 'react';

export const BASE_URL = 'https://mocki.io/v1/072f4309-6b86-4ecc-b055-e16192d9f76a';

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw = await fetch(BASE_URL);
        const json = await raw.json();
        setData(json.posts);
      } catch (error) {
        setError('THERE IS ERROR');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-semibold text-center mt-6 mb-4'>Posts</h1>
      {error && (
        <div className='alert alert-danger text-center'>{error}</div>
      )}
     {data && data.length > 0 ? (
  <div className='space-y-6'>
    {data.map((post) => (
      <div key={post.id} className='border p-4 rounded-lg shadow-md'>
        <p>
          <strong>ID: {post.id}</strong>
        </p>
        <h2 className='text-xl font-semibold'>{post.title}</h2>
        <p className='text-gray-600'>{post.body}</p>
        <div className='mt-2'>
          <strong>Tags: </strong>
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className='bg-gray-200 text-gray-800 px-2 py-1 rounded-md mr-2'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
) : (
  <div className='text-center'>No posts available.</div>
)}

    </div>
  );
};

export default App;
