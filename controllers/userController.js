const { supabase } = require('../supabaseClient');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const { data, error } = await supabase
      .from('utilisateur')
      .insert([{ email, mot_de_passe: password, role }])
      .select();

    if (error) {
      console.error("Error during registration:", error);
      return res.status(400).json({ message: error.message });
    }

    if (!data || data.length === 0) {
      console.error("No data returned from insert operation");
      return res.status(500).json({ message: "Une erreur est survenue lors de l'inscription." });
    }

    // Générer un token JWT après l'inscription réussie
    const token = jwt.sign(
      { id: data[0].id_utilisateur, email: data[0].email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Répondre avec les informations de l'utilisateur et le token
    res.status(201).json({ user: data[0], token });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase
      .from('utilisateur')
      .select('*')
      .match({ email, mot_de_passe: password });

    if (error || data.length === 0) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: data[0].id_utilisateur, email: data[0].email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Répondre avec l'utilisateur et le token
    return res.status(200).json({ userId: data[0].id_utilisateur, token });
  } catch (err) {
    console.error("Erreur lors de la connexion:", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { user } = req;
    const { data, error } = await supabase.from('utilisateur').select('*').match({ id_utilisateur: user.id_utilisateur }).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
