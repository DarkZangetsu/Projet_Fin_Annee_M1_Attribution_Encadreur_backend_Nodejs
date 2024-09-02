class Enseignant {
    constructor(id, utilisateurId, nom, prenom, statut, specialite) {
      this.id = id;
      this.utilisateurId = utilisateurId;
      this.nom = nom;
      this.prenom = prenom;
      this.statut = statut;
      this.specialite = specialite;
    }
  }
  
  module.exports = Enseignant