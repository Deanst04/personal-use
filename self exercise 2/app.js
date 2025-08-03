"use strict";

(() => {

  const todos = [
  { id: 1, userId: 1, title: "Do homework", completed: true },
  { id: 2, userId: 1, title: "Clean room", completed: false },
  { id: 3, userId: 2, title: "Buy groceries", completed: true },
  { id: 4, userId: 2, title: "Go to gym", completed: false },
  { id: 5, userId: 2, title: "Read book", completed: false },
  { id: 6, userId: 3, title: "Write report", completed: true },
    ]

    const generateTodosSummary = todos => {
       const todosReduce = todos.reduce((acc, {userId, completed}) => {
        const current = [...acc]
        const currentUserId = current.find(user => user.userId === userId)
        if (currentUserId) {
            currentUserId.completedTodos += completed ? 1 : 0
            currentUserId.openTodos += completed ? 0 : 1
        } else {
            current.push({
                userId,
                completedTodos: completed ? 1 : 0,
                openTodos: completed ? 0 : 1,
            })
        }
        return current
       }, [])
       console.log(todosReduce)
    }

    generateTodosSummary(todos)
})()

// output: 
// [
//   {
//     userId: 1,
//     completedTodos: 1,
//     openTodos: 1
//   },
//   {
//     userId: 2,
//     completedTodos: 1,
//     openTodos: 2
//   },
//   {
//     userId: 3,
//     completedTodos: 1,
//     openTodos: 0
//   }
// ]
