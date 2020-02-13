import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import {
  indexPosts,
  createPost,
  verifyUser,
  updatePost
} from "../services/api_helper";

// Custom Components
import PostList from "./PostList";
import PostSingle from "./PostSingle";
import CreatePost from "./CreatePostForm";
import UpdatePostForm from "./UpdatePostForm";

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    verifyUser();
    this.readAllPosts();
  }

  readAllPosts = async () => {
    const posts = await indexPosts();
    this.setState({ posts });
  };

  createPost = async postData => {
    const newPost = await createPost(postData);
    this.setState({
      posts: [...this.state.posts, newPost]
    });
    this.props.history.push("/posts");
  };

  updatePost = async (e, id, postData) => {
    e.preventDefault();
    const res = await updatePost(id, postData);
    const changedPosts = this.state.posts.map(post =>
      parseInt(post.id) === parseInt(id) ? res : post
    );
    this.setState({ posts: changedPosts });
    this.props.history.push("/posts");
  };

  render() {
    console.log(this.state.posts);
    return (
      <>
        <Route
          exact
          path="/posts"
          render={() => <PostList posts={this.state.posts} />}
        />
        <Route
          exact
          path="/posts/:id"
          render={props => (
            <PostSingle
              postId={props.match.params.id}
              posts={this.state.posts}
            />
          )}
        />
        <Route
          exact
          path="/posts/new"
          render={() => <CreatePost createPost={this.createPost} />}
        />
        <Route
          exact
          path="/posts/:id/edit"
          render={props => (
            <UpdatePostForm
              posts={this.state.posts}
              updatePost={this.updatePost}
              postId={props.match.params.id}
            />
          )}
        />
        {/* {this.state.posts &&
          this.state.posts.map(post => (
            <div key={post.id}>
              <h3>{post.title}</h3>
            </div>
          ))} */}
      </>
    );
  }
}

export default withRouter(PostContainer);
