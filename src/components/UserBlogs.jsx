import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import FadeLoader from 'react-spinners/FadeLoader';

const UserBlogs = () => {
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  const [userBlogs, setUserBlogs] = useState();
  const id = localStorage.getItem('userId');
  const [isLoaded, setIsLoaded] = useState(true);
  const sendRequest = async () => {
    const res = await axios
      .get(`https://blogBackend.myaxyo.repl.co/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    setIsLoaded(false);
    // console.log(data);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUserBlogs(data.user));
  }, []);
  console.log(userBlogs);
  return (
    <div>
      {isLoaded ? (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <FadeLoader
            color="green"
            css={override}
            height="25px"
            width="8px"
            margin="18px"
            radius="3px"
          />
        </Box>
      ) : (
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
      )}
    </div>
  );
};

export default UserBlogs;
