import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Jokes from "./pages/Jokes";
import AddJoke from "./pages/AddJokes";
import JokeDetails from "./pages/JokeDetails";
import NotFound from "./pages/NotFound";

function App() {

   // const history = useHistory();

   // const [jokes, setJokes] = useState([]);
   // const [isLoading, setIsLoading] = useState(false);


   // const onAddJokeHandler = (joke) => {
   //    const jokeID = `j${Math.trunc(Math.random()*100 + 1)}`
   //    setIsLoading(true)
   //    setJokes(prevValue => [...prevValue, {id: jokeID, ...joke}])
   //    const timer = setTimeout(() => {
   //       setIsLoading(false);
   //       clearTimeout(timer);
        
   //       // location.replace('/joke-list');

   //       history.push('/joke-list');
        
   //    }, 2000)
      
   // }


   return (
      <Layout>  
            <Route path="/" exact>
               <Redirect to='/joke-list'/>
            </Route>
         <Switch>
            <Route path="/joke-list" exact>
               <Jokes />
               {/* <Jokes jokes={jokes}/> */}
            </Route>
            <Route path="/joke-list/:jokeID">
               <JokeDetails />
               {/* <JokeDetails jokes={jokes}/> */}
            </Route>
            <Route path="/add-joke">
               <AddJoke />
               {/* <AddJoke onAddJoke={onAddJokeHandler} isLoading={isLoading}/> */}
            </Route>
            <Route path="*">
               <NotFound />
            </Route>
         </Switch>
      </Layout>
   )

   

}

export default App;
