import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function Register() {
    console.log("You are now logged in");
    navigate("registerPage");
  }

  const handleSubmit = () => {
    event?.preventDefault;
    if (database.find((entry) => entry.username === username)) {
      console.log("username Checks out");
      if (database.find((entry) => entry.password === password)) {
        console.log("logged in");
      }
    }
  };

  const database = [
    {
      username: "user1",
      password: "pass1",
    },
  ];

  return (
    <>
      <div>
        <LogInContainer>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {/* <input type="submit" /> */}
          </form>
          <button onClick={handleSubmit}>Log in</button>
          <div>
            <button onClick={Register}>Register</button>
          </div>
        </LogInContainer>
      </div>
    </>
  );
};

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;
