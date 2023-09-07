import { Stack, styled, Typography } from "@mui/material";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SubpageTitle } from "../components/share/SubpageTitle";
import { technology } from "../constants/technology";
import { useMove } from "../hooks/useMove";
import { fadeIn } from "../utils/animations";
import { useRootBackground } from "../hooks/useRootBackground";
import React from "react";
type ImageProps = {
	landscape: string;
	portrait: string;
};

const Image = styled("div")<ImageProps>`
	width: 100%;
	height: 310px;
	background-image: ${({ landscape }) => `url(${landscape})`};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	order: -1;
	${({ theme: { breakpoints } }) => breakpoints.up("desktop")} {
		background-image: ${({ portrait }) => `url(${portrait})`};
		order: 1;
		height: 80%;
		max-height: 700px;
		min-height: 310px;
	}
`;
const Description = styled("p")`
	max-width: 458px;
	width: 90%;
	text-align: center;
	align-self: center;
`;
const SliderDot = styled(Stack)`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 1px solid white;
	aspect-ratio: 1 / 1;
	cursor: pointer;
	transition: 300ms ease-in-out background-color;
	${({ theme: { breakpoints } }) => breakpoints.up("tablet")} {
		width: 60px;
		height: 60px;
	}
	${({ theme: { breakpoints } }) => breakpoints.up("desktop")} {
		width: 80px;
		height: 80px;
	}
	&:hover {
		background-color: #ffffff30;
	}
	&.active {
		background-color: white;
		color: black;
	}
`;

export const Technology = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const timerId = useRef<number | undefined>(undefined);
	const countAnimations = useRef<number>(0);
	const [slideIndex, setSlideIndex] = useState(0);
	const slideIndexHandler = (index: number | ((index: number) => number)) => {
		index = typeof index === "number" ? index : index(slideIndex);
		if (index > technology.length - 1) return setSlideIndex(0);
		if (index < 0) return setSlideIndex(technology.length - 1);
		setSlideIndex(index);
	};
	const clearAutoSlider = () => clearTimeout(timerId.current);

	const restartAutoSlider = () => {
		clearAutoSlider();
		timerId.current = window.setTimeout(
			() => slideIndexHandler((prev) => ++prev),

			5000,
		);
	};
	useLayoutEffect(() => {
		useRootBackground("technology");
	}, []);
	useEffect(() => {
		if (wrapperRef.current === null) return;

		const target = wrapperRef.current.querySelectorAll<HTMLElement>(".animate");
		const animation = fadeIn(
			target,
			countAnimations.current === 0 ? undefined : { duration: 0.25 },
		);
		countAnimations.current++;
		restartAutoSlider();
		return () => {
			animation.revert();
			clearAutoSlider();
		};
	}, [slideIndex]);
	useMove(wrapperRef.current, {
		endXHandler: () => {
			setSlideIndex((prev) => prev++);
		},
		maxX: 200,
	});
	return (
		<Stack width="100%">
			<Stack maxWidth={1200} width="90%" mx="auto">
				<SubpageTitle number={3}>Space launch 101</SubpageTitle>
			</Stack>
			<Stack
				ref={wrapperRef}
				direction={{ desktop: "row" }}
				alignItems="center"
				pl={{ desktop: "10%" }}
				flexGrow={1}
				spacing="32px"
			>
				<Stack
					direction={{ desktop: "column", xs: "row" }}
					maxWidth={1200}
					mx="auto"
					spacing="16px"
					padding="16px"
					pl={{ desktop: "0px" }}
				>
					{technology.map((tech, i) => {
						return (
							<SliderDot
								key={i}
								alignItems="center"
								justifyContent="center"
								className={slideIndex == i ? "active" : undefined}
								onClick={() => slideIndexHandler(i)}
							>
								<Typography variant="h4">{i}</Typography>
							</SliderDot>
						);
					})}
				</Stack>
				{technology.map(
					(
						{ image: { landscape, portrait }, subtitle, title, description },
						index,
					) =>
						index != slideIndex ? undefined : (
							<Fragment key={index}>
								<Description>
									<Typography variant="subtitle2">{subtitle}</Typography>
									<Typography variant="h4">{title}</Typography>
									<Typography variant="body">{description}</Typography>
								</Description>
								<Image
									landscape={landscape}
									portrait={portrait}
									key={index}
									className="animate"
								/>
							</Fragment>
						),
				)}
			</Stack>
		</Stack>
	);
};
