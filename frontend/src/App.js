import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const urlParams = new URLSearchParams(window.location.search);
const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    client.get("/api/test")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        username: username,
        password: password,
		email: email,
		first_name: first_name,
		last_name: last_name
      }
    ).then(function(res) {
      client.post(
        "/api/login",
        {
          username: username,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  function submit42Login(e) {
	let uid="u-s4t2ud-17c3d06c29a63f052756d513ba06d6d98b92ee95cb7b6a9dd4e66465af2477ab"
	let scope="public"
	let url="https://api.intra.42.fr/oauth/authorize?client_id="+ uid +"&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000&response_type=code&scope=" + scope
	window.open(url, "_self")
	
	let code= urlParams.get("code");
	client.post("/api/42token",
		{
			code: code
		}
	).then(function(res) {
		console.log(res)
	});
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        username: username,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.get(
      "/api/logout",
    ).then(function(res) {
      setCurrentUser(false);
    });
	setRegistrationToggle(false);
  }

  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
		<iframe title="gameFrame" 
		src="http://127.0.0.1:8080"
        frameborder="0"
        scrolling="no"
        height="960px"
     width="100%"> </iframe>
        </div>
    );
  }
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Authentication App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
		  <h2> Register </h2>
          <Form onSubmit={e => submitRegistration(e)}>
		  <Row className="mb-3">
		   <Form.Group as={Col} controlId="formGridEmail">
		            <Form.Label>Email</Form.Label>
		            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
		          </Form.Group>
			</Row>
		  <Row className="mb-3">
				<Col>
					<Form.Control placeholder="First name" value={first_name} onChange={e => setFirstName(e.target.value)}/>
				</Col>
				<Col>
					<Form.Control placeholder="Last name" value={last_name} onChange={e => setLastName(e.target.value)}/>
				</Col>
			</Row>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username to register" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>        
      ) : (
        <div className="center">
		  <h2> Login </h2>
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username </Form.Label>
              <Form.Control type="text" placeholder="Enter username to login" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="login">
              Login
            </Button>
			<p> </p>
          </Form>
          <Form onSubmit={e => submit42Login(e)}>
            <Button variant="primary" type="42login">
              Login 42
            </Button>
          </Form>
        </div>
      )
    }
    </div>
  );
}

export default App;
