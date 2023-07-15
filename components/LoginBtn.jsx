
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import "@fontsource/inter"

  export default function LoginBtn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      console.log("window",typeof window);
      console.log("local storage",window.localStorage);
      if (typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') == 'true') {
        //const isLoggedInLocalStorage = ;
        setIsLoggedIn(true);

        // 
      }
    }, []);

    return isLoggedIn ? (        
        <Button justify={'flex-end'}
              style={{display: 'flex', justifyContent: 'right'}}
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'md'}
              fontWeight={600}
              color={'#0B51DA'}
              fontFamily= 'Inter'
              
              size='sm'
              bg={'white'}
              _hover={{
                bg: '#FFD53F',
              }} 
              onClick={handleLogOut}>Log Out</Button>
        ) : (
        <Button justify={'flex-end'}
              style={{display: 'flex', justifyContent: 'right'}}
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              color={'#0B51DA'}
              fontFamily= 'Inter'
              
              size='sm'
              bg={'white'}
              _hover={{
                bg: '#FFD53F',
              }}
              onClick={()=>window.location.href = "/landing"} >Sign In</Button>
    )
}

  const handleLogOut = async (event) => {
    event.preventDefault();
    console.log("HEREEEEE");
    //let responseData;
      try {
        axios
          .post("http://127.0.0.1:8000/api/logout")
          .then(console.log)
          .catch(console.log);
          window.localStorage.removeItem("isLoggedIn");
          window.localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("user");
          window.location.href = "/";

      } catch (error) {
        console.log(error);
        window.location.href = "/";
      }
    };