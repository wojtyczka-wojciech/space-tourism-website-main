import { Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "../components/Routes";

interface ISizes {
	sm: number;
	md: number;
	lg: number;
}
const sizes: ISizes = {
	sm: 150,
	md: 242,
	lg: 274,
};
const boxShadowSizes: ISizes = {
	sm: 42,
	md: 66,
	lg: 78,
};
const ButtonExplore = styled("button")`
	display: block;
	width: ${sizes["sm"]}px;
	height: ${sizes["sm"]}px;
	border-radius: 50%;
	background-color: white;
	box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1);
	transition: box-shadow 500ms cubic-bezier(0.68,-0.55,0.27,1.55);
	overflow: hidden;
	&:hover {
		box-shadow: 0px 0px 0px ${boxShadowSizes["sm"]}px rgba(255, 255, 255, 0.1);
	}
	${({ theme: { breakpoints } }) => breakpoints.up("tablet")} {
		width: ${sizes["md"]}px;
		height: ${sizes["md"]}px;
		&:hover {
			box-shadow: 0px 0px 0px ${boxShadowSizes["md"]}px rgba(255, 255, 255, 0.1);
		}
	}
	${({ theme: { breakpoints } }) => breakpoints.up("desktop")} {
		width: ${sizes["lg"]}px;
		height: ${sizes["lg"]}px;
		&:hover {
			box-shadow: 0px 0px 0px ${boxShadowSizes["lg"]}px rgba(255, 255, 255, 0.1);
		}
	}
`;

export const Home = () => {
	const navigate = useNavigate();
	return (
		<Stack
			direction={{ mobile: "column", desktop: "row" }}
			alignItems="center"
			justifyContent="space-between"
			mx="auto"
			p={24}
			px={{desktop: 200}}
			mt={{ desktop: 220,tablet: 80 }}>
			<Stack
				spacing={{ mobile: 16, tablet: 24 }}
				sx={({ breakpoints }) => ({
					mb: 80,
					[breakpoints.up("desktop")]: {
						mb: 0,
					},
				})}>
				<Typography variant="h1" order={1} textAlign="center">
					Space
				</Typography>
				<Typography variant="h5" textAlign="center">
					SO, YOU WANT TO TRAVEL TO
				</Typography>
				<Typography maxWidth={444} variant="body">
					Let`s face it; if you want to go to space, you might as well genuinely
					go to outer space and not hover kind of on the edge of it. Well sit
					back, and relax because we`ll give you a truly out of this world
					experience!
				</Typography>
			</Stack>
			<ButtonExplore onClick={() => navigate(paths.destination.path)}>
				<Typography variant="button" color="black">
					Explore
				</Typography>
			</ButtonExplore>
		</Stack>
	);
};
