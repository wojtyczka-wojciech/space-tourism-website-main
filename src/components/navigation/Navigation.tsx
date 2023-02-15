import { Box, Stack, styled, Typography } from "@mui/material";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Logo } from "../share/Logo";
import { useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import {
	CloseButton,
	CustomDrawer,
	Link,
	ListItem,
	Nav,
	Overlay,
} from "./styledComponents";
import { paths } from "../Routes";

export const Navigation = () => {
	const [isNavVisible, setNavVisibility] = useState(false);
	const navigate = useNavigate();

	return (
		<Nav>
			<Box href="/" component={"a"} sx={{ display: "block", p: 24 }}>
				<Logo />
			</Box>
			<Box
				component="button"
				p={8}
				onClick={() => setNavVisibility(true)}
				sx={({ breakpoints }) => ({
					[breakpoints.up("tablet")]: {
						display: "none",
					},
				})}>
				<AiOutlineMenu />
			</Box>
			<Box
				sx={() => ({
					backgroundColor: "white",
					flexGrow: 1,
					height: "1px",
					opacity: "0.25",
					transform: "translateX(50px)",
					zIndex: 1,
				})}
				display={{ xs: "none", desktop: "block" }}></Box>
			<CustomDrawer isVisible={isNavVisible}>
				<Stack
					direction="row"
					justifyContent="flex-end"
					sx={({ breakpoints }) => ({
						[breakpoints.up("tablet")]: {
							display: "none",
						},
					})}>
					<CloseButton onClick={() => setNavVisibility(false)}>
						<AiOutlineClose fill="white" />
					</CloseButton>
				</Stack>
				<Box position="relative">
					<Stack
						component="ul"
						direction={{ xs: "column", tablet: "row" }}
						spacing={32}
						sx={({ breakpoints }) => ({
							[breakpoints.up("tablet")]: {
								flexDirection: "row",
							},
						})}>
						{Object.entries(paths).map(([_, { name, path }], index) => {
							const match = useLocation();
							const isHome =
								name === "Home" && match.pathname === "/" ? true : false;
							console.log(name, match.pathname);
							return (
								<ListItem key={index}>
									<Link
										index={index}
										name={name}
										href={path}
										onClick={(e) => {
											e.preventDefault();
											navigate(path);
										}}
										className={
											isHome
												? "active"
												: match.pathname.includes(name.toLowerCase())
													? "active"
													: undefined
										}></Link>
								</ListItem>
							);
						})}
					</Stack>
				</Box>
			</CustomDrawer>
			{isNavVisible && <Overlay onClick={() => setNavVisibility(false)} />}
		</Nav>
	);
};
