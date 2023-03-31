import {NavLink} from "react-router-dom";
import styled from "styled-components";


const Profile = () => {

    return (
        <>
        <h1>avatar</h1>
<h1>@username</h1>
<h3>full name</h3>
<div>level 8 </div>
<div>tasks completed: 2398</div>
<SettingsLink to="/settings">Settings</SettingsLink>
        </>
    )
}

const SettingsLink = styled(NavLink)`

`;

export default Profile; 