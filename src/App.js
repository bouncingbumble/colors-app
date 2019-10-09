import React from 'react';
import Pallete from './Pallete';
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'

function App() {
    console.log(generatePalette(seedColors[4]))
    return (
        <div className="App">
            <Pallete {...seedColors[4]}></Pallete>
        </div>
    );
}

export default App;
