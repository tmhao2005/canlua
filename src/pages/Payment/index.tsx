import React from 'react';
import {
 StyleSheet, View, Text
} from 'react-native';
import {
 Container, Header
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'react-router-native';

export function Payment() {
  return (
    <Container>
        <Header style={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}>
          <View style={{
            marginRight: 8,
          }}>
            <Link to="/weight">
              <AntDesign name="left" size={24} />
            </Link>
          </View>
          <Text style={{
            fontSize: 28,
            fontWeight: "700"
          }}>
            Tính tiền
          </Text>
        </Header>

        <View style={styles.container}>
          <Text>The payment view</Text>
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
