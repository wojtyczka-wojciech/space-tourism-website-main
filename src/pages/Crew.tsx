import { Stack, styled, Typography } from "@mui/material";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SubpageTitle } from "../components/share/SubpageTitle";
import { crew } from "../constants/crew";
import { useMove } from "../hooks/useMove";
import { fadeIn } from "../utils/animations";
import { useRootBackground } from "../hooks/useRootBackground";
import React from "react";

const Image = styled("img")`
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	object-position: bottom center;
`;
const SliderDot = styled("div")`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: white;
	transition: 300ms ease-in-out opacity;
	${({ theme: { breakpoints } }) => breakpoints.up("desktop")} {
		width: 15px;
		height: 15px;
	}
`;
const SliderDotWrapper = styled("button")`
	padding: 8px;
	&:not(.active) > * {
		opacity: 0.25;
		&:hover {
			opacity: 0.75;
		}
	}
`;
export const Crew = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const timerId = useRef<number | undefined>(undefined);
	const countAnimations = useRef<number>(0);
	const [slideIndex, setSlideIndex] = useState(0);
	const slideIndexHandler = (index: number | ((index: number) => number)) => {
		index = typeof index === "number" ? index : index(slideIndex);
		if (index > crew.length - 1) return setSlideIndex(0);
		if (index < 0) return setSlideIndex(crew.length - 1);
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
		useRootBackground("crew");
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
		endXHandler: (a) => {
			console.log(a);
			setSlideIndex((prev) => prev++);
		},
		maxX: 200,
	});
	return (
		<Stack maxWidth={1200} width="90%" mx="auto">
			<SubpageTitle number={2}>Meet your crew</SubpageTitle>
			<Stack
				direction={{ desktop: "row" }}
				px={24}
				pt={24}
				flexGrow={1}
				alignItems={{ desktop: "flex-end", xs: "center" }}
				spacing={{ xs: 32, desktop: 130 }}
				ref={wrapperRef}
			>
				<Stack
					width={0.5}
					alignSelf="center"
					alignItems={{ xs: "center", tablet: "stretch" }}
				>
					{crew.map(({ firstName, lastName, description, status }, index) => {
						const fullName = [
							firstName.toUpperCase(),
							lastName.toUpperCase(),
						].join(" ");
						return index === slideIndex ? (
							<Fragment key={index}>
								<Typography
									variant="h4"
									mb={14}
									className="animate"
									textAlign={{ xs: "center", desktop: "left" }}
								>
									{status.toUpperCase()}
								</Typography>
								<Typography
									variant="h3"
									mb={26}
									className="animate"
									textAlign={{ xs: "center", desktop: "left" }}
								>
									{fullName}
								</Typography>
								<Typography
									variant="body"
									className="animate"
									textAlign={{ xs: "center", desktop: "left" }}
								>
									{description}
								</Typography>
							</Fragment>
						) : (
							<Fragment key={index}></Fragment>
						);
					})}
					<Stack
						direction="row"
						spacing={16}
						mt={{ xs: 12, desktop: 48 }}
						justifyContent={{ xs: "center", desktop: "flex-start" }}
						className={countAnimations.current === 0 ? "animate" : undefined}
					>
						{crew.map((_, index) => {
							return (
								<SliderDotWrapper
									key={index}
									className={index === slideIndex ? "active" : undefined}
									onClick={() => slideIndexHandler(index)}
									onMouseEnter={() => clearAutoSlider()}
									onMouseLeave={() => restartAutoSlider()}
								>
									<SliderDot />
								</SliderDotWrapper>
							);
						})}
					</Stack>
				</Stack>

				<Stack
					width={0.5}
					height={{ xs: 225, tablet: 570, desktop: 680 }}
					justifyContent="flex-end"
					alignItems="center"
					overflow="hidden"
					order={{ xs: -1, mobile: "unset" }}
				>
					{crew.map(({ image }, index) => {
						return index === slideIndex ? (
							<Image
								src={image}
								alt="crew member"
								key={index}
								className="animate"
							/>
						) : (
							<Fragment key={index}></Fragment>
						);
					})}
				</Stack>
			</Stack>
		</Stack>
	);
};
