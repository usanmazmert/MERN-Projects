import axios from "axios";

const apiEndpoint = "http://localhost:5000/posts/";

export const fetchPosts = async () => await axios.get(apiEndpoint);

export const createPost = async (post) => await axios.post(apiEndpoint, post);

export const fetchSinglePost = async (id) => await axios.get(apiEndpoint+id);

export const deletePost = async (id) => await axios.delete(apiEndpoint+id);

export const updatePost = async (id, data) => await axios.patch(apiEndpoint+id, data)