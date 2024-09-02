class Etudiant {
    constructor(id, utilisateurId, nom, prenom, niveauId, anneeAcademique, matricule) {
      this.id = id;
      this.utilisateurId = utilisateurId;
      this.nom = nom;
      this.prenom = prenom;
      this.niveauId = niveauId;
      this.anneeAcademique = anneeAcademique;
      this.matricule = matricule;
    }
  }
  
  module.exports = Etudiant;