import React, {Component} from 'react';
import styled from 'styled-components'
import music from './docs/audio.mp3'
const Container = styled.div `
width:100%;
min-height:100vh;
background-color: #abe9cd;
background-image: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);

.audio{
  display:none;
}
.title{
  font-size:40px;
  font-family: 'Press Start 2P', cursive;
}

`
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: null,
      timeError: null,
      time_str:''
    }
  }

  play(){
    var audio = document.getElementById("audio");
    audio.play()
  }

  stop(){
    var audio = document.getElementById("audio")
    audio.pause()
    audio.currentTime = 0
  }

  handle_start() {
    var regex = new RegExp("[1-9]+")
    var value = this.state.time_str
    if (regex.test(value) === false) {
      this.setState({timeError: "Thời gian phải là số nguyên dương"})
    } else {
      this.setState({timeError: null})
      this.setState({
        time:parseInt(value,10)
      })
        var count_time = setInterval(()=>{
          this.setState({
            time:this.state.time -1
          })
          if(this.state.time === 0){
            this.setState({
              time:'Time up!'
            })
            clearInterval(count_time)
            this.play()
          }else{
            this.stop()
          }
        },1000)
        count_time
    }
  }

  
  render() {
    return (
      <Container>
        <div className="container">
          <div className="row pt-5">
          <div className="col" style={{textAlign:"center"}}>
          <span className="title">Time Count App</span>
          </div>
          </div>
          <div className="row pt-5">
            <div className="col-3"></div>
            <div className="col-6">
              <input
              id="time_text"
                className="form-control"
                placeholder="Nhập vào thời gian hẹn tính theo giây"
                onChange={event=>{
                  this.setState({
                    time_str:event.target.value
                  })
                }}
                />
              <small
                style={{
                color: "#5e35b1",
                fontSize: "20px"
              }}>
                {this.state.timeError}</small>
            </div>
            <div className="col-3">
              <div className="btn btn-success" onClick= {()=>{this.handle_start()
              document.getElementById('time_text').value = ''  
            }
            
            }>Bắt đầu!</div>
            </div>
          </div>
          <div className="row">
          <div className="col mt-5" style={{textAlign:"center"}}>
          <span style={{fontSize:"70px",color:"#3949ab"}}>{this.state.time}</span>
          </div>
          
          </div>
        </div>
        <audio controls id="audio" className="audio">
  <source src={music} type="audio/mpeg"/>
Your browser does not support the audio element.
</audio>
      </Container>

    );
  }
}

export default App;
