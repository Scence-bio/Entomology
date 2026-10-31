// Google Sheet that holds the quiz questions. The sheet is shared as
// "anyone with the link can view"; the first tab is read as CSV.
// Leave it empty and the site uses the questions in questions.js.
export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1wZlgrgHHJmrME04YMQqtB6eFL8tP7r5mB7O7kxGC5a0/export?format=csv";

// Supabase project for the leaderboard (docs/leaderboard.sql sets up the
// table). Leave both empty and the leaderboard stays hidden.
export const SUPABASE_URL = "https://jlqcbfranwaacqktrlww.supabase.co";
// Publishable key: meant for the browser, safe to commit.
export const SUPABASE_ANON_KEY = "sb_publishable_xZ-zkwJWMG_OkniF7xcZ3Q_8u_VfKJ3";
