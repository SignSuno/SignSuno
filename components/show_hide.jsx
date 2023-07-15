import { Input } from '@chakra-ui/react'
import React from 'react'
import { InputGroup } from '@chakra-ui/react'
import { InputRightElement } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import {Icon} from '@chakra-ui/icons'
import { ViewIcon,ViewOffIcon } from '@chakra-ui/icons'

export default function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Confirm Password'
      />
      <InputRightElement onClick={handleClick} width='4.5rem'>
       
        <Button h='1.75rem' size='sm' onClick={handleClick} bgColor="#E2EAF8">
          {show ? <Icon as={ViewOffIcon} /> : <Icon as={ViewIcon}/>}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}