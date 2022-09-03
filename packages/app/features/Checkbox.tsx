import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, Text } from 'dripsy'
import { LinearGradient } from 'expo-linear-gradient';

interface CheckboxProps {
  checked: boolean,
  onChange: (checked: boolean) => void,
  labelText: string
}

export default function Checkbox({
  checked,
  onChange,
  labelText
}: CheckboxProps) {
  return (
    <Pressable
      sx={{ flexDirection: 'row', alignItems: 'center' }}
      onPress={() => onChange(!checked)}
    >
      {checked ? (
        <LinearGradient
          colors={['#57ddff', '#c058f3']}
          style={styles.checkboxBase}
        >
          <Ionicons name="checkmark" size={20} color="white" />
        </LinearGradient>
      ) : (
        <View style={styles.checkboxBase} />
      )}
      <Text sx={{
        pl: 2,
        fontSize: 14,
        textDecorationLine: checked ? 'line-through' : undefined,
        flex: 1
      }}>
        {labelText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: .1,
    borderColor: '#57ddff',
    backgroundColor: 'transparent',
  }
});
