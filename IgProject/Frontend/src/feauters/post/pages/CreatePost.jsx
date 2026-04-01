import React,{useState,useRef} from 'react'
import "../style/createPost.scss"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router-dom'
const CreatePost = () => {
    const [caption, setCaption] = useState("")
    const postImageInputRef = useRef(null)
    const {handaleCreatePost,loading} = usePost()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        const file = postImageInputRef.current.files[0]
       await handaleCreatePost(file,caption)
        console.log(file)
        navigate("/feed")

    }

    if(loading){
        return <main><h1>Loading...</h1></main>
    }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label required className='post-image-label' htmlFor="PostImage">Select Image</label>
                <input  ref={postImageInputRef} type="file" hidden name='postImage' id='PostImage' />
                <input 
                value={caption}
                onChange={(e)=>{setCaption(e.target.value)}}
                required type="text" name="caption" id="caption" />
                <button className='button primary-button'>Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
