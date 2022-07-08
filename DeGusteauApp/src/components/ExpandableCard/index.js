import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

export default function ExpandableCard({nome,tempo_preparo, modoPreparo}) {

  const [isExpanded, setIsExpanded] = React.useState(false)
  const [layoutHeight, setLayoutHeight] = React.useState(160)

  function expandCard(){
    if (!isExpanded){
      setIsExpanded(true)
      setLayoutHeight(null)
    } else {
      setIsExpanded(false)
      setLayoutHeight(160)
    }
  }

  

  return (
    <View style={[styles.card, {height: layoutHeight}]}>
      <ImageBackground
        source={require('../../images/imagem.png')}
        style={styles.imageBackground}>
        <View style={styles.gradientView} />
        <View style={styles.timeWrapper}>
          <Icon name='clockcircle' /><Text>{tempo_preparo}</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text>{nome}</Text>
          <Text>😊😋</Text>
        </View>
      </ImageBackground>

      <Text>Ola</Text>
      <Text>Ola</Text>
      <Text>Ola</Text>

      <View style={styles.viewExpandBtn}>
        <TouchableOpacity style={styles.expandBtn} onPress={expandCard}>
          <Icon
            style={styles.icon}
            name="caretdown"
            color={'#ff0000'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    elevation: 2,
    borderRadius: 20,
    padding: 0,
    marginBottom: 32,
    backgroundColor: '#444444',
    position: 'relative',
  },
  viewExpandBtn: {
    position: 'absolute',
    bottom: -10,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 3,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  imageBackground: {
    flex: 0,
    height: 160,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%'
    
  },
  gradientView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(253, 198, 94, 0.44)',
  },
  titleWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  timeWrapper:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 8,
  }
});
