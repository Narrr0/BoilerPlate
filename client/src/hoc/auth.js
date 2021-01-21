import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
  /* access option */
  // null => anyone
  // user => only users who are logged in
  // user => only users who are not logged in
  
  function AuthenticationCheck(props){
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(auth()).then(response => {
        console.log(response)

        if(!response.payload.isAuth){
          if(option){
            props.history.push('/login');
          }
        }else{
          if(adminRoute && !response.payload.isAdmin){
            props.history.push('/')
          }
          else{
            if(!option){
              props.history.push('/');
            }
          }
        }
      })
    }, [])
    return (
      <SpecificComponent />
    )
  }
  return AuthenticationCheck
}