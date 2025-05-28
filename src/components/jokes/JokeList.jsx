import { useHistory, useLocation } from 'react-router-dom';
import JokeItem from './JokeItem';
import styles from './JokeList.module.css';

const sortJokes = (jokes, isOrderAscending) => {

  // return jokes.sort((joke1, joke2) => {
  //   if(isOrderAscending) {
  //     return joke1.id > joke2.id ? 1 : -1
  //   } else {
  //     return joke1.id < joke2.id ? 1 : -1
  //   }
  // })

  return jokes.sort((joke1, joke2) => isOrderAscending && (joke1.id > joke2.id ? 1 : -1) ||
  (joke1.id < joke2.id ? 1 : -1)) 

}


const JokeList = (props) => {

  const history = useHistory();
  const location = useLocation();

  const urlSortParams = new URLSearchParams(location.search)
  const sortOrder = urlSortParams.get('sort');

  const isSortAscending = sortOrder === 'asc';

  const sortedJokes = sortJokes(props.jokes, isSortAscending)

  const toggleJokeSortingHandler = () => {
    
    history.push(`${location.pathname}?sort=${isSortAscending ? 'desc' : 'asc'}`)

    // history.push({
    //   pathname: location.pathname,
    //   search: `?sort=${isSortAscending ? 'desc' : 'asc'}`
    // })

  }

  return (
    <>
      <p className={styles.sort}>
        <button onClick={toggleJokeSortingHandler}>Sort jokes by {isSortAscending ? 'Descending' : 'Ascending'}</button>
      </p>
      <ul className={styles.list}>
        {sortedJokes.map((joke) => (
          <JokeItem
            key={joke.id}
            id={joke.id}
            topic={joke.topic}
            text={joke.text}
          />
        ))}
      </ul>
    </>
  );
};

export default JokeList;
