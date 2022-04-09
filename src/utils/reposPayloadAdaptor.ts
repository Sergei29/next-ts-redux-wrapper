export const reposPayloadAdaptor = (reposFullPayload: Record<string, any>[]) =>
  reposFullPayload.map((repoItem: Record<string, any>) => ({
    id: repoItem.id,
    name: repoItem.name,
    full_name: repoItem.full_name || null,
    private: repoItem.private || false,
    owner: {
      login: repoItem.owner.login,
      id: repoItem.owner.id,
      node_id: repoItem.owner.node_id,
      avatar_url: repoItem.owner.avatar_url,
      gravatar_id: repoItem.owner.gravatar_id,
      url: repoItem.owner.url,
    },
    created_at: repoItem.created_at || null,
    updated_at: repoItem.updated_at || null,
    size: repoItem.size || 0,
    stargazers_count: repoItem.stargazers_count || 0,
    watchers_count: repoItem.watchers_count || 0,
    forks_count: repoItem.forks_count || 0,
    license: repoItem.license,
    forks: repoItem.forks || 0,
    watchers: repoItem.watchers || 0,
    default_branch: repoItem.default_branch || "main",
    languages_url: repoItem.languages_url,
    language: repoItem.language,
  }));