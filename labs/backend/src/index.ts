import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

const app = express();
const PORT = 3000;

// Only accept requests from the front-end dev server (and tools like Postman send no Origin header, so they pass through)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4200'] // adjust to your front-end port
}));
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/roles', roleRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});