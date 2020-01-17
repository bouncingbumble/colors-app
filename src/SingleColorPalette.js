import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import styles from './styles/PaletteStyles'

class SingleColorPalette extends Component {

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
        const { classes } = this.props
        const { format } = this.state
        const { paletteName, emoji, id } = this.props.palette
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.name}
                name={color.name}
                background={color[format]}
                showingFullPalette={false}>
            </ColorBox>
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}></Navbar>
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} >GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette)