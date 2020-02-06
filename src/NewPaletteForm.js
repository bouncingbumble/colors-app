import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color'
import Button from '@material-ui/core/Button'
import DraggableColorList from './DraggableColorList'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,

    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
})

class NewPaletteForm extends Component {
    state = {
        open: true,
        newColorName: '',
        currentColor: "teal",
        colors: [],
        newPaletteName: ''
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => (
            this.state.colors.every(({ name }) => (
                name.toLowerCase() !== value.toLowerCase()
            ))))
        ValidatorForm.addValidationRule('isColorUnique', () => (
            this.state.colors.every(({ color }) => (
                color !== this.state.currentColor
            ))))

        ValidatorForm.addValidationRule("isPaletteNameUnique", value => (
            this.props.palettes.every(({ paletteName }) => (
                paletteName.toLowerCase() !== value.toLowerCase()
            ))))
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }

    updateCurrentColor = colorObj => {
        this.setState({ currentColor: colorObj.hex })
    }

    addNewColor = () => {
        const newColorName = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }

        this.setState(prevState => ({
            colors: [...prevState.colors, newColorName],
            newColorName: ''
        }))
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        let { newPaletteName } = this.state
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: this.state.colors
        }

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

    render() {
        const { classes } = this.props
        const { currentColor, newColorName, colors, open } = this.state

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
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <TextValidator
                                label='Palette Name'
                                value={this.state.newPaletteName}
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
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
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
                    <Typography variant="h4">
                        Design Your Palette
                </Typography>
                    <div>
                        <Button variant="contained" color="secondary">Clear palette</Button>
                        <Button variant="contained" color="primary">Random Color</Button>
                    </div>
                    <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} />
                    <ValidatorForm
                        label="Palette Name"
                        onSubmit={this.addNewColor}
                        ref="form"
                    >
                        <TextValidator
                            name='newColorName'
                            value={newColorName}
                            onChange={this.handleChange}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['this field is required', 'color name must be unique', 'color already used']}
                        />
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: currentColor
                            }}
                            type="submit"
                        >
                            Add Color
                    </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList colors={colors} deleteColor={this.deleteColor} onSortEnd={this.onSortEnd} axis="xy" />
                </main>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm)
