import { useEffect, useState } from 'react';

import styles from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { addComment, getComments } from '../../utils/firebase-api';
import Loader from '../UI/Loader';
import CommentsList from './CommentsList';

const Comments = (props) => {

  const [isAddingComment, setIsAddingComment] = useState(false);


  const { jokeID } = props;
  
  const { sendHttpRequest, status: addCommentStatus } = useHttp(addComment);
  const {sendHttpRequest: getCommentsHttpRequest, data: loadedComments, status: getCommentsStatus, error: getCommentsError} = useHttp(getComments, true)


  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const onAddCommentHandler = (comment) => {

    if(comment.trim() === '' || !comment.trim().length) {
      return;
    }

    sendHttpRequest({
      jokeId: jokeID,
      commentData: comment
    });
  }

  useEffect(() => {

    if(addCommentStatus === 'completed') {
      getCommentsHttpRequest(jokeID)
      setIsAddingComment(false)
    }
    
  }, [getCommentsHttpRequest, jokeID, addCommentStatus])

  useEffect(() => {
    getCommentsHttpRequest(jokeID)
  }, [getCommentsHttpRequest, jokeID])

  if(getCommentsStatus === 'pending') {
    return <div className="centered">
       <Loader />
    </div>
 }

 console.log(loadedComments)

 let content = <p>Comments is not found</p>;

 if(getCommentsError) {
   content = <p className="centered focused" style={{color: '#000'}}>
     {getCommentsError}
  </p>
}


if (loadedComments && loadedComments.length > 0) {
   content = <CommentsList comments={loadedComments} />
}

  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={onAddCommentHandler}/>}
      {content}
    </section>
  );
};

export default Comments;
