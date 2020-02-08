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
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: '60px',
        alignItems: 'center'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBtns: {
        marginRight: '1rem'
    },
    button: {
        margin: "0 0.5rem",
        "& a": {
            textDecoration: 'none',
            color: 'white'
        }
    }
})

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
                            Open form dialog
                        </Button>
                    </div>
                </AppBar>
                {this.state.isFormOpen && <PaletteMetaForm palettes={palettes} handleSubmit={this.props.handleSubmit} hideForm={this.hideForm}></PaletteMetaForm>}
            </div>
        )
    }
}

export default withStyles(styles)(PaletteFormNav)