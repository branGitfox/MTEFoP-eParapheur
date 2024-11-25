import React from 'react'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'

function SendMails() {
    const form = useRef()
    const sendEmail = (e) => {
        e.preventDefault();
        
            emailjs.sendForm('service_m0052xg', 'template_bypqpvc', form.current, 'Zt1TUCueO51qvJEol')
                .then((result) => {
                    console.log(result.text);
                    console.log("message sent!")
                }, (error) => {
                    console.log(error.text);
                    console.log("error sending message, try again!")
                });
            };
  return (
    <>
        <form onSubmit={sendEmail} ref={form}>
            <input type="text" name='from'/>
            <input type="text" name='to'/>
            <input type="text" name='message' />
            <button type='submit'>envoyer email</button>
        </form>
    
    </>
  )
}

export default SendMails