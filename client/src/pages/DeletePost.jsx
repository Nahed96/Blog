import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'



const DeletePost = ({postId: id}) => {

    const Navigate = useNavigate();

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token;
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)

    //redirect to login page for any user who isn't logged in :
    useEffect(() => {
        if (!token) {
            Navigate('/login')
        }
    }, [])

    const removePost = async () => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
            if (response.status == 200) {
                if (location.pathname == `/myposts/${currentUser.id}`) {
                    Navigate(0)
                } else {
                    Navigate('/')
                }
            }
            setIsLoading(false)
        } catch (error) {
            console.log("Couldn't delete post.");
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
    )
}

export default DeletePost