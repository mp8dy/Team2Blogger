import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import { UserContext } from "../../contexts/UserContext";

export default function PostCard({postContent}){
    const isLoggedIn = true;
    const history = useHistory();
    const l = postContent.likes;
    const d = postContent.dislikes;
    const [readMore,setReadMore] = useState(false);
    const [likes, setLikes] = useState(Object.keys(l).length)
    const [dislikes, setDislikes] = useState(Object.keys(d).length);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const {user} = useContext(UserContext);
    const userid = user.id;
    const [likeBut, setLikeBut] = useState(null);
    const [disBut, setDisBut] = useState(null);

    const reduceContentLength = ((content) => {
        content = content.replace(/<[^>]*>?/gm, '');
        let displayContent = "";
        if(content.length<=700) {
            return content;
        }
        else {
            for(let x=0;x<=700;x++) {
                displayContent = displayContent+content.charAt(x);
            }
            return displayContent+"..."
        } 
    });
    
        // function checkURL(url) {
        //     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
        // }
    

    const onClick = (e) => {
        const id = e.currentTarget.id
        const name = e.currentTarget.name;
        let other;
        const here = e;
        name === "like" ? 
            other = document.getElementById(`d${id}`) 
            : 
            other = document.getElementById(id.substring(1))

        if((name === "like" && !liked) || (name === "dislike" && !disliked)) {//(name === "inactive") {
            if(name === "like") {
                here.currentTarget.style.color = "#66c144";
                setLikes(likes + 1);
                fetch(`http://localhost:5000/forumpost/${id}/likes`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({user_id: userid, action: "like"})
                  })
                setLiked(true);
                if(disliked) {
                    setDislikes(dislikes - 1);
                    setDisliked(false);
                    other.style.color = "#003366"
                }
            }
            else {
                here.currentTarget.style.color = "#e31f0e"
                setDislikes(dislikes + 1);
                fetch(`http://localhost:5000/forumpost/${id.substring(1)}/likes`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({user_id: userid, action: "dislike"})
                  })
                setDisliked(true);
                if(liked) {
                    setLikes(likes - 1);
                    setLiked(false);
                    other.style.color = "#003366";
                }
            }
        }
        else {
            here.currentTarget.style.color = "#003366";
            if(name === "like") {
                setLikes(likes - 1);
                fetch(`http://localhost:5000/forumpost/${id}/likes`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({user_id: userid, action: "like"})
                  })
                setLiked(false);
            }
            else {
                setDislikes(dislikes - 1);
                fetch(`http://localhost:5000/forumpost/${id.substring(1)}/likes`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({user_id: userid, action: "dislike"})
                  })

                setDisliked(false);
            }
        }
    }

    const setButtonColor = (n, i) => {
        let o;
        let color = "#003366"
        n === "like" ? 
            o = Object.keys(user.forum_likes) 
            : 
            o = Object.keys(user.forum_dislikes)
            
        o.forEach(id => {
             if(id === i) {
                if(n === "like") {
                    color = "#66c144";
                    // setLiked(true);
                }
                else {
                    color = "#e31f0e";
                    // setDisliked(true);
                }
            }
        });
        return(color)
    }

    useEffect(() => {
        let color = setButtonColor("like", postContent.id)
        console.log(color);
        setLikeBut(<button type = "button" id={postContent.id} name="like" onClick = {onClick} class="btn btn-link" style={{color:{color}}}>
            <FaThumbsUp size={20} />
        </button>)
        color = setButtonColor("dislike", postContent.id)
        // console.log(color)
        setDisBut(<button type ="button" id = {`d${postContent.id}`} name = "dislike" onClick = {onClick} class="btn btn-link" style={{color:color}}>
            <FaThumbsDown size={20}/>
        </button>)
    }, [])


    return(
        <div style={{paddingBottom:"3%"}}>
            <Card style={{ width: '70vw' , height:'auto', margin:"auto"}}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col md={2}>
                                <Image style={{ width: '5rem'}} src={postContent.user.pic} roundedCircle/>
                            </Col>
                            <Col md={8} style={{paddingLeft:"3%"}}>
                                <h2 style={{fontWeight:"bold"}}>{postContent.title}</h2>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.user.name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.date}</Card.Subtitle>
                                {postContent.editDate !== "" && <Card.Subtitle style = {{fontStyle:"italic"}} className="mb-2 text-muted">Updated: {postContent.editDate}</Card.Subtitle>}
                            </Col>
                            <Col md={2}>
                                {isLoggedIn&&
                                <div>
                                    {likeBut}
                                    {disBut}
                                </div>
                                }
                                <Card.Subtitle style={{fontSize:"12px",margin:"auto", textAlign:"justify",paddingTop:7}}>Likes: {likes}</Card.Subtitle>
                                <Card.Subtitle style={{fontSize:"12px",margin:"auto", textAlign:"justify",paddingTop:7}}>Dislikes: {dislikes}</Card.Subtitle>
                            </Col>
                        </Row>
                    {postContent.image !== "" && <div><Row style={{justifyContent:"center"}}>
                        <Image class="img-fluid" style={{ maxWidth: '60vw',height:"330px"}} src={postContent.image}/>
                    </Row></div>}
                    <Row>
                        <p style={{textAlign:"left",paddingTop:"2%",fontSize:15}}>{reduceContentLength(postContent.content)}</p>
                    </Row>
                    <Row style={{justifyContent:"center",paddingTop:"10px"}}>
                        <Button style={{backgroundColor:"#4C6357",border:"none"}} onClick={(e)=>{
                            history.push("/forumpost/"+postContent.id);
                            e.stopPropagation();
                        }}>{postContent.content.length>=700?"Read More":"Read"}</Button>
                    </Row>
                    </Container>
                </Card.Body>
            </Card>
            
        </div>
    )

}