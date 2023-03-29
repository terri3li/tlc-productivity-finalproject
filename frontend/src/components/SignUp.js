import React, {useState} from 'react';

const SignUp = () => {
    return(
      <Form>
          <FormBody>
              <FirstName>
                  <label for="firstName">First Name </label>
                  <input type="text" id="firstName" placeholder="First Name"/>
              </FirstName>
              <LastName>
                  <label for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName" placeholder="Last Name"/>
              </LastName>
              <Email>
                  <label for="email">Email </label>
                  <input  type="email" id="email" placeholder="Email"/>
              </Email>
              <Password>
                  <label for="password">Password </label>
                  <input type="password"  id="password" placeholder="Password"/>
              </Password>
              <ConfirmPass>
                  <label for="confirmPassword">Confirm Password </label>
                  <input type="password" id="confirmPassword" placeholder="Confirm Password"/>
              </ConfirmPass>
          </FormBody>
          <Footer>
              <button type="submit">Register</button>
          </Footer>
      </Form>      
    )       
}

export default SignUp;