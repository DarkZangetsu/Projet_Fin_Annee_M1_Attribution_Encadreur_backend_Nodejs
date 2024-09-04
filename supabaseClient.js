const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL et Key doivent être définis dans les variables d\'environnement');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;