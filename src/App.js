import React from 'react';
import Pallete from './Pallete';
import { Route, Switch } from 'react-router-dom'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'

function App() {

    return (
        <Switch>
            <Route exact path="/" render={() => <h1>hello</h1>}></Route>
            <Route exact path="/palette/:id"></Route>
        </Switch>
        // <div className="App">
        //     <Pallete palette={generatePalette(seedColors[4])}></Pallete>
        // </div>
    );
}

export default App;
