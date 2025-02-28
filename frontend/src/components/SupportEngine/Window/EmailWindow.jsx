import React, {useState} from 'react'
import {styles} from '../styles'
import {LoadingOutlined} from "@ant-design/icons"
import Avatar from '../Avatar'
import axios from "axios"

const EmailWindow = props => {
    const [email,setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    function getOrCreateUser(callback) {
        axios.put(
            'https://api.chatengine.io/users/',
            {username: email, email: email, secret: email},
            {headers: {"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create user error', e))
    }

    function getOrCreateChat(callback) {
        axios.put(
            'https://api.chatengine.io/chats/',
            {usernames: [email, 'Awesome Online Shop'], is_direct_chat: true},
            {headers: {
                "Project-ID": process.env.REACT_APP_CE_PROJECT_ID,
                "User-Name": email,
                "User-Secret": email,
            }}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create chat error', e))
    }

    function handleSubmit (event) {
        event.preventDefault();
        setLoading(true);
        console.log("Sending Email",email);

        getOrCreateUser(
            user => {
                props.setUser && props.setUser(user)
                getOrCreateChat(chat => {
                    setLoading(false)
                    props.setChat && props.setChat(chat)
                })
            }
        )
    }


  return (
    <div
    style={{
        ...styles.emailFormWindow,
        ...{
            height: props.visible? "100%":"0%",
            opacity: props.visible? "1":"0",
        }
    }}
    >
        <div style={{height:'0px'}}>
            <div style={styles.stripe}></div>
        </div>

        <div 
        className="transition-3"
        style={{
            ...styles.loadingDiv,
            ...{
                zIndex: loading? "10": "-1",
                opacity: loading? "0.33": "0",

            }
        }}/>

        <LoadingOutlined
        className='transition-3'
        style={{
            ...styles.loadingIcon,
            ...{
                zIndex: loading? "10": "-1",
                opacity: loading? "0.33": "0",
                fontSize:"80px",
                top:"calc(50% - 41px )",
                left:"calc(50% - 41px )",

            }
        }}
        />

        <div style={{ position: "absolute", height:"100%", width:"100%", textAlign:"center"}}/>
            <Avatar
            style={{
                position:"relative",
                left:"calc(50% - 44px)",
                top:"10%",
            }}
            />
            <div style={styles.topText}>
                Welcome to our <br/>support chat🙂
            </div>

            <form 
                    onSubmit={e => handleSubmit(e)}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input 
                        placeholder='Enter Your Email'
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
            </form>

            <div style={styles.bottomText}>
                    Let's get started.
                </div>

        </div>
      
  )
}

export default EmailWindow
