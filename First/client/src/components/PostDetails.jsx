import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {styled, Typography, Paper, Divider, Button, Chip} from "@mui/material"
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import { useEffect } from 'react';
import {fetchSinglePost, deletePost} from "../actions/post";
import noImage from "../images/noimage.svg"
import EditPostForm from "./EditPostForm"


const PostDetails = (props) => {
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(fetchSinglePost(id));
    }, [dispatch])
    const currentPost = useSelector(state => state.posts.currentPost);
    const convertRelativeTime = (date) => {
        return moment(date).fromNow();
    }
    const removePost = () => {
        dispatch(deletePost(id));
        navigate("/posts")
    }
  return (
    <Paper sx={(theme) => {
        return(
        {padding: theme.spacing(3),
        marginBottom: theme.spacing(8),
        })}}>
            {editMode? (
                <>
                   <EditPostForm post={currentPost} setEditMode={setEditMode}/>
                </>
            ): (
                <>
        <div>
            <div style={{
                display:"flex",
                justifyContent: "space-between"
            }}>
                <Typography variant="h5" gutterBottom>
                    {currentPost?.title}
                </Typography>
                <div>
                    <Button color="primary" variant="outlined" startIcon={<AiOutlineEdit />} sx={{
                        marginRight: "0.2rem",
                    }} onClick={() => setEditMode(true)}>
                        Düzenle
                    </Button>
                    <Button color="secondary" variant="outlined" startIcon={<AiOutlineDelete/>} onClick={removePost}>Sil</Button>
                </div>
            </div>
        </div>
        <Divider/>
        <Typography variant="overline" gutterBottom>
            {currentPost?.subtitle}
        </Typography>
        <Typography variant="caption" gutterBottom component="p">
            {convertRelativeTime(currentPost?.createdAt)} by Didem
        </Typography>
        <Chip label={`#${currentPost?.tag}`}
        variant="outlined"
        />
        <div style={{
            marginTop: "0.5rem",
        }}>
            <img src={currentPost?.image || noImage} alt="Post" style={{
                width: "100%",
                borderRadius: 5,
                marginTop: "0.5rem",
                marginBottom: "0.75rem"
            }}/>
            <Typography variant="body">
                {currentPost?.content}
            </Typography>
        </div>
</>
            )}
    </Paper>
  )
}

export default PostDetails