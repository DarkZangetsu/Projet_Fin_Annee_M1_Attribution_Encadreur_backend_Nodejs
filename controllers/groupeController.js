const { supabase } = require('../supabaseClient');

exports.getGroupes = async (req, res) => {
  try {
    const { data, error } = await supabase.from('Groupe').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('Groupe').select('*').match({ id_groupe: id }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createGroupe = async (req, res) => {
  try {
    const { id_niveau, annee_academique } = req.body;
    const { data, error } = await supabase.from('Groupe').insert({ id_niveau, annee_academique });
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_niveau, annee_academique } = req.body;
    const { data, error } = await supabase.from('Groupe').update({ id_niveau, annee_academique }).match({ id_groupe: id });
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('Groupe').delete().match({ id_groupe: id });
    if (error) throw error;
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};