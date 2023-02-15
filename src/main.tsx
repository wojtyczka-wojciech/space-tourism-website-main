import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { config } from "./config/mui.config";
import { ThemeProvider } from "@mui/material";
import { IconContext } from "react-icons";
import { BrowserRouter } from "react-router-dom";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={config}>
				<IconContext.Provider value={{ color: "white", size: "3rem" }}>
					<App />
				</IconContext.Provider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
