import React from 'react'
import { StyleSheet, View, Text, ProgressBarAndroidComponent } from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'

export default class Field extends React.Component{
    styleField = [styles.field]
    color = null
    render(){
        const {mined, opened, nearMines, exploded, flagged} = this.props
        
        if(!opened && !exploded) this.styleField.push(styles.regular)
        if(opened) this.styleField.push(styles.opened)
        if(exploded) this.styleField.push(styles.exploded)
        if(flagged) this.styleField.push(styles.flagged)
        if(nearMines > 0){
            if(nearMines == 1) this.color = '#2a28d7'
            if(nearMines == 2) this.color = '#2b520f'
            if(nearMines > 2 && nearMines < 6) this.color = '#f9060a'
            if(nearMines >= 6) this.color = '#3f221a'
        }

        return(
            <View style={this.styleField}>
                {!mined && opened && nearMines > 0 ? (<Text style={[styles.label, {color: this.color}]}>{nearMines}</Text>) : false}
                {mined && opened ? <Mine/> : false}
                {flagged && !opened? <Flag/> : false}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    field:{
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },

    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#ccc',
        borderTopColor: '#ccc',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },

    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },

    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },

    exploded:{
        backgroundColor: 'red',
        borderColor: 'red'
    }
})