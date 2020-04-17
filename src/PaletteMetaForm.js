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
        stage: "form",
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

    showEmojiPicker = () => {
        this.setState({ stage: "emoji" })
    }

    savePalette = emoji => {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette)
        this.setState({ stage: "" })
    }

    render() {
        const { newPaletteName } = this.state
        const { hideForm } = this.props

        return (
            <>
                <Dialog open={this.state.stage === 'emoji'} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                    <Picker onSelect={this.savePalette}></Picker>
                </Dialog>
                <Dialog open={this.state.stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
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
            </>
        )
    }
}

export default PaletteMetaForm
