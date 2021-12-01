import React, {useEffect, useState} from 'react';

import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'

import api from '../../services/api';

import Loader from '../../assets/loading.gif'

const App = () => {
  const [data, setData] = useState({});
  const [allJokes, setAllJokes] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [searchJoke, setSearchJoke] = useState('');

  useEffect(() => {
    setIsLoad(true)
    api.get('random').then(
      response => {
        setData(response.data)
      }
    )
    .catch( e => console.error(e))
    .finally( () => setTimeout(() => {
      setIsLoad(false)
    }, 1000))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoad(true)
    api.get(`search?query=${searchJoke}`).then(
      res => {
        setIsSearch(true)
        setAllJokes(res.data)
      }
    )
    .catch( err => console.error(err))
    .finally( () => setIsLoad(false))
  }

  if(isLoad) {
    return(
      <div className="loader">
        <img src={Loader} alt="Loader" />
      </div>
    )
  }

  return(
    <div className="home-component">
      <h1><Heading>Joke</Heading></h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Container centerContent>
            <Box w='400px'>
              <FormLabel>Pesquise sua piada</FormLabel>
              <Input
                type="text"
                onChange={e => setSearchJoke(e.target.value)}
                placeholder="search by category"
                />
            </Box>
          </Container>
          <Button colorScheme='teal' type="submit" className="btn">Pesquisar</Button>
        </form>
      </div>
      { !isSearch ? (
        <div className="jokes">
          <img src={data?.icon_url} alt={data?.value} />
          <h3>{data?.value}</h3>
        </div>
      ) : (
        <>
          { allJokes?.result.map( (item, index) => (
            <div key={index} className="jokes">
              <img src={item?.icon_url} alt={item?.value} />
              <h3>{item?.value}</h3>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default App