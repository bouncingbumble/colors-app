import React, { Component } from 'react';
import Palette from './Palette';
import { Route, Switch } from 'react-router-dom'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm'

class App extends Component {

    state = {
        palettes: seedColors
    }

    findPalette = id => {
        return this.state.palettes.find(palette => (palette.id === id))
    }

    savePalette = newPalette => {
        this.setState({
            palettes: [...this.state.palettes, newPalette]
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={routeProps => <PaletteList {...routeProps} palettes={this.state.palettes} />} />
                <Route exact path="/palette/new" render={routeProps => <NewPaletteForm savePalette={this.savePalette} {...routeProps} />} />
                <Route
                    exact
                    path="/palette/:id"
                    render={routeProps => (
                        <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                    )}
                />
                <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={routeProps => (
                        <SingleColorPalette
                            colorId={routeProps.match.params.colorId}
                            palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} />
                    )}
                />
            </Switch>
        )
    }

}

export default App;
