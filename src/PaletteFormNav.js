import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

class PaletteFormNav extends Component {

    state = {
        newPaletteName: ""
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
        const { classes, open, handleSubmit } = this.props
        const { newPaletteName } = this.state

        return (
            <>
                <CssBaseline />
                <AppBar
                    color="default"
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                            <TextValidator
                                label='Palette Name'
                                value={newPaletteName}
                                name="newPaletteName"
                                onChange={this.handleChange}
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["Enter Palette Name", "Name already used"]}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Save palette
                            </Button>
                            <Link to='/'>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    type="submit"
                                >Go Back</Button>
                            </Link>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </>
        )
    }
}

export default PaletteFormNav