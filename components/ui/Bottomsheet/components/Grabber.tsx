import { TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components/native';

export function Grabber() {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        padding: 5,
      }}>
      <View
        style={{
          width: 35,
          height: 4,
          backgroundColor: colors.border,
          borderRadius: 2,
          alignSelf: 'center',
        }}
      />
    </TouchableOpacity>
  );
}
