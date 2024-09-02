const { supabase } = require('../server');

exports.getNiveaux = async (req, res) => {
  try {
    const { data, error } = await supabase.from('Niveau').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getNiveau = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('Niveau').select('*').match({ id_niveau: id }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createNiveau = async (req, res) => {
  try {
    const { codeNiveau, libelle, tailleGroupe } = req.body;
    const { data, error } = await supabase.from('Niveau').insert({ code_niveau: codeNiveau, libelle, taille_groupe: tailleGroupe });
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateNiveau = async (req, res) => {
  try {
    const { id } = req.params;
    const { codeNiveau, libelle, tailleGroupe } = req.body;
    const { data, error } = await supabase.from('Niveau').update({ code_niveau: codeNiveau, libelle, taille_groupe: tailleGroupe }).match({ id_niveau: id });
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteNiveau = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('Niveau').delete().match({ id_niveau: id });
    if (error) throw error;
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};