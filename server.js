const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());

// Import les routes
const authMiddleware = require('./authMiddleware');
const userRoutes = require('./routes/userRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');
const enseignantRoutes = require('./routes/enseignantRoutes');
const niveauRoutes = require('./routes/niveauRoutes');
const groupeRoutes = require('./routes/groupeRoutes');
const encadrementRoutes = require('./routes/encadrementRoutes');
const membreGroupeRoutes = require('./routes/membreGroupeRoutes');

// Les routes
app.use('/api/users', userRoutes);
app.use('/api/etudiants', authMiddleware, etudiantRoutes);
app.use('/api/enseignants', authMiddleware, enseignantRoutes);
app.use('/api/niveaux', authMiddleware, niveauRoutes);
app.use('/api/groupes', authMiddleware, groupeRoutes);
app.use('/api/encadrements', authMiddleware, encadrementRoutes);
app.use('/api/membres-groupe', authMiddleware, membreGroupeRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});