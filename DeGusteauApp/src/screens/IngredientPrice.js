/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export function IngredientPrice({navigation,route, navigation: { goBack }}) {

    const [isLoadingIngrediente, setLoadingIngrediente] = useState(true);
    const [ingredienteData, setIngredienteData] = useState([]);
    console.log(ingredienteData);

    const getIngrediente = async () => {
        try {
            const response = await fetch(`http://18.230.138.105:5000/ingredientes/${route.params.id_ingrediente}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }}
            );
            const json = await response.json();
            setIngredienteData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingIngrediente(false);
        }
    };

    useEffect(() => {
        getIngrediente();
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>

            <View style={{ flex: 1, padding: 24 }}>
                <View style={{ flex: 1, width: '100%', flexDirection: 'row',alignItems: 'center'}}>
                    <TouchableHighlight style={{ borderRadius: 50, padding: 8}} underlayColor="#FFEECA" activeOpacity={0.8} onPress={() => goBack()}>  
                        <Icon name='leftcircleo' color={'#F54749'} size={24} />
                    </TouchableHighlight>

                    <Text style={{color: '#444', fontSize: 32}}> {route.params.nome_ingrediente.toUpperCase()}:</Text>
                </View>
                

                <Text style={{color: '#444', fontSize: 22}}>Locais:</Text>
                {isLoadingIngrediente ? <ActivityIndicator/> : (
                <FlatList
                    data={ingredienteData}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                    <>
                    <Text style={{color: '#444'}} >• {item.nome}</Text>
                    <Text style={{color: '#444'}} >R$ {item.valor} - {item.unidade}</Text>
                    <Text style={{color: '#444'}} >{item.local_logradouro}, {item.local_numero}{'\n'}</Text>
                    </>
                    )}
                />
                )}
            </View>
        </View>
    );
}