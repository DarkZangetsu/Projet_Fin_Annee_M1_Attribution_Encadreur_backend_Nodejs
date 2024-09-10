const { supabase } = require('../supabaseClient');

exports.getEtudiants = async (req, res) => {
  try {
    const { data, error } = await supabase.from('etudiant').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('etudiant')
      .select('*')
      .eq('id_etudiant', id)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Étudiant non trouvé' });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createEtudiant = async (req, res) => {
  console.log('Données reçues pour création:', req.body);
  try {
    const { id_utilisateur, matricule, nom, prenom, email, id_niveau, annee_academique} = req.body;

    if (!id_utilisateur ||!matricule || !nom || !prenom || !email || !id_niveau || !annee_academique ) {
      console.log('Validation échouée:', req.body);
      return res.status(400).json({ message: 'Tous les champs doivent être remplis' });
    }

    const { data, error } = await supabase
      .from('etudiant')
      .insert([{ id_utilisateur, matricule, nom, prenom, email, id_niveau, annee_academique}])
      .single();

    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(400).json({ message: 'Erreur lors de l\'insertion des données', details: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Erreur lors de la création:', err);
    res.status(400).json({ message: 'Erreur lors de la création de l\'étudiant', details: err.message });
  }
}; 


exports.updateEtudiant = async (req, res) => {
  console.log('Les données reçues pour le update :', req.body);
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "L'ID de l'étudiant est manquant" });
    }

    const { id_utilisateur, matricule, nom, prenom, email, id_niveau, annee_academique } = req.body;

    // Validation des champs requis
    if (!id_utilisateur || !matricule || !nom || !prenom || !email || !id_niveau || !annee_academique) {
      return res.status(400).json({ message: 'Toutes les informations doivent être fournies' });
    }

    const { data, error } = await supabase
      .from('etudiant')
      .update({
        id_utilisateur,
        matricule,
        nom,
        prenom,
        email,
        id_niveau,
        annee_academique
      })
      .eq('id_etudiant', id);

    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'étudiant' });
    }

    // Vérification si l'étudiant existe bien après la mise à jour
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    res.status(200).json({ message: 'Mise à jour réussie', etudiant: data[0] });
  } catch (err) {
    console.error('Erreur lors de la mise à jour:', err);
    res.status(500).json({ message: 'Erreur serveur interne' });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "L'ID de l'étudiant est manquant" });
    }

    const { data, error } = await supabase
      .from('etudiant')
      .delete()
      .eq('id_etudiant', id);const [niveaux, setNiveaux] = useState([]);

    if (error) {
      return res.status(400).json({ message: 'Erreur lors de la suppression de l\'étudiant' });
    }

    // Si l'étudiant n'existe pas
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur du serveur interne' });
  }
};
