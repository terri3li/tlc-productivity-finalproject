import { createContext, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentContext = createContext(null);

const CurrentProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [mounted, setMounted] = useState(null);
  const currentTime = format(new Date(), "HH:mm a").toLowerCase();
  
 
useEffect(() => {
  if (mounted) {
    console.log(user)
    fetch(`/get-user/${user.name}`)
    .then((res) => res.json())
    .then((data) => {
   console.log(data)
   setMounted(false)
    })
    .catch((error) => {
      console.log(error);
    })}
  }
  , [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <CurrentContext.Provider value={{ user, isAuthenticated, currentTime, theme, setTheme, tasksCompleted, setTasksCompleted }}>
        {children}
      </CurrentContext.Provider>
    </>
  );
};

export default CurrentProvider;
