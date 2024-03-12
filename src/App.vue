
<template>
  <div class="list-wrapper">
    <List v-for="list in todoLists" :key="list.id" :list="list" @task-clicked="showTaskOverview" />
    <TaskOverview v-if="selectedTask" :task="selectedTask" :list="selectedList" />
    <div class="list-container">
      <div class="list-content">
        <div class="add-list-container">
          <form @submit="createList">
            <input v-model="listTitle" type="text" placeholder="Enter todo list title...">
            <button>Add list</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="overlay" v-if="selectedTask" @click="hideTaskOverview"></div>
</template>

<script>
import List from './components/todo/List.vue'
import TaskOverview from './components/todo/TaskOverview.vue'

export default {
  name: 'App',
  components: {
    List,
    TaskOverview
  },
  created() {
    this.$store.dispatch('initializeStoreFromLocalStorage')
  },
  data() {
    return {
      selectedList: null,
      selectedTask: null,
      listTitle: ''
    };
  },
  methods: {
    createList(e){
      e.preventDefault()
      if(this.listTitle === '') return
      this.$store.dispatch('createList', { listTitle: this.listTitle })
      this.listTitle = ''
    },
    showTaskOverview(task, list) {
      if(task.completed === true) return
      this.selectedTask = task
      this.selectedList = list
    },
    hideTaskOverview(){
      this.selectedTask = null
      this.selectedList = null
    }
  },
  computed: {
    todoLists() {
      return this.$store.state.todoData.lists
    }
  }
}
</script>

<style>
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.list-wrapper{
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  padding: .75em;
  height: 100vh;
  background: linear-gradient(140deg, rgb(106, 106, 106) 0%, rgba(34,34,34,1) 100%);
}
.add-list-container input{
  padding: 0.5em;
  font-size: 14px;
  border-radius: 5px 0px 0px 5px;
  border: none;
  width: 70%;
  background-color: #fefefe;
}
.add-list-container button{
  padding: 0.5em;
  font-size: 14px;
  border-radius: 0px 5px 5px 0px;
  border: none;
  outline: none;
  width: 30%;
  cursor: pointer;
  background-color: #444;
  color: #fefefe;
}
.overlay{
  background-color: #000;
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: .5;
}
</style>