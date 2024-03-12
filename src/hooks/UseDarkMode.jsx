import React, { useEffect } from 'react';
import { useState } from 'react';

function UseDarkMode() {
    const [theme, setTheme] = useState(localStorage.theme || 'light'); 
    useEffect(() => {
        const colorTheme = theme === 'dark' ? 'light' : 'dark';
        const root = document.documentElement;
        
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const storedTheme = localStorage.theme;
        if (storedTheme !== theme) {
            setTheme(storedTheme || 'light'); 
        }
    }, []);

    return [theme, setTheme];
}

export default UseDarkMode;
