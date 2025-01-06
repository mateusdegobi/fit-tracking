import React, { ForwardedRef, forwardRef } from 'react';
import { Text, TextInput } from 'react-native';
import { TextInputWithLabelProps } from './types';
import { Content, Label, TextInputComp, ViewInfo } from './styles';
import { Colors } from '@/constants/Colors';

function TextInputWithLabel(props: TextInputWithLabelProps, ref: ForwardedRef<TextInput>) {
  return (
    <Content>
      {props.label ? <Label isActive={props?.isActive}>{props.label}</Label> : null}
      <TextInputComp
        {...props}
        ref={ref}
        isError={props.isError}
        placeholderTextColor={Colors.dark.tint}
      />
      <ViewInfo>
        {props?.messageError && props.isError && (
          <Text style={{ color: 'red', fontWeight: 800 }}>{props?.messageError}</Text>
        )}
      </ViewInfo>
    </Content>
  );
}

export default forwardRef(TextInputWithLabel);
