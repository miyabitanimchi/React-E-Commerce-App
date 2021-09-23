import React, { useState, useContext } from 'react'
import { CommentsContext } from '../../context/comments-context';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from "../../context/auth-context";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import classes from './Review.module.scss';


const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

export default function ReviewInput() {

    const { writeComment, readProductId, labels } = useContext(CommentsContext)
    const { user } = useAuthContext();
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const classe = useStyles();

    const [comment, setComment] = useState({
        comment: "",
        rating: value,
        postDate: moment().format('LL')
    })

    const submit = (e) => {
        e.preventDefault()
        const cmInput = document.getElementById("cmInput")

        writeComment(comment, readProductId)
        cmInput.value = ""
    }

    return (
        <div className={classes.inputWrap}>



            <div>
                <img src={user.providerData[0].photoURL}/>
            </div>
            <div>

                <form onSubmit={submit}>
                    <input id="cmInput" placeholder="comment" onChange={(e) => setComment({ ...comment, comment: e.target.value })}></input>
                    <button type="submit">Post</button>
                </form>

                <div className={classe.root}>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={1}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            setComment({ ...comment, rating: newValue })
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>

            </div>
        </div>
    )
}
