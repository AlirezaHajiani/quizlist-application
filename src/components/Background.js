import React from "react";
import {COLORS} from '../config/colors.js'
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Background(props) {
  return(
    <>
    <LinearGradient
      colors={[COLORS.bluelight, COLORS.blue]}
      style={styles.linearGradient}>
      <SafeAreaView>
          {props.children}
      </SafeAreaView>
    </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
  flex: 1,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  },
});

export default Background;
