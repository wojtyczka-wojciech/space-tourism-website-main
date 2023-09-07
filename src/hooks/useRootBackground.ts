type Background = "home" | "destination" | "crew" | "technology";

const root = document.getElementById("root");

export const useRootBackground = (bg?: Background) => {
	if (root === undefined || root === null) return;

	bg === "home" || bg === undefined
		? root.removeAttribute("data-page")
		: root.setAttribute("data-page", bg);
};
