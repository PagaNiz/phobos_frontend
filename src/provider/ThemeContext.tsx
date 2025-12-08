import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { createContext, useContext, useMemo, useState } from "react";

type ThemeContextType = {
    toggleTheme: () => void;
    mode: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextType>({
    toggleTheme: () => { },
    mode: "dark",
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [mode, setMode] = useState<"light" | "dark">("dark");

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    React.useEffect(() => {
        document.documentElement.setAttribute("data-mode", mode);
    }, [mode]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: "#8004fc",
                    },
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
