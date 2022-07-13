/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button, FlatList, ActivityIndicator, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export function PreferenciasScreen({navigation,route, navigation: { goBack }}) {
    const [checked, setChecked] = useState([]);

    const [tamanho, setTamanho] = useState([]);
    console.log(tamanho);

    const [isLoadingPref, setLoadingPref] = useState(true);
    const [prefData, setPrefData] = useState([]);

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('ArrayPreferencia', jsonValue);
            setTamanho(JSON.parse(jsonValue).checked.length);
            console.log(jsonValue);
        } catch (e) {
          // saving error
        }
    }
    
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('ArrayPreferencia');
            const result = JSON.parse(jsonValue).checked;
            setChecked(result);
            setTamanho(JSON.parse(jsonValue).checked.length);
            return jsonValue != null ? result : null;
        } catch(e) {
          // error reading value
        }
    }

    const getPreferencias = async () => {
        try {
            const response = await fetch('http://18.230.138.105:5000/preferencias');
            const json = await response.json();
            setPrefData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingPref(false);
        }
    };

    useEffect(() => {
        getPreferencias();
        getData();
    }, []);
    
    return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 24}}>

        <View style={{flex: 1}}>
            {isLoadingPref ? (
            <ActivityIndicator />
            ) : (
            <FlatList
                ListHeaderComponent={
                    <View style={{ flex: 1, width: '100%', paddingBottom: 24}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>O que você gosta de cozinhar?</Text>
                        </View>
                        <View style={{flex: 1, paddingTop: 16}}>
                            <Text style={styles.corpo}>Queremos preparar as melhores sugestões para você! </Text>
                        </View>
                    </View>
                }
                data={prefData}
                keyExtractor={({id}, index) => id}
                extraData={checked}
                numColumns={2}
                renderItem={({item}) => (
                    <View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'row',alignItems: 'center'}}>
                        
                        <View style={styles.wrapper}>
                            {Platform.OS === 'ios' ? (
                            <CheckBox
                                tintColors={{ true: '#F15927', false: 'black' }}
                                boxType="square"
                                value={checked.includes(item.id)}
                                onChange={() => {
                                    const newIds = [...checked];
                                    const index = newIds.indexOf(item.id);
                                    if (index > -1) {
                                      newIds.splice(index, 1); 
                                    } else {
                                      newIds.push(item.id)
                                    }
                                    setChecked(newIds)
                                }} 
                            />
                            ) 
                            :
                            (
                            <CheckBox style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                                tintColors={{ true: '#F15927', false: 'black' }}
                                value={checked.includes(item.id)}
                                onChange={() => {
                                    const newIds = [...checked];
                                    const index = newIds.indexOf(item.id);
                                    if (index > -1) {
                                      newIds.splice(index, 1); 
                                    } else {
                                      newIds.push(item.id)
                                    }
                                    setChecked(newIds)
                                }} 
                            />
                            )}
                        
                            <Text style={styles.corpo}>
                                {item.nome[0].toUpperCase() + item.nome.substring(1)}
                            </Text>
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <View style={{marginTop: 36}}>
                        <View style={{flex: 1, backgroundColor: '#fff',alignItems: 'center',width:'100%'}}>
                            <TouchableOpacity disabled={!checked.length > 0}
                                style={!checked.length > 0? styles.appButtonDisabled:styles.appButtonContainer}
                                onPress={() => { storeData({checked}); navigation.navigate('HomeScreen')}}
                            >
                                <Text style={styles.appButtonText}>CONFIRMAR</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={styles.appButtonContainer}
                                onPress={() =>{ getData() }}
                            > 
                                <Text style={styles.appButtonText}>Restaurar</Text>
                            </TouchableOpacity> */}
                        </View>

                        {/* <TouchableOpacity style={styles.appButtonContainer} disabled={!tamanho > 0}
                            onPress={() => navigation.navigate('HomeScreen')} 
                        > 
                            <Text style={styles.appButtonText}>Ir para as receitas</Text>
                        </TouchableOpacity> */}
                    </View>
                }
            />
            )}
        </View>       
    </View>
    );    
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 16,
      paddingTop: 100,
    },
    wrapper: {
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      width:'90%', 
      margin: 5,
      backgroundColor:'#EDEDED',
      borderRadius: 18
    },
    text: {
      lineHeight: 30,
      marginLeft: 10,
    },
    title:{
        fontSize: 32,
        color: '#444'
    },
    corpo:{
      fontSize: 16,
      color: '#444'
    },
    iconFrame: {
      width:'5%',
      aspectRatio: 1
    },
    icon: {
      width:'100%',
      height:'100%'
    },
    appButtonContainer: {
        elevation: 6,
        backgroundColor: "#F54749",
        borderRadius: 20,
        paddingVertical: 10,
        marginBottom: 8,
        width:'50%'
    },
    appButtonDisabled: {
        elevation: 6,
        backgroundColor: "#B7B7B7",
        borderRadius: 20,
        paddingVertical: 10,
        marginBottom: 8,
        width:'50%'
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

