import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPost: null
    };
  }

  componentDidMount = () => {
    this.setCurrentPost();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.postId !== this.props.postId) {
      this.setCurrentPost();
    }
  }

  setCurrentPost = () => {
    const currentPost = this.props.posts.find(
      post => parseInt(post.id) === parseInt(this.props.postId)
    );
    this.setState({ currentPost });
  };

  render() {
    return (
      <>
        {this.state.currentPost && (
          <>
            <h1>{this.state.currentPost.title}</h1>
            <Link to={`/posts/${this.state.currentPost.id}/edit`}>
              <button>Edit</button>
            </Link>
          </>
        )}
      </>
    );
  }
}

export default PostSingle;
