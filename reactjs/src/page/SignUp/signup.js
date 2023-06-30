import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/user/register', {
                name: name,
                email: email,
                password: password
            })
                .then((response) => {
                    alert('Register Success!')
                    navigate('/login')
                })
                .catch((error) => {
                    console.log(error);
                    alert(error)
                })
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <Form onSubmit={onHandleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Name" value={name} onChange={onChangeName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                </Form.Group>
                <div className="navigate mt-2">
                    Do you already have an account? <Link to="/login" className="login-link">Login</Link>
                </div>

                <Button variant="primary" type="submit" onSubmit={onHandleSubmit}>
                    Submit
                </Button>
            </Form>
        </>
    )
}
export default Signup