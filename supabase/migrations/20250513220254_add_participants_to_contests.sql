alter table contests add column participants integer default 0;

-- Add comment to the column
comment on column contests.participants is 'Number of participants in the contest';
