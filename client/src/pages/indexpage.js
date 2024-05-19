import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Post from '../Post';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
      });
  }, []);

  async function handleDelete(id, authorId) {
    if (userInfo.id !== authorId) {
      alert("You are not the author");
      return;
    }
    const response = await fetch(`http://localhost:4000/post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      setPosts(posts.filter(post => post._id !== id));
    } else {
      const errorData = await response.json();
      console.error("Error deleting post:", errorData.error);
    }
  }

  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <div key={post._id}>
          <Post {...post} />
          <button onClick={() => navigate(`/post/${post._id}`)}>View Post</button>
          <button onClick={() => handleDelete(post._id, post.author._id)}>Delete Post</button>
        </div>
      ))}
    </>
  );
}
