import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import useAxios from "./Hooks/useAxios";
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

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () => window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
}

const useBeforeLeave = (onBefore) => {
  // if (typeof onBefore) {
  //   return;
  // }
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
}

const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return {ref:element, style: {opacity:0}};
}

const useNetwork = onChange => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    }

  },[]);
  return status;
}

const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 });
  const onScroll = () => {
    setState({ y: window.scrollY, x: window.scrollX });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  },[]);
  return state;
}

const useFullscreen = (callback) => {
  const fullScrEl = useRef();
  const triggerFull = () => {
    if (fullScrEl.current) {
      fullScrEl.current.requestFullscreen();
      if (callback && typeof callback === "function") {
        callback(true);
      }
    }
  }
  const exitFull = () => {
    document.exitFullscreen();
    if (callback && typeof callback === "function") {
        callback(false);
      }
  }
  return {fullScrEl, triggerFull , exitFull};
}

const useNotification = (title, options) => {
  // if (!("Notification" in window)) {
  //   console.log("hi")
  //   return;
  // }
  const fireNotif = () => {
    if (Notification.permission !== "granted ") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      })
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
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

  const { enablePrevent, disablePrevent } = usePreventLeave();
  const beforLife = () => console.log("plz don't leave");
  useBeforeLeave(beforLife);
  
  const fadeInH1 = useFadeIn(1,2);
  const fadeInP = useFadeIn(5, 10);
  
  const habdleNetworkChange = (online) => {
    console.log(online ? "we just online" : "offline");
  }
  const onLine = useNetwork(habdleNetworkChange);
  const { y } = useScroll();

  const onFullS = (isFull) => {
    console.log(isFull ? "We are full" : "we are not full");
  }
  const { fullScrEl, triggerFull, exitFull } = useFullscreen(onFullS);
  
  const fireNotif = useNotification("Can I steal your money? thay's no no", { body: "I love money don't you?" });
  const { loading, data, error, refetch } = useAxios({ url: "https://yts.mx/api/v2/list_movies.json" });
  console.log(`Loading: ${loading} \nError: ${error} \nData: ${JSON.stringify(data)} `);
  return (
    <div className="App" style={{height:"1000vh"}}>
      <h1 {...fadeInH1}>Create React App {item}</h1>
      <p {...fadeInP}>akfdjkfjsdjlfnasjnfsjdnfjaksdnf</p>
      <h5>Network status : { onLine ? " OK" : " Fail" }</h5>
    <h5 style={{position: "fixed", color: y > 100 ? "red" : "blue"}}>Start editomng to see some magic happen!</h5>
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
        <br />
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>UnProtect</button>
      </div>
      <div ref={fullScrEl}>
        <img  src="data:image/jpeg;base64,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"></img>
        <button onClick={ exitFull }>Exit Full Screen</button>
      </div>
      <button onClick={triggerFull}>Make Full Screen</button>
      <br />
      <button onClick={fireNotif}>Noti Hi</button>
      <h1>{data && data.status}</h1>
      <h2>{ loading && "Loading..."}</h2>
      <button onClick={refetch}>Refectch</button>
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