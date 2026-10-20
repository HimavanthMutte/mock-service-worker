import {useState} from "react"

import axios from "axios"

export type Post = {
    id: string,
    title: string,
    likes: number
}

export type PostWithoutId = Omit<Post,"id">

const BASE_API_URL = "http://localhost:3000/"

export const usePosts = () =>{
    const [posts,setPosts] = useState<Post[]>([])
    const [error,setError] = useState<string>("")

    const handleFetchPosts = async():Promise<void>=>{
        try {
            const postsData = await axios.get<Post[]>(`${BASE_API_URL}/posts`)
            setPosts(postsData.data)
            setError('')
        }
        catch(err) {
            if (err instanceof Error) setError(err.message);
        }
    }

    const handleCreatePost = async(post: PostWithoutId):Promise<void>=>{
        try {
            await axios.post(`${BASE_API_URL}/posts`,{
                ...post
            })
            await handleFetchPosts()
            setError('')
        }
        catch(err) {
            if (err instanceof Error) setError(err.message);
        }
    }

    const handleLike = async(postId: string):Promise<void>=>{
        try {
            const post = posts.find(p=>p.id===postId)
            if (!post) {
                setError("Post not Found")
                return
            }
            await axios.put(`${BASE_API_URL}/${postId}`,{
                ...post,
                likes: post.likes+1
            })
            await handleFetchPosts()
            setError('')
        }
        catch(err) {
            if (err instanceof Error) setError(err.message);
        }
    }

    const handleDelete = async(postId: string):Promise<void>=>{
        try {
            await axios.delete(`${BASE_API_URL}/posts/${postId}`)
            await handleFetchPosts()
            setError('')
        }
        catch(err) {
            if (err instanceof Error) setError(err.message);
        }
    }

    return {posts,error,handleFetchPosts,handleCreatePost,handleLike,handleDelete}
}

