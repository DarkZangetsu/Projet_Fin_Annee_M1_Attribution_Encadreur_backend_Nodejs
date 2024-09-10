class Etudiant {
    constructor(id, utilisateurId, nom, prenom,email, niveauId, anneeAcademique, matricule) {
      this.id = id;
      this.utilisateurId = utilisateurId;
      this.matricule = matricule;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.niveauId = niveauId;
      this.anneeAcademique = anneeAcademique;
      
    }
  }
  
  module.exports = Etudiant;