export const singleRepoAdaptor = (objSingleRepo: Record<string, any>) => ({
  id: objSingleRepo.id,
  name: objSingleRepo.name,
  full_name: objSingleRepo.full_name,
  private: objSingleRepo.private || false,
  owner: {
    login: objSingleRepo.owner.login,
    id: objSingleRepo.owner.id,
    node_id: objSingleRepo.owner.node_id,
    avatar_url: objSingleRepo.owner.avatar_url,
    gravatar_id: objSingleRepo.owner.gravatar_id,
    url: objSingleRepo.owner.url,
  },
  created_at: objSingleRepo.created_at || null,
  updated_at: objSingleRepo.updated_at || null,
  description: objSingleRepo.description || null,
  size: objSingleRepo.size || 0,
  stargazers_count: objSingleRepo.stargazers_count || 0,
  watchers_count: objSingleRepo.watchers_count || 0,
  forks_count: objSingleRepo.forks_count || 0,
  license: objSingleRepo.license,
  forks: objSingleRepo.forks || 0,
  watchers: objSingleRepo.watchers || 0,
  default_branch: objSingleRepo.default_branch || "main",
  languages_url: objSingleRepo.languages_url,
  language: objSingleRepo.language,
});

export const reposPayloadAdaptor = (reposFullPayload: Record<string, any>[]) =>
  reposFullPayload.map(singleRepoAdaptor);
