// rafce
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const NewsComponent = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/detail/${props.id}`)
    }
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>

                <Button variant="primary" onClick={handleClick}>View&Comment</Button>
            </Card.Body>
        </Card >
    )
}

export default NewsComponent