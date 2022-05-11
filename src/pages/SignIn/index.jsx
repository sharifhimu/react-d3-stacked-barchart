import React from 'react';
import './Signin.scss'
import image from '../../assets/image/signin_img.png'
import Form_comp from '../../components/Form/Form_comp'

const SignIn = () => {
    return (
        <div className='signin' >
            <div className='image_bg' >
                <div className='signin_img_wrapper' >
                    <div className='signin_img' >
                        <img src={image}  alt="image" width="100%" />
                    </div>
                </div>
                <div>
                    <h5 className='h5' > Choose a date range </h5>
                    <p className='p' > Lorem ipsum dolor sit amet, consectetur <br/> adipisicing elit. Eius deserunt nobis  </p>
                </div>
            </div>
            <div className='divider' >
                <div>
                    <Form_comp />
                </div>
            </div>
        </div>
    );
};

export default SignIn;