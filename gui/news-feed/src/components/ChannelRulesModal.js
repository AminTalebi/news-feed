import React, { Component } from "react";
import {
    Box,
    Button,
    CardActions,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    withStyles,
    TextField,
} from "@material-ui/core";
import {AddAPhotoRounded, CloseRounded, VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import {deletePost} from "../store/actioncreators/postActions";
import {connect} from "react-redux";
import Accounts from "./Accounts";

const styles = theme => ({
    paper: {
        borderRadius: 13,
        width: 400,
    },
    title: {
        borderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: theme.palette.tertiary.main,
        boxSizing: "border-box",
    },
    closeButton: {
        padding: theme.spacing(1),
        marginLeft: theme.spacing(1),
        color: theme.palette.primary.main,
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
    },
    saveButton: {
        borderRadius: 100,
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    formWrapper: {
        overflowY: "auto",
    },
    form: {
        margin: "0 auto",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    wrapperBox: {
        width: "100%"
    },
    button: {
        borderRadius: 100,
        margin: theme.spacing(1, 0),
    },
});

class ChannelRulesModal extends Component {
    state = {
        rules: ["باهم دوست باشید", "شیطونی نکنید"],
        rule: ""
    };

    handleChange = (prop) => (e) => {
        this.setState({
            [prop]: e.target.value,
        });
    };
    handleClickShowField = (prop) => (e) => {
        this.setState({
            [prop]: !this.state[prop],
        });
    };
    handleMouseDownField = (e) => {
        e.preventDefault();
    };

    render() {
        const { classes, open, onClose, account } = this.props;
        const { rules, rule } = this.state;

        return (
            <Dialog open={open} onClose={onClose} classes={{paper: classes.paper}}>
                <DialogTitle children={Box} classes={{root: classes.title}} className={classes.title}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <IconButton className={classes.closeButton} onClick={onClose}>
                                <CloseRounded fontSize="small" />
                            </IconButton>
                            <Typography> تغییر قوانین </Typography>
                        </Box>
                        <Button classes={{root: classes.saveButton}}>
                            ذخیره
                        </Button>
                    </Box>
                </DialogTitle>
                <DialogContent className={classes.formWrapper}>
                    <Box className={classes.form}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.wrapperBox}
                        >
                            <TextField
                                value={rule}
                                label="قانون"
                                onChange={this.handleChange("rule")}
                                classes={{root: classes.textInput}}
                                variant="filled"
                                color="primary"
                            />
                            <Button
                                onClick={() => rules.push(rule)}
                                color="primary"
                                variant="outlined"
                                className={classes.button}
                            >
                                افزودن
                            </Button>
                        </Box>
                        {
                            rules.map((rule, index) => (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    className={classes.wrapperBox}
                                >
                                    <Typography>{index + ": " + rule}</Typography>
                                    <Button
                                        onClick={() => rules.splice(index, 1)}
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        حذف قانون
                                    </Button>
                                </Box>
                            ))
                        }
                    </Box>
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        account: state.account.myAccount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPostPagePosts: (id) => dispatch(deletePost(id)),
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChannelRulesModal));
