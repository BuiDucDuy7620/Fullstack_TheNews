import React from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NewsOption = (props) => {
    const { newsID, title, description, content, image } = props;
    const onHandleSubmitDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:5000/api/news/deleteNewsById/${newsID}`)
                .then((response) => {
                    alert('delete success')
                })
                .catch((error) => {
                    console.log(error)
                    alert(error)
                })
        } catch (e) { console.log(e); }
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/update/${newsID}`)

    }

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body >
                    <p>{newsID}</p>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Card.Text>
                        {content}
                    </Card.Text>
                    <Card.Text>
                        {image}
                    </Card.Text>
                </Card.Body>
            </Card >
            <button onClick={onHandleSubmitDelete}>Xoa</button>
            <button onClick={handleClick}>Sua</button>


        </div>
    )
}
export default NewsOption