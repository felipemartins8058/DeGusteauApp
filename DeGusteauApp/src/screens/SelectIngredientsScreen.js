import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IngredientItem from '../components/IngredientItem';
import IngredientSelected from '../components/IngredientSelected';
import IngredientSelectHeader from '../components/IngredientSelectHeader';
import ModalIngredients from '../components/ModalIngredients';

export function SelectIngredientsScreen({navigation}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataList, setDataList] = React.useState([]);
  const [customList, setCustomList] = React.useState([]);
  const [choosedList, setChoosedList] = React.useState([]);
  const [modalActive, setModalActive] = React.useState(false);

  const getIngredientes = async () => {
    try {
      const response = await fetch('http://18.230.138.105:5000/ingredientes')
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          const result = json.map(item => {
            item.isSelected = false;
            return item;
          });
          return result;
        });

      const json = await response;
      setDataList(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getIngredientes();
  }, []);

  React.useEffect(() => {
    if (dataList) {
      let dataListNow = dataList;
      dataListNow.map(i => {
        i.isSelected = false;
      });
      setCustomList(dataListNow);
    }
  }, [dataList]);

  const onPressedItem = id => {
    let customListNow = [...customList];
    for (const item in customListNow) {
      if (customListNow[item].id === id) {
        if (customListNow[item].isSelected === false) {
          customListNow[item].isSelected = true;
          let itemChoosed = customListNow[item];
          // console.log(itemChoosed)
          setChoosedList([...choosedList, itemChoosed]);
          console.log(choosedList);
        } else {
          customListNow[item].isSelected = false;
          let choosedListNow = choosedList.filter(item => item.isSelected);
          setChoosedList(choosedListNow);
          // console.log(choosedListNow)
        }
      }
    }
    setCustomList(customListNow);
  };

  const handleModal = () => {
    modalActive ? setModalActive(false) : setModalActive(true)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        {/* <Modal
          // onRequestClose={() => setModalActive(false)}
          visible={modalActive}
          animationType="fade"
          transparent={true}>
          <View style={styles.outerView}>
            <View style={styles.modalView}>
              <Text style={{color: '#444'}}>Testandooooooooooooooooooo</Text>
            </View>
          </View>
        </Modal> */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{flex: 1}}
          data={dataList}
          extraData={choosedList}
          numColumns={2}
          keyExtractor={({id}, index) => id}
          ListHeaderComponent={<IngredientSelectHeader />}
          renderItem={({item}) => (
            <>
              {/* <Text style={styles.item} onPress={() => {onPressedItem(item.id)}} >
              {item.nome} ________{item.id}_______{choosedList[item]}____ {item.media}
            </Text> */}
              <IngredientItem {...item} onPressedItem={onPressedItem} />
            </>
          )}
        />
      )}
      <ImageBackground
        source={require('../images/backonboard.png')}
        style={{width: 120, padding: 8}}>
        <View style={{alignItems: 'center', marginTop: 32}}>
          <Image source={require('../images/cart.png')} />
          <Text style={{color: '#F54749', marginTop: 8, marginBottom: 32}}>
            Seus itens
          </Text>
        </View>
        <FlatList
          style={{flex: 1}}
          data={choosedList}
          keyExtractor={({nome}, index) => nome}
          renderItem={({item}) => (
            <IngredientSelected {...item} onPressedItem={onPressedItem} />
          )}
        />
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => handleModal()}>
          <Icon name="arrowright" color={'#F54749'} size={40} />
        </TouchableOpacity>
        <ModalIngredients modalActive={modalActive} setModalActive={setModalActive} choosedList={choosedList} onPressedItem={onPressedItem} />
        
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#444',
  },
  item: {
    color: '#fff',
    backgroundColor: '#444',
    marginBottom: 4,
  },
  block: {
    width: 40,
    height: 400,
    backgroundColor: '#0000ff',
    marginBottom: 16,
  },
  blockChecked: {
    width: 40,
    height: 400,
    backgroundColor: '#ff00ff',
    marginBottom: 16,
  },
  btnNext: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
    marginBottom: 16,
  },
  outerView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView:{
    backgroundColor: '#fff',
    borderRadius:3 ,
    padding: 35,
    width: 200,
    alignItems:'center'
  }
});
