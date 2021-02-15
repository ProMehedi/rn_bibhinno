import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const BtnLink = ({url, children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
