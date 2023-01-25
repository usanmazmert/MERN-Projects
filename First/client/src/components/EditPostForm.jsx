import React, { useState } from 'react';
import {styled, Button, TextField, Input, MenuItem} from "@mui/material";
import Select from "react-select";
import {useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { ClassNames, ThemeContext } from '@emotion/react';
import FileBase64 from "react-file-base64"
import {useDispatch} from "react-redux";
import { useEffect } from 'react';
import {updatePost} from "../actions/post"

const tags = ["fun", "programming", "health", "science"]
const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string(),
  content: yup.string().min(20),
  //tag: yup.mixed().oneOf(tags),
})

const StyledTextField = styled(TextField)({
  marginBottom : "0.5rem",
})

const EditPostForm = ({post, setEditMode}) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image); 
  const {register, handleSubmit, control, errors, reset} = useForm({
    resolver: yupResolver(postSchema),
  });
  
  const onSubmit = (data) => {
    const updatedPost = {
        ...data,
        image: file,
    };

    dispatch(updatePost(post._id, updatedPost));

    reset();
    setFile(null);
    setEditMode(false);
    window.location.reload()
  }
  return (
        <div>
          <form noValidate="off" onSubmit={handleSubmit(onSubmit)}>
           <StyledTextField id="title" label="Başlık" name="title" variant="outlined" className="textField" size="small" {...register("title")} error={errors?.title ? true : false} fullWidth defaultValue={post?.subtitle}/>
           <StyledTextField id="subtitle" label="Alt Başlık" name="title" variant="outlined" className="textField" size="small" {...register("subtitle")} error={errors?.subtitle
           ? true : false} fullWidth defaultValue={post?.subtitle}/>
           <Controller render={({field}) => {return(
            <Select
            {...field}
            fullWidth>
                {tags.map((tag, index) => {
                  return(
                  <MenuItem key={index} value={tag}>
                      {tag}
                  </MenuItem>
  )})}
            </Select>

           )}}
          name="tag"
          control={control}
          error={errors?.tag ? true : false}
          defaultValue={post?.tag}/>
          <StyledTextField sx={{
            marginTop: "0.5rem",
          }} id="content" label="İçerik" name="content" multiline rows={4} variant="outlined" className="textField" size="small" {...register("content")} error={errors?.title ? true : false} fullWidth defaultValue={post?.content}/>

          <FileBase64 multiple={false} onDone={({base64}) => setFile(base64)}/>

          <div style={{
            marginTop: "0.3rem"
          }}>
            <Button sx={{marginRight: "0.2rem"}}color="secondary" variant="outlined" onClick={() => setEditMode(false)}>
                Vazgeç
            </Button>
            <Button color="primary" variant="outlined" type="submit">
                Kaydet
            </Button>
          </div>
          </form>  
        </div> 
  )
}

export default EditPostForm