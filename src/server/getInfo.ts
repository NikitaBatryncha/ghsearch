import { Octokit } from "octokit";

const octokit = new Octokit({ });

export default async function getInfo(owner: string, repo: string): Promise<any> {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: owner,
      repo: repo,
      headers: {
        "Accept": "application/vnd.github.v3+json",
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching repository data from GitHub:', error);
    return null;
  }
}
