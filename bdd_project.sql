-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Création de la table Utilisateur
CREATE TABLE Utilisateur (
    id_utilisateur UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    derniere_connexion TIMESTAMP WITH TIME ZONE
);

-- Création de la table Niveau
CREATE TABLE Niveau (
    id_niveau UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code_niveau VARCHAR(10) UNIQUE NOT NULL,
    libelle VARCHAR(100) NOT NULL,
    taille_groupe INTEGER NOT NULL
);

-- Création de la table Etudiant
CREATE TABLE Etudiant (
    id_etudiant UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_utilisateur UUID UNIQUE NOT NULL,
    matricule VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    id_niveau UUID NOT NULL,
    annee_academique VARCHAR(9) NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (id_niveau) REFERENCES Niveau(id_niveau)
);

-- Création de la table Enseignant
CREATE TABLE Enseignant (
    id_enseignant UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_utilisateur UUID UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    statut VARCHAR(50) NOT NULL,
    specialite VARCHAR(100),
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur)
);

-- Création de la table Groupe
CREATE TABLE Groupe (
    id_groupe UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom_groupe VARCHAR(100) NOT NULL,
    id_niveau UUID NOT NULL,
    annee_academique VARCHAR(9) NOT NULL,
    FOREIGN KEY (id_niveau) REFERENCES Niveau(id_niveau),
    UNIQUE (nom_groupe, annee_academique)
);

-- Création de la table Encadrement
CREATE TABLE Encadrement (
    id_encadrement UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_groupe UUID NOT NULL,
    id_enseignant UUID NOT NULL,
    annee_academique VARCHAR(9) NOT NULL,
    FOREIGN KEY (id_groupe) REFERENCES Groupe(id_groupe),
    FOREIGN KEY (id_enseignant) REFERENCES Enseignant(id_enseignant),
    UNIQUE (id_groupe, id_enseignant, annee_academique)
);

-- Création de la table MembreGroupe
CREATE TABLE MembreGroupe (
    id_membre_groupe UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_groupe UUID NOT NULL,
    id_etudiant UUID NOT NULL,
    FOREIGN KEY (id_groupe) REFERENCES Groupe(id_groupe),
    FOREIGN KEY (id_etudiant) REFERENCES Etudiant(id_etudiant),
    UNIQUE (id_groupe, id_etudiant)
);

-- Insertion des niveaux
INSERT INTO Niveau (code_niveau, libelle, taille_groupe) VALUES
('L1', 'Licence 1', 3),
('L2', 'Licence 2', 2),
('L3', 'Licence 3', 1),
('M1', 'Master 1', 3),
('M2', 'Master 2', 1);