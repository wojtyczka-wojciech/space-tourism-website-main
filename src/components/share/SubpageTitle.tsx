import { Stack, Typography } from "@mui/material";

interface ISubpageNumber {
	number: number;
}
interface ISubpageTitle extends ISubpageNumber {
	title: string;
	children?: false;
}
interface ISubpageChildren extends ISubpageNumber {
	children: string;
	title?: false;
}

type SubpageProps = ISubpageTitle | ISubpageChildren;

export const SubpageTitle = ({ number, children, title }: SubpageProps) => {
	return (
		<Stack direction="row" p={24} spacing={12} justifyContent={{xs: "center",tablet: "flex-start"}}>
			<Typography variant="h5" fontWeight="bold" sx={{ opacity: 0.25 }} letterSpacing={3}>
				{number.toString().padStart(2, "0")}
			</Typography>
			<Typography variant="h5" textTransform="uppercase" letterSpacing={3}>
				{children || title}
			</Typography>
		</Stack>
	);
};
