import React from 'react';
import { SafeAreaView, StyleSheet,  Text, View,} from 'react-native';
import MineField from './components/MineField';
import { createMinedBoard } from './functions/board';
import params from './params'

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = this.createState()
  }
  
  minesAmount = () =>{
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () =>{
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return{
      board: createMinedBoard(rows, cols, this.minesAmount()),

    }
  }

  render(){
    return(
      <SafeAreaView>
        <View style={styles.stBar}>
          <Text style={styles.barText}>Campo Minado</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.board}>
            <MineField board={this.state.board}></MineField>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 10,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },

  board:{
    alignItems: 'center',
    backgroundColor: "#AAA"
  },

  stBar:{
    height: 60,
    width: '100%',
    backgroundColor: '#000000b3',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  barText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
})