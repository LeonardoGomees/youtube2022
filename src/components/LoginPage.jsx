import { useState } from "react";

const LoginPage = (props) => {
  const { toggleAll, toggleRegister, setConversations, setIsLogged } = props;

  const [login, setLogin] = useState("");

  const loggin = async () => {
    await fetch(`https://aiready.azurewebsites.net/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((result) => {
        if (!result.ok) {
          console.log("Algo deu errado");
        }

        return result.json();
      })
      .then((data) => {
        const account = data.find(x => x.email.toLowerCase() == login.toLowerCase());

        if (account != null) {
          setConversations(account.chats);
          localStorage.setItem('userId', account.id);
          setIsLogged(true);

          toggleAll();
        }
      });
  }

  return (
    <form className="loginContainer">
      <h1>LOGIN</h1>
      <input placeholder='Login' title='Login' onInput={(e) => setLogin(e.target.value)} />
      <input placeholder='Password' title='Password' type="password" onInput={(e) => setPassword(e.target.value)} />
      <button type='button' className="submitButton" onClick={() => loggin()}>Entrar</button>
      <button type='button' className="linkButton" onClick={() => toggleRegister()}>Não tem uma conta <b>se cadastre aqui!</b></button>
    </form>
  );
}

export default LoginPage;
