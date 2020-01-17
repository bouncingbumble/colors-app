import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    colors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        opacity: 1,
        backgroundColor: "black",
        "& a": {
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            margin: "-15px 0px 0px -50px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            border: "none",
            textTransform: "uppercase",
            cursor: "pointer",
            color: "white",
            textDecoration: "none",
        }
    }
}


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