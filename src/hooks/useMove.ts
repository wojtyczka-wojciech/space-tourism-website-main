import { useEffect, useState } from "react";

type Options = {
	endXHandler?: (steps: number) => void;
	endYHandler?: (steps: number) => void;
	maxX?: number;
	maxY?: number;
};

export const useMove = <R extends HTMLElement | null = HTMLDivElement>(
	element: R,
	{ endXHandler, endYHandler, maxX, maxY }: Options,
) => {
	const [touchPos, setTouchPos] = useState({
		x: 0,
		y: 0,
	});
	const [isTouched, setIsTouched] = useState(false);
	const touchStartHandler = ({ touches }: TouchEvent) => {
		setTouchPos({ x: touches[0].clientX, y: touches[0].clientY });
		setIsTouched(true);
		addEventListener("touchmove", touchMoveHandler);
		addEventListener("touchend", touchEndHandler);
	};
	const touchMoveHandler = ({
		touches: {
			0: { clientX, clientY },
		},
	}: TouchEvent) => {
		if (isTouched === false) return;
		// const [x, y] = [clientX - touchPos.x, clientY - touchPos.y];
		// if (maxX && xHandler && maxX <= +x) xHandler(x / maxX);
		// if (maxY && xHandler && maxY <= +y) xHandler(y / maxY);
		// setTouchPos({ x: clientX, y: clientY });
	};
	const touchEndHandler = ({
		touches,
	}: TouchEvent) => {
		console.log(touches);
		const [x, y] = [touches[0].clientX - touchPos.x, touches[0].clientY - touchPos.y];
		if (maxX && endXHandler && maxX <= +x) endXHandler(x / maxX);
		if (maxY && endYHandler && maxY <= +y) endYHandler(y / maxY);
		setTouchPos({ x: touches[0].clientX, y: touches[0].clientY });
		removeEventListener("touchmove", touchMoveHandler);
		removeEventListener("touchmove", touchEndHandler);
	};

	useEffect(() => {
		if (element === null || element === undefined) return;
		element.addEventListener("touchstart", touchStartHandler);
		console.log(123);
		return () => {
			if (element) element.removeEventListener("touchstart", touchStartHandler);
		};
	}, [element]);
};
