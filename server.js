const express = require('express');
const app = express();
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(express.json());

// Import les routes
const userRoutes = require('./routes/userRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');
const enseignantRoutes = require('./routes/enseignantRoutes');
const niveauRoutes = require('./routes/niveauRoutes');
const groupeRoutes = require('./routes/groupeRoutes');
const encadrementRoutes = require('./routes/encadrementRoutes');
const membreGroupeRoutes = require('./routes/membreGroupeRoutes');

// Utilise les routes
app.use('/api/users', userRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/enseignants', enseignantRoutes);
app.use('/api/niveaux', niveauRoutes);
app.use('/api/groupes', groupeRoutes);
app.use('/api/encadrements', encadrementRoutes);
app.use('/api/membres-groupe', membreGroupeRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});