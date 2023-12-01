import { useState } from "react";
import Sidebar from '../Components/Sidebar';
import Mainbar from '../components/Mainbar';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import '../assets/css/global.scss';

const Home = () => {
  const [conversations, setConversations] = useState([]);

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [atualId, setAtualId] = useState(null);
  const [isLogged, setIsLogged] = useState(null);

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const toggleRegister = () => {
    setRegister(!register);
    setLogin(false); // Disable login mode
  }

  const toggleLogin = () => {
    setLogin(!login);
    setRegister(false); // Disable register mode
  }

  const toggleGeneral = () => {
    if (login || register) {
      setLogin(false);
      setRegister(false);
    } else {
      setLogin(true);
    }
  }

  const handleSend = async (message) => {
    setMessages([...messages, { content: message, role: "user" }]);
    setIsTyping(true);

    const apiRequestBody = {
      content: message
    };

    try {
      const response = await fetch(`https://aiready.azurewebsites.net/messages/?chat_id=${atualId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();

      if (data.messages) {
        setMessages(data.messages);
        setIsTyping(false);
      } else {
        console.error('Error: Response does not contain messages');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error as needed
    }
  };

  // Function for file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Send the file to the server
      console.log("Selected file:", file);
    } else {
      console.log("No file selected.");
    }
  };

  const handleNewChat = async () => {
    const userId = localStorage.getItem('userId');

    const apiRequestBody = {
      title: "New Chat",
      description: ""
    }

    try {
      const response = await fetch(`https://aiready.azurewebsites.net/users/${userId}/chats/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();

      setConversations([...conversations, data]);
      setAtualId(data.id);
      setMessages(data.messages);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error as needed
    }
  };

  const handleOpenChat = async (id) => {
    try {
      const response = await fetch(`https://aiready.azurewebsites.net/chats/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const chats = await response.json();
      const chat = chats.find(x => x.id == id);

      if (chat != null) {
        setAtualId(chat.id);
        setMessages(chat.messages);
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error as needed
    }
  };

  // Delete conversation
  const handleDeleteChat = async (chatId) => {
    try {
      await fetch(`https://aiready.azurewebsites.net/chats/?chat_id=${chatId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedConversations = conversations.filter(conversation => conversation.id !== chatId);
      setConversations(updatedConversations);

      if (chatId === atualId) {
        setAtualId(null);
        setMessages(null);
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error as needed
    }
  };

  return (
    <div className='home'>
      <div className='container'>
        <Sidebar
          id={atualId}
          messages={messages}
          isLogged={isLogged}
          conversations={conversations}
          setConversations={setConversations}
          handleNewChat={handleNewChat}
          handleOpenChat={handleOpenChat}
          handleDeleteChat={handleDeleteChat}
          toggleLogin={toggleGeneral}
        />
        <Mainbar id={atualId} messages={messages} handleSend={handleSend} handleDeleteChat={handleDeleteChat} />
        {login && (
          <LoginPage toggleAll={toggleGeneral} toggleRegister={toggleRegister} setConversations={setConversations} setIsLogged={setIsLogged} />
        )}
        {register && (
          <RegisterPage toggleLogin={toggleLogin} />
        )}
      </div>
    </div>
  );
};

export default Home;
