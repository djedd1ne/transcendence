
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Reg (props) {

	function submitRegistration(e) {
		e.preventDefault();
		props.client.post(
			"/api/register",
			{
				username: props.username,
				password: props.password,
				email: props.email,
				first_name: props.first_name,
				last_name: props.last_name
			}
		).then(function(res) {
			props.client.post(
				"/api/login",
				{
					username: props.username,
					password: props.password
				}
			).then(function(res) {
				props.setCurrentUser(true);
			});
		});
	}

	return (
				<div className="center">
				<h2> Register </h2>
				<Form onSubmit={e => submitRegistration(e)}>
				<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridEmail">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" placeholder="Enter email" value={props.email} onChange={e => props.setEmail(e.target.value)} />
				</Form.Group>
				</Row>
				<Row className="mb-3">
				<Col>
				<Form.Control placeholder="First name" value={props.first_name} onChange={e => props.setFirstName(e.target.value)}/>
				</Col>
				<Col>
				<Form.Control placeholder="Last name" value={props.last_name} onChange={e => props.setLastName(e.target.value)}/>
				</Col>
			</Row>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username to register" value={props.username} onChange={e => props.setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={props.password} onChange={e => props.setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>        
	);
}

export default Reg;
