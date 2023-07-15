import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import YouTube from "react-youtube";
import Navbar from "@/components/Navbarss-front";
import Head from "next/head";

const YouTubeGrid = ({ videoLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const handlePlay = (videoId) => {
    setVideoId(videoId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setVideoId(null);
  };

  

   /*To check if its mobile screen */
   const [isMobile] = useMediaQuery("(max-width: 768px)"); // Returns true on mobile, false on desktop
  
  
    const opts = {
      height: "420",
      width: "680",
    };

   if (isMobile) {
    return (
      <>
        <Head>
        <title>Tutorials</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
      </Head>
      <main style={{ height: "100vh" }}>
        <Flex minHeight="100vh">
          <Box width="100%" bgGradient="linear(to-r, #0B51DA, #4878FF)">
            <Navbar />
            <Box
              margin={10}
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
            >
              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
                gap={{ sm: 4, md: 6 }}
                pb={6}
              >
                {videoLinks.map((video) => (
                  <GridItem key={video.url} colSpan={{ sm: 1, md: 1 }}>
                    <Link
                      _hover={{ textDecoration: "none" }}
                      href="#"
                      onClick={() => handlePlay(video.url.split("=")[1])}
                    >
                      <Box
                        borderRadius="md"
                        transition="transform 0.2s"
                        _hover={{ transform: "scale(1.02)" }}
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${
                            video.url.split("=")[1]
                          }/mqdefault.jpg`}
                          alt="YouTube Video Thumbnail"
                          borderRadius="md"
                        />
                        <Box p={3}>
                          <VStack align="start" spacing={2}>
                            <Text
                              color={"white"}
                              fontWeight="medium"
                              fontSize="md"
                              noOfLines={2}
                            >
                              {video.title}
                            </Text>
                          </VStack>
                        </Box>
                      </Box>
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Box>
        </Flex>
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          isCentered
          closeOnOverlayClick={false}
          size="full"
          maxH="full"
        >
          <ModalOverlay />
          <ModalContent 
            background="rgba(0, 0, 0, 0.5)" 
            width="100vw"
            height="100vh"
            // display="flex"
            // alignItems="center"
            // justifyContent="center"
            p={0}>
            <ModalCloseButton color={"white"} />
            <ModalBody

              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
              }}
            >
                <YouTube videoId={videoId} 
                opts={{
                  width: "364",
                  height: "464",
                  gesture: "media"
                }} 
                />
            </ModalBody>
          </ModalContent>
        </Modal>
      </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Tutorials</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
      </Head>
      <main style={{ height: "100vh" }}>
        <Flex minHeight="100vh">
          <Box width="100%" bgGradient="linear(to-r, #0B51DA, #4878FF)">
            <Navbar />
            <Box
              margin={10}
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
            >
              <Grid
                templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
                gap={{ sm: 4, md: 6 }}
                pb={6}
              >
                {videoLinks.map((video) => (
                  <GridItem key={video.url} colSpan={{ sm: 1, md: 1 }}>
                    <Link
                      _hover={{ textDecoration: "none" }}
                      href="#"
                      onClick={() => handlePlay(video.url.split("=")[1])}
                    >
                      <Box
                        borderRadius="md"
                        transition="transform 0.2s"
                        _hover={{ transform: "scale(1.02)" }}
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${
                            video.url.split("=")[1]
                          }/mqdefault.jpg`}
                          alt="YouTube Video Thumbnail"
                          borderRadius="md"
                        />
                        <Box p={3}>
                          <VStack align="start" spacing={2}>
                            <Text
                              color={"white"}
                              fontWeight="medium"
                              fontSize="md"
                              noOfLines={2}
                            >
                              {video.title}
                            </Text>
                          </VStack>
                        </Box>
                      </Box>
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Box>
        </Flex>
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          isCentered
          closeOnOverlayClick={false}
          size="full"
          maxH="full"
        >
          <ModalOverlay />
          <ModalContent background="rgba(0, 0, 0, 0.5)">
            <ModalCloseButton color={"white"} />
            <ModalBody
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <YouTube videoId={videoId} opts={opts} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </main>
    </>
  );
};

const App = () => {
  const videoLinks = [
    {
      url: "https://www.youtube.com/watch?v=0FcwzMq4iWg",
      title:
        "25 ASL Signs You Need to Know | ASL Basics | American Sign Language for Beginners",
    },
    {
      url: "https://www.youtube.com/watch?v=u3HoC9_ir3s",
      title: "The ASL Alphabet: American Sign Language Letters A-Z",
    },
    {
      url: "https://www.youtube.com/watch?v=nJx-XsxeajQ",
      title:
        "25 Common ASL Phrases | ASL Basics | American Sign Language for Beginners",
    },
    {
      url: "https://www.youtube.com/watch?v=v1desDduz5M",
      title: "20+ Basic Sign Language Phrases for Beginners | ASL",
    },
    {
      url: "https://www.youtube.com/watch?v=bFv_mLwBvHc",
      title: "Learn How to Sign The Alphabet (ABCs) in ASL",
    },
    {
      url: "https://www.youtube.com/watch?v=VOnHnaNiVSM",
      title: "Family Signs in ASL| American Sign Language for Beginners",
    },
    {
      url: "https://www.youtube.com/watch?v=e48sS09jl8U",
      title: "Learn How to Sign Numbers in ASL | K&L Sign Time",
    },
    {
      url: "https://www.youtube.com/watch?v=_c--P6VRTUo",
      title: "30 Signs You Need to Know for Basic ASL Conversations",
    },
    {
      url: "https://www.youtube.com/watch?v=qcdivQfA41Y",
      title: "Indian Sign Language- Alphabet",
    },
    {
      url: "https://www.youtube.com/watch?v=Vj_13bdU4dU",
      title: "Alphabet (Indian Sign Language)",
    },
    {
      url: "https://www.youtube.com/watch?v=XPRtZQSKL-4",
      title: "Indian Sign Language - Days of the week",
    },
    {
      url: "https://www.youtube.com/watch?v=OK7ppVdau8M",
      title: "Learn Indian Sign language | BASIC 25 WORDS",
    },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const handleVideoOpen = (link) => {
    setVideoLink(link);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setVideoLink("");
  };

  return (
    <div>
      <YouTubeGrid videoLinks={videoLinks} onVideoClick={handleVideoOpen} />
    </div>
  );
};

export default App;
