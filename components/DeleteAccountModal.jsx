import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';


function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  // const handleConfirmation = () => {
  //   // event.preventDefault();
    
  //   onConfirm();
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="lg" p={2}>
        <ModalHeader fontSize="lg" fontWeight="bold" p={2}> Delete Account</ModalHeader>
        <ModalBody p={2}>
          <p>Are you sure you want to delete your account?</p>
        </ModalBody>
        <ModalFooter justifyContent="flex-end" p={2}>
            <Flex>
              <Button colorScheme="gray" onClick={onClose} mr={2}>
                Cancel
              </Button>
              <Button colorScheme="red"  onClick={onConfirm} >
                Delete
              </Button>
            </Flex>
          </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteAccountModal;
