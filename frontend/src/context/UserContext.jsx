import React, { createContext, useState } from 'react';

export const UserDataContext= createContext() //think of it like a box that can hold data(like global variable ) that any component can access

const UserContext =({children})=>{
    const[user,setUser]= useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })
    return(
        <div>
            <UserDataContext.Provider value={{user,setUser}}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext