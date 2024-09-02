const { supabase } = require('../server');

exports.getEtudiants = async (req, res) => {
  try {
    const { data, error } = await supabase.from('Etudiant').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('Etudiant').select('*').match({ id_etudiant: id }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createEtudiant = async (req, res) => {
  try {
    const { nom, prenom, id_niveau, annee_academique, matricule, id_utilisateur } = req.body;
    const { data, error } = await supabase.from('Etudiant').insert({ nom, prenom, id_niveau, annee_academique, matricule, id_utilisateur });
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, id_niveau, annee_academique, matricule, id_utilisateur } = req.body;
    const { data, error } = await supabase.from('Etudiant').update({ nom, prenom, id_niveau, annee_academique, matricule, id_utilisateur }).match({ id_etudiant: id });
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('Etudiant').delete().match({ id_etudiant: id });
    if (error) throw error;
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};