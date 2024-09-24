const { supabase } = require('../supabaseClient');

exports.getGroupes = async (req, res) => {
  try {
    const { data, error } = await supabase.from('groupe').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('groupe').select('*').match({ id_groupe: id }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createGroupe = async (req, res) => {
  try {
    console.log(req.body);
    const {nom_groupe, id_niveau, annee_academique } = req.body;
    const { data, error } = await supabase.from('groupe').insert({ nom_groupe, annee_academique, id_niveau });
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const {nom_groupe, id_niveau, annee_academique } = req.body;
    const { data, error } = await supabase.from('groupe').update({ nom_groupe, annee_academique, id_niveau }).match({ id_groupe: id });
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('groupe').delete().match({ id_groupe: id });
    if (error) throw error;
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};