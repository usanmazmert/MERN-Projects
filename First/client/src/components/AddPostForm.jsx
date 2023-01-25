import React, { useState } from 'react';
import {styled, Button, TextField, Input, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Select from "react-select";
import {useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { ClassNames, ThemeContext } from '@emotion/react';
import FileBase64 from "react-file-base64"
import {useDispatch} from "react-redux";
import {createPost} from "../actions/post.js"
import { useEffect } from 'react';

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

const AddPostForm = ({open, handleClose}) => {
  useEffect(() => {
    console.log(tags);
  })
  const dispatch = useDispatch();
  const [file, setFile] = useState(null); 
  const {register, handleSubmit, control, errors, reset} = useForm({
    resolver: yupResolver(postSchema),
  })

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  }
  
  const onSubmit = (data) => {
    dispatch(createPost({...data, image: file}));
    clearForm();
    window.location.reload();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Yeni Yazı Oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Yeni bir yazı eklemek için aşağıdaki formu doldurun.
        </DialogContentText>

        <div>
          <form noValidate="off" onSubmit={handleSubmit(onSubmit)}>
           <StyledTextField id="title" label="Başlık" name="title" variant="outlined" className="textField" size="small" {...register("title")} error={errors?.title ? true : false} fullWidth/>
           <StyledTextField id="subtitle" label="Alt Başlık" name="title" variant="outlined" className="textField" size="small" {...register("subtitle")} error={errors?.subtitle
           ? true : false} fullWidth/>
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
          defaultValue={tags[0]}/>
          <StyledTextField sx={{
            marginTop: "0.5rem",
          }} id="content" label="İçerik" name="content" multiline rows={4} variant="outlined" className="textField" size="small" {...register("content")} error={errors?.title ? true : false} fullWidth/>

          <FileBase64 multiple={false} onDone={({base64}) => setFile(base64)}/>
          </form>  
        </div> 
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={clearForm}>Vazgeç</Button>
        <Button type="submit" variant="outlined" color="primary" onClick={() => handleSubmit(onSubmit)( )}>Yayınla</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddPostForm