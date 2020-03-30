import React, { useContext }  from 'react';

import './styles.css';

import { ThemeContext } from '../../context';

export default function() {
    const {theme, setTheme} = useContext(ThemeContext);

    function changeTheme () {
        setTheme(theme === 'light' ? 'dark' : 'light');

        document.querySelector('body').style.backgroundColor = theme === 'light' ? '#000000e6' : '#E5E6F0';
    }
      
    return (
        <div className="header">
          <div className="theme-container">
            <span>Theme</span> 
            { theme !== 'light' && <button className="theme-option theme-light" onClick={changeTheme}>Ligth</button> }
            { theme !== 'dark' && <button className="theme-option theme-dark" onClick={changeTheme}>Dark</button> }
          </div>
        </div>
    );
}