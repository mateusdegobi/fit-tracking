import { SharedValue } from 'react-native-reanimated';

export type BottomSheetRef = {
  toggleMaxMinHeight: () => void;
  minimizeHeight: () => void;
  maximizeHeight: () => void;
  translationY: SharedValue<number>;
};

export type BottomSheetProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  isFixed?: boolean;
};
