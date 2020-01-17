import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import './Palette.css'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import { withStyles } from '@material-ui/styles'

const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    colors: {
        height: "90%"
    }
}

class Palette extends Component {

    state = {
        level: 500,
        format: "hex"
    }

    changeLevel = level => {
        this.setState({ level })
    }

    changeFormat = val => {
        this.setState({ format: val })
    }

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette
        const { classes } = this.props
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color => {
            return <ColorBox background={color[format]} name={color.name} key={color.id} moreUrl={`/palette/${id}/${color.id}`} showingFullPalette={true}></ColorBox>
        })
        return (
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
            </div>
        )
    }
}

export default withStyles(styles)(Palette)