const { supabase } = require('../supabaseClient');

exports.getMembreGroupes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('membregroupe')
      .select(`
        *
      `);
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMembreGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('membregroupe')
      .select(`
        *
      `)
      .eq('id_membre_groupe', id)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Membre de groupe non trouvé' });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMembreGroupe = async (req, res) => {
  try {
    const { id_groupe, id_etudiant } = req.body;
    
    const { data: existingMembership, error: existingError } = await supabase
      .from('membregroupe')
      .select('id_membre_groupe')
      .eq('id_etudiant', id_etudiant)
      .single();
    
    if (existingError && existingError.code !== 'PGRST116') throw existingError;
    if (existingMembership) {
      return res.status(400).json({ message: "L'étudiant est déjà membre d'un groupe" });
    }

    const { data, error } = await supabase
      .from('membregroupe')
      .insert({ id_groupe, id_etudiant })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMembreGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_groupe, id_etudiant } = req.body;
    const { data, error } = await supabase
      .from('membregroupe')
      .update({ id_groupe, id_etudiant })
      .eq('id_membre_groupe', id)
      .select()
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Membre de groupe non trouvé' });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMembreGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('membregroupe')
      .delete()
      .eq('id_membre_groupe', id)
      .select()
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Membre de groupe non trouvé' });
    res.status(200).json({ message: 'Membre de groupe supprimé avec succès', data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};