//Coding Language - JSX - combination of Javascript and HTML/CSS

//React Native - An open-source mobile framework to create native apps on IOS/Android

//importing all the necessary components
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

//creating class App
export default class App extends React.Component {
  constructor() {
    super();
    this.state={
      user_sentence:'',
      result:'',
      positiveResult:'',
      //setting visibilites of all the components
      isRedLightVisible:false,
      isGreenLightVisible:false,
      isInputAndButtonVisible:true,
      isResultVisible:false,
      isResetVisible:false,
      isPositiveResultVisible:false,
      isPlagiarismTextVisible:false,
      color1:'',
      color2:'',
      color3:'',
      color4:'',
      color5:'',
      split_sentence:'',
      split_sentence2:'',
      split_sentence3:'',
      split_sentence4:'',
      split_sentence5:'',
    }
  }
  //function that posts user-input to the API
  plagiarism = async() => {
    this.setState({isRedLightVisible:true, isResultVisible:true, isPositiveResultVisible:true,isResetVisible:true, isPlagiarismTextVisible:true})
    var data = {user_sentence:this.state.user_sentence}
    let response = await fetch("http://127.0.0.1:5000", { 
        method:'POST',
        headers: {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },  
        body:JSON.stringify(data)
        
      })
      console.log(JSON.stringify(data))
      var responseJson = await response.json();
      console.log(responseJson);
      //converting number returned from API into a rounded number
      var rounded_stringifiedResponse=Math.round(responseJson[0]*100)/100
      console.log('rounded stringified response:'+rounded_stringifiedResponse)
      //getting the unique result
      rounded_stringifiedResponse=rounded_stringifiedResponse*100
      this.setState({result:rounded_stringifiedResponse + '%'})
      var positive_stringifiedResponse=100-rounded_stringifiedResponse
      this.setState({positiveResult:positive_stringifiedResponse + '%'})

      var sentence_response = responseJson[1]
      console.log('sentence response is:'+sentence_response)
      var split_sentence = this.state.user_sentence.split('.')
      this.setState({split_sentence:split_sentence[0], split_sentence2:split_sentence[1], split_sentence3:split_sentence[2], split_sentence4:split_sentence[3], split_sentence5:split_sentence[4]})

      if(sentence_response[0] >= 0.55) {
        var color1 = 'red'
      } else {
        var color1 = '#39FF14'
      }

      if(sentence_response[1] >= 0.55) {
        var color2 = 'red'
      } else {
        var color2 = '#39FF14'
      }
      if(sentence_response[2] >= 0.55) {
        var color3 = 'red'
      } else {
        var color3 = '#39FF14'
      }

      if(sentence_response[3] >= 0.55) {
        var color4 = 'red'
      } else {
        var color4 = '#39FF14'
      }
      if(sentence_response[4] >= 0.55) {
        var color5 = 'red'
      } else {
        var color5 = '#39FF14'
      }
      this.setState({color1:color1, color2:color2, color3:color3, color4:color4, color5:color5,})
  }
//rendering all the components
  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.titleText}>Plagiarism Patrol</Text>
        </View>
        {this.state.isInputAndButtonVisible &&
        <TextInput  placeholder={"type/paste text here"} multiline={true} style={styles.input} onChangeText= {(text) => {
        this.setState({ user_sentence: text});
        }}>
        </TextInput>
        }
        {this.state.isInputAndButtonVisible &&
        <TouchableOpacity style={styles.button}  
        onPress={()=> {
          this.plagiarism()
          this.setState({isInputAndButtonVisible:false})
        }}>
          <Text style={styles.buttonText}> Check
          </Text>
        </TouchableOpacity>
        }
        {this.state.isResetVisible &&
        <TouchableOpacity style={styles.resetButton}  
        onPress={()=> {
          this.setState({isRedLightVisible:false, isGreenLightVisible:false, isYellowLightVisible:false, isInputAndButtonVisible:true, isResultVisible:false, isPositiveResultVisible:false, isResetVisible:false, isPlagiarismTextVisible:false, result:'', positiveResult:'', split_sentence:'',split_sentence2:'',split_sentence3:'',split_sentence4:'',split_sentence5:'', })
        }}>
          <Text style={styles.buttonText}> Reset 
          </Text>
        </TouchableOpacity>
        } 
        {this.state.isPositiveResultVisible &&
        <Text style={{width:70, height:70, borderRadius:70/2, borderWidth:3, borderColor:this.state.isRedLightVisible ? "#39FF14" : "red", paddingTop:15,fontSize:25,textAlign:"center",marginTop:-224,marginBottom:-210,marginLeft:80,color: this.state.isRedLightVisible ? "#39FF14" : "red"}}>{this.state.positiveResult}</Text>        
        } 
        {this.state.isResultVisible &&
        <Text style={{width:70, height:70, borderRadius:70/2, borderWidth:3, borderColor:this.state.isRedLightVisible ? "red" : "#39FF14", paddingTop:15,fontSize:25,textAlign:"center",marginTop:139,marginBottom:-139,marginLeft:-100,color: this.state.isRedLightVisible ? "red" : "#39FF14"}}>{this.state.result}</Text>        
        }
        {this.state.isPlagiarismTextVisible &&
        <Text style={{width:80, height: 20, textAlign:"center", color:"red", fontWeight:"bold", marginTop:140, marginBottom:-140, marginLeft:-100}}>Plagiarised</Text>
        }
        {this.state.isPlagiarismTextVisible &&
        <Text style={{width:50, height: 20, textAlign:"center", color:"#39FF14", fontWeight:"bold", marginTop:120, marginBottom:-120, marginLeft:82}}>Unique</Text> 
        }
        <Text style={{width:330,textAlign:"left",marginTop:215, marginBottom:-320,fontSize:10, fontWeight:'bold', color:this.state.color1}}>{this.state.split_sentence}</Text>
        <Text style={{width:330,textAlign:"left",marginTop:325, marginBottom:-320,fontSize:10, fontWeight:'bold', color:this.state.color2}}>{this.state.split_sentence2}</Text>
        <Text style={{width:330,textAlign:"left",marginTop:325, marginBottom:-320,fontSize:10, fontWeight:'bold', color:this.state.color3}}>{this.state.split_sentence3}</Text>
        <Text style={{width:330,textAlign:"left",marginTop:325, marginBottom:-320,fontSize:10, fontWeight:'bold', color:this.state.color4}}>{this.state.split_sentence4}</Text>
        <Text style={{width:330,textAlign:"left",borderWidth:0,borderLeftColor:"white", borderRightColor:"white",borderTopColor:"white", marginTop:325, marginBottom:-350,fontSize:10, fontWeight:'bold', color:this.state.color5}}>{this.state.split_sentence5}</Text>
        
      </View>
    );
  }
}

//setting the styles of the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize:100,
    textAlign:"center",
    marginTop:200,
    marginBottom:5,
    marginLeft:0,
    color:"#39FF14"
  },
  titleText: {
    fontSize:30,
    textAlign:"center",
    color:"white",
    fontWeight:"bold",
    alignSelf:"center",
    alignItems:"center"
  },
  input: { 
    height: 300,
    width:390,
    margin: 8,
    borderWidth: 2,
    borderColor:"#1261A0",
    padding: 10,
    color:"grey",
    fontWeight:"bold",
    marginLeft:0, 
    marginTop:180,
    marginBottom:-474,
    backgroundColor:'white',
    borderRightColor:"white",
    borderLeftColor:"white"
  },
  button: {
    height: 40,
    width:200,
    borderWidth: 2,
    borderRadius:100,
    borderColor:"#1261A0",
    padding: 10,
    marginLeft:-8,
    marginTop:495,
    marginBottom:-325,
    backgroundColor:'#1261A0'
  },
  view: {
    borderWidth: 2, 
    borderRadius: 10,
    borderColor: '#1261A0',
    width: 500,
    height:150,
    paddingTop:90,
    paddingBottom:-50,
    backgroundColor: '#1261A0',
    marginLeft:0,
    marginTop:-700,
    marginBottom:-160,
  },
  buttonText:{
    textAlign:"center",
    color:"white",
    marginLeft:-5,
    marginTop:-2,
    fontWeight:"bold"
  },
  image:{
    width:50,
    height:150,
    alignItems:"center",
    marginLeft:-100,
    marginTop:0,
    marginBottom:-100,
    borderColor:"grey",
    borderWidth:2,
    borderRadius:10
  },
  resetButton:{
    height: 40,
    width:200,
    borderWidth: 2,
    borderRadius:100,
    borderColor:"#1261A0",
    padding: 10,
    marginLeft:-8,
    marginTop:360,
    marginBottom:70,
    backgroundColor:'#1261A0',
    fontWeight:'bold'
  }
}); 