import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function button(props, isLogin){

  const onClickLogout = () => {
    axios.get('/api/users/logout')
    .then(response => {
      console.log(response.data);
        if(response.data.success){
          props.history.push("/login");
        }
        else{
          alert('로그아웃 실패');
        }
    })
  }

  const onClickLogin = () => {
    axios.get('/api/users/login')
    .then(response => {
      console.log(response.data);
        if(response.data.success){
          props.history.push("/");
        }
        else{
          alert('로그인 실패');
        }
    })
  }

  if(isLogin){
    return(
      <button onClick={onClickLogin}>
        로그인
      </button>
    )
  }
  else{
    return(
      <button onClick={onClickLogout}>
        로그아웃
      </button>
    )
  }
}


function LandingPage(props){
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  }, [])

  return(
    <div style={{ display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center',
    width: '100%', height: '100vh'}}>
      <h2>시작페이지</h2>
      {button(props, true)}
    </div>
  )
}

export default withRouter(LandingPage);