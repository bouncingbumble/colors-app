import React, { Component } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Link } from 'react-router-dom'
import './ColorBox.css'
import chroma from 'chroma-js'
import { withStyles } from '@material-ui/styles'

const styles = {
    ColorBox: {
        width: "20%",
        height: props =>
            props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s",
            cursor: "pointer"
        }
    },
    copyText: {
        color: props =>
            chroma(props.background).luminance() >= 0.72 ? "rgba(0, 0, 0, 0.6)" : "white"
    },
    colorName: {
        color: props =>
            chroma(props.background).luminance() <= 0.085 ? "white" : "rgba(0, 0, 0, 0.6)"
    },
    seeMore: {
        color: props =>
            chroma(props.background).luminance() >= 0.72 ? "rgba(0, 0, 0, 0.6)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase",
    },
    copyButton: {
        color: props =>
            chroma(props.background).luminance() <= 0.085 ? "white" : "rgba(0, 0, 0, 0.6)",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inlineBlock",
        top: "50%",
        left: "50%",
        margin: "-15px 0px 0px -50px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        border: "none",
        textTransform: "uppercase",
        cursor: "pointer",
        textDecoration: "none",
        opacity: 0
    }
}

class ColorBox extends Component {
    state = {
        copied: false
    }

    changeCopyState = () => {
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false })
            }, 1500);
        })
    }
    render() {
        const { name, background, moreUrl, showingFullPalette, classes } = this.props
        const { copied } = this.state

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{ background }}>
                    <div className={`copy-overlay ${copied && 'show'}`} style={{ background }}>

                    </div>
                    <div className={`copy-msg ${copied && 'show'}`} >
                        <h1>copied!</h1>
                        <p className={classes.dynamicText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette &&
                        <Link to={moreUrl} onClick={e => e.stopPropagation}>
                            <span className={classes.seeMore}>More</span>
                        </Link>}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox)
