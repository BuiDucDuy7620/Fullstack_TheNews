import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios'


const HeaderComponent = () => {
  const onHandleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const onHandleSignUp = () => {
    navigate('/signup')
  }
  const onHandleHome = () => {
    navigate('/')
  }
  const [user, setUser] = useState(null)
  const getUserLogin = async (token) => {
    try {
      await axios.get('http://localhost:5000/api/user/getUserLogin',
        {
          headers: {
            "auth-token": token
          }
        }
      )
        .then((response) => {
          const dulieu=response.data;
          setUser(dulieu.user)
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getUserLogin(token);
    } else {
      setUser(null)
    }
  }, [])
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/option/${user.id}`)
  }
  return (
    <>
      {/* <p>  <Link to="/option">Option</Link></p> */}
    
      <button onClick={onHandleHome}>Home </button>

      <button onClick={handleClick}>Option</button>
      <button onClick={onHandleLogOut}>LogOut </button>
      <button onClick={onHandleSignUp}>SignUp </button>
    </>
  )
}

export default HeaderComponent