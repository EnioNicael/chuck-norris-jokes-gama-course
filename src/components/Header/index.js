import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Select,
  Spacer,
}  from '@chakra-ui/react'
import Logo from '../../assets/logo.jpeg';

import api from '../../services/api'


const Header = () => {
  const [main, setMain] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get('categories').then(
      res => {
        setMain(res.data)
      }
    )
  }, [])

  const handleCategory = (e) => {
    navigate(`/categories/${e.target.value}`)
  }

  return(
    <nav>
      <Box boxShadow='md' mb='20px'>
        <Flex>
          <Box p='5'>
            <Link to='/'>
              <img src={Logo} className="logo" alt="Logo" />
            </Link>
          </Box>
          <Spacer />
          <Box p='5'>
            <FormControl>
              <FormLabel>Selecione a categoria de sua piada</FormLabel>
              <Select onChange={handleCategory}>
                {main?.map( (item, index) => (
                  <option key={index} value={item}> {item} </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Flex>
      </Box>
    </nav>
  )
}

export default Header;