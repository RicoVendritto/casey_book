import React from "react";
import { Link } from "react-router-dom";

const PostList = props => {
  return (
    <>
      {props.posts &&
        props.posts.map(post => (
          <div key={post.id}>
            <Link to={`posts/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
          </div>
        ))}
      <Link to="/posts/new">
        <button>Create new Post!</button>
      </Link>
    </>
  );
};

export default PostList;
