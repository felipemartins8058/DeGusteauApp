/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList } from 'react-native';

export function IngredientPrice({navigation,route}) {
    function handleNavigateToHomeScreen() {
        navigation.navigate('HomeScreen');
    }

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
            <Text>Estou na tela do ingrediente unico :</Text>
            <Button title="Go to Home" onPress={handleNavigateToHomeScreen} />

            <View style={{ flex: 1, padding: 24 }}>
                <Text>{route.params.nome_ingrediente.toUpperCase()}:{'\n'}</Text>

                <Text>Locais:{'\n'}</Text>
                {isLoadingIngrediente ? <ActivityIndicator/> : (
                <FlatList
                    data={ingredienteData}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                    <>
                    <Text>• {item.nome}</Text>
                    <Text>R$ {item.valor} - {item.unidade}</Text>
                    <Text>{item.local_logradouro}, {item.local_numero}{'\n'}</Text>
                    </>
                    )}
                />
                )}
            </View>
        </View>
    );
}