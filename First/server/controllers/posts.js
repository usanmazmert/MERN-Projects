import Post from "../models/post.js";

export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find({});
        res.status(200).json(posts);
    }catch(error){
        res.status(404).json({
            message: error
        })
    }
}

export const createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try{
        await newPost.save();
        res.status(200).json({newPost});
    }catch(error){
        res.stastus(409).json({
            message: error.message,
        })
    }
}

export const getSinglePost = async (req, res) => {
    try{
    const {id} = req.params;
    const single = Post.findById(id);   
    res.status(200).json(await single);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const deletePost = async (req, res) => {
    try{
        const {id: _id} = req.params;
        const post = await Post.findByIdAndDelete(_id);
        res.status(200).json(post);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const updatePost = async (req,res) => {
    try{
        const {id:_id} = req.params;
        const updatedPost = await Post.findByIdAndUpdate(_id, req.body);
        res.status(200).json(updatedPost);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}