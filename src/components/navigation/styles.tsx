import { css, cx } from "@emotion/css";
import {
	Box,
	BoxProps,
	Stack,
	styled,
	Typography,
	useTheme,
} from "@mui/material";
import { Fragment, ReactNode } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { paths } from "../Routes";
import { ILink, IDrawer } from "./styles.d";
export const Nav = styled("nav")`
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: ${({ theme: { zIndex } }) => zIndex.appBar};
`;
export const ListItem = styled("li")`
	text-transform: uppercase;
`;
export const LinkNumber = styled("span")`
	font-size: 1.6rem;
	font-family: "Barlow Condensed";
	font-weight: bold;
	margin-right: 12px;
	letter-spacing: 2.7px;
	${({
		theme: {
			breakpoints: { up },
		},
	}) => up("tablet")} {
		display: none;
	}
	${({
		theme: {
			breakpoints: { up },
		},
	}) => up("desktop")} {
		display: inline;
	}
`;
export const Link = ({ to, index, name }: ILink) => {
	const { breakpoints } = useTheme();
	const style = css({
		display: "block",
		position: "relative",
		"&:hover::before": {
			opacity: 0.5,
		},
		"&::before": {
			position: "absolute",
			left: 0,
			right: 0,
			bottom: 0,
			height: 5,
			backgroundColor: "white",
			opacity: 0,
			transition: "300ms ease-in-out opacity",
		},
		[breakpoints.up("tablet")]: {
			paddingTop: 32,
			paddingBottom: 32,
			height: "100%",
			"&::before": {
				content: "''",
			},
			"&.active::before": {
				opacity: "1 !important",
			},
		},
	});

	return (
		<NavLink
			to={to}
			className={({ isActive }) => cx(style, isActive ? "active" : undefined)}
		>
			<LinkNumber>{index < 10 ? `0${index}` : index}</LinkNumber>
			<Typography variant="nav">{name.toUpperCase()}</Typography>
		</NavLink>
	);
};
export const CloseButton = styled("button")`
	margin-bottom: 65px;
`;

export const Drawer = styled(Stack, {
	shouldForwardProp: (prop) => prop !== "isVisible",
})<IDrawer>(({ theme: { palette, breakpoints, zIndex }, isVisible }) => ({
	position: "fixed",
	top: 0,
	right: 0,
	height: "100vh",
	color: palette.accent.main,
	backgroundColor: "rgba(255, 255, 255, 0.04)",
	padding: 34,
	backdropFilter: "blur(82px)",
	minWidth: 250,
	transform: `translateX(${isVisible ? 0 : 100}%)`,
	transition: "400ms cubic-bezier(0.77,0,0.18,1) transform",
	zIndex: zIndex.appBar,
	[breakpoints.up("tablet")]: {
		position: "static",
		height: "100%",
		minWidth: "60%",
		transform: "unset",
		transition: "unset",
		padding: 0,
		alignItems: "center",
		alignSelf: "stretch",
		zIndex: "auto",
	},
}));

export const Overlay = ({ sx, ...props }: BoxProps) => (
	<Fragment>
		{createPortal(
			<Box
				sx={({ zIndex }) => ({
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: "black",
					opacity: 0.1,
					zIndex: zIndex.appBar - 1,
				})}
				{...props}
			/>,
			document.getElementById("overlay-root") as HTMLElement,
		)}
	</Fragment>
);

export const NavLinks = () => {
	return (
		<Stack
			component="ul"
			direction={{ xs: "column", tablet: "row" }}
			spacing={32}
		>
			{Object.entries(paths).map(([_, { name, path }], index) => {
				return (
					<ListItem key={index}>
						<Link index={index} name={name} to={path}></Link>
					</ListItem>
				);
			})}
		</Stack>
	);
};

export const Line = styled("div")(({ theme: { breakpoints } }) => ({
	backgroundColor: "white",
	flexGrow: 1,
	height: "1px",
	opacity: "0.25",
	transform: "translateX(50px)",
	zIndex: 1,
	[breakpoints.up("xs")]: {
		display: "none",
	},
	[breakpoints.up("desktop")]: {
		display: "block",
	},
}));
