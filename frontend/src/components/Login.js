import { useContext } from "react";
import { CurrentContext } from "../CurrentContext";

const Login = () => {

    const { currentUser, setCurrentUser } = useContext(CurrentContext);

    //copied from context, need to update

    // const signInSubmit = (e) => {
    //     e.preventDefault();
    
    //     fetch("/api/signin", {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ username }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data.status === 200) {
    //           window.localStorage.setItem("currentUser", JSON.stringify(data));
    //           setCurrentUser(data)
    //           navigate("/");
    //         }
    
    //         if (data.status === 400) {
    //           setErrorMsg(data.message);
    //         }
    //       })
    //       .catch((error) => {
    //         setErrorMsg("Try again later");
    //       });
    //   };
    
    return (
        <>
        
        </>
    )
}

export default Login; 