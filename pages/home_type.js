import Head from "next/head";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Link,
  VStack,
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

import { FormControl } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import { Switch } from "@chakra-ui/react";

import { useLayoutEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { delay } from "framer-motion";
import NotLoggedInAlert from "@/components/pop_up_loginss-front";
import { useMediaQuery } from "@chakra-ui/react";
// import { MdBookmark } from 'react-icons/md';

export default function Home() {
  // let xyz;
  const [user, setUser] = useState("");
  const [type, setType] = useState("asl");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animations, setAnimations] = useState(["videos_uploaded/B.mp4"]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  function togglePopup() {
    setActiveButton(!activeButton);
  }

  const handleVideoEnd = () => {
    if (currentVideoIndex < animations.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
    if (animations.length == 1) {
      setCurrentVideoIndex(currentVideoIndex);
    }
  };

  useLayoutEffect(() => {
    const userId = localStorage.getItem("user");
    setUser(userId);

    const type = localStorage.getItem("type");
    setType(type);

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("isLoggedIn") == "true"
    ) {
      //const isLoggedInLocalStorage = ;
      setIsLoggedIn(true);
      // setShowPopup(false);
    }

    console.log("***", userId);
    console.log("***", type);
    console.log("***", isLoggedIn);
    console.log("***", showPopup);

    axios
      .post("http://127.0.0.1:8000/api/getPhrases", {
        username: userId,
      })
      .then((response) => {
        console.log("response", response.data);
        const xyz = response.data;
        console.log("*******xyz", xyz);

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

  //toggle button
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);

    // print(isChecked);

    isChecked ? setType("asl") : setType("isl");
    isChecked
      ? window.localStorage.setItem("type", "asl")
      : window.localStorage.setItem("type", "isl");
  };

  const addToList = async () => {
    axios
      .post("http://127.0.0.1:8000/api/save_phrase", {
        username: user,
        word_phrase: value,
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
        // setValue("");
      })
      .catch(console.log);
  };

  const AnimationList = async () => {
    // while (animations.length > 0) {
    //   animations.pop();
    // }
    // console.log("animations:", animations);

    const x = isChecked ? "asl" : "isl";
    axios
      .post("http://127.0.0.1:8000/api/text_sign", {
        text: value,
        type: x,
      })
      .then((response) => {
        console.log(response.data.text);
        axios
          .post("http://127.0.0.1:8000/api/animate", {
            tags: response.data.text,
            type: x,
          })
          .then((response) => {
            console.log(response);
            console.log("ANIMATE RETURNS", response.data.videos);
            setAnimations(response.data.videos);
            // animations.push(response.data.videos);
            console.log("animations:", animations);
            // setShowVideos(true);
          });
      });
  };

  function handleCommunication(event) {
    console.log("In here: HAndlecomm");
    event.preventDefault();
    if (isLoggedIn) {
      addToList();
      setCurrentVideoIndex(0);
      axios
        .post("http://127.0.0.1:8000/api/update_score", {
          username: user,
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("continue rendering animations");
            //make nltk return an array of tokens
            AnimationList();
          }
        })
        .catch(console.log);
    } else {
      setCurrentVideoIndex(0);
      console.log("continue rendering animations");
      AnimationList();

      // AnimationList();
    }
  }

  /*pop over for save phrases */
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const [inputActive, setInputActive] = useState(false);

  /*To check if its mobile screen */
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // Returns true on mobile, false on desktop

  if (isMobile) {
    return (
      <>
        <main style={{ maxHeight: "100vh" }}>
          <Head>
            <title>Type</title>
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
                // position="fixed"
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
                  // position="relative"
                >
                  <box>
                    <video
                      style={{
                        // position: "fixed",
                        alignItems: "center",
                        zIndex: 1,
                      }}
                      autoPlay
                      muted
                      controls={false}
                      onEnded={handleVideoEnd}
                      src={`http://localhost:8000${animations[currentVideoIndex]}`}
                      type="video/mp4"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </box>
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
                    <Input
                      height={16}
                      background="rgba(226, 234, 248, 0.2)"
                      border="none"
                      // backgroundColor="transparent"
                      type="item"
                      placeholder="Type here...."
                      value={value}
                      onChange={(e) =>
                        setValue(
                          e.target.value
                            // .replace(/[^a-zA-Z0-9 ]/g, "")
                            // .replace(/[.,!]/g, "")
                            .toLowerCase()
                        )
                      }
                      _placeholder={{ opacity: 1, color: "grey" }}
                      // _focus={{ outline: "none" }}
                      onFocus={() => setInputActive(true)}
                      onBlur={() => setInputActive(false)}
                      paddingRight={4} // Add right padding to accommodate the button
                      style={{ pointerEvents: inputActive ? "none" : "auto" }}
                    />
                    <Button
                      onClick={handleClick}
                      // onTouchStart={handleClick}
                      // onClick={(e) => {
                      //   if (inputActive) {
                      //     e.preventDefault();
                      //   } else {
                      //     handleClick();
                      //   }
                      // }}
                      // _hover={{ bg: "#FFD53F" }}
                      position="absolute"
                      top="50%"
                      right={16}
                      transform="translateY(-50%)"
                      boxSize={12}
                      borderRadius="100%"
                      color="#FFFFFF"
                      zIndex={1}
                    >
                      <Image boxSize="6" src="assets/icons/save.svg" />
                    </Button>
                    {!isLoggedIn && activeButton && (
                      <NotLoggedInAlert
                        isOpen={activeButton}
                        onClose={() => setActiveButton("")}
                      />
                    )}

                    <Button
                      onClick={handleCommunication}
                      // onClick={(e) => {
                      //   if (inputActive) {
                      //     e.preventDefault();
                      //   } else {
                      //     handleCommunication();
                      //   }
                      // }}
                      onTouchStart={handleCommunication}
                      position="absolute"
                      top="50%"
                      right={2}
                      transform="translateY(-50%)"
                      boxSize={12}
                      // borderRadius="100%"
                      color="#FFFFFF"
                      size="100%"
                      borderRadius="50%"
                    >
                      <Image
                        boxSize="12"
                        size="100%"
                        src="assets/icons/arrow_yellow.svg"
                      />
                    </Button>
                  </Box>
                </Flex>

                <Flex
                  flexDirection="column"
                  alignItems="flex-end"
                  position="fixed"
                  bottom={20}
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
                  <Link href="/home_speak" marginRight={2} marginBottom={2}>
                    <Button
                      _hover={{
                        bg: "#FFD53F",
                      }}
                      boxSize={12}
                      borderRadius="50%"
                      color="#FFFFFF"
                    >
                      <Image boxSize="100%" src="assets/icons/microphone.svg" />
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
                        boxSize={12}
                        borderRadius="50%"
                        color="#FFFFFF"
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
                          {/* List items go here */}
                          {list.map((item, index) => (
                            <Link
                              key={item}
                              // href="#"
                              onClick={() => setValue(item)}
                              style={{ cursor: "pointer" }}
                            >
                              {item}
                            </Link>
                          ))}
                          {/* <Link >Item 2</Link>
                        <Link href="#">Item 3</Link> */}
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
          <title>Type</title>
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
          >
            <Navbar />
            <Grid
              // templateAreas={`
              //     "nav footer"`}
              justifySelf={"stretch"}
              marginTop={10}
              // height="69.5vh"
              marginLeft={20}
              templateColumns="repeat(2, 1fr)"
              gap={6}
            >
              <GridItem
                // marginLeft={10}
                // display={"flex"}
                // flexFlow={"column"}
                w="100%"
              >
                <VStack alignItems={"initial"}>
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
                  <HStack>
                    <FormControl width="460px" alignItems="centre">
                      <Input
                        background="rgba(226, 234, 248, 0.2)"
                        border={"none"}
                        color="#FFFFFF"
                        type="item"
                        placeholder="Type here...."
                        value={value}
                        onChange={(e) =>
                          setValue(
                            e.target.value
                              // .replace(/[^a-zA-Z0-9 ]/g, "")
                              // .replace(/[.,!]/g, "")
                              .toLowerCase()
                          )
                        }
                        _placeholder={{ opacity: 1, color: "#FFFFFF" }}
                      />
                    </FormControl>
                    <Button
                      onClick={handleCommunication}
                      _hover={{
                        opacity: 0.8,
                      }}
                      boxSize="10"
                      size="100%"
                      borderRadius="50%"
                    >
                      <Image
                        boxSize="10"
                        size="100%"
                        borderRadius="50%"
                        // width="36"
                        // height="36"
                        src="assets/icons/arrow_yellow.svg"
                      />
                    </Button>
                  </HStack>
                </VStack>
                {/* </Center> */}
                <br />
                <br />
                <VStack gap={2} alignItems={"initial"}>
                  <Stack overflow={"auto"} direction={"row"} gap={"auto"}>
                    <List>
                      <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={3}
                        width={"md"}
                      >
                        {/* {list.length > 0 && list.map((item) => */}
                        {list &&
                          (showAll
                            ? list.map((item, index) => (
                                <ListItem>
                                  <Button
                                    key={item}
                                    onClick={() => setValue(item)}
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
                                    onClick={() => setValue(item)}
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
                  <br />
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
                  </HStack>
                  <br />
                  <VStack paddingBottom={5} alignItems={"initial"}>
                    <Text
                      fontWeight="400"
                      color="#FFFFFF"
                      fontSize="20"
                      Font="Inter"
                    >
                      Switch to:
                    </Text>
                    <HStack>
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
                      <Link href="/home_speak" marginRight={2} marginBottom={2}>
                        <Button
                          _hover={{
                            bg: "#FFD53F",
                          }}
                          boxSize={12}
                          borderRadius="50%"
                          color="#FFFFFF"
                        >
                          <Image
                            boxSize="100%"
                            src="assets/icons/microphone.svg"
                          />
                        </Button>
                      </Link>
                    </HStack>
                  </VStack>
                </VStack>
              </GridItem>

              <GridItem
                display={"flex"}
                justifyItems={"center"}
                flexDirection={"column-reverse"}
                marginTop={-16}
                w="100%"
              >
                <Center>
                  <box>
                    {console.log("current index", currentVideoIndex)}
                    <video
                      // key={index}
                      width={"80%"}
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
                </Center>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </main>
    </>
  );
}
