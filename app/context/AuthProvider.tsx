"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged , User} from "firebase/auth";

type AuthContextType = {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({user:null});

export const AuthProvider=({children}:{children: React.ReactNode})=>{
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>
    {
        const unsubscribed = onAuthStateChanged(auth,(user)=>
        {
          setUser(user || null);
        })
        return ()=> unsubscribed();
    },[])
    
    return(
        <AuthContext.Provider value={{user}}>
             {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);