import { useFonts } from "expo-font";

// Define and export the Rubik Medium font family
export const RubikMediumFont = () => {
  const [loaded] = useFonts({
    "Rubik-Medium": require("../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
  });

  return loaded;
};