import React, { Component } from 'react';
import './login.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email:"",
        password:"",
      },
      submitted: false,
    }
    this.handleemailChange = this.handleemailChange.bind(this);
    this.handlepasswordChange = this.handlepasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://10.2.135.75:5000/login', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleemailChange(event) {
    this.setState({
      formData:{email:event.target.value}
    })
  }
  handlepasswordChange(event) {
    this.setState({
      formData:{
        password:event.target.value
      }
    })
  }


  render() {

    return (
      <div className="App">
      <MDBContainer className = "mb-4">
        <span className = "align-middle">
        <MDBRow>
        <MDBCol md ="5">
        <MDBCard>
          <MDBCardBody>
            <MDBCardHeader className="form-header deep-blue-gradient rounded">
              <h4 className="mt-3" >
               <p className="text-center"> <MDBIcon icon="lock" > Login
                  </MDBIcon></p>
              </h4>
            </MDBCardHeader>
          <form>
            <div className = "grey-text">
                <MDBInput 
                label="Your email" 
                icon = "envelope" 
                group 
                type = "email" 
                validate 
                error = "wrong" 
                success="right" 
                value={this.state.email} 
                onChange={this.handleemailChange}/>
                <MDBInput 
                label="Your Password" 
                icon = "lock" 
                group 
                type ="password" 
                value={this.state.password} 
                onChange={this.handlepasswordChange} validate/>
            </div>
            <div className = "text-center mt-4">
                <MDBBtn color = "light-blue" className="mb-3" type = "submit" onSubmit={this.handleSubmit}>Submit</MDBBtn>
            </div>
          </form>

        {this.state.submitted &&
          <div>
            <h2>
              Login.
            </h2>
          </div>
        }
        </MDBCardBody>
        </MDBCard>
        </MDBCol>
        </MDBRow>
        </span>
     </MDBContainer>
     </div>
    );
  }
}

export default Login;