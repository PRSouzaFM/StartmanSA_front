'use client'
import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Skeleton, Button } from '@chakra-ui/react';
import axios from 'axios';
import EditButton from './EditButton';

function OutTable() {
  const [stockItems, setStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:1799/api/stockitems')
      .then(response => {
        setStockItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stock items:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>Código</Th>
            <Th>Descrição</Th>
            <Th isNumeric>Quantidade em estoque</Th>
            <Th isNumeric>Fornecedor</Th>
            <Th isNumeric>Preço por Unidade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={6}>
                <Skeleton height='20px' mb='2' startColor='gray.200' endColor='gray.400' />
                <Skeleton height='20px' mb='2' startColor='gray.200' endColor='gray.400' />
                <Skeleton height='20px' mb='2' startColor='gray.200' endColor='gray.400' />
                <Skeleton height='20px' mb='2' startColor='gray.200' endColor='gray.400' />
                <Skeleton height='20px' mb='2' startColor='gray.200' endColor='gray.400' />
              </Td>
            </Tr>
          ) : (
            stockItems?.map(item => (
              <Tr key={item.itemCode}>
                <Td>{item.itemCode}</Td>
                <Td>{item.description}</Td>
                <Td isNumeric>{item.quantityInStock}</Td>
                <Td isNumeric>{item.supplier}</Td>
                <Td isNumeric>{item.unitPrice}</Td>
                <Td isNumeric>
                  <EditButton {...item} />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
}

export default OutTable;


