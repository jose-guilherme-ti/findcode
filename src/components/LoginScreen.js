import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

export default function LoginScreen() {
 
  return (
    <Fragment>
      <Wallpaper>
        <Logo />
        <Form />
        <SignupSection />
      </Wallpaper>
    </Fragment>
  );

}


