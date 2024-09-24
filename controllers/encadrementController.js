const { supabase } = require('../supabaseClient');

exports.getEncadrements = async (req, res) => {
  try {
    const { data, error } = await supabase.from('encadrement').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getEncadrement = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('encadrement').select('*').match({ id_encadrement: id }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createEncadrement = async (req, res) => {
  try {
    const { id_groupe, id_enseignant, annee_academique } = req.body;
    const { data, error } = await supabase.from('encadrement').insert({ id_groupe, id_enseignant, annee_academique });
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEncadrement = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_groupe, id_enseignant, annee_academique } = req.body;
    const { data, error } = await supabase.from('encadrement').update({ id_groupe, id_enseignant, annee_academique }).match({ id_encadrement: id });
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEncadrement = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('encadrement').delete().match({ id_encadrement: id });
    if (error) throw error;
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};