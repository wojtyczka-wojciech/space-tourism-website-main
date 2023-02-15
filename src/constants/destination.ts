import moon from "../assets/destination/image-moon.webp";
import titan from "../assets/destination/image-titan.webp";
import mars from "../assets/destination/image-mars.webp";
import europa from "../assets/destination/image-europa.webp";

type Planets = "moon" | "titan" | "mars" | "europa";

type DestinationProps = {
	description: string;
	distance: string;
	time: string;
	image: string;
};

export const destination: { [k in Planets]: DestinationProps } = {
	moon: {
		description: "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
		distance: "384,400 km",
		image: moon,
		time: "3 DAYS"
	},
	titan: {
		description: "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
		distance: "1.6 BIL. km",
		image: titan,
		time: "7 YEARS"
	},
	mars: {
		description: "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
		distance: "225 MIL. km",
		image: mars,
		time: "9 MONTHS"
	},
	europa: {
		description: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
		distance: "628 MIL. km",
		image: europa,
		time: "3 YEARS"
	},
};
