import { createTheme } from "@mui/material";
import { CSSProperties } from "react";

declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		xs: true; // removes the `xs` breakpoint
		sm: false;
		md: false;
		lg: false;
		xl: false;
		mobile: true; // adds the `mobile` breakpoint
		tablet: true;
		laptop: false;
		desktop: true;
	}
	interface TypographyVariants {
		nav: CSSProperties;
		body: CSSProperties;
	}
	interface TypographyVariantsOptions {
		nav?: CSSProperties;
		body?: CSSProperties;
	}
	interface Palette {
		accent: Palette["primary"];
	}
	interface PaletteOptions {
		accent: PaletteOptions["primary"];
	}

}
declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		body1: false;
		body2: false;
		h6: false;
		body: true;
		nav: true;
	}
}
export const config = createTheme({
	palette: {
		primary: {
			main: "#0B0D17",
		},
		secondary: {
			main: "#FFFFFF",
		},
		accent: {
			main: "#D0D6F9",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			mobile: 375,
			tablet: 768,
			desktop: 1280,
		},
		step: 0,
	},
	typography: {
		htmlFontSize: 10,
		fontFamily: ["Barlow", "Barlow Condensed", "Bellefair"].join(","),
	},
	spacing: (factor: number) => `${factor}px`,
});

config.typography.h1 = {
	fontSize: "8rem",
	fontFamily: "Bellefair",
	textTransform: "uppercase",
	[config.breakpoints.up("tablet")]: {
		fontSize: "15rem",
	},
};
config.typography.h2 = {
	fontSize: "5.6rem",
	fontFamily: "Bellefair",
	textTransform: "uppercase",
	[config.breakpoints.up("tablet")]: {
		fontSize: "8rem",
	},
	[config.breakpoints.up("desktop")]: {
		fontSize: "10rem",
	},
};
config.typography.h3 = {
	fontSize: "2.4rem",
	fontFamily: "Bellefair",
	textTransform: "uppercase",
	[config.breakpoints.up("tablet")]: {
		fontSize: "4rem",
	},
	[config.breakpoints.up("desktop")]: {
		fontSize: "5.6rem",
	},
};
config.typography.h4 = {
	fontSize: "1.6rem",
	fontFamily: "Bellefair",
	textTransform: "uppercase",
	[config.breakpoints.up("tablet")]: {
		fontSize: "2.4rem",
	},
	[config.breakpoints.up("desktop")]: {
		fontSize: "3.2rem",
	},
};
config.typography.h5 = {
	fontSize: "2.4rem",
	fontFamily: "Barlow Condensed",
	textTransform: "uppercase",
	[config.breakpoints.up("tablet")]: {
		fontSize: "2rem",
	},
	[config.breakpoints.up("desktop")]: {
		fontSize: "2.8rem",
	},
};
config.typography.nav = {
	fontSize: "1.6rem",
	fontFamily: "Barlow Condensed",
	textTransform: "uppercase",
	letterSpacing: 2.8,
	[config.breakpoints.up("tablet")]: {
		fontSize: "1.4rem",
		letterSpacing: 2.3,
	},
	[config.breakpoints.up("desktop")]: {
		fontSize: "1.6rem",
		letterSpacing: 2.7,
	},
};
config.typography.subtitle1 = {
	fontSize: "2.8rem",
	fontFamily: "Bellefair",
	textTransform: "uppercase",
};
config.typography.subtitle2 = {
	fontSize: "1.4rem",
	fontFamily: "Barlow Condensed",
	textTransform: "uppercase",
};
config.typography.body = {
	fontSize: "1.5rem",
	fontFamily: "Barlow",
	lineHeight:" 26px",
	color: config.palette.accent.main,
	[config.breakpoints.up("tablet")]: {
		fontSize: "1.6rem",
	},
	[config.breakpoints.up("desktop")]: {
		fontSize: "1.8rem",
	},
};
config.typography.button = {
	fontSize: "2rem",
	fontFamily: "Bellefair",
	[config.breakpoints.up("tablet")]: {
		fontSize: "3.2rem",
	},
};
