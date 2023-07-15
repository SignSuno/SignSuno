import { useState, useEffect, useRef } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Button, Link, Center, Flex } from "@chakra-ui/react";
import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';
function NotLoggedInAlert({ isOpen, onClose }) {
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
                  <Text textAlign="center" mx="auto">Please log in or <Link color="blue.500" fontWeight="semibold" _hover={{ textDecoration: "none", color: "blue.600", opacity: 0.6 }} href='/registration'>sign up</Link> to activate this feature.</Text>
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
                You are not logged in
              </ModalHeader>
              <ModalBody  maxWidth="sm" color="gray.600" mb={4}>
                <Text textAlign="center" mx="auto">Please log in or <Link color="blue.500" fontWeight="semibold" _hover={{ textDecoration: "none", color: "blue.600", opacity: 0.6 }} href='/registration'>sign up</Link> to activate this feature.</Text>
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

export default NotLoggedInAlert;

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

