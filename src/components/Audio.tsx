import { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import soundtrack from "../assets/music/Interstellar Main Theme - Hans Zimmer.mp3";
import React from "react";

export const Audio = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const playAudioHandler = () => {
		if (audioRef.current === null) return;
		audioRef.current.play();
		audioRef.current.volume = 0.25;
	};

	useEffect(() => {
		if (audioRef.current === null || audioRef.current.paused === false) return;
		addEventListener("click", playAudioHandler, { once: true });
	}, [audioRef]);

	return (
		<Fragment>
			{createPortal(
				<audio loop autoPlay hidden ref={audioRef}>
					<source src={soundtrack} type="audio/mpeg" />
				</audio>,
				document.getElementById("music-root") as HTMLElement,
			)}
		</Fragment>
	);
};
