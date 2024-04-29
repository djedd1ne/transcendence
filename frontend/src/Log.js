
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Log (props) {

	function submit42Login(e) {
		let uid="u-s4t2ud-17c3d06c29a63f052756d513ba06d6d98b92ee95cb7b6a9dd4e66465af2477ab"
		let scope="public"
		let url="https://api.intra.42.fr/oauth/authorize?client_id="+ uid +"&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000&response_type=code&scope=" + scope
		e.preventDefault();
		window.open(url, "_self")
	}

	function submitLogin(e) {
		e.preventDefault();
		props.client.post(
			"/api/login",
			{
				username: props.username,
				password: props.password
			}
		).then(function(res) {
			props.setCurrentUser(true);
		});
	}

	return (
        <div className="center">
		  <h2> Login </h2>
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username </Form.Label>
              <Form.Control type="text" placeholder="Enter username to login" value={props.username} onChange={e => props.setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={props.password} onChange={e => props.setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="login">
              Login
            </Button>
			<p> </p>
          </Form>
          <Form onSubmit={e => submit42Login(e)}>
            <Button variant="primary" type="42login">
              Login 43
            </Button>
          </Form>
        </div>
	);
}

export default Log;
