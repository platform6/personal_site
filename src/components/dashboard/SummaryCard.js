import React from 'react';
import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

const SummaryCard = ({ label, value, helpText }) => {
  return (
    <Card boxShadow={'2xl'}>
      <CardBody>
        <Stat>
          <StatLabel fontSize={{ base: 'sm', md: 'md' }}>{label}</StatLabel>
          <StatNumber fontSize={{ base: '2xl', md: '3xl' }}>{value}</StatNumber>
          <StatHelpText fontSize={{ base: 'xs', md: 'sm' }}>
            {helpText}
          </StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );
};

export default SummaryCard;
