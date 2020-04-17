import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MiniPalette from './MiniPalette'
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"

class PaletteList extends Component {

    state = {
        isDeleteDialogOpen: false,
        id: ''
    }

    handleDelete = () => {
        this.props.deletePalette(this.state.id)
        this.closeDiaglog()
    }

    openDiaglog = id => {
        this.setState({
            id,
            isDeleteDialogOpen: true
        })
    }

    closeDiaglog = () => {
        this.setState({ isDeleteDialogOpen: false, id: '' })
    }

    goToPalette = id => {
        this.props.history.push(`/palette/${id}`)
    }

    render() {
        const { palettes, classes } = this.props
        const { isDeleteDialogOpen } = this.state
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading} >React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition
                                key={palette.id}
                                classNames='fade'
                                timeout={500}>
                                <MiniPalette
                                    {...palette}
                                    handleClick={this.goToPalette}
                                    openDialog={this.openDiaglog}
                                    key={palette.id}
                                    id={palette.id}
                                ></MiniPalette>
                            </CSSTransition>

                        ))}

                    </TransitionGroup>
                </div>
                <Dialog onClose={() => this.closeDiaglog} aria-labelledby="delete-dialog" open={isDeleteDialogOpen}>
                    <DialogTitle id="delete-palette">Delete This Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete} key={1}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={this.closeDiaglog} key={2}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList)