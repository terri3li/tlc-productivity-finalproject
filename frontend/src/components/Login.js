import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { loginWithRedirect } = useAuth0();

  const someEvent = (e) => {};

  return (
    <>
      {/* <h1>Welcome Back!</h1>
      <h2>Login:</h2>

      <form onSubmit={() => login()}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button> Sign In</button>
      </form>

      <h4>
        Not a member? Sign up <SignUpLink to="/signup">here!</SignUpLink>
      </h4> */}

<button onClick={() => loginWithRedirect()}>
Login
</button>
    </>
  );
};

const SignUpLink = styled(NavLink)`
  text-decoration: none;
  color: red;
  font-weight: bold;
`;

export default Login;
