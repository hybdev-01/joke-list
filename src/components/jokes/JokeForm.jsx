import { useRef, useState } from 'react';

import Card from '../ui/Card';
import Loader from '../UI/Loader';
import styles from './JokeForm.module.css';
import { Prompt } from 'react-router-dom';

const JokeForm = (props) => {

  const [isFormInputChanged, setIsFormInputChanged] = useState(false)

  const topicInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTopic = topicInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddJoke({ topic: enteredTopic, text: enteredText });
  }

  const formInputChangeHandler = () => {

    (topicInputRef.current.value.trim().length > 0 || 
    textInputRef.current.value.trim().length > 0) && 
    (setIsFormInputChanged(true), true) ||
    setIsFormInputChanged(false)

    // if(topicInputRef.current.value.trim().length > 0 || textInputRef.current.value.trim().length > 0)
    // {
    //   setIsFormInputChanged(true);
    //   console.log('focused and typed')
    // } else {
    //   setIsFormInputChanged(false);
    // }
  }

  const addJokeClickHandler = () => {
    setIsFormInputChanged(false);
  }

  return (
    <>
      <Prompt when={isFormInputChanged} message="Your data will be clean, do you want to leave this page?"/>
      <Card>
        <form onChange={formInputChangeHandler} className={styles.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={styles.loading}>
              <Loader />
            </div>
          )}

          <div className={styles.control}>
            <label htmlFor='topic'>Topic</label>
            <input type='text' id='topic' ref={topicInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' ref={textInputRef}></textarea>
          </div>
          <div className={styles.actions}>
            <button className='btn' onClick={addJokeClickHandler}>Add Joke</button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default JokeForm;
