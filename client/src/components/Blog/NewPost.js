import React,{useState,useContext} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {useQuill} from  'react-quilljs'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {UserContext} from '../../contexts/UserContext'
import { useHistory } from "react-router-dom";

export default function NewPost(){

    const [newPostTitle,setNewPostTitle] = useState("");
    const [newPostImage,setNewPostImage] = useState("");
    const { quill, quillRef } = useQuill();
    const [published,setPublished] = useState(false);
    const {user} = useContext(UserContext);
    const history = useHistory();

    // Sends a post request to create a new blog post based on information from textfields
    const createNewPost=(()=>{
        const title = newPostTitle;
        const date = Date().toLocaleString()
        const image = newPostImage;
        const content = quill.container.firstChild.innerHTML
        console.log(JSON.stringify({title,date,image,content}))
        fetch("http://localhost:5000/blogpost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title,date,image,content})
          })
        .then(()=>{setPublished(true);})
        .then(()=>{
            history.push("/blog");
        })
    })

return(
    <div style={{marginLeft:50,marginRight:50}}>
        {published&&<div class="alert alert-success" role="alert">
            Success! Your post has been published. Check it out in the blog.
        </div>}
        <Form style={{marginLeft:"20px",marginRight:"20px",marginTop:"30px",marginBottom:"60px"}}>
        <h1>New Post.</h1>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Give this post a gripping title." onChange={(evt)=>setNewPostTitle(evt.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Picture</Form.Label>
                <Form.Control placeholder="Insert URL" onChange={(evt)=>setNewPostImage(evt.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Content</Form.Label>
                <div style={{height:200,backgroundColor:"white"}}>
                <div style={{backgroundColor:"white"}}ref={quillRef} ></div>
                </div>
            </Form.Group>
        </Form>
        {user&&user.is_admin&&
        (published?<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">This Post Has Already Been Published!</Tooltip>}>
        <span className="d-inline-block">
        <Button variant="primary" disabled style={{marginLeft:"20px", marginBottom:"6%",backgroundColor:"#4C6357",border:"none"}} onClick={()=>{
                createNewPost();
            }}>
                Publish
        </Button>
        </span>
        </OverlayTrigger>:<Button variant="primary" style={{marginLeft:"20px", marginBottom:"6%",backgroundColor:"#4C6357",border:"none"}} onClick={()=>{
                createNewPost();
            }}>
                Publish
        </Button>)}
    </div>
)

}
