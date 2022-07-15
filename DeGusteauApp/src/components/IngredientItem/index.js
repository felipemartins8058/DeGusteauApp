import React from 'react'
import { Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native'

export default function IngredientItem({id,nome,media,isSelected, onPressedItem, filename}) {
    
    return(
        <TouchableOpacity style={[styles.wrapper]} onPress={() => onPressedItem(id)} >
            <View style={styles.imgWrapper} >
                <Image style={styles.img} source={{uri: `http://18.230.138.105:5000/image/${filename}`}} />
            </View>
            <View style={styles.inputWrapper} >
                <Text style={styles.text} >{nome.toString().charAt(0).toUpperCase() + nome.toString().slice(1)}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        padding: 8,
        marginBottom: 32,
    },
    imgWrapper:{
        width: "100%",
        alignItems:'center'
    },
    img:{
        width:100,
        height: 100
    },
    inputWrapper: {
        backgroundColor:"#FDC65E",
        padding: 4,
        borderRadius: 8,
        marginTop: -16
    },
    text:{
        color: "#444",
        textAlign: 'center'
    },
})