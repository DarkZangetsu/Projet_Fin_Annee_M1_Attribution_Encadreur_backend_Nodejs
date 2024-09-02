class Utilisateur {
    constructor(id, email, password, role, createdAt, lastLogin) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.role = role;
      this.createdAt = createdAt;
      this.lastLogin = lastLogin;
    }
  }
  
  module.exports = Utilisateur;