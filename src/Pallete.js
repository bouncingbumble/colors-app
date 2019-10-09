import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import './Pallete.css'

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
                <div className="slider">
                    <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={this.changeLevel} />
                </div>
                <div className="Palette-colors">
                    <h2>Pallete</h2>
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Pallete