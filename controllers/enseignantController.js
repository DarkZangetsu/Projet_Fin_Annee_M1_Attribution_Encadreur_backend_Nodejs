const { supabase } = require('../supabaseClient');

exports.getEnseignants = async (req, res) => {
  try {
    const { data, error } = await supabase.from('Enseignant').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getEnseignant = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('Enseignant').select('*').match({ id_enseignant: id }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createEnseignant = async (req, res) => {
  try {
    const { nom, prenom, statut, specialite, id_utilisateur } = req.body;
    const { data, error } = await supabase.from('Enseignant').insert({ nom, prenom, statut, specialite, id_utilisateur });
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEnseignant = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, statut, specialite, id_utilisateur } = req.body;
    const { data, error } = await supabase.from('Enseignant').update({ nom, prenom, statut, specialite, id_utilisateur }).match({ id_enseignant: id });
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEnseignant = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('Enseignant').delete().match({ id_enseignant: id });
    if (error) throw error;
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};