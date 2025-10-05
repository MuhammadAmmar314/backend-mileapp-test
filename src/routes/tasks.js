import express from 'express';
import { tasks } from '../utils/mockData.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    let { page = 1, limit = 10, sort = "id", order = "asc", search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filtered = tasks.filter(task => 
        task.user_id === req.user.id && 
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort( (a, b) => {
        if (order === "asc") return a[sort] > b[sort] ? 1 : -1;
        return a[sort] < b[sort] ? 1 : -1;
    });

    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    res.json({
        data: paged,
        meta: {
            total: filtered.length,
            page,
            limit
        }
    });
});

router.post("/", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        ...req.body,
        user_id: req.user.id
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ message: "Task not found" });

    if (tasks[index].user_id !== req.user.id) return res.status(403).json({ message: "Forbidden: not your task" });

    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ message: "Task not found" });

    if (tasks[index].user_id !== req.user.id) return res.status(403).json({ message: "Forbidden: not your task" });

    tasks.splice(index, 1);
    res.json({ message: "Task deleted" });
});

export default router;