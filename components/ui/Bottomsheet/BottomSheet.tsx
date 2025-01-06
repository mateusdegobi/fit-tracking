import { ModalProps } from 'react-native';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Grabber } from './components/Grabber';
import { ContainerBottomsheet } from '../../screens/GroupFeed/screens/PostDetails/styles';
import { GestureDetector } from 'react-native-gesture-handler';
import { useBottomSheetAnimationController } from '../../screens/GroupFeed/screens/PostDetails/hooks/useBottomSheetAnimationController';
import { useAnimatedStyle } from 'react-native-reanimated';

type BottomSheetProps = {
  isFixed?: boolean;
} & ModalProps;

const BottomSheet = forwardRef(({ visible, children }: BottomSheetProps, ref) => {
  const {
    bottomSheetSlideGesture,
    maximizeHeight,
    minimizeHeight,
    toggleMaxMinHeight,
    translationY,
  } = useBottomSheetAnimationController();

  useImperativeHandle(ref, () => ({
    bottomSheetSlideGesture,
    toggleMaxMinHeight,
    minimizeHeight,
    maximizeHeight,
    translationY: translationY.value,
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value }],
  }));

  if (!visible) {
    return null;
  }

  return (
    <ContainerBottomsheet style={animatedStyle}>
      <GestureDetector gesture={bottomSheetSlideGesture}>
        <Grabber />
      </GestureDetector>
      {children}
    </ContainerBottomsheet>
  );
});

export default BottomSheet;
