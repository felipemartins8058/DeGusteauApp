import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

export default function HeaderHome(){

    return(
        <View>
            <View>
                <Text style={styles.title}>Olá, <Text>Caio</Text></Text>
                <Text style={styles.title}>Olá, <Text>Caio</Text></Text>
                <Text style={styles.title}>Olá, <Text>Caio</Text></Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Icon name="profile" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper:{
        flex: '1'
    },
    title:{
        fontSize: 32,
        color: '#444'
    }
})