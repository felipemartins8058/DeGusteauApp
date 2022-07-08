import React from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';
import SmallCard from '../SmallCard';

export default function FooterHome({receitasDataArray, navigation}) {
  return (
    <View style={{marginBottom: 16, paddingHorizontal:16}}>
      <Text style={styles.listTitle}>
        <Text style={styles.markup}>Todas</Text> as receitas!
      </Text>

      <FlatList
        data={receitasDataArray}
        numColumns={2}
        keyExtractor={({id}, index) => id}
        renderItem={({item}) => <SmallCard {...item} navigation={navigation} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 24,
    color: '#444',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  markup: {
    color: '#F54749',
  },
});
