import { useCallback, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";

import { IAppearanceProps, IColorSchemeProps, themeType } from "./types";
import { Colors } from "@/constants/Colors";

export function useAppearance(): IAppearanceProps {
  const [currentTheme, setCurrentTheme] = useState<themeType>(
   "dark"
  );

  const handleChangeAppearance = useCallback(
    ({ colorScheme }: IColorSchemeProps) => {
      if (colorScheme) {
        console.log("colorScheme", colorScheme);
        setCurrentTheme(colorScheme);
      }
    },
    []
  );

  useEffect(() => {
    Appearance.addChangeListener(handleChangeAppearance);
    return () => Appearance.addChangeListener(handleChangeAppearance).remove();
  }, [handleChangeAppearance]);

  const theme = useMemo(() => {
    return Colors[currentTheme];
  }, [currentTheme]);
  
  return { currentTheme, theme };
}
