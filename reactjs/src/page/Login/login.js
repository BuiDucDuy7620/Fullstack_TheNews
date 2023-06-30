import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './login.css'
// import Header from '../../component/headerComponent';



import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// const axios = require('axios');
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/user/login', {
                email: email,
                password: password
            })
                .then((response) => {
                    
                    const token  = response.data;
                    console.log(token );
                    localStorage.setItem('token', token);
                    // console.log(response.data)
                    navigate('/');

                })
                .catch((error) => {
                    console.log(error.message);
                    alert('wrong email or password')
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        {/* <Header></Header> */}
            <div class="form-login">
                <Form onSubmit={onHandleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={onChangeEmail} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                        </Col>
                    </Form.Group>
                    <fieldset>

                    </fieldset>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" onSubmit={onHandleSubmit}>Sign in</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </>
    )

}
export default Login