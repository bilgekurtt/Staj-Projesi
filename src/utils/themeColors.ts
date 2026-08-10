export const lightColors = {
    background: "#B6D0E2",
    card: "#FFFFFF",
    input: "#FFFFFF",
    text: "#000000",
    secondaryText: "gray",
    border: "#000000",
};

export const darkColors = {
    background: "#121212",
    card: "#403f3f",
    input: "#2A2A2A",
    text: "#FFFFFF",
    secondaryText: "#AAAAAA",
    border: "#FFFFFF",
};

export function getThemeColors(theme: "light" | "dark") {
    return theme === "dark" ? darkColors : lightColors;
}