import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface CheckboxProps {
  checked: boolean,
  onChange: (checked: boolean) => void
}

export default function Checkbox({
  checked,
  onChange
}: CheckboxProps) {

  function onCheckmarkPress() {
    onChange(!checked);
  }

  return (
    <Pressable
      style={styles.checkboxBase}
      onPress={onCheckmarkPress}
    >
      {checked &&
        <LinearGradient
          colors={['#57ddff', '#c058f3']}
          style={styles.checkboxBase}
        >
          <Ionicons name="checkmark" size={20} color="white" />
        </LinearGradient>
      }
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
