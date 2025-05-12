CREATE OR REPLACE FUNCTION moddatetime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE public.contest_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contest_id UUID REFERENCES public.contests(id) ON DELETE CASCADE NOT NULL,
    issue_number INTEGER NOT NULL,
    issue_title TEXT NOT NULL,
    issue_url TEXT,
    project_url TEXT,       
    screenshot_path TEXT,   
    project_body TEXT,      
    github_issue_created_at TIMESTAMPTZ,
    github_issue_updated_at TIMESTAMPTZ,
    last_processed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_contest_projects_contest_id ON public.contest_projects(contest_id);
CREATE INDEX idx_contest_projects_issue_number ON public.contest_projects(issue_number);

ALTER TABLE public.contest_projects
ADD CONSTRAINT unique_contest_issue UNIQUE (contest_id, issue_number);

CREATE TRIGGER handle_updated_at_contest_projects
BEFORE UPDATE ON public.contest_projects
FOR EACH ROW
EXECUTE FUNCTION moddatetime (updated_at);

ALTER TABLE public.contest_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all access to non-service roles for contest_projects"
ON public.contest_projects
FOR ALL
USING (false)
WITH CHECK (false);

