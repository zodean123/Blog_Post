import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  let currentDate = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
        <a className="author">Dipan</a>
          <time>{currentDate}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
