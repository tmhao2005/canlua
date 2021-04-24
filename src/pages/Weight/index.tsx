import React, {
 useContext, useMemo, useEffect, useState
} from 'react';
import {
 StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, Platform, StatusBar, Keyboard
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
import { Theme } from '../../components/Theme';
import { useHeaderHeight } from '@react-navigation/stack';

interface Props {
  navigation: any;
}

export const Weight: React.FunctionComponent<Props> = ({navigation}) => {
  const history = useHistory();
  const {colors} = useContext(Theme)
  const {weights, setWeights} = useContext(AppContext);
  const inputRef = React.useRef<any>();
  const scrollViewRef = React.useRef<ScrollView | null>(null);
  const [value, setValue] = React.useState<string>('');
  const [editWeight, setEditWeight] = React.useState<WeightValue | undefined>();

  const headerHeight = useHeaderHeight();

  useEffect(() => {
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

    scrollViewRef.current?.scrollToEnd({
      animated: true,
    });
  }

  function handleEditFinish(newValue: WeightValue) {
    const newArray = replace<WeightValue>(weights, elem => elem.id === newValue.id, newValue);
    setWeights?.(newArray);    
    setEditWeight(void 0);
  }

  function handleBlur() {
    setEditWeight(void 0);
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
        {/* <Header style={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: "700"
          }}>
            Cân mã
          </Text>
        </Header> */}

        <KeyboardAvoidingView 
          keyboardVerticalOffset={headerHeight}
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{
            flex: 1,
            flexDirection: 'column',
            // borderWidth: 2,
            // borderColor: 'blue',
          }}>
          <View style={styles.container}>
            <ScrollView ref={scrollViewRef} onContentSizeChange={handleContentSizeChange}>
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

            {/* {groups.length < 1 && (
              <View style={{
                justifyContent: "center",
                alignItems: 'center',
                flex: 1,
              }}>
                <Text style={{ fontSize: 22, color: colors.faded }}>
                  Thêm vài mã đi bạn ơi :)
                </Text>
              </View>
            )} */}
            
            <View style={{
              justifyContent: 'flex-end',
              overflow: 'hidden'
              // borderColor: 'yellow',
              // borderWidth: 2
            }}>
              <View style={{
                padding: 12
              }}>
                <WeightInput 
                  ref={inputRef} 
                  value={value}
                  style={{
                    minHeight: 48,
                    fontSize: 26,
                  }}
                  placeholder="Nhập mã..."
                  onChangeText={setValue} 
                  onFinish={handleFinish} 
                />
              </View>

              {/* <Button style={{
                borderRadius: 0,
              }} color="accent" onPress={() => history.push('/payment')}>
                Tính tiền
              </Button> */}

              <Button style={{
                borderRadius: 0,
              }} color="accent" onPress={() => navigation.navigate('Payment')}>
                Tính tiền
              </Button>
            </View>          
          </View>
        </KeyboardAvoidingView>
        
      </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    // marginBottom: 20,
    // borderColor: "red",
    borderWidth: 2,
  },
  weightTable: {
    flexBasis: `32%`,
    flexShrink: 1,
    flexGrow: 0,
    minHeight: 100,
    marginBottom: '2%',
  }
});
