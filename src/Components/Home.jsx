import React, { useEffect, useState } from 'react';
import Task from './Task';

const Home = () => {
	const [tasks, setTasks] = useState(
		localStorage.getItem('tasks')
			? JSON.parse(localStorage.getItem('tasks'))
			: []
	);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();

		setTasks([
			...tasks,
			{
				title,
				description,
			},
		]);
		setTitle('');
		setDescription('');
	};

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const deleteTask = (index) => {
		const filteredArr = tasks.filter((val, i) => {
			return i !== index;
		});
		setTasks(filteredArr);
	};

	return (
		<div className='container'>
			<h1>DAILY GOALS</h1>
			<form onSubmit={submitHandler}>
				<input
					type='text'
					placeholder='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder='Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<button type='submit'>Submit</button>
			</form>
			<h1>To-Do List</h1>
			{tasks.map((item, index) => (
				<Task
					key={index}
					title={item.title}
					description={item.description}
					deleteTask={deleteTask}
					index={index}
				/>
			))}
		</div>
	);
};

export default Home;
