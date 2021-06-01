import './App.css';
import React, { useState } from 'react';

// validator 유효성 검사를 위해서 추가 
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  }
  return {value, onChange}
};

function App() {
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  const MaxLen = (value) => value.length <= 10;
  const name = useInput("Mr.",MaxLen);
  
  
  return (
    <div className="App">
    <h1>Create React App { item }</h1>
    <h2>Start editomng to see some magic happen!</h2>
    <button onClick={incrementItem}>+</button>
      <button onClick={decrementItem}>-</button>
      <br />
      <br/>
      <input placeholder="Name" {...name}/>
    </div>
    );
  }

  
  export default App;
  
  /*
  
  class AppUgly extends React.Component {
  
    state = {
      item : 1 
    }
  
    render() {
      const { item } = this.state;
      return (
      <div className="App">
      <h1>Create React App { item }</h1>
      <h2>Start editomng to see some magic happen!</h2>
      <button onClick={this.incrementItem}>+</button>
      <button onClick={this.decrementItem}>-</button>
      </div>
      );
    }
  
    incrementItem = () => {
      this.setState(state => {
        return {
          item: state.item + 1 
        }
      });
    }
    
    decrementItem = () => {
      this.setState(state => {
        return {
          item: state.item - 1 
        }
      });
    }
  
  }
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
  
  class App extends React.Component {
  
  }
  */