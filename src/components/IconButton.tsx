import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../constants/Colors';

type IconButtonProps = {
  iconName: string;
  onPressed: () => void;
  size?: number;
  color?: string;
}

function IconButton({
  iconName,
  onPressed,
  size,
  color,
}: IconButtonProps): JSX.Element {
  return <TouchableOpacity onPress={onPressed}>
    <Ionicons
      style={styles.icon}
      name={iconName}
      size={size ?? 24}
      color={color ?? colors.primary50} />
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 16,
  },
});

export default IconButton;
