-- Leaderboard table for the quiz. Run once in Supabase: SQL Editor → New query.
-- Anyone can read the list and add a score; nobody can edit or delete one
-- from the site. Remove unwanted rows from the Table Editor.

create table if not exists public.quiz_scores (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 2 and 30),
  scope text not null check (scope ~ '^(all|ch[0-9]{1,2})$'),
  score int not null check (score >= 0),
  total int not null check (total between 1 and 20),
  created_at timestamptz not null default now(),
  check (score <= total)
);

create index if not exists quiz_scores_scope_score on public.quiz_scores (scope, score desc, created_at);

alter table public.quiz_scores enable row level security;

create policy "anyone can read scores" on public.quiz_scores
  for select to anon using (true);

create policy "anyone can add a score" on public.quiz_scores
  for insert to anon with check (true);

revoke all on public.quiz_scores from anon, authenticated;
grant select, insert on public.quiz_scores to anon;
