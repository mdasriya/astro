import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UploadButton } from "@bytescale/upload-widget-react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Box,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [image, setImage] = useState("");



const handleEdit = (props) => {
  onOpen()
setEditData(props)
}

const options = {
  apiKey: "public_W142ibG53EuiVnmepYM6iYmqTRg5",
  maxFileCount: 1,
  showFinishButton: true
};

const handleChange = (event) => {
  const { name, value } = event.target;
  // const parsedValue = name === "quantity" ? parseInt(value, 10) : value;
  setEditData((prevData) => ({ ...prevData, [name]: value }));
};

const handleLanguageChange = (e) => {
  const selectedLanguages = Array.from(e.target.selectedOptions, (option) => option.value);
  setEditData({
    ...editData,
    languages: selectedLanguages
  });
};


const handleSpecialtiesChange = (e) => {
  const selectedSpecialties = Array.from(e.target.selectedOptions, (option) => option.value);
  setEditData({
    ...editData,
    specialties: selectedSpecialties
  });
};

const handleImageChange = (fileUrl) => {
  setEditData({
    ...editData,
    profileImageUrl: fileUrl
  });
};


 const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:4000/api/astrologers/${editData._id}`, editData)
      .then(res => {
        console.log(res.data)
        fetch()
        onClose()
      })
      .catch(error => {
        console.log(error.message);
      });
  };


const fetch = () => {
  axios.get("http://localhost:4000/api/astrologers")
  .then((res) => {
    setData(res.data)
  })
  .catch((error) => {
    console.log(error.message)
  })
}

  useEffect(()=> {
   fetch()
  },[]);

  return (
    <div style={{marginTop:"100px"}}>
      <TableContainer>
        <Table size='sm'>
          <TableCaption>List of Astrologers</TableCaption>
          <Thead>
            <Tr>
              <Th>Sr.No</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Languages</Th>
              <Th>Specialties</Th>
              <Th>Profile Image</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((astro, index) => (
              <Tr key={astro._id}>
                <Td>{index + 1}</Td>
                <Td>{astro.name}</Td>
                <Td>{astro.email}</Td>
                <Td>{astro.gender}</Td>
                <Td>{astro.languages ? astro.languages.join(", ") : ""}</Td>
                <Td>{astro.specialties ? astro.specialties.join(", ") : ""}</Td>
                <Td>
                  <img src={astro.profileImageUrl} alt={astro.name} style={{ width: "50px", height: "50px" }} />
                </Td>
                <Td>
                 
                    <Button colorScheme='green' onClick={()=>handleEdit(astro)}>Edit</Button>
               
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Astro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box width="100%" border="1px solid gray" margin="auto" mt={10} p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={editData.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            value={editData.gender}
            onChange={handleChange}
            placeholder="Select Gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={editData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            name="languages"
            value={editData.languages}
            onChange={handleLanguageChange}
            placeholder="Select Languages"
            multiple
          >
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            {/* Add more languages as options */}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Specialties</FormLabel>
          <Select
            name="specialties"
            value={editData.specialties}
            onChange={handleSpecialtiesChange}
            placeholder="Select Specialties"
            multiple
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
            {/* Add more specialties as options */}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Profile Image</FormLabel>
          <Input
            type="text"
            name="profileImageUrl"
            value={editData.profileImageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </FormControl>
        <Box className="container">
          <UploadButton
            options={options}
            onComplete={(files) => {
              const fileUrl = files.map((x) => x.fileUrl).join("\n");
              setImage(fileUrl);
              handleImageChange(fileUrl);
            }}
          >
            {({ onClick }) => (
              <Button mt={7} colorScheme="green" onClick={onClick}>
                Image Upload..
              </Button>
            )}
          </UploadButton>
        </Box>
        <Button mt={4} colorScheme="teal" type="submit">
         Update Astro
        </Button>
      </form>
    </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
         
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Admin;
