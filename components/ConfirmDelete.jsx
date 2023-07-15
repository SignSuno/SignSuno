import { useState, useEffect, useRef } from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Button, Link, Center, Flex } from "@chakra-ui/react";
import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';

function ConfirmDelete({ isOpen, onClose }) {
  // const [isOpen, setIsOpen] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  const handleDelete = async (event) => {
    console.log("hereeeee");
    event.preventDefault();
    // try {
    //   axios
    //     .post("http://127.0.0.1:8000/api/delete_account", {
    //       username: user,
    //     })
    //     .then((response) => {
    //       if (response.status == 200) {
    //         axios
    //           .post("http://127.0.0.1:8000/api/logout")
    //           .then(console.log)
    //           .catch(console.log);
    //         window.localStorage.removeItem("isLoggedIn");
    //         window.localStorage.removeItem("token");
    //         localStorage.removeItem("email");
    //         localStorage.removeItem("user");
    //         window.location.href = "/";
    //       } else {
    //         window.location.href = "/user_profile";
    //       }
    //     });
    // } catch (error) {
    //   console.log(error);
    //   window.location.href = "/user_profile";
    // }
  };

  // const onClose = () => setIsOpen(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // Returns true on mobile, false on desktop

  if (isMobile) {
    return (
      <>
          <Modal  isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
            <ModalContent maxWidth={"72"} align="center" justify="center">
          
                <Alert>
                  <AlertIcon boxSize="35px" mr={0} />
                </Alert>
          
                <ModalHeader mt={4} mb={1} fontSize="xl" fontWeight="semibold" color="gray.900">
                  You are not logged in
                </ModalHeader>
                <ModalBody  maxWidth="sm" color="gray.600" mb={4}>
                  <Text textAlign="center" mx="auto">Are You Sure you want to delete your account?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => (window.location.href = "/landing")}
                    // px={6}
                    // py={3}
                    // mb={4}
                    fontSize="md"
                    fontWeight="semibold"
                    colorScheme="blue"
                    variant="solid"
                  >
                    Log in
                  </Button>
                </ModalFooter>
            </ModalContent>
          </Modal>
      </>
    );
  }


  return (
    <>
      
      <Modal  isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
          <ModalContent align="center" justify="center">
            
              <Alert>
                <AlertIcon boxSize="35px" mr={0} />
              </Alert>
            
              <ModalHeader mt={4} mb={1} fontSize="xl" fontWeight="semibold" color="gray.900">
                Delete Account!!
              </ModalHeader>
              <ModalBody  maxWidth="sm" color="gray.600" mb={4}>
                <Text textAlign="center" mx="auto">Are you Sure you want to delete your account?</Text>
              </ModalBody>
              <ModalFooter>
                <HStack>
                    <Button
                      onClick={handleDelete}
                      // px={6}
                      // py={3}
                      // mb={4}
                      fontSize="md"
                      fontWeight="semibold"
                      colorScheme="red"
                      variant="solid"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/trial")}
                      // px={6}
                      // py={3}
                      // mb={4}
                      fontSize="md"
                      fontWeight="semibold"
                      colorScheme="blue"
                      variant="solid"
                    >
                      Cancel
                    </Button>
                </HStack>
              </ModalFooter>
      
          </ModalContent>
      </Modal>
             
    </>
  );
}

export default ConfirmDelete;

// import { useState, useEffect, useRef } from "react";
// import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Button, Link } from "@chakra-ui/react";
// import { useContext } from "react";
// import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';
// function NotLoggedInAlert() {
//   const [isOpen, setIsOpen] = useState(true);
//   const ref = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         onClose();
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);

//   const onClose = () => setIsOpen(false);

//   return (
//     <>
//     <Modal isOpen={isLoginPopupOpen} onClose={closeLoginPopup} isCentered>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Login Required</ModalHeader>
//         <ModalBody>
//           Please log in to access this feature.
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={closeLoginPopup}>
//             Close
//           </Button>
//           {/* Add your login component or redirect to the login page here */}
//           <Button variant="ghost">Log In</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//     </>
//   );
// }

// export default NotLoggedInAlert;

