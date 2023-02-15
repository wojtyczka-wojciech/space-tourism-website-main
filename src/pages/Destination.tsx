import { Box, Stack, styled, Typography } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { destination } from "../constants/destination";
import "@splidejs/react-splide/css";
import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate, useParams } from "react-router-dom";
const slideDuration = 600;

const PlanetImage = styled("img")`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	object-fit: contain;
	object-position: center;
	opacity: 0;
	transition: ${slideDuration}ms ease-in-out opacity;
	animation: rotate-360 200s linear infinite;
	&.active {
		opacity: 1;
	}
	@keyframes rotate-360 {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const imageSize = {
	xs: 170,
	tablet: 300,
	desktop: 445,
};
const destinationAsArray = Object.entries(destination);

export const Destination = () => {
	const { name } = useParams();
	console.log(name);
	console.log(destinationAsArray.findIndex(([planetName])=>planetName === name) );
	const [slideIndex, setSlideIndex] = useState(name ? destinationAsArray.findIndex(([planetName])=>planetName === name) : 0);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const setSlideIndexHandler = (dispatch: ((n: number) => number) | number) => {
		const result =
			typeof dispatch === "number" ? dispatch : dispatch(slideIndex);
		const length = destinationAsArray.length;
		if (result >= length) return setSlideIndex(0);
		if (result < 0) return setSlideIndex(length - 1);
		setSlideIndex(result);
	};

	useEffect(() => {
		if (!wrapperRef.current) return;
		const current = wrapperRef.current;
		const items = current.querySelectorAll<HTMLElement>(".animate");
		const translateValue = 25;
		const anime = gsap.fromTo(
			items,
			{
				opacity: 0,
				duration: 0,
				onStart: () =>
					items.forEach((item) =>
						item.style.setProperty(
							"transform",
							`translateY(-${translateValue}%) rotateX(-${translateValue}deg)`,
						),
					),
			},
			{
				opacity: 1,
				onUpdate: function () {
					const progress: number = this.progress();
					items.forEach((item) =>
						item.style.setProperty(
							"transform",
							`translateY(${
								-translateValue + translateValue * progress
							}%) rotateX(${-translateValue + translateValue * progress}deg)`,
						),
					);
				},
				duration: slideDuration / 1000,
				stagger: 0.25,
				delay: 0.2,
			},
		);
		return () => {
			anime.revert();
		};
	}, [slideIndex]);

	return (
		<div ref={wrapperRef}>
			<Stack direction="row" p={24} spacing={12}>
				<Typography variant="h5" fontWeight="bold" sx={{ opacity: 0.25 }}>
					01
				</Typography>
				<Typography variant="h5" textTransform="uppercase" letterSpacing={3}>
					pick your destination
				</Typography>
			</Stack>
			<Stack direction={{ xs: "column", desktop: "row" }} mt={{ desktop: 100 }}>
				<Box position="relative" width={imageSize} height={imageSize} mx="auto">
					{destinationAsArray.map(([name, { image }], i) => (
						<PlanetImage
							key={i}
							src={image}
							alt={name}
							className={slideIndex === i ? "active" : undefined}
						/>
					))}
				</Box>
				<Stack
					alignItems="center"
					p={24}
					maxWidth={{ xs: 570, desktop: 444 }}
					mx="auto">
					<Stack direction="row" spacing={32} position="relative" zIndex={1}>
						{destinationAsArray.map(([name], index) => (
							<button
								key={index}
								onClick={() => {
									setSlideIndexHandler(index);
									navigate(name);
								}}>
								<Typography
									variant="nav"
									textTransform="uppercase"
									className={index === slideIndex ? "active" : undefined}
									px={8}
									py={16}
									sx={{
										position: "relative",
										"&::before": {
											content: "''",
											display: "block",
											position: "absolute",
											bottom: 0,
											left: 0,
											right: 0,
											height: "3px",
											backgroundColor: "white",
											opacity: 0,
											transition: "300ms ease-in-out opacity",
										},
										"&:hover::before": {
											opacity: 0.5,
										},
										"&.active::before": {
											opacity: 1,
										},
									}}>
									{name}
								</Typography>
							</button>
						))}
					</Stack>
					{destinationAsArray.map(([name, { description }], index) => {
						return (
							<Stack
								key={index}
								display={index === slideIndex ? undefined : "none"}
								mt={24}>
								<Typography
									variant="h2"
									textAlign="center"
									className={index === slideIndex ? "animate" : undefined}>
									{name}
								</Typography>
								<Typography
									variant="body"
									textAlign="center"
									className={index === slideIndex ? "animate" : undefined}>
									{description}
								</Typography>
							</Stack>
						);
					})}
					<Stack justifyContent="center" spacing={30} width={1} mt={54}>
						<Box
							sx={({ palette }) => ({
								width: 1,
								borderTop: `1px solid ${palette.accent.main}`,
								justifySelf: "stretch",
							})}
							className="animate"
						/>
						<Stack
							direction={{ xs: "column", tablet: "row" }}
							justifyContent="center"
							spacing={30}
							className="animate">
							{destinationAsArray
								.filter((_, index) => slideIndex === index)
								.map(([_, { distance, time }], index) => {
									return (
										<Fragment key={index}>
											<Stack alignItems="center">
												<Typography variant="subtitle2">
													AVG. DISTANCE
												</Typography>
												<Typography
													variant="subtitle1"
													textTransform="uppercase">
													{distance}
												</Typography>
											</Stack>
											<Stack alignItems="center">
												<Typography variant="subtitle2">
													Est. travel time
												</Typography>
												<Typography
													variant="subtitle1"
													textTransform="uppercase">
													{time}
												</Typography>
											</Stack>
										</Fragment>
									);
								})}
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</div>
	);
};
