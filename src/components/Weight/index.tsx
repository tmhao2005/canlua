import React from 'react';
import {
 View, Text, Easing
} from 'react-native';
import Animated from 'react-native-reanimated';
import { usePrevious } from '../../hooks/usePrevious';
import { WeightInput } from '../WeightInput';

export interface WeightValue {
  id: number
  value: number
}

export interface Props {
  weight: WeightValue;
  active?: boolean;
  onEdit?: (weight: WeightValue) => any;
  onEditFinish?: (weight: WeightValue) => any;
  onBlur?: () => any;
}

const WeightComponent: React.ForwardRefRenderFunction<any, Props> = ({weight, onBlur, onEdit, onEditFinish}, ref) => {
  const inputRef = React.useRef<any>();
  const [edit, setEdit] = React.useState<boolean>(false);
  const [animate, setAnimate] = React.useState<boolean>(false);
  const prevEdit = usePrevious(edit);
  
  const animateText = new Animated.Value(26);

  React.useEffect(() => {
    if (typeof prevEdit !== 'undefined' && prevEdit !== edit && !edit) {
      setAnimate(true);
    }
  }, [edit]);

  React.useEffect(() => {
    if (animate) {
      Animated.timing(
        animateText, 
        {
          toValue: 14,
          duration: 1000,
          easing: Easing.linear as any,
        }
      ).start(() => setAnimate(false))
    }
  }, [animate])

  function handlePress() {
    onEdit?.(weight);
    setEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  }

  function handleFinish(value: number) {
    setEdit(false);
    onEditFinish?.({
      ...weight,
      value,
    });
  }

  function handleBlur() {
    setEdit(false);
    onBlur?.();
  }

  return (
    <View style={{
      minHeight: 32,
      position: "relative",
      paddingHorizontal: 12,
      paddingVertical: 8,
    }}>
      {edit ? (
        <View style={{
          position: "absolute",
          zIndex: 1000,
          top: -9,
          // left: 0,
          // right: 0,
          // height: 60,
          // borderColor: "red",
          // borderWidth: 1,
        }}>
          <WeightInput ref={inputRef} defaultValue={`${weight.value}`} onFinish={handleFinish} onBlur={handleBlur} />
        </View>
      ) : (
        animate ? (
          <Animated.Text style={{
            position: "absolute",
            paddingVertical: 8,
            paddingHorizontal: 12,
            fontSize: animateText,
          }} >{weight.value}</Animated.Text>
        ) : (
          <Text style={{
            fontSize: 14,
          }} onPress={handlePress}>{weight.value}</Text>
        )
      )}
    </View>
  );
};

export const Weight = React.forwardRef(WeightComponent);
