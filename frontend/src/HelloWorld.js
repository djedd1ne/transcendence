import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HelloWorld() {
	  const [message, setMessage] = useState('');
	axios({
		  method: 'post',
		  url: 'http://127.0.0.1/login',
		  data: {
			      firstName: 'user1234',
			      lastName: 'banana1234'
			    }
	})
	.then(function (response) {
		console.log(response);
	});
	  return (
		      <div>
		        <h1>Hello, World!</h1>
		        <p>{message}</p>
		      </div>
		    );
}

export default HelloWorld;

