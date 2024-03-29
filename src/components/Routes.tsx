import { useRoutes } from "react-router-dom";
import { Crew } from "../pages/Crew.tsx";
import { Destination } from "../pages/Destination.tsx";
import { Home } from "../pages/Home.tsx";
import { Technology } from "../pages/Technology.tsx";
import { PagesPaths } from "./routes.d";
import React from "react";
export const paths: PagesPaths = {
	home: {
		name: "Home",
		path: "/",
	},
	destination: {
		name: "Destination",
		path: "/destination",
	},
	crew: {
		name: "Crew",
		path: "/crew",
	},
	technology: {
		name: "Technology",
		path: "/technology",
	},
};

export const Router = () =>
	useRoutes([
		{
			element: <Home />,
			index: true,
		},
		{
			path: paths.destination.path,
			element: <Destination />,
			children: [
				{
					path: ":name",
					element: <Destination />,
				},
			],
		},
		{
			path: paths.crew.path,
			element: <Crew />,
		},
		{
			path: paths.technology.path,
			element: <Technology />,
		},
	]);
