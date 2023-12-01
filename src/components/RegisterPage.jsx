import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';


const RegisterPage = (props) => {
  const { toggleLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const register = async () => {
    var apiBody = {
      email: email.toLowerCase(),
      password: password
    }

    await fetch(`https://aiready.azurewebsites.net/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiBody)
    })
      .then((result) => {
        if (!result.ok) {
          console.log("Algo deu errado");
        }

        return result.json();
      })
      .then((data) => {
        localStorage.setItem('userId', data.id);
        // Mostrar alerta de registro bem-sucedido
        alert("Registro bem-sucedido!");

        // Fechar a tela de registro
        toggleLogin();
      });
  }

  return (
    <form className="loginContainer">
      <div style={{ width: '100%' }}>
        <button type='button' className="linkButton" style={{ alignSelf: 'start' }} onClick={() => toggleLogin()}><ArrowBackIcon /></button>
        <h1 style={{ textAlign: 'center' }}>Registrar</h1>
      </div>

      <input id="login" placeholder='Login' required onInput={(e) => setEmail(e.target.value)} />

      <div className="password-field">
        <input
          id="password"
          placeholder='Password'
          type={showPassword ? 'text' : 'password'}
          required
          onInput={(e) => setPassword(e.target.value)}
        />
        <span
          className="passwordToggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Ocultar' : 'Exibir'}
        </span>
      </div>

      <div className="password-field">
        <input
          id="confirm_password"
          placeholder='Confirm Password'
          type={showConfirmPassword ? 'text' : 'password'}
          required
          onInput={(e) => setConfirmPassword(e.target.value)}
        />
        <span
          className="passwordToggle"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? 'Ocultar' : 'Exibir'}
        </span>
      </div>

      <button type='button' className="submitButton" onClick={() => register()}>Registrar</button>
    </form>
  );
}

export default RegisterPage;
