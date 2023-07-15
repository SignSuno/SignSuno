import Head from "next/head";
import { Inter } from "@next/font/google";
import {
  Box,
  Center,
  Flex,
  HStack,
  Link,
  Stack,
  VStack,
} from "@chakra-ui/layout";
import { Img, Portal } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import Navbar from "@/components/Navbarss-front";
const inter = Inter({ subsets: ["latin"] });
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { Input, Avatar, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useMediaQuery } from "@chakra-ui/react";
import axios from "axios";

import DeleteAccountModal from "@/components/DeleteAccountModalss-front";
import ConfirmationModal from "@/components/ConfirmatinModalss-front";

export default function user() {
  // const [profilePhoto, setProfilePhoto] = useState('https://example.com/profile-photo.jpg');
  // const handleProfilePhotoChange = (e) => {
  //   setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  // };

  const [profilePicture, setProfilePicture] = useState("");
  const fileInputRef = useRef(null);

  const [user, setUser] = useState("");
  const [uname, setName] = useState("");
  const [email_id, setEmailID] = useState("");
  const [rank, setRank] = useState(1);
  const [score, setScore] = useState(0);

  const [newemail_id, setEmail] = useState("");
  const [newname, setNewName] = useState("");

  useLayoutEffect(() => {
    const userId = localStorage.getItem("user");
    console.log("userId", userId);
    setUser(userId);

    axios
      .post("http://127.0.0.1:8000/api/profile_user", {
        username: userId,
      })
      .then((response) => {
        const temp = response.data["data"];
        setName(temp["name"]);
        setEmailID(temp["email_id"]);

        axios
          .post("http://127.0.0.1:8000/api/user_rank_xp", {
            username: userId,
          })
          .then((response) => {
            console.log("leaders", response.data);
            setRank(response.data["rank"]);
            setScore(response.data["score"]);

            axios
              .post("http://127.0.0.1:8000/api/profile_pic", {
                userId: userId,
              })
              .then((response) => {
                console.log("profile", response.data);
                setProfilePicture(response.data["profile_img"]);
              })
              .catch(console.log);
          })
          .catch(console.log);
      })
      .catch(console.log);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("file uploaded:", event.target.files[0]["name"]);
    setProfilePicture(file);

    const formData = new FormData();
    console.log("formdata1", formData);
    formData.append("userId", user);
    console.log("formdata2", formData);
    formData.append("profile_img", file);

    console.log("formdata3", formData);

    try {
      axios.post("http://127.0.0.1:8000/api/upload_profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleEditClick = async (event) => {
    console.log("editclick");
    event.preventDefault();

    fileInputRef.current.click();
  };

  const [formErrors, setFormErrors] = useState({
    password: "",
    confirm_pass: "",
  });

  function sendData() {
    try {
      axios
        .post("http://127.0.0.1:8000/api/change_details", {
          username: user,
          name: newname,
          email_id: newemail_id,
        })
        .then((response) => {
          console.log("response", response.data["status"]);
          if (response.data["status"] == 200) {
            setName(newname);
            setEmail(newemail_id);
          }
        })
        .catch(console.log);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully!");
      sendData();
      // You could also submit the form to a server here
    }
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  //save changes
  const handleConfirmationSave = (event) => {
    event.preventDefault(); 
    updateDetails(event); 
    setModalIsOpen(false);
  };
  const [modalisOpen, setModalisOpen] = useState(false);


  const handleModalConfirm = () => {
    setModalisOpen(true);
  };
  const updateDetails = async (event) => {
    event.preventDefault();
    console.log(newname);
    console.log(newemail_id);
  
    const nm = newname ? newname : uname;
    const em = newemail_id ? newemail_id : email_id;
    console.log(nm);
    console.log(em);
  
    try {
      axios
        .put("http://127.0.0.1:8000/api/change_details", {
          username: user,
          name: nm,
          email_id: em,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            window.location.href = "/user_profile";
          }
        })
        .catch(console.log);
    } catch (error) {
      console.log(error);
      window.location.href = "/user_profile";
    }
  };
  const closeModalConfirm = () => {
    setModalisOpen(false);
  };

  const handlePassword = async (event) => {
    event.preventDefault();

    window.location.href = "/email_forgot_pass";
    // try {
    //   axios
    //     .post("http://127.0.0.1:8000/api/logout")
    //     .then(console.log)
    //     .catch(console.log);
    //   window.localStorage.removeItem("isLoggedIn");
    //   window.localStorage.removeItem("token");
    //   localStorage.removeItem("email");
    //   localStorage.removeItem("user");
    //   window.location.href = "/email_forgot_pass";
    // } catch (error) {
    //   console.log(error);
    //   window.location.href = "/user_profile";
    // }
  };


  //Delete Account
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModal = () => {
    setModalIsOpen(true);
  };

  const handleConfirmationDelete = (event) => {
    event.preventDefault(); 
    handleDeleteAcc(event); 
    setModalIsOpen(false);
  };
  

  const handleDeleteAcc = async (event) => {
    event.preventDefault();
    try {
      axios
      
        .post("http://127.0.0.1:8000/api/delete_account", {
          username: user,
        })
        .then((response) => {
          if (response.status == 200) {
            axios
              .post("http://127.0.0.1:8000/api/logout")
              .then(console.log)
              .catch(console.log);
            window.localStorage.removeItem("isLoggedIn");
            window.localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("user");
            window.location.href = "/";
          } else {
            window.location.href = "/user_profile";
          }
        });
    } catch (error) {
      console.log(error);
      window.location.href = "/user_profile";
    }
    setModalIsOpen(false);
  };


  const closeModal = () => {
    setModalIsOpen(false);
  };


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
            <Box
              padding={2}
              flexGrow={1}
              width="100%"
              bgGradient="linear(to-l, #0B51DA, #4878FF)"
            >
              <Navbar />
              {/* <HStack alignItems="flex-start" gap={20} marginLeft={20}>
              <Box position="relative" display="inline-block">
                <IconButton
                  icon={<EditIcon />}
                  size="lg"
                  isRound={true}
                  position="absolute"
                  top={0}
                  right={0}
                  zIndex={1}
                  onClick={handleEditClick}
                />
                <Input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />

                <Avatar
                  size={"2xl"}
                  src={
                    profilePicture
                      ? `http://localhost:8000${profilePicture}`
                      : ""
                  }
                />
              </Box>
              <VStack display="block">
                <Text fontWeight={800} color="white" fontSize={24}>
                  {uname}
                </Text>
                <Text color="#B9CCED" fontWeight={400} fontSize={14}>
                  @{user}
                </Text>
                <Text color="#B9CCED" fontWeight={400} fontSize={14}>
                  {email_id}
                </Text>
                <br />
                <Text fontWeight={800} color="white" fontSize={16}>
                  Statistics
                </Text>

                <HStack>
                  <Card height={20} bgColor="rgba(22, 75, 178, 0.6)">
                    <CardBody gap={4} display="flex" flexDirection={"row"}>
                      <img
                        src="assets/icons/cup_gold.svg"
                        height={28}
                        width={28}
                      />
                      <VStack display={"block"}>
                        <Text color={"#B9CCED"} fontSize={10}>
                          Current Rank
                        </Text>
                        <Text color={"white"} fontWeight={400} fontSize={20}>
                          {rank}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bgColor="rgba(22, 75, 178, 0.6)" height={20}>
                    <CardBody gap={4} display="flex" flexDirection={"row"}>
                      <img
                        src="assets/icons/red_star.svg"
                        height={28}
                        width={28}
                      />
                      <VStack display={"block"}>
                        <Text color={"#B9CCED"} fontSize={10}>
                          XPs Collected
                        </Text>
                        <Text color={"white"} fontWeight={400} fontSize={20}>
                          {score}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </HStack>
              </VStack>
            </HStack> */}
              <VStack marginTop={10} alignItems="flex-start">
                {/* <Card width="100%" bgColor={"rgba(22, 75, 179, 0.6)"}>
                <CardBody> */}
                <HStack alignItems="flex-start" gap={8}>
                  <Box position="relative" display="inline-block">
                    <IconButton
                      icon={<EditIcon />}
                      size="sm"
                      isRound={true}
                      position="absolute"
                      top={0}
                      right={0}
                      zIndex={1}
                      onClick={handleEditClick}
                    />
                    <Input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                    <Avatar
                      size={"xl"}
                      src={
                        profilePicture
                          ? `http://localhost:8000${profilePicture}`
                          : ""
                      }
                    />
                  </Box>
                  <VStack display="block">
                    <Text fontWeight={800} color="white" fontSize={"auto"}>
                      {uname}
                    </Text>
                    <Text color="#B9CCED" fontWeight={400} fontSize={"auto"}>
                      @{user}
                    </Text>
                    <Text color="#B9CCED" fontWeight={400} fontSize={"auto"}>
                      {email_id}
                    </Text>
                    <br />
                    {/* <Text fontWeight={800} color="white" fontSize={16}>
                        Statistics
                      </Text> */}
                  </VStack>
                </HStack>
                {/* </CardBody>
              </Card> */}
                <Text fontWeight={800} color="white" fontSize={24}>
                  Statistics
                </Text>
                {/* <VStack> */}
                <HStack width={"100%"} gap={4}>
                  <Card
                    width="100%"
                    height={20}
                    bgColor="rgba(22, 75, 178, 0.6)"
                  >
                    <CardBody gap={4} display="flex" flexDirection={"row"}>
                      <img
                        src="assets/icons/cup_gold.svg"
                        height={28}
                        width={28}
                      />
                      <VStack display={"block"}>
                        <Text color={"#B9CCED"} fontSize={10}>
                          Current Rank
                        </Text>
                        <Text color={"white"} fontWeight={400} fontSize={20}>
                          {rank}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card
                    width="100%"
                    bgColor="rgba(22, 75, 178, 0.6)"
                    height={20}
                  >
                    <CardBody gap={4} display="flex" flexDirection={"row"}>
                      <img
                        src="assets/icons/red_star.svg"
                        height={28}
                        width={28}
                      />
                      <VStack display={"block"}>
                        <Text color={"#B9CCED"} fontSize={10}>
                          XPs Collected
                        </Text>
                        <Text color={"white"} fontWeight={400} fontSize={20}>
                          {score}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </HStack>
                {/* </VStack> */}
                <br />
                <Center width>
                  <img src="assets/images/white_line_mobile.svg" />
                </Center>
                <Box width={"100%"}>
                  <form>
                    <FormControl>
                      <FormLabel
                        fontSize={16}
                        htmlFor="name"
                        color="white"
                        fontWeight={"800"}
                        alignItems={"flex-start"}
                      >
                        Name
                      </FormLabel>
                      <Input
                        bgColor={"rgba(226, 234, 248, 0.2)"}
                        border={"none"}
                        // height={8}
                        width={"100%"}
                        id="first-name"
                        color={"#FFFFFF"}
                        value={newname}
                        onChange={handleNameChange}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        fontSize={16}
                        color="white"
                        fontWeight={"800"}
                        htmlFor="email"
                      >
                        Email
                      </FormLabel>
                      {formErrors.newId && (
                        <div style={{ color: "red" }}>{formErrors.newId}</div>
                      )}
                      <Input
                        bgColor={"rgba(226, 234, 248, 0.2)"}
                        color={"#FFFFFF"}
                        // height={8}
                        width={"100%"}
                        border={"none"}
                        id="email"
                        value={newemail_id}
                        onChange={handleEmailChange}
                        required
                      />
                    </FormControl>
                  </form>
                  <VStack
                    display="flex"
                    justifyItems={"initial"}
                    alignItems={"initial"}
                    marginTop={5}
                  >
                    <Link
                      onClick={updateDetails}
                      type="submit"
                      color="#B9CCED"
                      fontWeight={600}
                      fontSize={16}
                      _hover={{
                        textDecoration: "none",
                        opacity: "0.5",
                      }}
                    >
                      Save Changes
                    </Link>
                    <Link
                      onClick={handlePassword}
                      color="#B9CCED"
                      fontWeight={600}
                      fontSize={16}
                      _hover={{
                        textDecoration: "none",
                        opacity: "0.5",
                      }}
                    >
                      Change Password
                    </Link>
                    <Link
                      onClick={handleDelete}
                      fontWeight={600}
                      fontSize={16}
                      color="#FF7072"
                      _hover={{
                        textDecoration: "none",
                        opacity: "0.8",
                      }}
                    >
                      Delete Account
                    </Link>
                  </VStack>
                </Box>
                {/* </Flex> */}
                {/* </Center>  */}
              </VStack>
            </Box>
          </Flex>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/icons/Hand_logo_yellow_1.svg" />
      </Head>
      <main>
        <Flex minH={"100vh"}>
          <Box
            width={"100%"}
            flex="column"
            bgGradient="linear(to-l, #0B51DA, #4878FF)"
          >
            <Navbar />

            <HStack alignItems="flex-start" gap={20} marginLeft={20}>
              <Box position="relative" display="inline-block">
                <IconButton
                  icon={<EditIcon />}
                  size="lg"
                  isRound={true}
                  position="absolute"
                  top={0}
                  right={0}
                  zIndex={1}
                  onClick={handleEditClick}
                />
                <Input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />

                <Avatar
                  size={"2xl"}
                  src={
                    profilePicture
                      ? `http://localhost:8000${profilePicture}`
                      : ""
                  }
                />
              </Box>
              <VStack display="block">
                <Text fontWeight={800} color="white" fontSize={24}>
                  {uname}
                </Text>
                <Text color="#B9CCED" fontWeight={400} fontSize={14}>
                  @{user}
                </Text>
                <Text color="#B9CCED" fontWeight={400} fontSize={14}>
                  {email_id}
                </Text>
                <br />
                <Text fontWeight={800} color="white" fontSize={16}>
                  Statistics
                </Text>

                <HStack>
                  <Card height={20} bgColor="rgba(22, 75, 178, 0.6)">
                    <CardBody gap={4} display="flex" flexDirection={"row"}>
                      <img
                        src="assets/icons/cup_gold.svg"
                        height={28}
                        width={28}
                      />
                      <VStack display={"block"}>
                        <Text color={"#B9CCED"} fontSize={10}>
                          Current Rank
                        </Text>
                        <Text color={"white"} fontWeight={400} fontSize={20}>
                          {rank}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bgColor="rgba(22, 75, 178, 0.6)" height={20}>
                    <CardBody gap={4} display="flex" flexDirection={"row"}>
                      <img
                        src="assets/icons/red_star.svg"
                        height={28}
                        width={28}
                      />
                      <VStack display={"block"}>
                        <Text color={"#B9CCED"} fontSize={10}>
                          XPs Collected
                        </Text>
                        <Text color={"white"} fontWeight={400} fontSize={20}>
                          {score}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </HStack>
              </VStack>
            </HStack>
            <br />
            {/* <hr  style={{height:"1px", color:"white"}}/> */}
            <Center>
              <img src="assets/images/white_line.svg" />
            </Center>

            {/* <Center>
                <Flex flexDirection={"column"} gap={4}>
                  <FormControl>
                    <HStack>
                      <FormLabel htmlFor="name" color="white" fontWeight={'800'}>
                        Name
                      </FormLabel>
                      <Input bgColor={"rgba(226, 234, 248, 0.2)"} border={"none"} width={"sm"} id="first-name"color={"#FFFFFF"} />
                    </HStack>
                  </FormControl>
                  <FormControl  >
                    <HStack >
                      <FormLabel color="white" fontWeight={'800'} htmlFor="email">
                        Username
                      </FormLabel>
                      <Input bgColor={"rgba(226, 234, 248, 0.2)"} color={"#FFFFFF"} width={"sm"} border={"none"} id="username"/>
                    </HStack>
                  </FormControl>
                  <FormControl  >
                    <HStack >
                      <FormLabel color="white" fontWeight={'800'} htmlFor="email" display={"flex"} flexDirection={"left"}>
                        Email 
                      </FormLabel>
                      <Input bgColor={"rgba(226, 234, 248, 0.2)"} color={"#FFFFFF"} width={"sm"} border={"none"} id="username"/>
                    </HStack>
                  </FormControl>
                
                </Flex>
              </Center> */}
            <Center>
              <Flex flexDirection={"column"} gap={8}>
                <form>
                  <FormControl>
                    <HStack gap={10}>
                      <VStack display={"inline-grid"} gap={2}>
                        <FormLabel
                          fontSize={16}
                          htmlFor="name"
                          color="white"
                          fontWeight={"800"}
                        >
                          Name
                        </FormLabel>
                        {/* <FormLabel
                          fontSize={16}
                          color="white"
                          fontWeight={"800"}
                          htmlFor="email"
                        >
                          Username
                        </FormLabel> */}
                        <FormLabel
                          fontSize={16}
                          color="white"
                          fontWeight={"800"}
                          htmlFor="email"
                        >
                          Email
                        </FormLabel>
                      </VStack>
                      <VStack gap={2}>
                        <Input
                          bgColor={"rgba(226, 234, 248, 0.2)"}
                          border={"none"}
                          height={8}
                          width={"sm"}
                          id="first-name"
                          color={"#FFFFFF"}
                          value={newname}
                          onChange={handleNameChange}
                          required
                        />
                        {/* <Input
                          bgColor={"rgba(226, 234, 248, 0.2)"}
                          color={"#FFFFFF"}
                          height={8}
                          width={"sm"}
                          border={"none"}
                          id="username"
                          value={newuser}
                          onChange={handleUserChange}
                          required
                        /> */}
                        {formErrors.newId && (
                          <div style={{ color: "red" }}>{formErrors.newId}</div>
                        )}
                        <Input
                          bgColor={"rgba(226, 234, 248, 0.2)"}
                          color={"#FFFFFF"}
                          height={8}
                          width={"sm"}
                          border={"none"}
                          id="email"
                          value={newemail_id}
                          onChange={handleEmailChange}
                          required
                        />
                      </VStack>
                    </HStack>
                  </FormControl>
                </form>
                <HStack gap={4}>
                <Link
                    onClick={handleModalConfirm}
                    type="submit"
                    color="#B9CCED"
                    fontWeight={600}
                    fontSize={16}
                    _hover={{
                      textDecoration: "none",
                      opacity: "0.5",
                    }}
                  >
                    Save Changes
                  </Link>
                  <ConfirmationModal
                    isOpen={modalisOpen}
                    onClose={closeModalConfirm}
                    onConfirm={handleConfirmationSave}
                   
                  />
                  <Link
                    onClick={handlePassword}
                    color="#B9CCED"
                    fontWeight={600}
                    fontSize={16}
                    _hover={{
                      textDecoration: "none",
                      opacity: "0.5",
                    }}
                  >
                    Change Password
                  </Link>
                  <Link
                    onClick={handleModal}
                    fontWeight={600}
                    fontSize={16}
                    color="#FF7072"
                    _hover={{
                      textDecoration: "none",
                      opacity: "0.8",
                    }}
                  >
                    Delete Account
                  </Link>
                  <DeleteAccountModal isOpen={modalIsOpen} onClose={closeModal} onConfirm={handleConfirmationDelete} />
                </HStack>
              </Flex>
            </Center>

            {/* <Button variant="primary" onClick={() => document.getElementById('profile-photo-input').click()}>
                Edit
              </Button>
            <input height={96} id="profile-photo-input" type="file" accept="image/*" onChange={handleProfilePhotoChange} style={{ display: 'none' }} /> */}
          </Box>
        </Flex>
      </main>
    </>
  );
}
