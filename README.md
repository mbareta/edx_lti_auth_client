# edx_lti_auth_client
This is a client that provides LTI components for edX and handles sessions with OAuth2 connection.

The code is still in early development process and serves as a prototype/proof of concept.

# edX setup
1. Go to LMS Django admin
2. Add OAuth2 Client with settings from this app (client id, secret, redirect URIs, etc.)
3. Add the client from step 2 to Trusted Clients

# LTI XBlock setup
1. Go to Studio, select your course and go to Advanced Settings
2. Add LTI passport with similar content to this: "my_lti_client_id:client_key:client_secret"
3. Add "lti" to Advanced Module List
4. Go to Content, Unit and add LTI XBlock
5. Set up LTI XBlock:
  - "LTI ID" is my_lti_client_id from passport from step 2
  - "LTI URL" is the URL to our component in this app, currently "http://localhost:3000/"
  - "Open in New Page" is False because we want it to render inside iframe
  - Request user's email and username is True because we want to save this to our session
  - "Scored" can be True so we can test the grading API
