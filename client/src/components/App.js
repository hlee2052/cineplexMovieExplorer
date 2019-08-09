import React from 'react';
import MainContainer from './MainContainer';
import InputText from './InputText'
import Title from './Title'
import Chat from "./Chat";
import MainStructures from "./MainStructures";


const App = () => {   //this is how you make a functional component
    return (
            <div>
                <Title/>
               <MainStructures/>
            </div>
    );
};

export default App;