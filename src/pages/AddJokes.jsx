import { useHistory } from 'react-router-dom';
import JokeForm from '../components/jokes/JokeForm'
import useHttp from '../hooks/use-http';
import { addJoke } from '../utils/firebase-api';
import { useEffect } from 'react';

const AddJoke = () => {

   const history = useHistory();
   const {sendHttpRequest, status} = useHttp(addJoke)

   useEffect(() => {

      if(status === 'completed') {
         history.push('/joke-list');
      }

   }, [status, history])


   const addJokeHandler = (joke) => {
      sendHttpRequest(joke)
   }


   return (
      <JokeForm onAddJoke={addJokeHandler} isLoading={status === 'pending'}/>
   )
}

export default AddJoke;