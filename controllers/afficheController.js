const { supabase } = require('../supabaseClient');

exports.getGroups = async (req, res) => {
  try {
    // Récupérer d'abord les groupes
    const { data: groupes, error: groupesError } = await supabase
      .from('groupe')
      .select('*');

    if (groupesError) throw groupesError;

    // Pour chaque groupe, récupérer les enseignants et les étudiants
    const groupesComplets = await Promise.all(groupes.map(async (groupe) => {
      // Récupérer l'enseignant
      const { data: encadrements, error: encadrementError } = await supabase
        .from('encadrement')
        .select('id_enseignant')
        .eq('id_groupe', groupe.id_groupe)
        .single();

      if (encadrementError && encadrementError.code !== 'PGRST116') throw encadrementError;

      let enseignant = null;
      if (encadrements) {
        const { data: enseignantData, error: enseignantError } = await supabase
          .from('enseignant')
          .select('*')
          .eq('id_enseignant', encadrements.id_enseignant)
          .single();

        if (enseignantError && enseignantError.code !== 'PGRST116') throw enseignantError;
        enseignant = enseignantData;
      }

      // Récupérer les étudiants
      const { data: membres, error: membresError } = await supabase
        .from('membregroupe')
        .select('id_etudiant')
        .eq('id_groupe', groupe.id_groupe);

      if (membresError) throw membresError;

      const etudiants = await Promise.all(membres.map(async (membre) => {
        const { data: etudiant, error: etudiantError } = await supabase
          .from('etudiant')
          .select('*')
          .eq('id_etudiant', membre.id_etudiant)
          .single();

        if (etudiantError && etudiantError.code !== 'PGRST116') throw etudiantError;
        return etudiant;
      }));

      return {
        ...groupe,
        enseignant,
        etudiants: etudiants.filter(e => e !== null),
      };
    }));

    res.json(groupesComplets);
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};