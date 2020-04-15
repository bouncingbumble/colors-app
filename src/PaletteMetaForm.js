import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
    state = {
        newPaletteName: ''
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => (
            this.props.palettes.every(({ paletteName }) => (
                paletteName.toLowerCase() !== value.toLowerCase()
            ))))
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { newPaletteName } = this.state
        const { hideForm, handleSubmit } = this.props

        return (
            <Dialog open onClose={hideForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <Picker></Picker>
                        <TextValidator
                            label='Palette Name'
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={this.handleChange}
                            fullWidth
                            margin='normal'
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Name already used"]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Save palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        )
    }
}

export default PaletteMetaForm
