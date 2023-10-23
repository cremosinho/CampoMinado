import React from 'react';
import { SafeAreaView, StyleSheet,  Text, View, Alert} from 'react-native';
import MineField from './components/MineField';
import Header from './components/Header';
import LevelSelect from './components/LevelSelect';
import { createMinedBoard, cloneBoard, openField, hasExploded, endWinner, showMines, toggleFlag, flagsUsed} from './functions/board';
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
      won: false,
      lost: false,
      showLevelSelect: false

    }
  }

  onOpenField = (row, column) =>{
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExploded(board)
    const won = endWinner(board)

    if(lost){
      showMines(board)
      Alert.alert('Game Over', 'you lost!')
    }

    if(won){
      Alert.alert('Winner!', 'you won!')
    }

    this.setState({board, lost, won})
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    toggleFlag(board, row, column)
    const won = endWinner(board)
    if(won){
      Alert.alert('Winner!', 'you won!')
    }

    this.setState({board, won})

  }

  onLevelSelected = level =>{
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render(){
    return(
      <SafeAreaView>
        <View style={styles.stBar}>
          <Text style={styles.barText}>Campo Minado</Text>
        </View>
        <LevelSelect isVisible={this.state.showLevelSelect}
        onLevelSelected={this.onLevelSelected}
        onCancel={() => this.setState({showLevelSelect : false})}/>
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
        newGame={()=> this.setState(this.createState)}
        onFlagPress={() => this.setState({showLevelSelect : true})}/>
        <View style={styles.container}>
          <View style={styles.board}>
            <MineField board={this.state.board} 
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}/>
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