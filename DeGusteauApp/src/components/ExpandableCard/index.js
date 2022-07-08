import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

export default function ExpandableCard({
  id,
  nome,
  tempo_preparo,
  modoPreparo,
  ingredientes,
  navigation,
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [layoutHeight, setLayoutHeight] = React.useState(160);
  const [displayNone, setDisplayNone] = React.useState('none');

  function expandCard() {
    if (!isExpanded) {
      setIsExpanded(true);
      setLayoutHeight(null);
      setDisplayNone(null);
    } else {
      setIsExpanded(false);
      setLayoutHeight(160);
      setDisplayNone('none');
    }
  }

  return (
    <View style={[styles.card, {height: layoutHeight}]}>
      <ImageBackground
        source={require('../../images/imagem.png')}
        style={styles.imageBackground}>
        <View style={styles.gradientView} />
        <View style={styles.timeWrapper}>
          <Icon style={{marginRight: 8}} name="clockcircle" size={16} />
          <Text>{tempo_preparo}</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.cardTitle}>{nome}</Text>
          <Text>Lanche Rápido</Text>
        </View>
      </ImageBackground>

      <View style={{padding: 16, display: displayNone}}>
        <Text style={styles.ingredienteTitle}>Ingredientes</Text>
        <View style={styles.flexGrid}>
          <View >
            {ingredientes.map((ingrediente, key) => (
              <Text style={styles.text} key={key}>
                🍴 {ingrediente}
              </Text>
            ))}
          </View>
          <Button style={styles.btn}
          color="#FDC65E"
            onPress={() => {
              navigation.navigate('RecipeScreen', {id_receita: id});
            }}
            title="Ir para a receita"
          />
        </View>
      </View>

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
    elevation: 5,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 32,
    backgroundColor: '#fff',
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
    width: '100%',
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
  timeWrapper: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    justifyItems: 'center',
    alignContent: 'center',
    padding: 8,
  },
  text: {
    color: '#444',
  },
  ingredienteTitle: {
    color: '#444',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '900',
  },
  flexGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    btn: {
      flex: 1,
    }
});
