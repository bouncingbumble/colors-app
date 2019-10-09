import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import './Pallete.css'
import Navbar from './Navbar'

class Pallete extends Component {

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
        const { colors } = this.props.palette
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color => {
            return <ColorBox background={color[format]} name={color.name}></ColorBox>
        })
        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />
                <div className="Palette-colors">
                    <h2>Pallete</h2>
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Pallete