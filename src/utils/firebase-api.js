const FIREBASE_ROOT_DOMAIN = import.meta.env.VITE_FIREBASE_ROOT_DOMAIN;

export async function getJokes() {
  const response = await fetch(`${FIREBASE_ROOT_DOMAIN}/jokesRoute.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Jokes fetching error.");
  }

  const convertedJokes = [];

  for (const key in data) {
    const joke = {
      id: key,
      ...data[key],
    };

    convertedJokes.push(joke);
  }

  return convertedJokes;
}

export async function getJoke(jokeId) {
  const response = await fetch(
    `${FIREBASE_ROOT_DOMAIN}/jokesRoute/${jokeId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Joke fetching error.");
  }

  const convertedJoke = {
    id: jokeId,
    ...data,
  };

  return convertedJoke;
}

export async function addJoke(jokeData) {
  const response = await fetch(`${FIREBASE_ROOT_DOMAIN}/jokesRoute.json`, {
    method: "POST",
    body: JSON.stringify(jokeData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Joke adding error.");
  }
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_ROOT_DOMAIN}/comments/${requestData.jokeId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.text || "Comment adding error.");
  }

  return { commentId: data.username };
}

export async function getComments(jokeId) {
  const response = await fetch(
    `${FIREBASE_ROOT_DOMAIN}/comments/${jokeId}.json`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Comments fetching error.");
  }

  const convertedComments = [];

  for (const key in data) {
    const comment = {
      id: key,
      text: data[key],
    };

    convertedComments.push(comment);
  }

  return convertedComments;
}
