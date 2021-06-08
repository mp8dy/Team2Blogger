import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

export default function PostCard({postContent}){
    const history = useHistory();

    const [readMore,setReadMore] = useState(false);

    const reduceContentLength = ((content)=>{
    let displayContent = "";
    if(content.length<=700){
        return content;
    }
    else{
    for(let x=0;x<=700;x++){
        displayContent = displayContent+content.charAt(x);
    }
        return displayContent+"..."
    } 
    });



    return(
        <div style={{paddingBottom:"10%"}}>
            <Card style={{ width: '70vw' , height:'650px', margin:"auto"}}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col md={1.5}>
                                <Image style={{ width: '5rem'}} src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id474001958?s=170x170" roundedCircle/>
                            </Col>
                            <Col md={10.5} style={{paddingLeft:"3%"}}>
                                <h2>{postContent.title}</h2>
                                <Card.Subtitle className="mb-2 text-muted">Camille Cooper</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.date}</Card.Subtitle>
                            </Col>
                        </Row>
                    <Row style={{justifyContent:"center"}}>
                        <Image class="img-fluid" style={{ maxWidth: '60vw',maxHeight:"330px"}} src={postContent.image}/>
                    </Row>
                    <Row>
                        <p style={{textAlign:"left",paddingTop:"2%",fontSize:15}}>{reduceContentLength(postContent.content)}</p>
                    </Row>
                    <Row style={{justifyContent:"center",paddingTop:"10px"}}>
                        <Button variant="success" onClick={(e)=>{
                            history.push("/blogpost/"+postContent.id);
                            e.stopPropagation();
                        }}>{postContent.content.length>=700?"Read More":"Read"}</Button>
                    </Row>
                    </Container>
                </Card.Body>
            </Card>
            
        </div>
    )

}