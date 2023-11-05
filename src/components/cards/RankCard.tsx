import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface RankCardProps {
  isPrimary?: boolean;
  rankNumber: number;
  label: string;
}

interface RankCardStyleProps {
  isPrimary?: boolean;
}

const RankCard = ({isPrimary = false, rankNumber, label}: RankCardProps) => {
  return (
    <View style={styles({isPrimary}).block}>
      <View style={styles({isPrimary}).circle}>
        <Text style={styles({isPrimary}).rankNumber}>{rankNumber}</Text>
      </View>
      <View style={styles({isPrimary}).labelBlock}>
        <Text style={styles({isPrimary}).label}>{label}</Text>
      </View>
    </View>
  );
};

export default RankCard;

const styles = (props: RankCardStyleProps) =>
  StyleSheet.create({
    block: {
      marginHorizontal: 12,
      height: props.isPrimary ? 45 : 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: '#FFFFFF',
      borderRadius: 45,
    },
    circle: {
      position: 'absolute',
      left: 0,
      width: props.isPrimary ? 45 : 30,
      height: props.isPrimary ? 45 : 30,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',

      borderRadius: 45,
    },
    rankNumber: {
      fontSize: props.isPrimary ? 20 : 12,
      color: '#22BCCE',
    },
    labelBlock: {
      flexGrow: 1,
      height: props.isPrimary ? 45 : 30,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: props.isPrimary ? 20 : 12,
      color: '#22BCCE',
    },
  });
