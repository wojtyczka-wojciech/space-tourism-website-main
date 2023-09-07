import gsap from "gsap";

type Target<K extends HTMLElement = HTMLElement> = NodeListOf<K> | Array<K>;
type FunctionWithTarget = (target: Target, ...props: any) => gsap.core.Tween;
gsap.defaults({
	ease: "sine.inOut",
});

export const fadeInAndTransform: FunctionWithTarget = (target) => {
	const translateYValue = 25;
	const duration = 0.6;

	return gsap.fromTo(
		target,
		{
			opacity: 0,
			onStart: () =>
				target.forEach((item) =>
					item.style.setProperty(
						"transform",
						`translateY(-${translateYValue}px))`,
					),
				),
		},
		{
			opacity: 1,
			onUpdate: function () {
				const progress: number = this.progress();
				target.forEach((item) =>
					item.style.setProperty(
						"transform",
						`translateY(${
							-translateYValue + translateYValue * progress
						}px)`,
					),
				);
			},
			duration,
			stagger: {
				each: 0.3,
			},
			delay: 0.3,
		},
	);
};

export const fadeIn: FunctionWithTarget = (
	target,
	options?: { duration: number },
) => {
	const duration = options && options.duration ? options.duration : 0.6;
	return gsap.fromTo(
		target,
		{ opacity: 0 },
		{ opacity: 1, duration, stagger: { each: duration / 2 } },
	);
};

export default { fadeInAndTransform };
