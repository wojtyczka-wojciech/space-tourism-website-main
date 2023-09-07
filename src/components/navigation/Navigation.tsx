import { Box, Stack } from "@mui/material";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Logo } from "../share/Logo";
import { useState } from "react";
import { CloseButton, Drawer, Line, Nav, NavLinks, Overlay } from "./styles";

export const Navigation = () => {
	const [isNavVisible, setNavVisibility] = useState(false);

	return (
		<Nav>
			{isNavVisible && <Overlay onClick={() => setNavVisibility(false)} />}
			<Box href="/" component={"a"} sx={{ display: "block", p: 24 }}>
				<Logo />
			</Box>
			<Box
				component="button"
				p={8}
				onClick={() => setNavVisibility(true)}
				display={{tablet: "none"}}
			>
				<AiOutlineMenu />
			</Box>
			<Line />
			<Drawer isVisible={isNavVisible} >
				<Stack
					direction="row"
					justifyContent="flex-end"
					sx={({ breakpoints }) => ({
						[breakpoints.up("tablet")]: {
							display: "none",
						},
					})}
				>
					<CloseButton onClick={() => setNavVisibility(false)}>
						<AiOutlineClose fill="white" />
					</CloseButton>
				</Stack>
				<NavLinks />
			</Drawer>
		</Nav>
	);
};
