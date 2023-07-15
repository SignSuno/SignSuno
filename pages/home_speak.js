import Head from "next/head";
import {
  Box,
  Center,
  Flex,
  HStack,
  Link,
  VStack,
  Stack,
  List,
  ListItem,
} from "@chakra-ui/layout";
import Navbar from "@/components/Navbarss-front";
import { Image } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { Text, Input, Textarea } from "@chakra-ui/react";
import {
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import NotLoggedInAlert from "@/components/pop_up_loginss-front";

export default function Home_speak() {
  const [user, setUser] = useState("");
  const [type, setType] = useState("asl");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text1, setText] = useState("please talk ...");
  const [animations, setAnimations] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  let recognisedText;
  const videoRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  const handleVideoEnd = () => {
    if (currentVideoIndex < animations.length - 1) {
      // console.log("enters here");
      setCurrentVideoIndex(currentVideoIndex + 1);
      // console.log("updated curr index", currentVideoIndex);
      // console.log("animations:", animations);
    }
  };

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
    axios
      .post("http://127.0.0.1:8000/api/getPhrases", {
        username: userId,
      })
      .then((response) => {
        console.log("response", response.data);
        const xyz = response.data;
        console.log("***xyz", xyz);

        setList(xyz);
        //const responseData = response.data.jwt;
      })
      .catch(console.log);
  }, []);

  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [limit, setLimit] = useState(5);
  const [showAll, setShowAll] = useState(false);

  function handleClick(event) {
    event.preventDefault();
    if (isLoggedIn) {
      addToList();
    } else {
      togglePopup();
    }
  }

  const addToList = async () => {
    console.log("text1", text1);
    axios
      .post("http://127.0.0.1:8000/api/save_phrase", {
        username: user,
        // word_phrase: recognisedText,
        word_phrase: text1,
      })
      .then((response) => {
        axios
          .post("http://127.0.0.1:8000/api/getPhrases", {
            username: user,
          })
          .then((response) => {
            const xyz = response.data;
            setList(xyz);
          })
          .catch(console.log);
        setValue("");
      })
      .catch(console.log);
  };

  const AnimationList = async (to_be_animated) => {
    while (animations.length != 0) {
      animations.pop();
    }
    // setAnimations([]);
    console.log("animation list:", animations);
    console.log("data sent:", text1);
    console.log("recognised text data:", recognisedText);
    console.log("type:", type);
    console.log("localstorage", localStorage.getItem("type"));
    // calling nltk

    const temp = isChecked ? "asl" : "isl";
    console.log("temp", temp);

    console.log("value:", value);

    axios
      .post("http://127.0.0.1:8000/api/text_sign", {
        // text: recognisedText,
        text: to_be_animated,
        type: temp,
      })
      .then((response) => {
        console.log(response.data.text);
        // setValue(null);
        axios
          .post("http://127.0.0.1:8000/api/animate", {
            tags: response.data.text,
            type: temp,
          })
          .then((response) => {
            console.log(response);
            console.log("ANIMATE RETURNS", response.data.videos);
            setAnimations(response.data.videos);
            animations.push(response.data.videos);
            console.log("animations:", animations);
            setCurrentVideoIndex(0);
            setShowVideos(true);
          });
      });
  };

  function handleCommunication() {
    if (isLoggedIn) {
      console.log("inside handlecomm");
      // addToList();
      setCurrentVideoIndex(0);
      axios
        .post("http://127.0.0.1:8000/api/update_score", {
          username: user,
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("continue rendering animations");
            //make nltk return an array of tokens
            AnimationList(recognisedText);
          }
        })
        .catch(console.log);
    } else {
      AnimationList(recognisedText);
      // AnimationList();
    }
  }

  async function speech_text() {
    setText("Please Talk...");
    setValue(null);
    await axios
      .get("http://127.0.0.1:8000/api/speech_text")
      .then((response) => {
        console.log("TEXT:", response.data.text);
        setText(response.data.text);
        recognisedText = response.data.text;
        console.log("response data:", text1);
        console.log("recognised text data:", recognisedText);
        handleCommunication();
      })
      .catch(console.log);
  }

  //toggle button
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);

    isChecked ? setType("asl") : setType("isl");
    isChecked
      ? window.localStorage.setItem("type", "asl")
      : window.localStorage.setItem("type", "isl");
  };

  const [videoEnded, setVideoEnded] = useState(false);

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

  // useEffect(() => {
  //   const video = videoRef.current;
  //   video.addEventListener("ended", () => {
  //     setVideoEnded(true);
  //   });
  // }, []);

  //thisssssss is for mobile
  if (isMobile) {
    return (
      <>
        <main style={{ maxHeight: "100vh" }}>
          <Head>
            <title>Speak</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
          </Head>
          <Flex height="100vh" flexDirection="column">
            <Box flexGrow={1} width="100%" bgColor={"#0359C8"}>
              <Navbar />
              <Box
                position="fixed"
                top={0}
                left={0}
                width="100%"
                height="100%"
                overflow="hidden"
                // backgroundColor=""
              >
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  marginTop={-6}
                  position="relative"
                >
                  <box>
                    {animations.map((animation, index) => {
                      const isCurrentVideo = index === currentVideoIndex;
                      console.log(
                        "index",
                        index,
                        "currentvideoindex",
                        currentVideoIndex
                      );
                      console.log("current", isCurrentVideo);
                      // const shouldPreloadNextVideo =
                      //   index === currentVideoIndex + 1;
                      // console.log("hmmm", shouldPreloadNextVideo);
                    })}
                    <video
                      // key={index}
                      width="100%"
                      controls={false}
                      // style={{ pointerEvents: "none", position: "absolute" }}
                      autoPlay
                      onEnded={handleVideoEnd}
                      muted
                      src={`http://localhost:8000${animations[currentVideoIndex]}`}
                      type="video/mp4"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </box>

                  {/* <video
                    width="100%"
                    style={{
                      position: "fixed",
                      alignItems: "center",
                      zIndex: 1,
                    }}
                    autoPlay
                    muted
                    loop
                  >
                    <source src="assets/videos/A.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> */}
                </Flex>

                <Flex
                  position="fixed"
                  bottom={20}
                  // flexDirection="column"
                  // alignItems={"flex-end"}
                  // top={4}
                  left={2}
                  width="100%"
                  padding={4}
                  zIndex={2}
                >
                  <Box
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
                </Flex>

                <Flex
                  alignItems="center"
                  position="fixed"
                  bottom={0}
                  left={0}
                  width="100%"
                >
                  <Box
                    flex="1"
                    position="relative"
                    backgroundColor="#FFFFFF"
                    // borderRadius="md"
                  >
                    {/* <Input
                      type="text"
                      height={16}
                      placeholder={text1}
                      _placeholder={{
                        color: 'grey',
                      }}
                      border="none"
                      readOnly
                      // backgroundColor="transparent"
                      _focus={{ outline: "none" }}
                      paddingRight={4} // Add right padding to accommodate the button
                    /> */}
                    <Textarea
                      style={{ maxHeight: "5px" }}
                      placeholder={text1}
                      color="grey"
                      readOnly
                      border="none"
                      fontSize={18}
                      paddingRight={4} // Add right padding to accommodate the button
                      onClick={() => {}} // Disable input field click events
                    >
                      {recognisedText}
                    </Textarea>
                    <Button
                      onClick={handleClick}
                      // _hover={{ bg: "#FFD53F" }}
                      position="absolute"
                      top="50%"
                      right={16}
                      transform="translateY(-50%)"
                      boxSize={12}
                      color={"none"}
                      borderRadius="100%"
                    >
                      <Image boxSize="12" src="assets/icons/save.svg" />
                    </Button>
                    {!isLoggedIn && activeButton && (
                      <NotLoggedInAlert
                        isOpen={activeButton}
                        onClose={() => setActiveButton("")}
                      />
                    )}
                    <Button
                      onClick={speech_text}
                      _hover={{ bg: "#FFD53F" }}
                      position="absolute"
                      top="50%"
                      right={2}
                      transform="translateY(-50%)"
                      boxSize={12}
                      borderRadius="100%"
                      color="#FFFFFF"
                    >
                      <Image boxSize="6" src="assets/icons/microphone.svg" />
                    </Button>
                  </Box>
                </Flex>

                <Flex
                  flexDirection="column"
                  alignItems="flex-end"
                  position="fixed"
                  bottom={24}
                  right={2}
                  zIndex={2}
                >
                  <Link href="/home_sign" marginRight={2} marginBottom={2}>
                    <Button
                      _hover={{
                        bg: "#FFD53F",
                      }}
                      boxSize={12}
                      borderRadius="50%"
                      color="#FFFFFF"
                    >
                      <Image boxSize="100%" src="assets/icons/camera.svg" />
                    </Button>
                  </Link>
                  <Link href="/home_type" marginRight={2} marginBottom={2}>
                    <Button
                      _hover={{
                        bg: "#FFD53F",
                      }}
                      boxSize={12}
                      borderRadius="50%"
                      color="#FFFFFF"
                    >
                      <Image boxSize="100%" src="assets/icons/type.svg" />
                    </Button>
                  </Link>
                  <Popover isOpen={isPopoverOpen} onClose={handlePopoverClose}>
                    <PopoverTrigger>
                      <Button
                        _hover={{
                          bg: "#FFD53F",
                        }}
                        marginRight={2}
                        marginBottom={2}
                        boxSize="12"
                        borderRadius="50%"
                        color="#2A65ED"
                        onClick={handlePopoverOpen}
                      >
                        <Image
                          boxSize="100%"
                          src="assets/icons/dictionary.svg"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverBody>
                        <VStack spacing={2}>
                          {list.map((item, index) => (
                            <Link
                              key={item}
                              onClick={() => {
                                setValue(item);
                                setText(item);
                                handlePopoverClose();
                                AnimationList(item);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {item}
                            </Link>
                          ))}
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
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
          <title>Speak</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
        </Head>

        <Flex height="100vh" flexDirection="column">
          <Box
            flexGrow={1}
            width="100%"
            // bgGradient="linear(to-r, #0B51DA, #4878FF)"
            bgColor={"#0359C8"}
            //bgColor={"white"}
          >
            <Navbar />
            <Grid marginLeft={20} templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem marginTop={10} w="100%">
                <VStack gap={10} alignItems={"initial"}>
                  <Box>
                    <Box
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
                          // top: '2px',
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
                </VStack>
                <br />
                <HStack spacing={10} alignItems="center">
                  <Button
                    onClick={speech_text}
                    _hover={{
                      bg: "#FFD53F",
                    }}
                    boxSize={16}
                    borderRadius="100%"
                    color="#FFFFFF"
                  >
                    <Image boxSize="8" src="assets/icons/microphone.svg" />
                  </Button>
                  <Text
                    color="#FFFFFF"
                    Font="Inter"
                    fontWeight="600"
                    fontSize="20"
                  >
                    {text1}
                  </Text>
                </HStack>
                <VStack marginTop={10} alignItems={"baseline"}>
                  <Stack overflow={"auto"} direction={"row"} gap={"auto"}>
                    <List>
                      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                        {/* {list.length > 0 && list.map((item) => */}
                        {list &&
                          (showAll
                            ? list.map((item, index) => (
                                <ListItem>
                                  <Button
                                    key={item}
                                    onClick={() => {
                                      setValue(item);
                                      setText(item);
                                      AnimationList(item);
                                    }}
                                    fontSize={"sm"}
                                    fontWeight={400}
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
                                    {item}
                                  </Button>
                                </ListItem>
                              ))
                            : list.slice(0, limit).map((item, index) => (
                                <ListItem>
                                  <Button
                                    key={item}
                                    onClick={() => {
                                      setValue(item);
                                      setText(item);
                                      AnimationList(item);
                                    }}
                                    fontSize={"sm"}
                                    fontWeight={400}
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
                                    {item}
                                  </Button>
                                </ListItem>
                              )))}
                        {!showAll && list.length > limit && (
                          <Link
                            paddingTop={2}
                            fontWeight={400}
                            color={"White"}
                            fontFamily="Inter"
                            _hover={{
                              color: "#FFD53F",
                            }}
                            onClick={() => setShowAll(true)}
                          >
                            Find more...
                          </Link>
                        )}
                      </Grid>
                    </List>
                  </Stack>
                  <HStack alignItems="center">
                    <Button
                      onClick={handleClick}
                      fontSize={"md"}
                      marginTop={10}
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
                      Communicate Using
                    </Button> */}
                  </HStack>
                  <br />
                  <Box paddingBottom={5}>
                    <Text
                      fontWeight="400"
                      color="#FFFFFF"
                      fontSize="20"
                      Font="Inter"
                    >
                      Communicate using:
                    </Text>
                    <HStack gap={2}>
                      <Link top={2} href="/home_sign">
                        <Button
                          _hover={{
                            bg: "#FFD53F",
                          }}
                          boxSize="12"
                          borderRadius="50%"
                          color="#FFFFFF"
                        >
                          <Image size="100%" src="assets/icons/camera.svg" />
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
                </VStack>
              </GridItem>
              <GridItem
              // w="100%"
              >
                <Center>
                  <box>
                    {animations.map((animation, index) => {
                      const isCurrentVideo = index === currentVideoIndex;
                      console.log(
                        "index",
                        index,
                        "currentvideoindex",
                        currentVideoIndex
                      );
                      console.log("current", isCurrentVideo);
                      // const shouldPreloadNextVideo =
                      //   index === currentVideoIndex + 1;
                      // console.log("hmmm", shouldPreloadNextVideo);
                      console.log(
                        "current video:",
                        animations[currentVideoIndex]
                      );
                    })}
                    <video
                      // key={index}
                      width={"80%"}
                      controls={false}
                      // style={{ pointerEvents: "none", position: "absolute" }}
                      autoPlay
                      onEnded={handleVideoEnd}
                      muted
                      src={`http://localhost:8000${animations[currentVideoIndex]}`}
                      // src={`http://localhost:8000${animations[index]}`}
                      type="video/mp4"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </box>
                </Center>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </main>
    </>
  );
}
