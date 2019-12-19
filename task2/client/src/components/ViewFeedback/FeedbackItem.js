import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function FeedbackItem(props) {
    const { name, date, feedback } = props;
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Typography variant="h5" display="block">
                { name } <span>on { date }</span>
            </Typography>
            <br/>
            <Typography display="inline" paragraph={true}>
                { feedback }
            </Typography>
        </div>
    );
}
