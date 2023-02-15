import { Route, Routes } from "react-router-dom";
import { Destination } from "../pages/Destination";
import { Home } from "../pages/Home";
import { PagesPaths, Route as IRoute } from "./routes.d";
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

export const pages: IRoute[] = [
	{
		path: paths.home.path,
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
		element: "",
	},
	{
		path: paths.technology.path,
		element: "",
	},
];

export const GenerateRoutes = (routes: IRoute[]) =>
	routes.map(({ path, index, element, children },key) =>
		children ? (
			<Route path={path} element={element} key={key}>
				{GenerateRoutes(children)}
			</Route>
		) : (
			<Route path={path} element={element} index={index} key={key}/>
		),
	);

export const Routing = () => <Routes>{GenerateRoutes(pages)}</Routes>;
