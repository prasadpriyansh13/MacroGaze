import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

interface NutrientBarProps {
  nutrientName: 'protein' | 'carbs' | 'fat';
  current: number;
  target: number;
}

export const NutrientBar = ({ nutrientName, current, target }: NutrientBarProps) => {
  const progress = Math.min((current / target) * 100, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {nutrientName.charAt(0).toUpperCase() + nutrientName.slice(1)}: {current}g / {target}g
      </Text>
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${progress}%`,
              backgroundColor: colors.nutrientColors[nutrientName]
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  barContainer: {
    height: 12,
    backgroundColor: colors.surface,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
});