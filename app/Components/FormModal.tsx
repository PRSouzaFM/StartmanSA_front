'use client'
import { useRef, useState } from 'react';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';

import {
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

function FormModal({ setStockItems }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [quantityInStock, setQuantityInStock] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [supplier, setSupplier] = useState('');
  const [location, setLocation] = useState('');

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const formData = {
      description: description.toString(),
      unitPrice: parseFloat(unitPrice),
      quantityInStock: parseInt(quantityInStock),
      location: location.toString(),
      supplier: supplier.toString(),
      lastUpdated: new Date().toISOString(),
    };

    axios.post('http://localhost:1799/api/stockitems', formData)
      .then((response) => {
        setStockItems(response.data)
        onClose();
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error adding item:', error);
      });
  };

  return (
    <>
      <Button size='lg' variant='solid' onClick={onOpen}>
        Adicionar Produto
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar um item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleFormSubmit}>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Descrição'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Quantidade em Estoque</FormLabel>
                <Input
                  value={quantityInStock}
                  onChange={(e) => setQuantityInStock(e.target.value)}
                  placeholder='Quantidade de unidades'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Preço Unitário</FormLabel>
                <Input
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  placeholder='BRL'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Fornecedor</FormLabel>
                <Input
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder='Fornecedor'
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Localização</FormLabel>
                <Select onChange={(e) => setLocation(e.target.value)} placeholder='Selecione o local'>
                  <option value='1'>Araçatuba</option>
                  <option value='2'>Itapetininga</option>
                  <option value='3'>Ribeirão Preto</option>
                </Select>
              </FormControl>

              <ModalFooter>
                <Button type='submit'>Save</Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormModal;
