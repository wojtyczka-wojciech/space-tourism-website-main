import { styled } from "@mui/system";
import logo from "../../assets/shared/logo.svg";

const LogoIcon = styled("img")`
	width: 40px;
	height: 40px;
	${({
		theme: {
			breakpoints: { up },
		},
	}) => up("tablet")} {
		width: 48px;
		height: 48px;
	}
`;

export const Logo = () => {
	return <LogoIcon src={logo} alt="Logo"></LogoIcon>;
};
