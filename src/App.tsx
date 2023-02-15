import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { useInsertionEffect } from "react";
import { Theme, useTheme } from "@mui/material";
import homeBgMobile from "./assets/home/background-home-mobile.jpg";
import homeBgTablet from "./assets/home/background-home-tablet.jpg";
import homeBgDesktop from "./assets/home/background-home-desktop.jpg";
import { injectGlobal } from "@emotion/css";
import { Routing } from "./components/Routes";

const RootStyles = ({ breakpoints }: Theme) => injectGlobal`
	:root {
		font-size: 10px;
		background: url(${homeBgMobile}) bottom center/cover no-repeat;
		font-family: "Barlow";
		min-height: 100vh;
		color: whitesmoke;
	}
	body {
		font-size: 1.6rem;
	}
	${breakpoints.up("tablet")} {
		:root {
			background: url(${homeBgTablet}) bottom center/cover no-repeat;
		}
	}
	${breakpoints.up("desktop")} {
		:root {
			background: url(${homeBgDesktop}) bottom center/cover no-repeat;
		}
	}
`;

const App = () => {
	const theme = useTheme();
	useInsertionEffect(() => {
		RootStyles(theme);
	});

	return (
		<>
			<Header />
			<main>
				<Routing />
			</main>
		</>
	);
};

export default App;
