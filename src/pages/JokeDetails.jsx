import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedJoke from '../components/jokes/HighlightedJoke';
import { useEffect } from "react";
import { getJoke } from "../utils/firebase-api";
import useHttp from "../hooks/use-http";
import Loader from "../components/UI/Loader";

const JokeDetails = () => {

   const params = useParams();
   const match = useRouteMatch();

   const { jokeID } = params;

   const {sendHttpRequest: getJokeHttpRequest, data: loadedJoke, status: jokeStatus, error: jokeError} = useHttp(getJoke, true)
   
   useEffect(() => {

      getJokeHttpRequest(jokeID);
   
   }, [getJokeHttpRequest, jokeID])

   if(jokeStatus === 'pending') {
      return <div className="centered">
         <Loader />
      </div>
   }

   if(jokeError) {
      return <p className="centered focused" style={{color: '#000'}}>
         {jokeError}
      </p>
   }

   if(jokeStatus === 'completed' && !loadedJoke.text) {
      return <h1 className="centered"> Joke is not found </h1>
   }

   // const currentJoke = props.jokes.find(joke => joke.id === params.jokeID)

   // if(!currentJoke) {
   //    return <h1 className="centered"> Joke is not found </h1>
   // }

   return (
      <>
        <Link to={`${match.url}/comments`} style={{listStyle: 'none', textDecoration:'none'}}>
            <HighlightedJoke topic={loadedJoke.topic} text={loadedJoke.text} />
        </Link>
        <Route path={`${match.url}/comments`}>
           <Comments jokeID={jokeID}/>
        </Route>
      </>
   )
}

export default JokeDetails;