import LoginBox from '../components/Login/LoginBox';
import '../components/Login/LoginBox.css'; // same name, can be whatever

function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-overlay">
        <LoginBox />
      </div>
    </div>
  );
}

export default Login;