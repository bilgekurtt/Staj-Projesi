import { createContext, useState } from "react";
import { useColorScheme } from "react-native";


interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {

    const systemTheme = useColorScheme();

    const [manualTheme, setManualTheme] = useState<"light" | "dark" | null>(null);

    const theme: "light" | "dark" =
        manualTheme ?? (systemTheme === "dark" ? "dark" : "light");

    function toggleTheme() {

        setManualTheme(previous =>
            previous === "light" ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
