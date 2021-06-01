import './App.css';
import React, { useState, useEffect, useRef } from 'react';

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

const content = [
  {
    tab: "Section 1",
    content: "I'm the content of Section1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of Section2"
  },
  {
    tab: "Section 3",
    content: "I'm the content of Section3"
  }

];

const useTabs = (initialTab, allTabs) => {
  // if (!allTabs || !Array.isArray(allTabs)) {
  //   return;
  // }
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex]
  };
};

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  }
  useEffect(updateTitle, [title]);
  return setTitle;
};

const useClick = (onClick) => {

  // if (typeof onclick !== "function") {
  //   return;
  // }
  const element = useRef(); // reference
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick)
      }
    };
  }, []);
  return element;
}

const useConfirm = (message = "", callback, rejection) => {
  // if (typeof callback !== fuction) {
  //   return;
  // }
  const confirmAction = () => {
    if (window.confirm(message)) {
      callback();
    } else {
      rejection();
    }
  }
  return confirmAction;
}

function App() {
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  const MaxLen = (value) => value.length <= 10;
  const name = useInput("Mr.",MaxLen);
  
  const {currentItem} = useTabs(0, content);
  
  const sayHello = () => console.log("sayHello");
  // useEffect(() => {
  //   sayHello();
  // });
  const [number1, setNumber ] = useState(0);
  const [aNumber1, setAnumber] = useState(0);
  // useffect , 첫 번째 인자로 실행시킬 함수를 받고, 두 번째는 값 변경을 감지할 변수 ...  [] 안의 변수가 변경될 때만 실행되게 할 수 있다...
  // componentDidMount, ComponentWillUnMount, ComponentDidUpdate 등의 변화를 감지할 수 있다...
  useEffect(sayHello, [number1]);
  const titleUpdater = useTitle("Loading...");

  const potato = useRef();

  const titleClick = useClick(sayHello);

  const deleteWorld = () => console.log("Click Deleting the World!!!");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure", deleteWorld, abort);
  return (
    <div className="App">
    <h1>Create React App { item }</h1>
    <h2>Start editomng to see some magic happen!</h2>
    <button onClick={incrementItem}>+</button>
      <button onClick={decrementItem}>-</button>
      <br />
      <br/>
      <input placeholder="Name" {...name} />
      <br/>
      <br/>
      <div>
        {content.map(section => <button>{section.tab}</button>)}
      </div>
      <div>
        <h5>{ currentItem.content }</h5>
      </div>
      <div>
        <button onClick={() => setNumber(number1 + 1)}> { number1 }</button>
        <button onClick={() => setAnumber(aNumber1 + 1)}> { aNumber1 }</button>
      </div>
      <div>
        <br></br>
        <input ref={potato} placeholder="la" />
        <h1 ref={titleClick}>Hi</h1>
        <br></br>
        <button onClick={confirmDelete}>Delete the world</button>
      </div>
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