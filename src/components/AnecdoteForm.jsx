import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../requests";
import { useContext } from "react";
import MessageContext from "./MessageContext";

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [message, dispatch] = useContext(MessageContext)

  const newMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: () => {
      dispatch({
        type: "ERROR",
        payload: "Post must be longer than 5 characters",
      })
      setTimeout(() => {
        dispatch({ type: "RESET" })
      }, 5000)
    }
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
