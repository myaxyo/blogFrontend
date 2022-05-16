import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState();
  const id = localStorage.getItem('userId');
  console.log(id);
  const sendRequest = async () => {
    const res = await axios
      .get(`https://blogBackend.myaxyo.repl.co/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUserBlogs(data.user));
  }, []);
  console.log(userBlogs);
  return (
    <div>
      {userBlogs &&
        userBlogs.blogs.map((userBlog) => (
          <Blog
            key={userBlog._id}
            title={userBlog.title}
            description={userBlog.description}
            imageURL={userBlog.image}
            userName={userBlogs.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
