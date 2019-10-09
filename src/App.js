import React from 'react';
import Pallete from './Pallete';
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'

function App() {

    return (
        <div className="App">
            <Pallete palette={generatePalette(seedColors[4])}></Pallete>
        </div>
    );
}

export default App;
