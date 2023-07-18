import Head from "next/head";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  VStack,
  Stack,
  List,
  ListItem,
} from "@chakra-ui/layout";
import Navbar from "@/components/Navbarss-front";
//const inter = Inter({ subsets: ["latin"] });
import { Image } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
// import React, { useState, useRef } from "react";
import { Switch } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLayoutEffect } from "react";
import NotLoggedInAlert from "@/components/pop_up_loginss-front";
import { useMediaQuery } from "@chakra-ui/react";

export default function Home() {
  function sendData() {}

  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [recordedChunksSai, setRecordedChunksSai] = useState([]);
  const [text, setText] = useState("");
  let model_text;

  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState("");
  const [type, setType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    const userId = localStorage.getItem("user");
    setUser(userId);

    const xyz = localStorage.getItem("type");
    setType(xyz);

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("isLoggedIn") == "true"
    ) {
      //const isLoggedInLocalStorage = ;
      setIsLoggedIn(true);
    }

    console.log("***", userId);
    console.log("***", isLoggedIn);
  }, []);

  //toggle button
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);

    isChecked ? setType("asl") : setType("isl");
    isChecked
      ? window.localStorage.setItem("type", "asl")
      : window.localStorage.setItem("type", "isl");
  };

  function handleClick(event) {
    event.preventDefault();
    if (isLoggedIn) {
      addToList();
    } else {
      togglePopup();
    }
  }

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  const addToList = async () => {
    setText(text.toLowerCase());
    axios
      .post("http://127.0.0.1:8000/api/save_phrase", {
        username: user,
        word_phrase: text,
      })
      .then((response) => {
        console.log("success", response);
      })
      .catch(console.log);
  };

  const textSpeech = async () => {
    setText(text.toLowerCase());

    if ("speechSynthesis" in window) {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const updateScore = async () => {
    console.log("IN HERE");

    if (isLoggedIn) {
      //addToList();
      axios
        .post("http://127.0.0.1:8000/api/update_score", {
          username: user,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(console.log);
    }
  };

  const handleStartCapture = () => {
    console.log("starts capturing");
    setIsCapturing(true);
    recordedChunksRef.current = [];
    // Reset the recorded chunks

    // // Create a new MediaRecorder instance
    // mediaRecorderRef.current = new MediaRecorder(videoRef.current.srcObject);

    // // Register event handlers for the MediaRecorder
    // mediaRecorderRef.current.ondataavailable = (event) => {
    //   recordedChunksRef.current.push(event.data);
    //   console.log("Chunks:", recordedChunksRef.current); // Log the chunks here
    // };

    // // Start recording
    // mediaRecorderRef.current.start();

    const video = videoRef.current;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  };

  const handleDataAvailable = (event) => {
    console.log("Sai....", event.data);
    if (event.data && event.data.size > 0) {
      recordedChunksRef.current = [...recordedChunksRef.current, event.data];
      // setRecordedChunksSai((recordedChunksSai) => [
      //   ...recordedChunksSai,
      //   event.data,
      // ]);
    }
    SaveVideo();
  };

  const handleStopCapture = () => {
    console.log("stops rec");
    // setIsCapturing(false);
    // videoRef.current.pause();
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    setIsCapturing(false);
    // SaveVideo();
  };

  const SaveVideo = () => {
    console.log("enters save");
    console.log("Sai: ", recordedChunksRef.current);
    const videoBlob = new Blob(recordedChunksRef.current, {
      type: "video/webm",
    });
    console.log("blob data", videoBlob);

    // Create a FormData object to send the video file
    const formData = new FormData();
    formData.append("videoFile", videoBlob, "recorded-video.webm");

    console.log("form data", formData);

    // Send the video file to the server using Axios or any other HTTP library
    const temp = isChecked ? "asl" : "isl";
    console.log("temp", temp);
    if (temp == "asl") {
      axios
        .post("http://127.0.0.1:8000/api/asl_sign_detection", formData)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            model_text = response.data.txt;

            console.log("model_text", model_text);
            console.log("type", typeof model_text);

            console.log("Video saved successfully");
            console.log(response.data.txt);
            setText(response.data.txt);
            updateScore();
          }
        })
        .catch((error) => {
          console.error("Error saving video:", error);
        });
    } else {
      //add isl model here
      console.log("ISL Model");
      axios
        .post("http://127.0.0.1:8000/api/isl_sign_detection", formData)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            model_text = response.data.txt;

            console.log("model_text", model_text);
            console.log("type", typeof model_text);

            console.log("Video saved successfully");
            console.log(response.data.txt);
            setText(response.data.txt);
            updateScore();
          }
        })
        .catch((error) => {
          console.error("Error saving video:", error);
        });
    }
  };
  const textareaRef = useRef(null);
  const [backgroundHeight, setBackgroundHeight] = useState(0);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setBackgroundHeight(textareaRef.current.scrollHeight);
    }
  }, []);

  const handleInputChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setBackgroundHeight(e.target.scrollHeight);
  };

  /*pop over for save phrases */
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  function togglePopup() {
    setActiveButton(!activeButton);
  }

  /*To check if its mobile screen */
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // Returns true on mobile, false on desktop

  if (isMobile) {
    return (
      <>
        <main style={{ minHeight: "100vh" }}>
          <Head>
            <title>Speak</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
          </Head>
          <Flex flexDirection="column">
            <Box
              // flexGrow={1}

              width="100%"
              bgColor={"#0359C8"}
            >
              <Navbar />

              {/* <Flex flexDirection="column"
                  // alignItems="center"
                  // justifyContent="center"
                  top={0}
                  height="100%"> */}

              <Box height={"100vh"} top={0} left={0}>
                <Box
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="75%"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                  {!isCapturing && (
                    <Button
                      position="absolute"
                      bottom={4}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="md"
                      fontWeight={600}
                      color="#0B51DA"
                      fontFamily="Inter"
                      size="sm"
                      bg="white"
                      href="/"
                      _hover={{ bg: "#FFD53F" }}
                      onClick={handleStartCapture}
                    >
                      Start Capture
                    </Button>
                  )}
                  {isCapturing && (
                    <Button
                      position="absolute"
                      bottom={4}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="md"
                      fontWeight={600}
                      color="#0B51DA"
                      fontFamily="Inter"
                      size="sm"
                      bg="white"
                      href="/"
                      _hover={{ bg: "#FFD53F" }}
                      onClick={handleStopCapture}
                    >
                      Stop Capture
                    </Button>
                  )}
                </Box>
                <Box marginTop={5}>
                  <HStack gap={32}>
                    {/* toggle button */}
                    <Box
                      left={5}
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        width: "24",
                        height: "8",
                        borderRadius: "full",
                        borderWidth: "2px",
                        borderColor: "yellow.400",
                        _before: {
                          content: '""',
                          position: "absolute",
                          width: "6",
                          height: "6",
                          top: "50%",
                          transform: "translateY(-50%)",
                          borderRadius: "full",
                          bg: "yellow.400",
                          transition: "transform 0.3s",
                          transform: isChecked
                            ? "translateX(67px) translateY(-50%)"
                            : "translateX(1px) translateY(-50%)",
                        },
                      }}
                      marginRight={2}
                      onClick={handleToggleChange}
                    >
                      <Box
                        position="absolute"
                        top="50%"
                        transform="translate(-50%, -50%)"
                        left={isChecked ? "8" : "14"}
                        fontSize="xs"
                        fontWeight="bold"
                        color={isChecked ? "yellow.400" : "yellow.400"}
                      >
                        {isChecked ? "American" : "Indian"}
                      </Box>
                      <Switch
                        size="sm"
                        isChecked={isChecked}
                        onChange={handleToggleChange}
                        display="none"
                      />
                    </Box>

                    <Box>
                      <HStack gap={2}>
                        <Link href="/home_speak">
                          <Button
                            _hover={{
                              bg: "#FFD53F",
                            }}
                            boxSize="12"
                            borderRadius="50%"
                            color="#FFFFFF"
                          >
                            <Image
                              size="100%"
                              src="assets/icons/microphone.svg"
                            />
                          </Button>
                        </Link>
                        <Link href="/home_type">
                          <Button
                            _hover={{
                              bg: "#FFD53F",
                            }}
                            boxSize="12"
                            borderRadius="50%"
                            color="#FFFFFF"
                          >
                            <Image size="100%" src="assets/icons/type.svg" />
                          </Button>
                        </Link>
                      </HStack>
                    </Box>
                  </HStack>
                </Box>
                <Box height={backgroundHeight} bg="#0359C8">
                  <Box marginTop={2} marginLeft={5}>
                    <HStack spacing={2}>
                      <Image
                        size={"100%"}
                        boxSize={16}
                        src="assets/icons/audio.svg"
                      />
                      {/* </Button> */}
                      <Box w="400px" height="100%" borderRadius="md">
                        {/* <Textarea
                          ref={textareaRef}
                          color="#FFFFFF"
                          Font="Inter"
                          fontWeight="600"
                          fontSize="20"
                          readOnly
                          resize="none"
                          minH="unset"
                          height="100%"
                          overflowY="hidden"
                          style={{
                            height: "auto",
                            minHeight: "unset",
                            border: "none",
                          }}
                          onChange={handleInputChange}
                        > */}
                        {/* {text} */}
                        {/* Dummy text to help u wrap */}
                        {/* AMAMSASAHelpSHelpMakeHelpMoreHelp4BHouseBCMakeBabyMoreBabyMoreNameMoreNameO_OR_0CMoreCX1X1X1LZ1ZWaitZLZTJGJHGHGTJTWaitAHelpMAMoreSI1MakePay1I1MakePayMake1MakePayMakePayMakePayMakePayIPayIPay1MakeHelpISYMYSYSYISMBTLikeTNameGHelpGHelpGDont_LikeHelpPayHelpJMakeHelpNameGEO_OR_0HTMoreBMoreHouseMoreHouseMoreBHBHBMoreBMoreMakeCBMakeCMIC */}
                        {/* </Textarea> */}
                        <Text
                          color="#FFFFFF"
                          Font="Inter"
                          fontWeight="600"
                          fontSize="20"
                        >
                          {text}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        </main>
      </>
    );
  }

  return (
    <>
      <main style={{ maxHeight: "100vh" }}>
        <Head>
          <title>Sign Suno</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
        </Head>

        <Flex height="100vh" flexDirection="column">
          <Box
            flexGrow={1}
            width="100%"
            bgGradient="linear(to-r, #0B51DA, #4878FF)"
          >
            <Navbar />
            <Grid marginLeft="10" templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem w="100%">
                <Center>
                  <Box boxSize={"lg"} height="100%">
                    <VStack>
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        // playsInline
                      />
                      {!isCapturing && (
                        <Button
                          fontSize={"md"}
                          fontWeight={600}
                          color={"#0B51DA"}
                          fontFamily="Inter"
                          size="sm"
                          bg={"white"}
                          href={"/"}
                          _hover={{
                            bg: "#FFD53F",
                          }}
                          onClick={handleStartCapture}
                        >
                          Start Capture
                        </Button>
                      )}
                      {isCapturing && (
                        <Button
                          fontSize={"md"}
                          fontWeight={600}
                          color={"#0B51DA"}
                          fontFamily="Inter"
                          size="sm"
                          bg={"white"}
                          href={"/"}
                          _hover={{
                            bg: "#FFD53F",
                          }}
                          onClick={handleStopCapture}
                        >
                          Stop Capture
                        </Button>
                      )}
                      {/* <HStack spacing={8}>
                            <Button onClick={startCapture}>Start Capture</Button>
                            <Button onClick={stopCapture}>Stop Capture</Button>
                          </HStack> */}
                    </VStack>
                  </Box>
                </Center>
              </GridItem>
              <GridItem
                display={"flex"}
                flexFlow={"column"}
                marginTop="10"
                w="100%"
              >
                <VStack gap={8} alignItems={"initial"}>
                  <Box>
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        width: "24",
                        height: "8",
                        borderRadius: "full",
                        borderWidth: "2px",
                        top: "-5",
                        borderColor: "yellow.400",
                        _before: {
                          content: '""',
                          position: "absolute",
                          width: "6",
                          height: "6",
                          top: "50%",
                          transform: "translateY(-50%)",
                          borderRadius: "full",
                          bg: "yellow.400",
                          transition: "transform 0.3s",
                          transform: isChecked
                            ? "translateX(67px) translateY(-50%)"
                            : "translateX(1px) translateY(-50%)",
                        },
                      }}
                      onClick={handleToggleChange}
                    >
                      <Box
                        position="absolute"
                        top="50%"
                        transform="translate(-50%, -50%)"
                        left={isChecked ? "8" : "14"}
                        fontSize="xs"
                        fontWeight="bold"
                        color={isChecked ? "yellow.400" : "yellow.400"}
                      >
                        {isChecked ? "American" : "Indian"}
                      </Box>
                      <Switch
                        size="sm"
                        isChecked={isChecked}
                        onChange={handleToggleChange}
                        display="none"
                      />
                    </Box>
                  </Box>
                  <HStack spacing={10}>
                    <Button
                      onClick={textSpeech}
                      _hover={{
                        bg: "#FFD53F",
                      }}
                      // w={32}
                      // height={20}
                      boxSize={16}
                      borderRadius="100%"
                      color="#FFFFFF"
                      marginLeft={5}
                    >
                      <Image
                        //  boxSize={24}
                        size={"100%"}
                        boxSize={16}
                        src="assets/icons/audio.svg"
                      />
                    </Button>
                    <Box w="400px" borderRadius="md" p="2">
                      {/* <Textarea
                        ref={textareaRef}
                        color="#FFFFFF"
                        Font="Inter"
                        fontWeight="600"
                        fontSize="20"
                        readOnly
                        resize="none"
                        minH="unset"
                        overflowY="hidden"
                        style={{
                          height: "auto",
                          minHeight: "unset",
                          border: "none",
                        }}
                        onChange={handleInputChange}
                      > */}
                      {/* {text} */}
                      {/* </Textarea> */}
                      <Text
                        color="#FFFFFF"
                        Font="Inter"
                        fontWeight="600"
                        fontSize="20"
                      >
                        {text}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack>
                    <Button
                      onClick={handleClick}
                      fontSize={"md"}
                      fontWeight={600}
                      color={"White"}
                      fontFamily="Inter"
                      bg={"none"}
                      size="sm"
                      border={"1px solid #F6F9FF"}
                      href={"/"}
                      _hover={{
                        opacity: 0.7,
                      }}
                    >
                      Save Phrases
                    </Button>
                    {!isLoggedIn && activeButton && (
                      <NotLoggedInAlert
                        isOpen={activeButton}
                        onClose={() => setActiveButton("")}
                      />
                    )}
                    {/* <Button
                      fontSize={"md"}
                      fontWeight={600}
                      color={"#0B51DA"}
                      fontFamily="Inter"
                      size="sm"
                      bg={"white"}
                      href={"/"}
                      _hover={{
                        bg: "#FFD53F",
                      }}
                    >
                      Reply
                    </Button> */}
                  </HStack>
                  <VStack alignItems={"initial"}>
                    <Text
                      fontWeight="400"
                      color="#FFFFFF"
                      fontSize="20"
                      Font="Inter"
                    >
                      Communicate Using:
                    </Text>
                    <HStack>
                      <Link href="/home_speak">
                        <Button
                          _hover={{
                            bg: "#FFD53F",
                          }}
                          boxSize="12"
                          borderRadius="50%"
                          color="#FFFFFF"
                        >
                          <Image
                            size="100%"
                            src="assets/icons/microphone.svg"
                          />
                        </Button>
                      </Link>
                      <Link href="/home_type">
                        <Button
                          _hover={{
                            bg: "#FFD53F",
                          }}
                          boxSize="12"
                          borderRadius="50%"
                          color="#FFFFFF"
                        >
                          <Image size="100%" src="assets/icons/type.svg" />
                        </Button>
                      </Link>
                    </HStack>
                  </VStack>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </main>
    </>
  );
}
