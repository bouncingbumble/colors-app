import React from 'react';
import Palette from './Palette';
import { Route, Switch } from 'react-router-dom'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';

function App() {
    const findPalette = id => {
        return seedColors.find(palette => (palette.id === id))
    }
    return (
        <Switch>
            <Route exact path="/" render={routeProps => <PaletteList {...routeProps} palettes={seedColors} />} />
            <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                    <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
                )}
            />
            <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                    <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(findPalette(routeProps.match.params.paletteId))} />
                )}
            />
        </Switch>
    )
}

export default App;
