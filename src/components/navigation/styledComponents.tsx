import { Box, BoxProps, Stack, styled, Typography } from "@mui/material";
import { ReactNode } from "react";

type NavSpacing = {
	spacing?: number | string;
};
export const Nav = styled("nav")<NavSpacing>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: ${({ theme: { zIndex } }) => zIndex.appBar};
	${({ spacing }) =>
		spacing !== undefined &&
		`
		& > * {
			margin-left: ${typeof spacing === "number" ? `${spacing}px` : spacing};
		}
	`}
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
export const Link = ({
	index,
	name,
	...props
}: { index: number; name: string } & BoxProps<"a">) => (
	<Box
		component="a"
		{...props}
		sx={({ breakpoints }) => ({
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
				py: 32,
				height: 1,
				"&::before": {
					content: "''",
				},
				"&.active::before": {
					opacity: "1 !important",
				},
			},
		})}>
		<LinkNumber>{index < 10 ? `0${index}` : index}</LinkNumber>
		<Typography variant="nav">{name.toUpperCase()}</Typography>
	</Box>
);
export const CloseButton = styled("button")`
	margin-bottom: 65px;
`;

export const CustomDrawer = ({
	isVisible,
	children,
}: {
	isVisible: boolean;
	children: ReactNode;
}) => (
	<Stack
		sx={({ palette, breakpoints, zIndex }) => ({
			position: "fixed",
			top: 0,
			right: 0,
			height: "100vh",
			color: palette.accent.main,
			backgroundColor: "rgba(255, 255, 255, 0.04)",
			p: 34,
			backdropFilter: "blur(82px)",
			minWidth: 250,
			transform: `translateX(${isVisible ? 0 : 100}%)`,
			transition: "400ms cubic-bezier(0.77,0,0.18,1) transform",
			zIndex: zIndex.appBar,
			[breakpoints.up("tablet")]: {
				position: "static",
				height: 1,
				minWidth: "60%",
				transform: "unset",
				transition: "unset",
				p: 0,
				alignItems: "center",
				alignSelf: "stretch",
				zIndex: "auto",
			},
		})}>
		{children}
	</Stack>
);

export const Overlay = (props: BoxProps) => (
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
	/>
);
