const express = require('express');
//const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3001;

// Initialisez le client Supabase
//const supabase = createClient('VOTRE_URL_SUPABASE', 'VOTRE_CLE_API_SUPABASE');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur Express en marche!');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});