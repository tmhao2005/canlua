import React from 'react';
import {
 View, Text, ViewStyle
} from 'react-native';
import { NUM_OF_ITEMS } from '../../constant';
import { sum } from '../../utils';
import { Theme } from '../Theme';
import {
 Weight, Props as WeightProps, WeightValue
} from '../Weight';

interface Props extends Omit<WeightProps, 'weight'> {
  weights: WeightValue[];
  style?: ViewStyle;
  // onEdit?: WeightProps['onEdit'];
  // onEditFinish?: WeightProps['onEditFinish'];
}

export const WeightTable: React.FunctionComponent<Props> = ({weights, style, ...rest}) => {
  const {colors} = React.useContext(Theme);

  return (
    <View style={{
      borderRadius: 8,
      backgroundColor: colors.faint,
      borderColor: colors.faint,
      borderWidth: 1,
      flexDirection: "column",
      // alignItems: "center",
      ...style,
    }}
    >
      {Array.from({
        length: NUM_OF_ITEMS
      }).map((_, idx) => {
        const weight = weights[idx];

        return (
          <View key={idx}>
            {weight ? <Weight weight={weight} {...rest} /> : <View style={{
              backgroundColor: colors.faint,
              minHeight: 40,
            }} />}
          </View>
        );
      })}

      <View style={{
        width: '100%',
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: colors.muted,
      }}
      />

      <View style={{
        // minHeight: 40,
        padding: 8,
      }}
      >
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
        }}>
          {sum(weights)}
        </Text>
      </View>
    </View>
  );
};

