import React, { useState, useEffect, useContext } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
import ThemeSwitch from './components/ThemeSwitch';

import { ThemeContext, ThemeContextProvider } from './context'

function App() {
  const [devs, setDevs] = useState([]);
  
  const {theme: themeContext} = useContext(ThemeContext);

  const [theme, setTheme] = useState(themeContext);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  return (

    <div id="app">
        <ThemeContextProvider value={{themeContext, setTheme}}>

          <div id="header">
            <ThemeSwitch /> 
          </div>

          <div id="content">
            <aside>
              <strong>Cadastrar</strong>
              <DevForm onSubmit={handleAddDev} />
            </aside>

            <main>
              <ul>
                {devs.map(dev => (
                  <DevItem key={dev._id} dev={dev} />
                ))}
              </ul>
            </main>
          </div>

        </ThemeContextProvider>
    </div>
  );
}

export default App;
