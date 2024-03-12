import { createStore } from 'vuex'
export default createStore({
  state: {
    todoData: {}
  },
  mutations: {
    updateTodoData(state, newData) {
      state.todoData = newData
    }
  },
  actions: {
    generateId() {
      return Math.random().toString(36).substring(2, 12)
    },
    getCurrentDateTime() {
      const now = new Date()
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      return `${day}/${month}-${year} ${hours}:${minutes}:${seconds}`
    },
    initializeStoreFromLocalStorage({ commit }) {
      const currentData = JSON.parse(localStorage.getItem('todo-data')) || { lists: [] }
      commit('updateTodoData', currentData)
    },
    createTask({ dispatch, commit }, { taskTitle, listId }) {
      let currentData = JSON.parse(localStorage.getItem('todo-data')) || { lists: [] }
      const listIndex = currentData.lists.findIndex(list => list.id === listId)
      if (listIndex === -1) {
        console.log('List not found.')
        return
      }
      dispatch('generateId').then(taskId => {
        dispatch('getCurrentDateTime').then(currentDateTime => {
          const taskToCreate = {
            createdAt: currentDateTime,
            id: taskId,
            title: taskTitle,
            subTitle: '',
            description: '',
            priority: '',
            completed: false,
            subTasks: []
          }
          currentData.lists[listIndex].tasks.push(taskToCreate)
          localStorage.setItem('todo-data', JSON.stringify(currentData))
          commit('updateTodoData', currentData)
        })
      })
    },
    updateTask({ commit }, { taskId, listId, newTask }) {
      let currentData = JSON.parse(localStorage.getItem('todo-data')) || { lists: [] };
      const listIndex = currentData.lists.findIndex(list => list.id === listId);
      if (listIndex === -1) {
        console.error('List not found.');
        return;
      }
      const taskIndex = currentData.lists[listIndex].tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) {
        console.error('Task not found.')
        return;
      }

      currentData.lists[listIndex].tasks[taskIndex] = newTask
      localStorage.setItem('todo-data', JSON.stringify(currentData))
      commit('updateTodoData', currentData)
    },
    
    deleteTask({ commit, dispatch}, { listId, taskId }) {
      let currentData = JSON.parse(localStorage.getItem('todo-data')) || { lists: [] }
      const listIndex = currentData.lists.findIndex(list => list.id === listId)
      if (listIndex === -1) {
        console.error('List not found.');
        return
      }
      const taskIndex = currentData.lists[listIndex].tasks.findIndex(task => task.id === taskId)
      if (taskIndex === -1) {
        console.error('Task not found.')
        return
      }
      const isConfirmed = window.confirm('This action will remove the task permanently. Are you sure you want to delete this task?')
      if (!isConfirmed) {
        return
      }
      currentData.lists[listIndex].tasks.splice(taskIndex, 1)
      localStorage.setItem('todo-data', JSON.stringify(currentData))
      commit('updateTodoData', currentData)
    },
    
    // creates a new list with an empty array of tasks and an auto generated id.
    createList({ commit, dispatch }, { listTitle }){
      let currentData = JSON.parse(localStorage.getItem('todo-data')) || { lists: [] }
      const id = dispatch('generateId')
      dispatch('generateId').then(listId => {
        const listToCreate = {
          id: listId,
          title: listTitle,
          tasks: []
        }
        currentData.lists.push(listToCreate)
        localStorage.setItem('todo-data', JSON.stringify(currentData))
        commit('updateTodoData', currentData)
      })
    },

    // deletes a list based on its id, this action will also update the local storage and run the mutation to update the state
    deleteList({ commit }, { listId }){
      let currentData = JSON.parse(localStorage.getItem('todo-data')) || { lists: [] }
      const listIndex = currentData.lists.findIndex(list => list.id === listId)
      if (listIndex === -1) {
        console.error('List not found.');
        return
      }
      const isConfirmed = window.confirm('This action will remove the list and all nested tasks permanently. Are you sure you want to delete this list?')
      if (!isConfirmed) {
        return
      }
      currentData.lists.splice(listIndex, 1)
      localStorage.setItem('todo-data', JSON.stringify(currentData))
      commit('updateTodoData', currentData)
    }
  }
})
