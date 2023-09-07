import { Header } from "./components/layout/Header";
import { useInsertionEffect } from "react";
import { useTheme } from "@mui/material";
import { rootStyles } from "./assets/rootStyles";
import { Router } from "./components/Routes";
import { Audio } from "./components/Audio";
import { Main } from "./components/layout/Main";
import React from "react";

const App = () => {
	const theme = useTheme();
	useInsertionEffect(() => {
		rootStyles(theme);
	});
	return (
		<>
			<Audio />
			<Header />
			<Main>
				<Router />
			</Main>
		</>
	);
};

export default App;
