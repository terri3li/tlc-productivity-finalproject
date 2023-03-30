import { createContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentContext = createContext(null);

const CurrentProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [mongoUser, setMongoUser] = useState({});
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const currentTime = format(new Date(), "HH:mm a").toLowerCase();
  let autho0User = {};

  useEffect(() => {
    setMongoUser(autho0User);
  }, [isAuthenticated]);

  useEffect(() => {
    console.log(mongoUser)
    fetch("/new-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: mongoUser,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("test");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAuthenticated]);
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }


  if (isAuthenticated) {
    autho0User = { username: user.nickname, email: user.email };
  }

  return (
    <>
      <CurrentContext.Provider value={{ isAuthenticated, currentTime, theme, setTheme, tasksCompleted, setTasksCompleted }}>
        {children}
      </CurrentContext.Provider>
    </>
  );
};

export default CurrentProvider;
