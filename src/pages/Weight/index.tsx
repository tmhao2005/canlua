import React, {
 useContext, useMemo
} from 'react';
import {
 StyleSheet, View, ScrollView, Text
} from 'react-native';
import {
 Container, Header
} from 'native-base';
import { useHistory } from 'react-router-native';
import { WeightInput } from '../../components/WeightInput';
import { WeightTable } from '../../components/WeightTable';
import { WeightValue } from '../../components/Weight';
import { groupArray, replace } from '../../utils';
import { Button } from '../../components/Button';
import {
 NUM_OF_ITEMS, NUM_OF_TABLE_PER_ROW
} from '../../constant';
import { AppContext } from '../../context/App';

export function Weight() {
  const history = useHistory();
  const {weights, setWeights} = useContext(AppContext);
  const inputRef = React.useRef<any>();
  const scrollViewRef = React.useRef<ScrollView | null>(null);
  const [value, setValue] = React.useState<string>('');
  const [editWeight, setEditWeight] = React.useState<WeightValue | undefined>();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleEditWeight(value: WeightValue) {
    setEditWeight(value);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  function handleFinish(value: number) {
    const id: number = Date.now();
    setWeights?.([
      ...weights,
      {
        id,
        value,
      },
    ]);
    setValue('');
  }

  function handleEditFinish(newValue: WeightValue) {
    const newArray = replace<WeightValue>(weights, elem => elem.id === newValue.id, newValue);
    setWeights?.(newArray);    
    // setEditWeight(void 0);
    // inputRef.current._inputElement.focus();
  }

  function handleBlur() {
    setEditWeight(void 0);
    // inputRef.current._inputElement.focus()
  }

  function handleContentSizeChange() {
    if (!editWeight) {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }
  }

  const groups = useMemo(() => groupArray(weights, NUM_OF_ITEMS), [weights]);
  const k = groups.length % NUM_OF_TABLE_PER_ROW;
  const numberOfSkeletons = k > 0 ? NUM_OF_TABLE_PER_ROW - k : 0;

  return (
    <Container>
        <Header style={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: "700"
          }}>
            Cân mã
          </Text>
        </Header>

        <View style={styles.container}>
          <ScrollView ref={scrollViewRef} style={{}} onContentSizeChange={handleContentSizeChange}>
            <View style={{
              flexDirection: "row",
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 8,
            }}>
              {groups.map((weights, idx) => (
                <WeightTable key={idx} weights={weights} style={styles.weightTable} onEdit={handleEditWeight} onEditFinish={handleEditFinish} onBlur={handleBlur} />
              ))}

              {!!numberOfSkeletons && (
                <View style={{
                  flexBasis: `${Math.round((numberOfSkeletons/NUM_OF_TABLE_PER_ROW) * 100)}%`,
                }} />
                // <>
                //   {Array.from({length: numberOfSkeletons}).map((_, idx) => (
                //     <WeightTable key={`filler-${idx}`} weights={[]} style={styles.weightTable} />
                //   ))}
                // </>
              )}
            </View>
          </ScrollView>
          
          <View style={{
            justifyContent: 'flex-end',
            // borderColor: 'yellow',
            // borderWidth: 2
          }}>
            <View style={{
              padding: 12
            }}>
              <WeightInput ref={inputRef} value={value} placeholder="Nhập mã..." onChangeText={setValue} onFinish={handleFinish} />
            </View>

            <Button color="accent" title="a title" onPress={() => history.push('/payment')}>
              Tính tiền
            </Button>
          </View>
        </View>
      </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    marginBottom: 20,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  weightTable: {
    flexBasis: `32%`,
    flexShrink: 1,
    flexGrow: 0,
    minHeight: 100,
    marginBottom: '2%',
  }
});
