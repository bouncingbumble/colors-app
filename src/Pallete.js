import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import './Pallete.css'
import Navbar from './Navbar'

class Pallete extends Component {

    state = {
        level: 500
    }

    changeLevel = level => {
        this.setState({ level })
    }

    render() {
        const { colors } = this.props.palette
        const { level } = this.state
        const colorBoxes = colors[level].map(c => {
            return <ColorBox background={c.hex} name={c.name}></ColorBox>
        })
        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} />
                <div className="Palette-colors">
                    <h2>Pallete</h2>
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Pallete