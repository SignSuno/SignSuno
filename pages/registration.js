import Head from "next/head";
import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import {
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Link,
  VStack,
} from "@chakra-ui/layout";
import { Checkbox, color, Text } from "@chakra-ui/react";
//import hand_logo from "./assets/icons/Hand_logo_yellow_1.svg";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/input";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { Router } from "react-router-dom";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userId, setUserId] = useState("");
  const [uname, setName] = useState("");
  const [email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_pass, setCPass] = useState("");

  const [formErrors, setFormErrors] = useState({
    password: "",
    confirm_pass: "",
  });

  const formControlWidth = useBreakpointValue({ base: "100%", md: "md" });

  function sendData() {
    localStorage.setItem("email", email_id);
    localStorage.setItem("user", uname);
    //let responseData;
    try {
      console.log(userId);
      console.log(uname);
      console.log(email_id);
      console.log(password);

      axios
        .post("http://127.0.0.1:8000/api/register", {
          username: userId,
          name: uname,
          email_id: email_id,
          password: password,
        })
        .then((response) => {
          console.log("response", response);
          console.log("response", response.data["status"]);

          if (response.data["status"] == 200) {
            window.location.href = "/otp";
          } else {
            window.location.href = "/registration";
          }
        })
        .catch(console.log);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate form fields
    const errors = {};
    if (password !== confirm_pass) {
      errors.confirm_pass = "Passwords do not match";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      errors.password =
        "Password must contain at least 8 characters, 1 uppercase, and 1 lowercase";
    }

    // Update state with any errors
    setFormErrors(errors);

    // Submit form if there are no errors
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully!");
      sendData();
      // You could also submit the form to a server here
    }
  }

  function handlePasswordChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Check for password conditions and update form errors
    const errors = {};
    if (confirm_pass && newPassword !== confirm_pass) {
      errors.confirm_pass = "Passwords do not match";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(newPassword)) {
      errors.password =
        "Password must contain at least 8 characters, 1 uppercase, and 1 lowercase";
    } else {
      errors.password = "";
    }
    setFormErrors(errors);
  }
  function handleConfirmPassChange(event) {
    const newConfirmPass = event.target.value;
    setCPass(newConfirmPass);

    // Check for password match and update form errors
    const errors = {};
    if (password !== newConfirmPass) {
      errors.confirm_pass = "Passwords do not match";
    } else {
      errors.confirm_pass = "";
    }
    setFormErrors(errors);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleUserChange(event) {
    const userId = event.target.value;
    setUserId(userId);

    const errors = {};
    axios
      .post("http://127.0.0.1:8000/api/userCheck", {
        username: uname,
      })
      .then((response) => {
        if (response.data["status"] == 400) {
          errors.userId = "This username already exists";
        } else {
          errors.userId = "";
        }
      });
    setFormErrors(errors);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    // Check for password conditions and update form errors
    const errors = {};
    if (confirm_pass && event.target.value !== confirm_pass) {
      errors.confirm_pass = "Passwords do not match";
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(event.target.value)
    ) {
      errors.password =
        "Password must contain at least 8 characters, 1 uppercase, and 1 lowercase";
    } else {
      errors.password = "";
    }
    setFormErrors(errors);
  }
  function handleConfirmPassChange(event) {
    setCPass(event.target.value);
  }

  //show or hide eye icon
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);

  const [bgHeight, setBgHeight] = React.useState("100vh");

  function handleBgLoad(event) {
    const height = `${event.target.height}px`;
    setBgHeight(height);
  }

  const style = React.useMemo(
    () => ({ height: `${bgHeight} !important` }),
    [bgHeight]
  );

  return (
    <>
      <Head>
        <title>Sign Suno</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
      </Head>
      <main>
        <Flex minH={"100vh"}>
          <Box
            // minH={"100vh"}
            minHeight={{ base: "auto", lg: "100%" }}
            display={{ base: "none", lg: "block" }}
            flex="1"
            backgroundSize="cover"
            bgImage="url('assets/images/Carousel2.svg')"
            bgPosition="center"
            bgRepeat="no-repeat"
          >
            <Center>
              <VStack>
                <Text
                  color="white"
                  font="Inter"
                  fontWeight="800"
                  fontSize="28px"
                  align="center"
                  marginTop="10%"
                >
                  Communicate to rise on <br />
                  the leaderboard
                </Text>

                <Text
                  color="white"
                  Font="Inter"
                  FontWeight="400"
                  FontSize="18px"
                  align="center"
                >
                  The more you communicate through us, the <br />
                  higher you score!
                </Text>
              </VStack>
            </Center>
          </Box>
          <Box flex="1" display={{ base: "block", lg: "auto" }}>
            <Flex alignItems="center" justifyContent="center" minHeight="100vh">
              <Box width="100%" alignContent="center" padding="5" height="100%">
                <Center marginBottom="6" flexDirection="column">
                  <Heading marginTop="5%" fontSize="3xl" color="#0B51DA">
                    Sign
                  </Heading>
                  <Heading fontSize="3xl" color="#0B51DA">
                    सुनो
                  </Heading>
                  <Text
                    marginTop="2%"
                    font="Inter"
                    fontWeight="600"
                    fontSize="28px"
                  >
                    Let us know about you
                  </Text>
                </Center>

                <Center>
                  <VStack>
                    <form
                      // onSubmit={sendData}

                      onSubmit={handleSubmit}
                    >
                      <Center>
                        <Stack
                          spacing={4}
                          width={formControlWidth}
                          align-items="center"
                        >
                          <FormControl>
                            <Input
                              width="100%"
                              backgroundColor="#E2EAF8"
                              type="text"
                              placeholder="Name"
                              value={uname}
                              onChange={handleNameChange}
                              required
                              // onChange={(e) => setName(e.target.value)}
                            />
                          </FormControl>
                          <FormControl>
                            <Input
                              backgroundColor="#E2EAF8"
                              type="text"
                              placeholder="Username"
                              value={userId}
                              onChange={handleUserChange}
                              required
                              // onChange={(e) => setUserId(e.target.value)}
                            />
                            {formErrors.userId && (
                              <div style={{ color: "red" }}>
                                {formErrors.userId}
                              </div>
                            )}
                          </FormControl>
                          <FormControl>
                            <Input
                              backgroundColor="#E2EAF8"
                              type="email"
                              placeholder="Email"
                              value={email_id}
                              onChange={handleEmailChange}
                              required
                              // onChange={(e) => setEmail(e.target.value)}
                            />
                          </FormControl>
                          <FormControl>
                            <InputGroup>
                              <Input
                                backgroundColor="#E2EAF8"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                // onChange={(e) => setPassword(e.target.value)}
                              />
                              <InputRightElement width="4.5rem">
                                <Button
                                  h="1.75rem"
                                  size="sm"
                                  onClick={handleShowPasswordClick}
                                >
                                  {showPassword ? (
                                    <ViewOffIcon />
                                  ) : (
                                    <ViewIcon />
                                  )}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            {formErrors.password && (
                              <div style={{ color: "red" }}>
                                {formErrors.password}
                              </div>
                            )}
                          </FormControl>
                          <FormControl>
                            <Input
                              backgroundColor="#E2EAF8"
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              value={confirm_pass}
                              onChange={handleConfirmPassChange}
                              required
                              // onChange={(e) => setCPass(e.target.value)}
                            />
                            {formErrors.confirm_pass && (
                              <div style={{ color: "red" }}>
                                {formErrors.confirm_pass}
                              </div>
                            )}
                          </FormControl>
                          <Button
                            backgroundColor="#0B51DA"
                            color="white"
                            width="100%"
                            type="submit"
                          >
                            Register
                          </Button>
                        </Stack>
                      </Center>
                    </form>

                    <Text>
                      Have an account already?
                      <Link
                        color="#0B51DA"
                        href="/landing"
                        _hover={{ textDecoration: "none" }}
                        marginLeft="0.5"
                      >
                        Sign In
                      </Link>
                    </Text>
                  </VStack>
                </Center>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </main>
    </>
  );
}
