import Head from "next/head";
import { useLayoutEffect, useState } from "react";
import { Inter } from "@next/font/google";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  VStack,
} from "@chakra-ui/layout";
import { Checkbox, color, Text } from "@chakra-ui/react";
//import hand_logo from "./assets/icons/Hand_logo_yellow_1.svg";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });
import { Spacer } from "@chakra-ui/layout";
import axios from "axios";

export default function Home() {
  function sendData() {}

  const [password, setPassword] = useState("");
  const [confirm_pass, setCPass] = useState("");
  const [userId, setUser] = useState("");

  const formControlWidth = useBreakpointValue({ base: "100%", md: "md" });

  useLayoutEffect(() => {
    const user = localStorage.getItem("username");
    setUser(user);
    console.log(userId);
  }, []);

  const [formErrors, setFormErrors] = useState({
    password: "",
    confirm_pass: "",
  });

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
      // You could also submit the form to a server here

      axios
        .post("http://127.0.0.1:8000/api/pass_reset", {
          username: userId,
          password: password,
        })
        .then((response) => {
          console.log("response", response.status);

          if (response.status == 200) {
            window.location.href = "/landing";
          }
        })
        .catch(console.log);
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
  return (
    <>
      <Head>
        <title>Sign Suno</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
      </Head>
      <main style={{ height: "100vh" }}>
        <Flex height="100%">
          <Box
            flex="1"
            height="100%"
            bgImage="url('assets/images/Carousel2.svg')"
            bgPosition="center"
            bgRepeat="no-repeat"
            display={{ base: "none", lg: "block" }}
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
          <Box flex="1" height="100%"  display={{ base: "block", lg:"auto"}}>
            <Flex alignItems="center" justifyContent="center" minHeight="100vh">
              <Box width="100%" height="100%" >
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
                    fontSize="28"
                  >
                    Reset your password
                  </Text>
                  {/* <hand_logo
                    src="Hand_logo_yellow_1.svg"
                  /> */}
                </Center>

                <Center p={5}>
                  <VStack gap={5} width="100%">
                    <form onSubmit={handleSubmit}>
                      <VStack gap={4} width={formControlWidth}>
                        <FormControl
                          borderRadius={5}
                        >
                          <InputGroup>
                            <Input
                              backgroundColor="#E2EAF8"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              placeholder="Enter New Password"
                              onChange={handlePasswordChange}
                              required
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleShowPasswordClick}
                              >
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          {formErrors.password && (
                            <div style={{ color: "red" }}>
                              {formErrors.password}
                            </div>
                          )}
                        </FormControl>
                        <FormControl
                          borderRadius={5}
                        >
                          <InputGroup>
                            <Input
                              backgroundColor="#E2EAF8"
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              value={confirm_pass}
                              onChange={handleConfirmPassChange}
                              required
                            />
                          </InputGroup>
                          {formErrors.confirm_pass && (
                            <div style={{ color: "red" }}>
                              {formErrors.confirm_pass}
                            </div>
                          )}
                        </FormControl>
                        <Button
                        backgroundColor="#0B51DA"
                        color="white"
                        type="submit"
                        width={formControlWidth}
                      >
                        Register
                      </Button>
                      </VStack>                     
                    </form>
                    <Text>
                      Have an account already?
                      <Link
                        color="#0B51DA"
                        href="/#"
                        marginLeft="0.5"
                        _hover={{ textDecoration: "none" }}
                      >
                        Sign in
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