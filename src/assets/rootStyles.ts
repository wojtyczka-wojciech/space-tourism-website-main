import { injectGlobal } from "@emotion/css";
import { Theme } from "@mui/material";
import homeBgMobile from "./home/background-home-mobile.jpg";
import homeBgTablet from "./home/background-home-tablet.jpg";
import homeBgDesktop from "./home/background-home-desktop.jpg";
import destinationBgMobile from "./destination/background-destination-mobile.jpg";
import destinationBgTablet from "./destination/background-destination-tablet.jpg";
import destinationBgDesktop from "./destination/background-destination-desktop.jpg";
import crewBgMobile from "./crew/background-crew-mobile.jpg";
import crewBgTablet from "./crew/background-crew-tablet.jpg";
import crewBgDesktop from "./crew/background-crew-desktop.jpg";
import technologyBgMobile from "./technology/background-technology-mobile.jpg";
import technologyBgTablet from "./technology/background-technology-tablet.jpg";
import technologyBgDesktop from "./technology/background-technology-desktop.jpg";

export const rootStyles = ({ breakpoints }: Theme) => injectGlobal`
	:root {
		font-size: 10px;
		font-family: "Barlow";
		color: whitesmoke;
		
	}
	body {
		font-size: 1.6rem;
	}
	#root {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: black;
		background-image: url(${homeBgMobile});
		background-size: 110% 100%;
		background-repeat: no-repeat;
		animation: moveHorizontal 40s infinite alternate linear;
		overflow-y: auto;
		&[data-page=destination] {
			background-image: url(${destinationBgMobile}) ;
		}
		&[data-page=crew] {
			background-image: url(${crewBgMobile}) ;
		}
		&[data-page=technology] {
			background-image: url(${technologyBgMobile}) ;
		}
	}
	${breakpoints.up("tablet")} {
		#root {
			background-image: url(${homeBgTablet});
			background-size: 110% 100%;
		background-repeat: no-repeat;
			animation: moveHorizontal 40s infinite alternate linear;
			&[data-page=destination] {
			background-image: url(${destinationBgTablet});
		}
		&[data-page=crew] {
			background-image: url(${crewBgTablet});
		}
		&[data-page=technology] {
			background-image: url(${technologyBgTablet});
		}
		}
	}
	${breakpoints.up("desktop")} {
		#root {
			background-image: url(${homeBgDesktop});
			background-size: 100% 110%;
		background-repeat: no-repeat;
			animation: moveVertical 40s infinite alternate linear;
			&[data-page=destination] {
				background-image: url(${destinationBgDesktop});
		}
		&[data-page=crew] {
			background-image: url(${crewBgDesktop});
		}
		&[data-page=technology] {
			background-image: url(${technologyBgDesktop});
			background-size: 110% 100%;
			animation: moveHorizontal 40s infinite alternate linear;
		}
		}
	}
	
	@keyframes moveVertical {
		from {
			background-position-y: 0%;
		} to {
			background-position-y: 100%;

		}
	}
	@keyframes moveHorizontal {
		from {
			background-position-x: 0%;
		} to {
			background-position-x: 100%;

		}
	}
`;
