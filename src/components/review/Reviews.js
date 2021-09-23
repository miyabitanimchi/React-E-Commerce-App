import React, { useContext, useEffect } from 'react';
import { CommentsContext } from '../../context/comments-context';
import { useAuthContext } from "../../context/auth-context";
import ReviewInput from './ReviewInput';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import classes from './Review.module.scss';
import { firebase, googleAuthProvider } from '../../firebase/firebase';

export default function Reviews(props) {
    const { user } = useAuthContext();
    const { setReadProductId, productComments } = useContext(CommentsContext)

    useEffect(() => {
        setReadProductId(props.id)
    }, [props.id])

    const startLogin = () => {
        firebase.auth().signInWithPopup(googleAuthProvider).then(() => {
            console.log('Sign in successful!');
        }).catch((error) => {
            console.error(`An error happened : ${error}`);
        })
    }


    return (
        <div className={classes.reviewWrap}>
            <h1 className={classes}>Product Review</h1>


            {productComments.length !== 0 ?
                <>
                    {productComments.map((data, index) => {
                        return (
                            <div key={index}
                                className={classes.reviewBox}>
                                <div className={classes.reviewHeader}>
                                    <img src={data.img} alt="user_img" /><p>{data.name}</p> <span>posted at {data.postDate}</span>
                                </div>
                                <div className={classes.reviewBody}>
                                    <p>{data.comment}</p>
                                    <Box component="fieldset" mb={3} borderColor="transparent"
                                    style={{margin:0}}>
                                        <Rating name="read-only" value={data.rating} readOnly />
                                    </Box>
                                </div>

                            </div>
                        )
                    })
                    }
                </>
                :
                <div className={classes.noCmWrap}>
                    <p>There are no comments yet</p>
                </div>
            }

            {user ?
                <ReviewInput />
                :
                <div className={classes.loginWrap}>
                    <p>Please login to make product review</p>
                    <button onClick={startLogin}>Login with Google</button>
                </div>

            }
        </div>
    )
}
