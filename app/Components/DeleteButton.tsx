import React from 'react'
import { Button } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

function DeleteButton({ itemCode, setStockItems }: any) {
  const [itemToDelete, setItemToDelete] = useState(itemCode);
  const deleteItem = (itemCode: number) => {
    axios.delete(`http://localhost:1799/api/stockitems/${itemCode}`).then(response => setStockItems(response.data))
  }

  return (
    <Button onClick={(e) => deleteItem(itemToDelete)} >
      DELETAR
    </Button>
  )
}

export default DeleteButton
