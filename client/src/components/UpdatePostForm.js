import React, { Component } from "react";

class UpdatePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null
    };
  }

  componentDidMount = () => {
    this.setFormData();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.posts !== this.props.posts) {
      this.setFormData();
    }
  };

  setFormData = () => {
    if (this.props.posts.length) {
      const { title } = this.props.posts.find(post => {
        return parseInt(post.id) === parseInt(this.props.postId);
      });
      this.setState({ title });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form
        onSubmit={e => this.props.updatePost(e, this.props.postId, this.state)}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />
        <button>Save!</button>
      </form>
    );
  }
}

export default UpdatePostForm;
