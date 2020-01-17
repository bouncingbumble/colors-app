import chroma from 'chroma-js'

export default {
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
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        height: "100%",
        width: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)",
    },
    showOverlay: {
        position: "absolute",
        opacity: "1",
        zIndex: "10",
        transform: "scale(50)",
    },
    copyMessage: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        flexDirection: "column",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100",
        }
    },
    showMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: 25,
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s",
    }
}