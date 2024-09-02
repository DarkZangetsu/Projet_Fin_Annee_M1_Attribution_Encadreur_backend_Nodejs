const { supabase } = require('../server');

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const { data, error } = await supabase.from('Utilisateur').insert({ email, mot_de_passe: password, role });
    if (error) throw error;
    res.status(201).json(data[0]);
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
    res.status(200).json(data);
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