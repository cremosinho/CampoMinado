import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native'

export default props => {
    return(
        <Modal onRequestClose={props.onCancel}
        visible={props.isVisible} animationType='slide'
        transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Selecione o Nível</Text>
                    <TouchableOpacity
                    style={[styles.button, styles.bgEasy]}
                    onPress={()=>props.onLevelSelected(0.1)}>
                        <Text style={styles.buttonLabel}>Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.button, styles.bgNormal]}
                    onPress={()=>props.onLevelSelected(0.2)}>
                        <Text style={styles.buttonLabel}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.button, styles.bgHard]}
                    onPress={()=>props.onLevelSelected(0.3)}>
                        <Text style={styles.buttonLabel}>Difícil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    frame:{
        alignItems: 'center',

    },
    container:{
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold'

    },
    button:{
        marginTop: 10,
        padding: 5,
    },
    buttonLabel:{
        fontSize: 20,
        color: '#eee',
        fontWeight: 'bold'
    },
    bgEasy:{
        backgroundColor: "#49b65d"
    },
    bgNormal:{
        backgroundColor: '#2765f7'
    },
    bgHard:{
        backgroundColor: '#f26337'
    }
})