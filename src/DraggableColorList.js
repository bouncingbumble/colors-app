import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import DraggableColorBox from './DraggableColorBox'

function DraggableColorList({ colors, deleteColor }) {
    return (
        <div style={{ height: '100%' }}>
            {colors.map((color, i) => (
                <DraggableColorBox
                    color={color.color}
                    name={color.name}
                    deleteColor={() => deleteColor(color.name)}
                    key={color.name}
                    index={i}
                />
            ))}
        </div>
    )
}

export default SortableContainer(DraggableColorList)
