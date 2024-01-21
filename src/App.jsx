import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAll, update } from "./requests";
import { useContext } from "react";
import MessageContext from "./components/MessageContext";

const App = () => {
  const queryClient = useQueryClient();
  const [message, dispatch] = useContext(MessageContext);

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((a) => (a.id !== newAnecdote.id ? a : newAnecdote))
      );
    },
  });

/**
 * Handles voting for an anecdote by updating the number of votes.
 * @param {object} anecdote - The anecdote to be voted on.
 */
const handleVote = (anecdote) => {
  // Update the number of votes for the anecdote
  updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  dispatch({
    type: "SUCCESS",
    payload: `you voted for "${anecdote.content}"`,
  })
  setTimeout(() => {
    dispatch({ type: "RESET" });
  }, 5000)
};

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: false
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    console.log("error", result.error)
    dispatch({
      type: "ERROR",
      payload: "anecdote service not available due to problems in server",
    });
    return (
      <Notification />
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
