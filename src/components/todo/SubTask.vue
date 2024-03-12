<template>
  <div :class="['task-container', { 'completed-task': task.completed }]">
    <div class="task-title">{{ task.title }}</div>
    <!-- <div class="task-action-btn complete-task">V</div> -->
    <div class="task-action-btn delete-task" @click="deleteSubTask">X</div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
    computedTask: Object,
  },
  methods: {
    deleteSubTask() {
      this.$store.dispatch("deleteSubTask", {
        taskId: this.computedTask.id,
        subTaskId: this.task.id,
      });
    },
  },
};
</script>
