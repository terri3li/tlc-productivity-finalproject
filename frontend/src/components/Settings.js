import { useState } from "react";
import styled from "styled-components";


const Settings = ({themeToggler}) => {

	return (
		<>
		
		<button onClick={themeToggler}>Switch Theme</button>
		<div>Select Site Theme:</div>
		<div>Light</div>
		<div>Dark</div>
		<div></div>
		</>
	)

}

const ChangeTheme = styled.div`
`;

export default Settings;
