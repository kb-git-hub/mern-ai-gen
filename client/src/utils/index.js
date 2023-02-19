import { surpriseMePrompts } from "../constants"

export const getRandomPrompt = (prompt) => {
  const randNum = Math.floor(Math.random() * surpriseMePrompts.length)
  const randPrompt = surpriseMePrompts[randNum]
  // ensure prompt isn't called twice
  if (randPrompt === prompt) return getRandomPrompt(prompt)
  return randPrompt
}
