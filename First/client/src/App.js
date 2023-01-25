import React, { useState, lazy, useEffect } from 'react'
import { CssBaseline, Container, Grid, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import "./App.css";
import {BsPenFill} from "react-icons/bs"
import { useDispatch } from 'react-redux';
import { fetchPosts } from './actions/post';

//components
import AddPostForm from "./components/AddPostForm";
import PostDetails from "./components/PostDetails.jsx";

//routers
import {BrowserRouter as Router, Routes as Switch, Route, Navigate} from "react-router-dom";
const PostsList = lazy(() => import("./components/PostsList.jsx"));

const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])
  return (
    <>
      <CssBaseline/>
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton edge="start" className="container" color="inherit"/>
            <Typography variant="h6" color="secondary" className="title">
              <a href="http://localhost:3000/posts">Blogify</a>
            </Typography>
            <Button color="primary" variant="outlined" startIcon={<BsPenFill/>} onClick={handleOpen}>
              Yeni Yazı
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className="container">
          <Grid item xs={12}>
            <Router>
              <Switch>
                <Route exact path="/" element={<Navigate to="posts"/>}/>
                <Route exact path="/posts" element={<PostsList/>}/>
                <Route exact path="/posts/:id" element={<PostDetails/>}/>
              </Switch>
            </Router>
          </Grid>
        </Grid>
      </Container>
      <AddPostForm open={open} handleClose={handleClose}/>
    </>
  )
}

export default App 