import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ActiveNavbar from './ActiveNavbar.js';
import InactiveNavbar from './InactiveNavbar.js';
import Reg from './Reg.js';
import Log from './Log.js';
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


	async function getToken(e) {
		e.preventDefault();
		console.log("getToken");
		let code = getCode(e);

		console.log("code is: "+ code);
		const resp = await client.post("/api/42token", 
			{ 
				code : code 
			} 
		)
		return resp
	}

	async function getUserInfo(e) {
		e.preventDefault();
		let code = localStorage.getItem("token");
		const info = await client.post("/api/userprofile", 
			{ 
				code : code 
			} 
		)
		console.log("info is: ", info.data);
		return info.data;
	}

	async function getInfo(e) {
		e.preventDefault();
		const token = await getToken(e);
		//const token = getToken(e);
		localStorage.setItem("token", token.data);
		console.log("token const: ", token);
		//const userInfo = await new getUserInfo(token);
		//console.log("userinfo const: " + userInfo);
	}

	function getCode(e) {
		const code = urlParams.get("code");
		return code;
	}

	useEffect(() => {

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

	if (currentUser) {
		return (
			<ActiveNavbar 
				client = { client }
				setCurrentUser = { setCurrentUser }
				setRegistrationToggle = { setRegistrationToggle } 
			/>
		);
	}
	return (
		<div>
			<InactiveNavbar
				update_form_btn = { update_form_btn }
			/>
		{
			registrationToggle ? (
				<Reg 
					client = { client } 
					username = { username } 
					password = { password } 
					first_name = { first_name } 
					last_name = { last_name } 
					email = { email } 
					setEmail = { setEmail } 
					setPassword = { setPassword }
					setFirstName = { setFirstName } 
					setLastName = { setLastName } 
					setUsername = { setUsername } 
					setPassword = { setPassword } 
					setCurrentUser = { setCurrentUser } 
				/>
      ) : (
				<Log 
					username = { username } 
					password = { password } 
					setUsername = { setUsername }
					setPassword = { setPassword } 
					client = { client } 
					 setCurrentUser = { setCurrentUser }
				/>
      )
    }
    </div>
  );
}

export default App;
