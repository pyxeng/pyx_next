import Head from 'next/head';
    import styles from '../styles/Home.module.css';
    import { useState, useEffect } from 'react';

    const initialTodos = [
      { id: 1, text: 'Learn Next.js', completed: false },
      { id: 2, text: 'Build a Todo App', completed: false },
      { id: 3, text: 'Deploy the App', completed: false },
    ];

    export default function Home() {
      const [todos, setTodos] = useState(initialTodos);
      const [newTodo, setNewTodo] = useState('');

      useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (newTodo.trim() !== '') {
          const newTodoItem = {
            id: Date.now(),
            text: newTodo,
            completed: false,
          };
          setTodos([...todos, newTodoItem]);
          setNewTodo('');
        }
      };

      const toggleTodo = (id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };

      const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      };

      return (
        <div className={styles.container}>
          <Head>
            <title>Next.js Todo App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>
              My Todo List
            </h1>

            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Add a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button className={styles.addButton} onClick={addTodo}>Add</button>
            </div>

            <ul className={styles.todoList}>
              {todos.map((todo) => (
                <li key={todo.id} className={styles.todoItem}>
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    className={todo.completed ? styles.completed : ''}
                  >
                    {todo.text}
                  </span>
                  <button className={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </main>
        </div>
      );
    }
