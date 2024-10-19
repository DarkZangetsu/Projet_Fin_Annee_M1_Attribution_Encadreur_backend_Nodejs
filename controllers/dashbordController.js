const { supabase } = require('../supabaseClient.js');

exports.getDashboardData = async (req, res) => {
  try {
    // Statistiques existantes
    const { count: totalStudents, error: studentsError } = await supabase
      .from('etudiant')
      .select('id_etudiant', { count: 'exact' });
    if (studentsError) throw studentsError;

    const { count: totalTeachers, error: teachersError } = await supabase
      .from('enseignant')
      .select('id_enseignant', { count: 'exact' });
    if (teachersError) throw teachersError;

    const { count: totalGroups, error: groupsError } = await supabase
      .from('groupe')
      .select('id_groupe', { count: 'exact' });
    if (groupsError) throw groupsError;

    // Nouvelles statistiques
    // Étudiants avec et sans groupe
    const { data: studentGroupData, error: studentGroupError } = await supabase
      .from('membregroupe')
      .select('id_etudiant', { count: 'exact', distinct: true });
    if (studentGroupError) throw studentGroupError;

    const studentsWithGroup = studentGroupData.length;
    const studentsWithoutGroup = totalStudents - studentsWithGroup;

    // Enseignants avec et sans encadrement
    const { data: teacherEncadrementData, error: teacherEncadrementError } = await supabase
      .from('encadrement')
      .select('id_enseignant', { count: 'exact', distinct: true });
    if (teacherEncadrementError) throw teacherEncadrementError;

    const teachersWithEncadrement = teacherEncadrementData.length;
    const teachersWithoutEncadrement = totalTeachers - teachersWithEncadrement;

    // Groupes avec et sans encadreur
    const { data: groupEncadrementData, error: groupEncadrementError } = await supabase
      .from('encadrement')
      .select('id_groupe', { count: 'exact', distinct: true });
    if (groupEncadrementError) throw groupEncadrementError;

    const groupsWithEncadreur = groupEncadrementData.length;
    const groupsWithoutEncadreur = totalGroups - groupsWithEncadreur;

    // Étudiants par niveau (existant)
    const { data: studentsPerLevel, error: levelError } = await supabase
      .from('etudiant')
      .select('niveau(code_niveau)')
      .then(({ data }) => {
        const counts = data.reduce((acc, { niveau }) => {
          acc[niveau.code_niveau] = (acc[niveau.code_niveau] || 0) + 1;
          return acc;
        }, {});
        return Object.entries(counts).map(([level, count]) => ({ level, count }));
      });
    if (levelError) throw levelError;

    res.json({
      totalStudents,
      totalTeachers,
      totalGroups,
      studentsPerLevel,
      studentsWithGroup,
      studentsWithoutGroup,
      teachersWithEncadrement,
      teachersWithoutEncadrement,
      groupsWithEncadreur,
      groupsWithoutEncadreur
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données du tableau de bord:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};