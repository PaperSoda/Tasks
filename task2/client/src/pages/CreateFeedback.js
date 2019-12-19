import React, { useState } from "react";
import axios from "axios";
import {
    Grid,
    Button,
    TextField,
    Typography,
    Container
}  from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import * as EmailValidator from "email-validator";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    date: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

export default function CreateFeedback() {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date().toJSON().slice(0,10));
    const [feedback, setFeedback] = useState('');

    const changeName = (e) => setName(e.target.value);
    const changeEmail = (e) => setEmail(e.target.value);
    const changeDate = (e) => setDate(e.target.value);
    const changeFeedback = (e) => setFeedback(e.target.value);

    const onFormSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !date || !feedback || !EmailValidator.validate(email)) return;

        axios.post('http://localhost:3212/feedbacks', {
           name,
           email,
           date,
           feedback,
        });

        setName('');
        setEmail('');
        setDate(new Date().toJSON().slice(0,10));
        setFeedback('');
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Feedback
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="name"
                                variant="outlined"
                                required
                                fullWidth
                                label="Name"
                                autoFocus
                                onChange={changeName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                onChange={changeEmail}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.date}>
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                onChange={changeDate}
                                defaultValue={date}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Your opinion"
                                multiline
                                rows="6"
                                fullWidth
                                required
                                onChange={changeFeedback}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onFormSubmit}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </Container>
    );
}
