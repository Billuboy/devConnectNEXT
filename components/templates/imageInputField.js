import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

export default function IconInput(props) {
  return (
    <Box m={props.m}>
      <FormControl isRequired={props.isRequired} isInvalid={props.error}>
        <FormLabel fontSize={props.fontSize} mb={props.mb} color="#007a5b">
          {props.label}
        </FormLabel>
        <InputGroup size="md">
          <InputLeftElement
            pointerEvents="none"
            fontSize="1.5rem"
            color={props.color}>
            <i className={props.icon}></i>
          </InputLeftElement>
          <Input
            borderColor="#00a37a"
            color="#11698e"
            _hover={{ borderColor: '#00a37a' }}
            placeholder={props.placeholder}
            autoComplete="off"
            fontWeight="500"
            id={props.id}
            value={props.value}
            onChange={props.onChange}
          />
        </InputGroup>
        <FormErrorMessage>{props.error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
