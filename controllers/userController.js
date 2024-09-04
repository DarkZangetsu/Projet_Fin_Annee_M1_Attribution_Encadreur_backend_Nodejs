const { supabase } = require('../supabaseClient');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const { data, error } = await supabase.from('Utilisateur').insert({ email, mot_de_passe: password, role });
    if (error) throw error;
    
    // Générer un token JWT après l'inscription réussie
    const token = jwt.sign({ id: data[0].id_utilisateur, email: data[0].email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ user: data[0], token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase
      .from('Utilisateur')
      .select('*')
      .match({ email, mot_de_passe: password })
      .single();
    if (error) throw error;
    if (!data) return res.status(401).json({ message: 'Invalid credentials' });
    
    // Générer un token JWT
    const token = jwt.sign({ id: data.id_utilisateur, email: data.email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ user: data, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { user } = req;
    const { data, error } = await supabase.from('Utilisateur').select('*').match({ id_utilisateur: user.id_utilisateur }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};