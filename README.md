# Todo Application

This is a simple todo application built with Vue.js and Vuex for state management.

## Prerequisites

- Node.js and npm installed on your computer.

## Getting Started

To launch the application on your computer, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/benzokolstrup/todo.git

## Open project

1. Navigate to the project directory:
    ```bash
    cd todo

2. Install dependencies:
    ```bash
    npm install

3. Start the development server:
    ```bash
    npm run serve

4. Open your web browser:
    ```bash
    Visit http://localhost:8080 to view the application.


## How to use todo app
1. Create one or more todo lists:
    ```bash
    You can do so by clicking on the input in the top right corner and type your new todo list name follow by pressing "Enter" or clicking the "Add list" button. This list can be deleted, and will delete all tasks with it

2. Add tasks to your list:
    ```bash
    Each todo list will have an input field where you can type the title of your new task, add the task to the list by pressing "Enter" or clicking the "Add task" button. This tasks can from the list be deleted or completed.

3. Edit task title in the task overview:
    ```bash
    When clicking on a task you will open the overview. Here you can change the title by clicking the name at the top, enter your new desired name and then remove focus from the input.
    
4. Add task priority in the task overview:
    ```bash
    There is a dropdown below the title to the right where you can chose between "low", "medium" and "high" priority. This will be shown on the task as a label.

5. Add description:
    ```bash
    Further below there is a textarea with the name "Description". Here you can write a detailed description about the task

6. Add subtasks:
    ```bash
    At the bottom of the task overview, you will have an input where you can type the title of a subtask, then you can add it to the list of subtasks by pressing "Enter" or clicking the "Add subtask" button. These tasks can be used as a checklist, and can be deleted requiringly
