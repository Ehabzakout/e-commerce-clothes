import { Moon, Sun } from "lucide-react";

import { Theme, useTheme } from "@/components/darkMode/theme-provider";
import { useState } from "react";

export const ModeToggle = () => {
	const { setTheme, theme } = useTheme();
	const [mode, setMode] = useState(theme);
	function editMode(theme: Theme) {
		setTheme(theme);
		setMode(theme);
	}
	return (
		<>
			{mode === "light" ? (
				<Sun
					onClick={() => editMode("dark")}
					className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
			) : (
				<Moon
					onClick={() => editMode("light")}
					className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
			)}
		</>
	);
};
