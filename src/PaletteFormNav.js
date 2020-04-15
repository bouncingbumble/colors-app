import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from "./styles/PaletteFormNavStyles"

class PaletteFormNav extends Component {

    state = {
        newPaletteName: "",
        isFormOpen: false
    }

    showForm = () => {
        this.setState({ isFormOpen: true })
    }

    hideForm = () => {
        this.setState({ isFormOpen: false })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { classes, open, handleSubmit, palettes } = this.props
        const { newPaletteName } = this.state

        return (
            <div className={classes.root}>
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
                            Create a Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                            className={classes.button}
                        >
                            <Link to='/'>
                                Go Back
                        </Link>
                        </Button>

                        <Button className={classes.button} variant="contained" color="primary" onClick={this.showForm}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {this.state.isFormOpen &&
                    <PaletteMetaForm
                        palettes={palettes}
                        handleSubmit={this.props.handleSubmit}
                        hideForm={this.hideForm}
                    >
                    </PaletteMetaForm>
                }
            </div>
        )
    }
}

export default withStyles(styles)(PaletteFormNav)