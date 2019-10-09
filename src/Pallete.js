import React, { Component } from 'react'
import ColorBox from "./ColorBox";
import './Pallete.css'

class Pallete extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        const colorBoxes = this.props.colors.map(c => {
            return <ColorBox background={c.color} name={c.name}></ColorBox>
        })
        return (
            <div className="Palette">
                <div className="Palette-colors">
                    <h2>Pallete</h2>
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Pallete