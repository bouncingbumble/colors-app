import React from 'react';
import Palette from './Palette';
import { Route, Switch } from 'react-router-dom'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'

function App() {
    const findPalette = id => {
        return seedColors.find(palette => (palette.id === id))
    }
    return (
        <Switch>
            <Route exact path="/" render={() => <h1>hello</h1>} />
            <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                    <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
                )}
            />
        </Switch>
        // <div className="App">
        //     <Pallete palette={generatePalette(seedColors[4])}></Pallete>
        // </div>
    );
}

export default App;
