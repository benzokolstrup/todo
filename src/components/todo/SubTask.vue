<template>
  <div :class="['task-container', { 'completed-task': task.completed }]">
    <div class="task-title">{{ task.title }}</div>
    <div class="task-action-btn complete-task" @click="updateTask({ completed: true })">V</div>
    <div class="task-action-btn delete-task" @click="deleteTask">X</div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  },
  methods: {
    updateTask(changes) {
      const updatedTask = { ...this.task, ...changes };
      this.$store.dispatch('updateTask', { newTask: updatedTask, taskId: this.task.id, listId: this.list.id });
    },
    deleteTask() {
      this.$store.dispatch('deleteTask', { taskId: this.task.id, listId: this.list.id })
    }
  }
}
</script>

<style>

</style>