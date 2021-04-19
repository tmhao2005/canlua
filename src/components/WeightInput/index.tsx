import React from 'react';
import { TextInputProps } from 'react-native';
import {
TextInputMask, TextInputMaskProps
} from "react-native-masked-text";
import { Theme } from '../Theme';

interface Props extends Omit<TextInputMaskProps, 'type'> {
  style?: TextInputProps
  onFinish?: (value: number) => any;
}

const WeightInputComponent: React.ForwardRefRenderFunction<any, Props> = ({defaultValue, value, onFinish, onChangeText, style, ...rest}, ref) => {
  const [text, setText] = React.useState<string | undefined>(defaultValue || value);
  const {colors} = React.useContext(Theme);
  const inputRef = React.useRef<any>();
  const [timer, setTimer] = React.useState<number>();

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?._inputElement.focus();
    },
    blur: () => {
      inputRef.current?._inputElement.blur();
    },
  }));

  function handleChangeText(text: string) {
    setText(text);
    onChangeText?.(text);
    clearTimeout(timer);
    
    if (text.length >= 2) {
      const id = window.setTimeout(() => {
        onFinish?.(Number(text));
        clearTimeout(timer);
      }, 2000);

      setTimer(id);
    }

    if (text.length === 4) {
      onFinish?.(Number(text));
      clearTimeout(timer);
    }
  }

  // determine controlled or uncontrolled value
  const actualValue = typeof defaultValue === 'undefined' ? value : text;

  return (
    <TextInputMask
      ref={inputRef}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.subtle,
        minHeight: 40,
        minWidth: 80,
        fontSize: 28,
        borderRadius: 4,
        backgroundColor: "white",
        ...style,
      }}
      type="custom"
      value={actualValue}
      onChangeText={handleChangeText}
      placeholder="60.0"
      keyboardType="numeric"
      options={{
        mask: '99.9'
      }}
      {...rest}
    />
  );
};

export const WeightInput = React.forwardRef(WeightInputComponent);
