import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const EditAstro = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    languages: [],
    specialties: [],
    profileImageUrl: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/api/astrologers/${id}`)
      .then(res => {
        setFormData(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/astrologers/${id}`, formData)
      .then(res => {
        history.push('/admin');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
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
          <Input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Enter Gender"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Languages</FormLabel>
          <Input
            name="languages"
            value={formData.languages.join(',')}
            onChange={handleChange}
            placeholder="Enter Languages (comma separated)"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Specialties</FormLabel>
          <Input
            name="specialties"
            value={formData.specialties.join(',')}
            onChange={handleChange}
            placeholder="Enter Specialties (comma separated)"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Profile Image</FormLabel>
          <Input
            name="profileImageUrl"
            value={formData.profileImageUrl}
            onChange={handleChange}
            placeholder="Enter Profile Image URL"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditAstro;
