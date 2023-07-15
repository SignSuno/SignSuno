import Head from "next/head";
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
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { delay } from "framer-motion";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Landing() {
  const formControlWidth = useBreakpointValue({ base: "100%", md: "md" });

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [formErrors, setFormErrors] = useState({
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (userId.trim().length !== 0 && password.trim().length !== 0) {
      console.log("both are set");
      try {
        console.log(userId);
        console.log(password);

        axios
          .post("http://127.0.0.1:8000/api/login", {
            username: userId,
            password: password,
          })
          .then((response) => {
            console.log("response", response.data);

            if (response.status !== 200) {
              // errors.login = "Username or password is incorrect";
              // setFormErrors(errors);
              setErrorMessage("Invalid username or password"); // Set the error message here
            } else {
              // errors.login = "";
              const responseData = response.data;
              handleResponseData(responseData);
            }
          })
          // .catch(console.log);
          .catch((error) => {
            setErrorMessage("Invalid username or password");
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
      setFormErrors(errors);
    }
    // else {
    //   errors.login = "Fields Not set";
    //   window.location.href = "/landing";
    // }
  };

  function handleResponseData(responseData) {
    console.log("response data", responseData);

    if (responseData != null) {
      // Login success
      console.log("login success");
      console.log("jwt", responseData.jwt);
      console.log(`jwt=${responseData.jwt}`);

      axios
        .get("http://127.0.0.1:8000/api/login", {
          headers: {
            Authorization: `${responseData.jwt}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            axios.post("http://127.0.0.1:8000/api/create_leaderboard_user", {
              username: userId,
            });
          }
        })

        .catch((error) => {
          console.error(error);
        });
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("token", responseData.jwt);
      window.localStorage.setItem("user", userId);
      window.localStorage.setItem("type", "asl");
      //.catch(console.log);
      //.catch(console.log);

      //Router.push("/home/");
      window.location.href = "/";
    } else {
      // Login failed
      setErrorMessage("Invalid username or password");
      window.location.href = "/landing";
      // Router.push("/");
    }
  }

  //generating error message
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <Head>
        <title>Sign Suno</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
      </Head>
      <main >
        <Flex minH={"100vh"}>
          <Box
            flex="1"
            minHeight="100%"
            bgImage="url('assets/images/Carousel1.svg')"
            bgPosition="center"
            bgRepeat="no-repeat"
            backgroundSize="cover"
            // height={{ base: "auto", lg: "100vh" }}
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
                  Accessible communication, <br /> anytime, anywhere
                </Text>

                <Text
                  color="white"
                  Font="Inter"
                  FontWeight="400"
                  FontSize="18px"
                  align="center"
                >
                  You just need stable internet connection <br />
                  and voila - engage in conversations!
                </Text>
              </VStack>
            </Center>
          </Box>
          <Box
            flex="1"
            // height="100%"
            display={{ base: "block", lg: "auto" }}
            // alignItems="flex-start"
          >
            <Flex alignItems="center" justifyContent="center" minHeight="100vh">
              <Box width="75%" height="100%"  alignContent="center">
                <Center marginBottom="6" flexDirection="column">
                  <Heading fontSize="3xl" color="#0B51DA">
                    Sign
                  </Heading>
                  <Heading fontSize="3xl" color="#0B51DA">
                    सुनो
                  </Heading>
                  <Text marginTop="39px">Hey, Let's Sign You In</Text>
                </Center>
                <VStack>
                  <form  onSubmit={handleSubmit}>
                    <VStack gap={4} 
                    width={formControlWidth}
                    >
                      <FormControl>
                        <Input
                          required
                          backgroundColor="#E2EAF8"
                          type="text"
                          placeholder="UserName"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          required
                          backgroundColor="#E2EAF8"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {formErrors.login && (
                          <div style={{ color: "red" }}>{formErrors.login}</div>
                        )}
                        {errorMessage && (
                          <div style={{ color: "red" }}>{errorMessage}</div>
                        )}
                        <Link
                          href="/email_forgot_pass"
                          color="#0B51DA"
                          _hover={{ textDecoration: "none", opacity: "0.7" }}
                          marginLeft={0}
                          style={{ marginLeft: "0 !important" }}
                        >
                          Forgot Password
                        </Link>
                      </FormControl>
                      <Button
                        backgroundColor="#0B51DA"
                        color="white"
                        type="submit"
                        width={formControlWidth}
                      >
                        Login
                      </Button>
                    </VStack>
                  </form>

                  <Text>
                    Don't have an account?
                    <Link
                      color="#0B51DA"
                      href="/registration"
                      marginLeft="0.5"
                      _hover={{ textDecoration: "none", opacity: "0.7" }}
                    >
                      Sign Up
                    </Link>
                  </Text>
                </VStack>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </main>
    </>
  );
}
