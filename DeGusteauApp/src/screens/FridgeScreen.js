import React from 'react'
import {SafeAreaView, Text, Button, StatusBar, View, Image, StyleSheet, ImageBackground} from 'react-native'

export function FridgeScreen ({}) {
    return(
        <SafeAreaView style={styles.sar}>
            <StatusBar backgroundColor='#fff' barStyle='transparent' />
            <ImageBackground source={require('../images/fundo.png')} style={styles.view}>
                <Image style={styles.img} source={require('../images/1.png')} />
                <Text style={styles.text}>Esta função estará disponível em breve!</Text>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sar:{
        backgroundColor:'#FFEECA',
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    view:{
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 16,
        width: 320,
        padding: 32,
        justifyContent:'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    img:{
        // height: 300
    },
    text:{
        color: '#444',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 16
    }
})