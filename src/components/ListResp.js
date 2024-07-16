import React from 'react';
import { ListItem } from '@chakra-ui/react';

const ListResp = ({ data }) => {
  const list = data.map((resp, index) => {
    return (
      <ListItem key={index}>
        {/* <ListIcon as={CheckCircleIcon} color="green.500" /> */}
        {resp}
      </ListItem>
    );
  });
  return list;
};

export default ListResp;
