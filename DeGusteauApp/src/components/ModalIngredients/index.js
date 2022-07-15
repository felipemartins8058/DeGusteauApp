import React from 'react';
import {ImageBackground, Modal, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import IngredientSelected from '../IngredientSelected';

export default function ModalIngredients({
  modalActive,
  setModalActive,
  choosedList,
  onPressedItem,
}) {
  return (
    <Modal
      onRequestClose={() => setModalActive(false)}
      visible={modalActive}
      animationType="fade"
      transparent={true}>
      <View style={styles.outerView}>
        <ImageBackground source={require('../../images/fundo.png')} style={styles.modalView}>
          <FlatList
            style={{flex: 1, width:'100%'}}
            data={choosedList}
            numColumns={2}
            ListHeaderComponent={
              <Text style={styles.modalTitle} >Itens Selecionados</Text>
            }
            keyExtractor={({nome}, index) => nome}
            renderItem={({item}) => (
              <IngredientSelected {...item} onPressedItem={onPressedItem} />
            )}
          />
          <View style={styles.btnWrapper} >
            <TouchableOpacity style={styles.backBtn} onPress={()=> setModalActive(false)}>
              <Text style={styles.backText} >Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextBtn} >
              <Text style={styles.nextText} >Confirmar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    borderRadius: 16,
    padding: 35,
    width: 310,
    height: 500,
    alignItems: 'center',
    overflow: 'hidden'
  },
  modalTitle:{
    color: '#F54749',
    textAlign: 'center',
    paddingBottom: 32,
    fontSize: 24,
    fontWeight: 'bold'
  },
  btnWrapper:{
    flexDirection: 'row',
  },
  backBtn:{
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginRight: 16
  },
  backText:{
    fontWeight: 'bold',
    color: '#444'
  },
  nextBtn:{
    backgroundColor: '#F54749',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30
  },
  nextText:{
    fontWeight: 'bold',
    color: '#fff'
  }
});
