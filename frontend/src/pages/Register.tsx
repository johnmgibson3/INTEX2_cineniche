import RegisterForm from '../components/Register/RegisterForm';
import '../components/Register/RegisterForm.css';  

export default function Register() {
  return (
      <div className="login-wrapper">
        <div className="login-overlay">
          <RegisterForm />
        </div>
      </div>
    );
}
