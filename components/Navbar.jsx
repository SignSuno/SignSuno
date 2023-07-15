import { Box, Flex, HStack,VStack, Link, useColorModeValue, IconButton} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
// import LoginBtn from '@/components/LoginBtnss-front';
// import NotLoggedInAlert from '@/components/pop_up_loginss-front';
import { useDisclosure } from '@chakra-ui/react';

import LoginBtn from './LoginBtn';
import NotLoggedInAlert from './pop_up_login';
// import Logo from ".../assets/icons/Sign सुनो_white.svg";
import "@fontsource/inter"



export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPopup, setShowPopup] = useState(null);

  const toggleSidebar = () => {
    
    if (window.innerWidth < 768) {
      if (isOpen) {
        onClose();
      } else {
        onOpen();
      }
    }
  };

  function togglePopup() {
    setShowPopup(!showPopup);
  }

    useEffect(() => {
      console.log("window",typeof window);
      console.log("local storage",window.localStorage);
      if (typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') == 'true') {
        //const isLoggedInLocalStorage = ;
        setIsLoggedIn(true);
      }
    }, []);

    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };

// const handleButtonClick = (buttonName) => {
//   if (buttonName === activeButton) {
//     // If the same button is clicked again, close the modal
//     setActiveButton('');
//   } else {
//     // If a different button is clicked, open the modal
//     setActiveButton(buttonName);
//   }
// };

  return isLoggedIn? (
    <Box>
      <Flex
        display={{ base: 'none', md: 'block' }}
        py={{ base: 2 }}
        px={{ base: 4 }}
        transform={isOpen ? 'translateX(0)' : 'translateX(0)'}
        align={'center'}
        >

        <HStack
          flex={{ base: 1, md: 1 }}
          justify={{base: 'center'}}
          direction={'row'}
          spacing={24}>
          <Box boxSize="20" display="flex" alignItems="center" justifyContent="space-between" justify={{base: 'center', md: 'start'}}
              >
              <Link href="/">
                <img src="/assets/icons/Sign सुनो_white.svg" alt="Logo" textDecoration="none"  _hover={{
              color: "#FFD53F"
            }}/>
              </Link>
          </Box>
          <Link
            href='/'
            fontFamily={"Inter"}
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}>
            HOME
          </Link>
          <Link
            href='/favourites'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              color: '#FFD53F',
            }}>
            FAVORITE PHRASES
          </Link>
          <Link
            p={2}
            href='/leaderboard'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              color: '#FFD53F',
            }}>
            LEADERBOARD
          </Link>
          <Link
            p={2}
            href='/tutorial'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              color: '#FFD53F',
            }}>
            TUTORIALS
          </Link>
          <Link
            
            href='/user_profile'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              color:'#FFD53F'
            }}>
            PROFILE
          </Link>

          <Flex justify={'flex-end'} direction={'row'} flex={{ base: 1, md: 0 }}>
            <LoginBtn />
          </Flex>
          
        </HStack>
      </Flex>
       {/* Mobile Sidebar */}
       <IconButton
      onClick={toggleSidebar}
      icon={isOpen ? <HamburgerIcon w={6} h={8} /> : <HamburgerIcon  w={6} h={8} />}
      variant="ghost"
      aria-label="Toggle Sidebar"
      display={{ base: 'flex', md: 'none' }}
      position="absolute"
      top={2}
      left={0}
      zIndex={20}
      color={"white"}
      bg="transparent"
      _hover={{ bg: 'transparent' }}
    />
      <VStack
       bg={useColorModeValue('#0359C8', 'gray.900')}
        color={useColorModeValue('black', 'white')}
        display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
        w="100%"
        alignItems="inital"
        p={4}
        spacing={4}
        position="fixed"
        top={0}
        left={0}
        zIndex={10}
        h="100vh"
        transition="transform 0.3s"
        transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
        borderRight="1px solid #fff"
      >
        <Box boxSize="20" display="flex" alignItems="center" justifyContent="space-between" >
              <Link  marginTop={10} href="/">
                <img src="/assets/icons/Sign सुनो_white.svg" alt="Logo" textDecoration="none"  _hover={{
              color: "#FFD53F"
            }}/>
              </Link>
          </Box>
          <Link
            href='/'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}>
            HOME
          </Link>
          <Link
          href='/favourites'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}>
            FAVORITE PHRASES
          </Link>
          {/* {showPopup && <NotLoggedInAlert/> } */}

          <Link
          href='/leaderboard'
            // p={2}
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}>
            LEADERBOARD
          </Link>
          {/* {showPopup && <NotLoggedInAlert/> } */}

          <Link
            // p={2}
            href='/tutorial'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              color: '#FFD53F',
            }}>
            TUTORIALS
          </Link>
          <Link
          href='/user_profile'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}>
            PROFILE
          </Link>
          {/* {showPopup && <NotLoggedInAlert/> } */}

          <Flex justify={'flex-start'} direction={'row'} flex={{ base: 1, md: 0 }}>
            <LoginBtn />
          </Flex>
          
        </VStack>
    </Box>
  ) :
  (
    <Box>
      <Flex
        display={{ base: 'none', md: 'block' }}
        transition="transform 0.3s"
        transform={isOpen ? 'translateX(0)' : 'translateX(0)'}
        borderRight="1px solid #fff"
        >
        <HStack
          flex={{ base: 1, md: 1 }}
          justify={{base: 'center'}}
          direction={'row'}
          spacing={24}
          >
          <Box boxSize="20" display="flex" alignItems="center" justifyContent="space-between" 
              >
              <Link href="/">
                <img src="/assets/icons/Sign सुनो_white.svg" alt="Logo" textDecoration="none"  _hover={{
              color: "#FFD53F"
            }}/>
              </Link>
          </Box>
          <Link
            href='/'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}>
            HOME
          </Link>
          <Link
          // onClick={togglePopup}
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}
            onClick={() => {
              
              handleButtonClick('favourites');
            }}
            >
            FAVORITE PHRASES
          </Link>
          {/* {showPopup && <NotLoggedInAlert/> } */}
          

          <Link
          // onClick={togglePopup}
            // p={2}
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}
            onClick={() => {
              
              handleButtonClick('leaderboard');
            }}>
            LEADERBOARD
          </Link>
          {/* {showPopup && <NotLoggedInAlert/> } */}
          

          <Link
            // p={2}
            href='/tutorial'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              color: '#FFD53F',
            }}>
            TUTORIALS
          </Link>
          <Link
          // onClick={togglePopup}
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}
            onClick={() => {
             
              handleButtonClick('profile');
            }}>
            PROFILE
          </Link>
          {/* {showPopup && <NotLoggedInAlert/> } */}
          

          <Flex justify={'flex-end'} direction={'row'} flex={{ base: 1, md: 0 }}>
            <LoginBtn />
          </Flex>
          {/* {activeButton === 'favourites' && <NotLoggedInAlert />}
          {activeButton === 'leaderboard' && <NotLoggedInAlert />}
          {activeButton === 'profile' && <NotLoggedInAlert />} */}
          {/* {activeButton && (
        <NotLoggedInAlert/>
      )} */}
        </HStack>
      </Flex>

      {/* Mobile Sidebar */}
      <IconButton
      onClick={toggleSidebar}
      icon={isOpen ? <HamburgerIcon w={6} h={8} /> : <HamburgerIcon  w={6} h={8} />}
      variant="ghost"
      aria-label="Toggle Sidebar"
      display={{ base: 'flex', md: 'none' }}
      position="absolute"
      top={2}
      left={0}
      zIndex={20}
      bg="transparent"
      color="white"
      _hover={{ bg: 'transparent' }}
    />
      <VStack
        bg={useColorModeValue('#0359C8', 'gray.900')}
        display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
        alignItems="left"
        p={4}
        spacing={4}
        w="100%"
        position="fixed"
        top={0}
        left={0}
        h="100vh"
        zIndex={10}
        transition="transform 0.3s"
        transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
        borderRight="1px solid #fff"
      >
        <Box boxSize="20" display="flex" alignItems="center" justifyContent="space-between" >
              <Link marginTop={10} href="/">
                <img src="/assets/icons/Sign सुनो_white.svg" alt="Logo" textDecoration="none"  _hover={{
              color: "#FFD53F"
            }}/>
              </Link>
          </Box>
          <Link
            href='/'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}>
            HOME
          </Link>
          <Link
          // onClick={togglePopup}
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}
            onClick={() => handleButtonClick('favourites')}>
            FAVORITE PHRASES
          </Link>
          {/* {showPopup && <NotLoggedInAlert/> } */}
          {/* onClick={() => handleButtonClick('favourites')} */}

          <Link
          // onClick={togglePopup}
            // p={2}
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}
            onClick={() => handleButtonClick('leaderboard')}>
            LEADERBOARD
          </Link>
          {/* {showPopup && <NotLoggedInAlert/> } */}
         

          <Link
            // p={2}
            href='/tutorial'
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              textDecoration: 'none',
              color: '#FFD53F',
            }}>
            TUTORIALS
          </Link>
          <Link
          // onClick={togglePopup}
            fontSize={'sm'}
            fontWeight={500}
            color={'white'}
            _hover={{
              color: "#FFD53F"
            }}
            onClick={() => handleButtonClick('profile')}>
            PROFILE
          </Link>

          <Flex justify={'flex-start'} direction={'row'} flex={{ base: 1, md: 0 }}>
            <LoginBtn />
          </Flex> 
        </VStack>
      {activeButton && (
          <NotLoggedInAlert isOpen={true} onClose={() => setActiveButton('')} />
        )}
    </Box>
  );
}