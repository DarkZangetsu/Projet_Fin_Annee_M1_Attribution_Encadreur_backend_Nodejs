const { supabase } = require('../supabaseClient');

exports.getEnseignants = async (req, res) => {
  try {
    const { data, error } = await supabase.from('enseignant').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getEnseignant = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('enseignant').select('*').match({ id_enseignant: id }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createEnseignant = async (req, res) => {
  console.log('Données reçues pour création:', req.body);
  try {
    const { nom, prenom, statut, specialite, id_utilisateur } = req.body;
    
    if (!nom || !prenom || !statut || !id_utilisateur) {
      console.log('Validation échouée:', req.body);
      return res.status(400).json({ message: 'Tous les champs doivent être remplis' });
    }
    
    const { data, error } = await supabase.from('enseignant').insert([{ nom, prenom, statut, specialite, id_utilisateur }]).single();
    
    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(400).json({ message: 'Erreur lors de l\'insertion des données', details: error.message });
    }
    
    res.status(201).json(data);
  } catch (err) {
    console.error('Erreur lors de la création:', err);
    res.status(400).json({ message: 'Erreur lors de la création de l\'enseignant', details: err.message });
  }
};


exports.updateEnseignant = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ message: "L'ID de l'enseignant est manquant" });
    }

    // Vérification des données envoyées dans le body
    const { nom, prenom, statut, specialite, id_utilisateur } = req.body;

    if (!nom || !prenom || !statut || !specialite || !id_utilisateur) {
      return res.status(400).json({ message: 'Toutes les informations doivent être fournies' });
    }

    const { data, error } = await supabase
      .from('enseignant')
      .update({ nom, prenom, statut, specialite, id_utilisateur })
      .match({ id_enseignant: id }); 

    if (error) throw error;
    
    // Vérification si la mise à jour a affecté une ligne
    if (data.length === 0) {
      return res.status(404).json({ message: "Enseignant non trouvé" });
    }

    res.status(200).json(data[0]); 
  } catch (err) {
    console.error(err.message); 
    res.status(400).json({ message: err.message });
  }
};


exports.deleteEnseignant = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'L\'ID de l\'enseignant est manquant' });
    }
    const { data, error } = await supabase.from('enseignant').delete().match({ id_enseignant: id });
    if (error) throw error;
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};