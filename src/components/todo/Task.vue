<template>
  <div :class="['task-container', { 'completed-task': task.completed }]">
    <p
      :class="[
        'prio',
        {
          low: task.priority === 'Low',
          medium: task.priority === 'Medium',
          high: task.priority === 'High',
        },
      ]"
      v-if="task.priority !== ''"
    >
      {{ task.priority }}
    </p>
    <div class="task-title">{{ task.title }}</div>
    <div
      class="task-action-btn complete-task"
      @click="updateTask({ completed: true })"
    >
      V
    </div>
    <div class="task-action-btn delete-task" @click="deleteTask">X</div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object,
    task: Object,
  },
  computed: {
    subTaskCount() {
      return this.task.subTasks.length;
    },
  },
  methods: {
    updateTask(changes) {
      const updatedTask = { ...this.task, ...changes };
      this.$store.dispatch("updateTask", {
        newTask: updatedTask,
        taskId: this.task.id,
        listId: this.list.id,
      });
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", {
        taskId: this.task.id,
        listId: this.list.id,
      });
    },
  },
};
</script>

<style>
.task-container {
  background-color: #444;
  border-radius: 5px;
  padding: 0.5em;
  color: #fefefe;
  margin-bottom: 0.5em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  min-height: 32px;
}
.task-container:last-child {
  margin-bottom: 0;
}
.task-container:hover .delete-task {
  right: 5px;
}
.task-container:hover .complete-task {
  right: 35px;
}
.task-title {
  overflow-wrap: break-word;
  font-weight: 100;
  font-size: 14px;
}
.task-count {
  font-size: 14px;
}
.task-action-btn {
  position: absolute;
  width: 22px;
  height: 22px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transition: 200ms;
  cursor: pointer;
  font-size: 12px;
  font-weight: 900;
}
.delete-task {
  right: -60px;
  background-color: #d53939;
}
.complete-task {
  right: -30px;
  background-color: #2cc348;
}
.complete-task:hover,
.delete-task:hover {
  filter: brightness(120%);
}
.completed-task {
  text-decoration: line-through;
  opacity: 0.5;
}
.completed-task .complete-task {
  display: none;
}
.prio {
  font-size: 12px;
  padding: 0.125em 0.5em;
  display: inline-block;
  border-radius: 3px;
  margin-bottom: 0.5em;
}
.prio.low {
  background-color: #32a111;
}
.prio.medium {
  background-color: #c3b900;
}
.prio.high {
  background-color: #ce2d21;
}
</style>
