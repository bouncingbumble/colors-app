import React, { Component } from 'react';
import { ChromePicker } from 'react-color'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {

    state = {
        currentColor: "teal",
        newColorName: '',
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => (
            this.props.colors.every(({ name }) => (
                name.toLowerCase() !== value.toLowerCase()
            ))))
        ValidatorForm.addValidationRule('isColorUnique', () => (
            this.props.colors.every(({ color }) => (
                color !== this.state.currentColor
            ))))
    }

    updateCurrentColor = colorObj => {
        this.setState({ currentColor: colorObj.hex })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.setState({ newColorName: '' })
    }

    render() {
        const { paletteIsFull, classes } = this.props
        const { currentColor, newColorName } = this.state

        return (
            <>
                <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor}
                    className={classes.picker} />
                <ValidatorForm
                    label="Palette Name"
                    onSubmit={this.handleSubmit}
                    ref="form"
                >
                    <TextValidator
                        name='newColorName'
                        variant="filled"
                        margin='normal'
                        value={newColorName}
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['this field is required', 'color name must be unique', 'color already used']}
                        className={classes.colorNameInput}
                        placeholder="Color Name"
                    />
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: paletteIsFull ? 'grey' : currentColor
                        }}
                        type="submit"
                        disabled={paletteIsFull}
                        className={classes.addColorBtn}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </>
        )
    }
}

export default withStyles(styles)(ColorPickerForm)
