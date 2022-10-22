import React , {useEffect} from 'react';
import './homepage.css'; 
import './homepage.jpg';
import { connect } from 'react-redux';
import Login from '../login/login';
import HomepageHeader from '../header/header'; 
import auth from '../../../services/AuthServices';
import { Redirect } from 'react-router-dom';
import { 
  changeLang,
} from '../../../actions/mainAction';


function Homepage(props) {
  // console.log('FFFFFFFFFFF:',props)
  var lang = props.match.path.slice(-2);
  useEffect(() => {
    props.changeLang(lang);
  }, []);
  if(auth.retriveToken() && auth.retriveToken()!=='undefined'){
    console.log('Logged In');
    return <Redirect to='/user/home/kz' />
  }
  else{
    
    console.log('Not Logged In');
    return (
      <div>
          <div className="parallax">
            <HomepageHeader/>
            <Login lang={props.main.language}/>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user : state.user,
  main : state.main
});

export default connect(mapStateToProps,{
  changeLang
})(Homepage);
