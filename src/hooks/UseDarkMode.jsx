import React from 'react'
import { useState } from 'react'

function UseDarkMode() {

    const [theme, setTheme] = useState(localStorage.theme);

    const colorTheme =  theme === 'dark' ? "light" : "dark";


    useEffect(() => {

        const root =  window.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme)



     
    }, [colorTheme , theme])


    return [colorTheme , setTheme]
    



  
}

export default UseDarkMode