import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import "./App.css";
import { registerUser, verifyUser, loginUser } from "./services/api_helper";

// Custom Components
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PostContainer from "./components/PostContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      currentUser: false,
      errorText: null
    };
  }

  componentDidMount = () => {
    verifyUser();
    if (localStorage.getItem("authToken")) {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      const user = { name, email };
      user &&
        this.setState({
          currentUser: user
        });
    }
  };

  handleLogin = async (loginData, e) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    this.setState({ currentUser });
    this.props.history.push("/posts");
  };

  handleLogout = e => {
    e.preventDefault();
    this.setState({
      currentUser: false
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleRegister = async (e, registerData) => {
    e.preventDefault();
    const currentUser = await registerUser(registerData);
    if (!currentUser.errorMessage) {
      this.setState({
        currentUser
      });
      this.props.history.push("/posts");
    } else {
      this.setState({ errorText: currentUser.errorMessage });
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.currentUser ? (
          <div className="welcome_sign">
            <h1>Hello, {this.state.currentUser.name}</h1>
            <button onClick={this.handleLogout}>Logout!</button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
        <Route
          path="/login"
          render={() => <LoginForm handleLogin={this.handleLogin} />}
        />
        <Route
          path="/register"
          render={() => (
            <RegisterForm
              handleRegister={this.handleRegister}
              errorText={this.state.errorText}
            />
          )}
        />
        <Route path="/posts" render={() => <PostContainer />} />
      </div>
    );
  }
}

export default withRouter(App);
