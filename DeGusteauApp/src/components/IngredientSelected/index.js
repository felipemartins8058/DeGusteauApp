import React from 'react'
import { Image, TouchableOpacity, StyleSheet, Text } from 'react-native'

export default function IngredientSelected({id, nome, isSelected, media, filename, onPressedItem}){
    return(
        <TouchableOpacity style={styles.btn} onPress={() => onPressedItem(id)}>
            <Image style={styles.img} source={{uri: `http://18.230.138.105:5000/image/${filename}`}} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        marginBottom: 32
    },
    img:{
        width: 80,
        height: 80,
    }
})