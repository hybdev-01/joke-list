import { useEffect } from "react";
import JokeList from "../components/jokes/JokeList";
import useHttp from "../hooks/use-http";
import { getJokes } from "../utils/firebase-api";
import Loader from "../components/UI/Loader";
import NoJokesFound from '../components/jokes/NoJokesFound'

const Jokes = () => {

   const {sendHttpRequest, data: loadedJokes, status, error} = useHttp(getJokes, true)


   useEffect(() => {
      sendHttpRequest();
   }, [sendHttpRequest])


   if(status === 'pending') {
      return <div className="centered">
         <Loader />
      </div>
   }

   if(error) {
      return <p className="centered focused" style={{color: '#000'}}>
         {error}
      </p>
   }

   if(!loadedJokes || loadedJokes.length === 0) {
      return <div className="centered">
         <NoJokesFound />
      </div>
   }


   return (
      <JokeList jokes={loadedJokes} />
   )
}

export default Jokes;