import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

export default function IconMenu(){
    return(
        <View style={styles.container}>
            <Icon name="plus" size={20} color={"#fff"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#F54749',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        elevation: 5
    }
})