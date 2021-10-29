import { useRef } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Textarea,
} from '@chakra-ui/react';

export default function TextArea(props) {
  const textAreaRef = useRef();

  const setHeight = () => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.attributes.style.value =
      textAreaRef.current.scrollHeight > 143
        ? 'overflow: auto; height: 143px;'
        : `height: ${textAreaRef.current.scrollHeight}px;`;
  };

  textAreaRef.current ? setHeight() : null;

  return (
    <Box m={props.m} w={props.w}>
      <FormControl isRequired={props.isRequired} isInvalid={props.error}>
        <FormLabel fontSize={props.fontSize} mb={props.mb} color="#007a5b">
          {props.label}
        </FormLabel>
        <Textarea
          ref={textAreaRef}
          color="#11698e"
          placeholder={props.placeholder}
          autoComplete="off"
          fontWeight="500"
          value={props.value}
          onChange={props.onChange}
          borderColor="#00a37a"
          _hover={{ borderColor: '#00a37a' }}
          cols="5"
          resize="none"
          rows="1"
          overflow="hidden"
        />
        <FormErrorMessage>{props.error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
