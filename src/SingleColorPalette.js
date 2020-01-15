import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter'

export default class SingleColorPalette extends Component {

    state = {
        format: "hex"
    }

    constructor(props) {
        super(props)
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        console.log(this._shades)
    }

    changeFormat = val => {
        this.setState({ format: val })
    }

    gatherShades = (palette, colorToFilterBy) => {
        //return all shades of given color
        let shades = []
        let allColors = palette.colors
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }

        return shades.slice(1)
    }

    render() {
        const { format } = this.state
        const { paletteName, emoji } = this.props.palette
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.id}
                name={color.name}
                background={color[format]}
                showLink={false}>
            </ColorBox>
        ))
        return (
            <div className="Palette">
                <Navbar handleChange={this.changeFormat} showingAllColors={false}></Navbar>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
            </div>


        )
    }
}
