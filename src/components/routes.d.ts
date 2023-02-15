import { ReactNode } from "react";

export type PagesNames = "home" | "destination" | "crew" | "technology";
export interface Path {
	path: string;
}
export interface PageName {
	name: string;
}

export type PagesPaths = {
	[key in PagesNames]: Path & PageName;
};

export interface Route {
	path?: string;
	index?: boolean;
	element?: ReactNode;
	children?: Route[];
}
