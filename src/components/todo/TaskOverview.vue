<template>
  <div class="task-overview">
    <div class="task-overview-hide" @click="hideTaskOverview">X</div>
    <div class="task-section">
      <textarea
        class="task-editable-title task-textarea"
        v-model="textareaTaskTitle"
        @blur="updateTask({ title: textareaTaskTitle })"
      ></textarea>
      <div class="task-subtitle-container">
        <p>
          In the list <span>{{ list.title }}</span>
        </p>
        <select
          class="task-priority"
          v-model="selectedPriority"
          @change="updateTask({ priority: selectedPriority })"
        >
          <option value="" selected disabled>Select a priority</option>
          <option value="Low" :selected="task.priority === 'low'">Low</option>
          <option value="Medium" :selected="task.priority === 'medium'">
            Medium
          </option>
          <option value="High" :selected="task.priority === 'high'">
            High
          </option>
        </select>
      </div>
    </div>

    <div class="task-section">
      <h4 class="task-description-title">Description</h4>
      <textarea
        class="task-editable-description task-textarea"
        v-model="textareaTaskDescription"
        @input="updateTask({ description: textareaTaskDescription })"
      ></textarea>
    </div>
    <div class="add-task-container">
      <form @submit="handSubtaskCreate">
        <input
          v-model="subTaskTitle"
          type="text"
          placeholder="Enter title for this subtask..."
        />
        <button>Add subtask</button>
      </form>
    </div>
    <SubTask
      v-for="subTask in task.subTasks"
      :key="subTask.id"
      :task="subTask"
      :list="list"
      :computedTask="computedSelectedTask"
    />
  </div>
</template>

<script>
import SubTask from "./SubTask.vue";
export default {
  components: {
    SubTask,
  },
  props: {
    list: Object,
    task: Object,
  },
  computed: {
    computedSelectedTask() {
      return this.$store.getters.getTaskById(this.task.id);
    },
  },
  data() {
    return {
      selectedPriority: this.task.priority,
      textareaTaskTitle: this.task.title,
      textareaTaskDescription: this.task.description,
      subTaskTitle: "",
    };
  },
  methods: {
    hideTaskOverview() {
      this.$emit("hide-task-overview");
    },
    handSubtaskCreate(e) {
      e.preventDefault();
      if (this.subTaskTitle === "") return;
      const subTaskTitle = this.subTaskTitle;
      this.$store.dispatch("generateId").then((taskId) => {
        const newSubTask = {
          id: taskId,
          title: subTaskTitle,
          completed: false,
        };
        this.updateTask({
          subtasks: this.computedSelectedTask.subTasks.unshift(newSubTask),
        });
      });
      this.subTaskTitle = "";
    },
    handlePrioChange(e) {
      const selectedPriority = e.target.value;
      this.updateTask({ priority: selectedPriority });
    },
    updateTask(changes) {
      const updatedTask = { ...this.computedSelectedTask, ...changes };
      this.$store.dispatch("updateTask", {
        newTask: updatedTask,
        taskId: this.task.id,
        listId: this.list.id,
      });
    },
  },
};
</script>

<style>
.task-overview {
  position: absolute;
  z-index: 3;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  min-width: 50%;
  background-color: #222;
  padding: 1em;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.task-section {
  margin-bottom: 1em;
}
.task-overview .add-task-container {
  margin-bottom: 0.5em;
}
.task-subtitle-container {
  color: #fefefe;
  display: flex;
  justify-content: space-between;
}
.task-subtitle-container p {
  font-size: 14px;
  font-weight: 100;
}
.task-subtitle-container span {
  text-decoration: underline;
}
.task-priority {
  border: none;
  background: #555;
  color: #fefefe;
  border-radius: 3px;
  padding: 0.25em;
}
.task-textarea {
  background-color: #555;
  color: #fefefe;
  box-shadow: none;
  border: none;
  width: 100%;
  border-radius: 4px;
  padding: 6px 10px;
}
.task-editable-title {
  overflow: hidden;
  overflow-wrap: break-word;
  height: 36px;
  font-size: 20px;
  font-weight: 600;
  resize: none;
}
.task-description-title {
  color: #fefefe;
  margin-bottom: 0.5em;
}
.task-editable-description {
  resize: vertical;
  min-height: 150px;
  max-height: 300px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}
.task-overview-hide {
  color: #fefefe;
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -17px;
  top: -17px;
  font-size: 14px;
  background-color: #555;
  padding: 0.25em;
  border-radius: 4px;
  cursor: pointer;
}
</style>
