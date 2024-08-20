import { Octokit } from "octokit";

const octokit = new Octokit({ });

export default async function getProjects(searchingName: string, perPage: number = 10, page: number = 1): Promise<any> {
  try {
    const response = await octokit.request('GET /search/repositories', {
      q: encodeURIComponent(searchingName),
      per_page: perPage,
      page: page,
      headers: {
        "Accept": "application/vnd.github.v3+json",
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data from GitHub:', error);
    return null;
  }
}
