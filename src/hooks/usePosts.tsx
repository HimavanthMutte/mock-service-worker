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

}
