import { createContext, useState } from "react";
import { format } from "date-fns";

export const CurrentContext = createContext(null);

const CurrentProvider = ({ children }) => {
  const currentTime = format(new Date(), "HH:mm a").toLowerCase();
  const [theme, setTheme] = useState("light");

  const [currentUser, setCurrentUser] = useState(() => {
    const data = window.localStorage.getItem("currentUser");
    const parseData = JSON.parse(data);
    return parseData ? parseData : null;
  });


return (
  <>
    <CurrentContext.Provider value={{ currentTime, currentUser, setCurrentUser, theme, setTheme }}>
      {children}
    </CurrentContext.Provider>
  </>
);
}

export default CurrentProvider;