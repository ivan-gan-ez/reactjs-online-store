import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import validator from "email-validator";
import { userSignup } from "../utils/api_user";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);

  const handleSignUp = async () => {
    try {
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill in all fields.");
      } else if (!validator.validate(email)) {
        toast.error("Please use a valid email address.");
      } else if (password !== confirmPassword) {
        toast.error("Your passwords do not match.");
      } else {
        const response = await userSignup(name, email, password);
        setCookie("currentuser", response, { maxAge: 60 * 60 * 8 });
        toast.success("Signup successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Container sx={{ p: 6 }}>
        <Header current="signup" title="Create A New Account" />
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <Paper sx={{ p: 5 }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
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
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="indigo"
              fullWidth
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Paper>
        </Container>
      </Container>
    </>
  );
};

export default SignupPage;
