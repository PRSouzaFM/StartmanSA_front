'use client'
import React, { useState } from 'react';
import axios from 'axios';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  FormControl,
  Input,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

interface StockItem {
  itemCode: number;
  description: string | '';
  unitPrice: number;
  quantityInStock: number;
  location: string | '';
  supplier: string | '';
  lastUpdated: string; // Assuming you want to represent the date as a string
}

function EditButton({ itemCode, quantityInStock: initialQuantityInStock, description: initialDescription, location: initialLocation, supplier: initialSupplier, unitPrice: initialUnitPrice, setStockItems }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [quantityInStock, setQuantityInStock] = useState(initialQuantityInStock.toString());
  const [description, setDescription] = useState(initialDescription.toString());
  const [unitPrice, setUnitPrice] = useState(initialUnitPrice.toString());
  const [supplier, setSupplier] = useState(initialSupplier.toString());
  const [location, setLocation] = useState(initialLocation.toString());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      description: description.toString(),
      unitPrice: parseFloat(unitPrice),
      quantityInStock: parseInt(quantityInStock),
      location: location.toString(),
      supplier: supplier.toString(),
      lastUpdated: new Date().toISOString(),
    };

    axios.put(`http://localhost:1799/api/stockitems/${itemCode}`, formData)
      .then((response) => {
        setStockItems(response.data)
        onClose();
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error adding item:', error);
      });
    onClose(); // Close the modal after submitting
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme='blue' className='bg-blue-300'>
        EDITAR
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDITAR</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Quantidade em estoque</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Quantidade em estoque'
                  value={quantityInStock}
                  onChange={(e) => setQuantityInStock(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input
                  ref={finalRef}
                  placeholder='Descrição'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Preço Unitário</FormLabel>
                <Input
                  ref={finalRef}
                  placeholder='Descrição'
                  value={unitPrice}
                  onChange={(e) => setUnitPrice((e.target.value))}
                />
              </FormControl>

              <ModalFooter>
                <Button type='submit' colorScheme='blue' mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditButton;
