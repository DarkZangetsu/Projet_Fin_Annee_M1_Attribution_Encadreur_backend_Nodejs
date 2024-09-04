const { supabase } = require('../supabaseClient');

exports.getEtudiants = async (req, res) => {
  try {
    const { data, error } = await supabase.from('Etudiant').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('Etudiant')
      .select('*')
      .eq('id_etudiant', id)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Etudiant non trouvé' });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEtudiant = async (req, res) => {
  try {
    const { matricule, nom, prenom, id_niveau, annee_academique, id_utilisateur } = req.body;
    const { data, error } = await supabase
      .from('Etudiant')
      .insert({ matricule, nom, prenom, id_niveau, annee_academique, id_utilisateur })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const { matricule, nom, prenom, id_niveau, annee_academique, id_utilisateur } = req.body;
    const { data, error } = await supabase
      .from('Etudiant')
      .update({ matricule, nom, prenom, id_niveau, annee_academique, id_utilisateur })
      .eq('id_etudiant', id)
      .select()
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Etudiant non trouvé' });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('Etudiant')
      .delete()
      .eq('id_etudiant', id)
      .select()
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Etudiant non trouvé' });
    res.status(200).json({ message: 'Etudiant supprimé avec succès', data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};