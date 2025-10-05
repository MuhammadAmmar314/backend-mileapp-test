import { Router } from 'express';
import { users } from '../utils/mockUsers.js';

const router = Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        return res.json({ token: user.token, user: {id: user.id, username: user.username} });
    }

    res.status(401).json({ message: 'Invalid credentials'} );
});

export default router;