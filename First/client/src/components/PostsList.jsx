import React, { useState } from 'react'
import {useSelector}from "react-redux";
import {Grid, Button} from "@mui/material";
import Post from "./Post"
import gridThree from "../images/grid_three.svg"
import gridFour from "../images/grid_four.svg"

const PostsList = () => {
  const [layout, setLayout] = useState("gridThree");
  const calculateMd = () => {
    return layout === "gridThree"? 4:3;
  }
  const posts = useSelector(state => state.posts.posts)
  return (
    <div>
      <div style={{
      margin: "0.5rem",
      float: "right",
    }}>
        <Button variant="text" size="small" onClick={() => setLayout("gridThree")}>
          <img src={gridThree} style={{background: layout === "gridThree" ? "#ccc" : ""}} alt="Three Columns Grid Icon" />
        </Button>
        <Button variant="text" size="small" onClick={() => setLayout("gridFour")}>
          <img src={gridFour} style={{background: layout === "gridFour" ? "#ccc" : ""}} alt="Four Columns Grid Icons" />
        </Button>
      </div>
      <Grid container spacing = {2} alignContent="stretch">
        {posts.length > 0 && posts.map ((post) => {
          return(
          <Grid item key={post?._id} xs={12} md={calculateMd()}>
           <Post key={post?._id} {...post}/>
          </Grid>
)})}
      </Grid>
    </div>
  )
}

export default PostsList