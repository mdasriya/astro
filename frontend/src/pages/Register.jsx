import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { UploadButton } from "@bytescale/upload-widget-react";
import axios from "axios"
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
const initForm = {
  name: "",
  gender: "",
  email: "",
  languages: [],
  specialties: [],
  profileImageUrl: ""
};

const Register = () => {
  const [formData, setFormData] = useState(initForm);
  const [image, setImage] = useState("");
  const toast = useToast()
  const navigate = useNavigate()

  const options = {
    apiKey: "public_W142ibG53EuiVnmepYM6iYmqTRg5",
    maxFileCount: 1,
    showFinishButton: true
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLanguageChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      languages: selectedLanguages
    });
  };

  const handleSpecialtiesChange = (e) => {
    const selectedSpecialties = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      specialties: selectedSpecialties
    });
  };

  const handleImageChange = (fileUrl) => {
    setFormData({
      ...formData,
      profileImageUrl: fileUrl
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initForm)
    axios.post("http://localhost:4000/api/register", formData)
    .then((res)=> {
      toast({
        title: res.data.msg,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate("/")
      setFormData(initForm)
    })
    .catch((error)=> {
      console.log(error.message)
    })
  };




  return (
    <Box width="50%" border="1px solid gray" margin="auto" mt={10} p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            name="languages"
            value={formData.languages}
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
            value={formData.specialties}
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
            value={formData.profileImageUrl}
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
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Register;
