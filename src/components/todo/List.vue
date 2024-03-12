<template>
  <div class="list-container">
    <div class="list-content">
      <div class="list-header">
        <div>
          <h3 class="list-title">{{ list.title }}</h3>
          <span class="task-count">{{ taskCount }} / 20</span>
        </div>
        <div class="delete-list" @click="deleteList">X</div>
      </div>
      <div class="task-wrapper" v-if="taskCount > 0">
        <Task
          v-for="task in list.tasks"
          :key="task.id"
          :task="task"
          :list="list"
          @click="showTaskOverview(task, list, false)"
        />
      </div>
      <div class="add-task-container">
        <form @submit="addNewTask">
          <input
            v-model="taskTitle"
            type="text"
            placeholder="Enter title for this task..."
          />
          <button>Add task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task.vue";
import TaskOverview from "./TaskOverview.vue";

export default {
  components: {
    Task,
    TaskOverview,
  },
  props: {
    list: Object,
  },
  data() {
    return {
      showNewTaskForm: false,
      taskTitle: "",
      selectedTask: null,
    };
  },
  computed: {
    taskCount() {
      return this.list.tasks.length;
    },
  },
  methods: {
    addNewTask(e) {
      e.preventDefault();
      if (this.taskCount >= 20) return;
      if (this.taskTitle === "") return;
      this.$store.dispatch("createTask", {
        taskTitle: this.taskTitle,
        listId: this.list.id,
      });
      this.taskTitle = "";
    },
    deleteList() {
      this.$store.dispatch("deleteList", { listId: this.list.id });
    },
    showTaskOverview(task, list) {
      this.$emit("task-clicked", task, list);
    },
  },
};
</script>

<style>
.list-container {
  width: 250px;
  margin-left: 0.75em;
  flex: 0 0 auto;
}
.list-content {
  width: 100%;
  background-color: #222;
  border-radius: 10px;
  padding: 0.5em;
  color: #fefefe;
}
.list-content:first-child {
  margin: 0;
}
.list-header {
  position: relative;
  margin-bottom: 0.5em;
}
.list-title {
  font-weight: 100;
  font-size: 16px;
  max-width: 80%;
}
.task-count {
  font-size: 12px;
}
.task-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5em;
}
.add-task-container input {
  padding: 0.5em;
  font-size: 14px;
  border-radius: 5px 0px 0px 5px;
  border: none;
  width: 70%;
  background-color: #fefefe;
}
.add-task-container button {
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
.delete-list {
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  font-size: 12px;
  background-color: #444;
  padding: 0.25em;
  border-radius: 3px;
  cursor: pointer;
}
</style>
