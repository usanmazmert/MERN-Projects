import * as types from "./types";
import * as api from "../api/index";

export const fetchPosts = () => async (dipatch) => {
    try{
        const {data} = await api.fetchPosts();
        dipatch({
            type: types.FETCH_POSTS,
            payload: data,
        });
    }catch(error){
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try{    
        const {data} = await api.createPost(post);
        dispatch({
            type: types.CREATE_POST,
            payload: data,
        })
    }catch(error){
        console.log(error);
    } 
}

export const fetchSinglePost = (id) => async (dispatch) => {
    try{
        const {data} = await api.fetchSinglePost(id);
        dispatch({
            type: types.FETCH_SINGLE_POST,
            payload: data,
        });
    }catch(error){
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        const {data} = await api.deletePost(id);
        dispatch({
            type: types.DELETE_POST,
            payload: data._id
        })
    }catch(error){
        console.log(error);
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id, updatedPost);
        dispatch({
            type: types.UPDATE_POST,
            payload: data
        }) 
    }catch(error){
        console.log(error);
    }
        
}