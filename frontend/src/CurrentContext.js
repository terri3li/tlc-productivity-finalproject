import { createContext, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentContext = createContext(null);

const CurrentProvider = ({ children }) => {
  //sets style theme for site
  const [theme, setTheme] = useState("");
  //keeps track of the amount of tasks completed 
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [recentTasks, setRecentTasks] = useState([]);

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [mounted, setMounted] = useState(null);
  const currentTime = format(new Date(), "HH:mm a").toLowerCase();
  
  useEffect(() => {
    if (isAuthenticated) {
      console.log("hit")
      setMounted(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (mounted) {
      console.log(user.nickname);
      fetch(`/get-user/${user.nickname}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMounted(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [mounted]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <CurrentContext.Provider
        value={{
          recentTasks,
          setRecentTasks,
          user,
          isAuthenticated,
          currentTime,
          theme,
          setTheme,
          tasksCompleted,
          setTasksCompleted,
        }}
      >
        {children}
      </CurrentContext.Provider>
    </>
  );
};

export default CurrentProvider;
