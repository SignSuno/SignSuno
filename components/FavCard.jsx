// import { Box, Card, CardBody, SimpleGrid, Text, Flex} from '@chakra-ui/react'
// import { Image, Button } from '@chakra-ui/react';
// import Link from 'next/link'
// import React from 'react'
// import { useState } from 'react';


// function FavCard({fav, onDelete }) {
//   const [inputContent, setInputContent] = useState('');
//   const handleCardClick = (fav) => {
//     setInputContent(fav);
//   };

//   const handleDelete = () => {
//     onDelete(); // Call the onDelete function passed from the parent component
//   };

//   const handleClick = () => {
//     // Handle button click logic here if needed
//   };
  
//   return (
      
//           <Card 
//           onClick={() => navigator.clipboard.writeText(fav)}
//           background='#4878FF' 
//           width='100%' 
//           height={"full"}
//           // _hover={{opacity:0.5,}} 
//           >
//              <Flex justify="flex-end">
//               <Box position="relative">
//                 <Button bgColor={"#4878FF"} 
//                 _hover={{bgColor:"none"}}
//                 onClick={handleDelete}
//                 >
//                   <Image
//                     src="./assets/icons/dustbin.png"
//                     color="#FFFFFF"
//                     position="absolute"
//                     top="0"
//                     right="0"
//                     marginRight="2"
//                     marginTop="2"
//                     cursor="pointer"
//                     boxSize={"5"}
//                   />
//                 </Button>
//               </Box>
//             </Flex>
//             <CardBody>
//               <Text color="#FFFFFF">{fav}</Text>
//             </CardBody>
//           </Card>
  
//   )
// }

// export default FavCard;

import { Box, Card, CardBody, SimpleGrid, Text, Flex, useToast} from '@chakra-ui/react'
import { Image, Button } from '@chakra-ui/react';
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';


function FavCard({fav, onDelete }) {
  const [inputContent, setInputContent] = useState('');
  const toast = useToast();


  const handleCardClick = (fav) => {
    setInputContent(fav);
  };

  const handleClick = (fav) => {
    navigator.clipboard.writeText(fav); 
    toast({
          title: 'Text Copied',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
  };

  const handleDelete = () => {
    onDelete(); // Call the onDelete function passed from the parent component
  };

  return (
      
          <Card 
          onClick={() => handleClick(fav)}
          background='#4878FF' 
          width='100%' 
          height={"full"}
          // _hover={{opacity:0.5,}} 
          >
             <Flex justify="flex-end">
              <Box position="relative">
                <Button bgColor={"#4878FF"} 
                _hover={{bgColor:"none"}}
                onClick={handleDelete}
                >
                  <Image
                    src="./assets/icons/dustbin.png"
                    color="#FFFFFF"
                    position="absolute"
                    top="0"
                    right="0"
                    marginRight="2"
                    marginTop="2"
                    cursor="pointer"
                    boxSize={"5"}
                  />
                </Button>
              </Box>
            </Flex>
            <CardBody>
              <Text color="#FFFFFF">{fav}</Text>
            </CardBody>
          </Card>
  
  )
}

export default FavCard;