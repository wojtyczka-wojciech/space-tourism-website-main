import { Stack, styled, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../components/Routes";
import { gsap } from "gsap";
import { fadeInAndTransform } from "../utils/animations";
import { useRootBackground } from "../hooks/useRootBackground";

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
	transition: box-shadow 500ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
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
	const wrapperRef = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		useRootBackground();
	}, []);
	useEffect(() => {
		if (wrapperRef.current === null) return;
		const target = wrapperRef.current.querySelectorAll<HTMLElement>(".animate");

		const anime = fadeInAndTransform(target);
		return () => {
			anime.revert();
		};
	}, [wrapperRef]);

	return (
		<Stack
			direction={{ mobile: "column", desktop: "row" }}
			alignItems="center"
			justifyContent="space-evenly"
			p={24}
			px={{ desktop: 200 }}
			ref={wrapperRef}
		>
			<Stack
				sx={({ breakpoints }) => ({
					mb: 80,
					[breakpoints.up("desktop")]: {
						mb: 0,
					},
				})}
			>
				<Typography
					variant="h5"
					textAlign={{xs: "center",desktop: "left"}}
					component="p"
					className="animate"
				>
					SO, YOU WANT TO TRAVEL TO
				</Typography>
				<Typography variant="h1" textAlign={{xs: "center",desktop: "left"}} className="animate">
					Space
				</Typography>
				
				<Typography maxWidth={444} variant="body" textAlign={{xs: "center",desktop: "left"}} className="animate">
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
