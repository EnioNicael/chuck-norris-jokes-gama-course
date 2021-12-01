import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Container,
  Heading,
} from '@chakra-ui/react';

import api from '../../services/api';

import Loader from '../../assets/loading.gif';

const Categories = () => {
  const [joke, setJoke] = useState({});
  const [ isLoad, setIsLoad ] = useState(false)
  const { category } = useParams();

  useEffect(() => {
    setIsLoad(true)
    api.get(`random?category=${category}`).then(
      res => {
        setJoke(res.data)
      }
    )
    .catch( err => console.error(err) )
    .finally( () => setIsLoad(false))
  }, [category])

  if(isLoad){
    return(
      <div>
        <Container centerContent>
          <img src={Loader} alt="loader" />
        </Container>
      </div>
    )
  }

  return (
    <section>
      {/* <Flex> */}
        <Container centerContent>
          <h1><Heading>Categorias</Heading></h1>
        </Container>
        <Container centerContent>
          <div>
            <img src={joke?.icon_url} alt={joke?.value}/>
            <h4>{joke?.value}</h4>
          </div>
        </Container>
      {/* </Flex> */}
    </section>
  )
}

export default Categories