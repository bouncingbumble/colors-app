import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import DraggableColorList from './DraggableColorList'
import { withStyles } from '@material-ui/core/styles';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from "./styles/NewPaletteFormStyles"
import seedColors from "./seedColors"

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }

    state = {
        open: true,
        newColorName: '',
        colors: seedColors[0].colors,
        newPaletteName: ''
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }

    addNewColor = newColor => {
        this.setState(prevState => ({
            colors: [...prevState.colors, newColor],
        }))
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = newPalette => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
        newPalette.colors = this.state.colors

        this.props.savePalette(newPalette)
        this.props.history.push("/")
    }

    deleteColor = name => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== name)
        })
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }))
    }

    clearColors = () => {
        this.setState({ colors: [] })
    }

    addRandomColor = () => {
        //pick rnd color from existing palettes
        const allColors = this.props.palettes.map(p => p.colors).flat()
        let rand
        let randomColor
        let isDuplicateColor = true
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length)
            randomColor = allColors[rand]
            isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name)
        }
        this.setState({ colors: [...this.state.colors, randomColor] })
    }

    render() {
        const { classes, maxColors, palettes } = this.props
        const { currentColor, newColorName, colors, open } = this.state
        const paletteIsFull = colors.length >= maxColors

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom>
                            Design Your Palette
                    </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.clearColors}
                                className={classes.button}
                            >
                                Clear palette
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addRandomColor}
                                disabled={paletteIsFull}
                                className={classes.button}
                            >
                                {paletteIsFull ? "Palette Full" : "Random Color"}
                            </Button>
                        </div>
                        <ColorPickerForm
                            colors={this.state.colors}
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                        />
                    </div>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList colors={colors} deleteColor={this.deleteColor} onSortEnd={this.onSortEnd} distance={20} axis="xy" />
                </main>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm)
