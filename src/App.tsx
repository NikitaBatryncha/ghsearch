import './App.css';
import React from 'react';
import Header from "./components/Header/index.tsx"
import Placeholder from './components/Placeholder/index.tsx';
import Body from './components/Body/index.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './store/dataStore.ts';

function App() {
  const toggle = useSelector((state: RootState) => state.toolkit.toggle);

  return (
    <div className="App">
      <Header/>

      {
        toggle ?
          <Body/> :
          <Placeholder/>
      }
    </div>
  );
}

export default App;
