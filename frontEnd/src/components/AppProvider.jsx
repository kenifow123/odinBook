import { createContext, useEffect, useState } from 'react';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ user, setUser ] = useState(() => (JSON.parse(localStorage.getItem('user'))));
    const [ jwt, setJwt ] = useState(() => (localStorage.getItem('jwt')));
    const [ posts, setPosts ] = useState(null);

    return (
        <AppContext value={{user, setUser, jwt, setJwt, posts, setPosts}}>
            {children}
        </AppContext>
    )
}

