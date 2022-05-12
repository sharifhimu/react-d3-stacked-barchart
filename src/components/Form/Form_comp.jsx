import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'

const Form_comp = () => {

    const [mail, setMail ] = useState('')
    const [pass, setPass ] = useState('')
    const [confirm, setConfirm] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone ] = useState()
    const [terms, setTerms ] = useState()

    const navigate = useNavigate()

    const validate = (e) => {
        e.preventDefault();

        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let mailmatch = mail?.match(mailformat)

        let passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let passmatch = pass?.match(passformat) 

        let phonematch = phone?.match(/\d/g)

        if(mailmatch == null ){
            alert('Please enter valid email')
        }

        if(passmatch == null || pass != confirm ){
            // console.log('pass ', pass, 'confirm ', confirm );
            
            alert(
                `Please enter valid password & confirm it, 
                password must be in between 6 to 16 character,
                It has at least a number,
                It has at least a special character`
            )
        }

        if(name == '' ){
            alert('Please enter your name')
        }

        if( phone == null || phonematch?.length < 10  ){
            alert('Please enter a valid phone number, phone number must be more that 9 digits')
        }

        if(terms != true ){
            alert('Please make sure to check out terms & conditions')
        }

        if( mailmatch != null && passmatch != null && name != null && phonematch.length >= 10 && pass == confirm && terms == true ){
            console.log('good to go');
            navigate('/dashboard')

        }

    }

    return (
        <div className='form_comp' >
            <h5 className='h5' > Create an account </h5>
            <form>
                <label className='label' >
                    <span className='span' > Your email address </span>
                    <input className='input' type="email" name="email" onChange={(e) => setMail(e.target.value) }  value={mail}  />
                </label>

                <label className='label' >
                    <span className='span' > Your password </span>
                    <input className='input' type="password" name="pass" onChange={(e) => setPass(e.target.value) }  value={pass}  />
                </label>

                <label className='label' >
                    <span className='span' >Confirm your password </span>
                    <input className='input' type="password" name="confirm" onChange={(e) => setConfirm(e.target.value) }  value={confirm}  />
                </label>

                <label className='label' >
                    <span className='span' >Your full name </span>
                    <input className='input' type="text" name="name" onChange={(e) => setName(e.target.value) }  value={name}  />
                </label>

                <label className='label' >
                    <span className='span' >Your phone number </span>
                    <input className='input phone_no' type="number" name="phone" onChange={(e) => setPhone(e.target.value) }  value={phone}  />
                </label>

                <div className='terms' >
                    <label className='container' >
                        <span className='span' > I read and agree terms and conditions </span>
                        <input className='input' type="checkbox" name="terms"  onChange={(e) => setTerms(e.target.checked) } />
                        <span className='checkmark' ></span>
                    </label>
                </div>
                <button className='button'  onClick={(e) => validate(e) } > Create account </button>
            </form>
        </div>
    );
};

export default Form_comp;