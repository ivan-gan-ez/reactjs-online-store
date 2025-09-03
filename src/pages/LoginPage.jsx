import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import validator from "email-validator";
import { userLogin } from "../utils/api_user";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
    } else if (!validator.validate(email)) {
      toast.error("Please use a valid email address.");
    } else {
      //do checkout
      try {
        //create order
        const response = await userLogin(email, password);
        //get billplz url
        console.log(response);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Container sx={{ p: 6 }}>
        <Header current="login" title="Log In To Your Account" />
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <Paper sx={{ p: 5 }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="indigo"
              fullWidth
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Paper>
        </Container>
      </Container>
    </>
  );
};

export default LoginPage;
