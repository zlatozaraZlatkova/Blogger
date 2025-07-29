import { IProfile } from 'src/app/interfaces/profile';

export function getGitHubUrl(publicProfile: IProfile): string | null {
  return publicProfile.githubUsername
    ? `https://github.com/${publicProfile.githubUsername}`
    : null;
}

export function getLinkedInUrl(publicProfile: IProfile): string | null {
  return publicProfile.socialMedia?.linkedin
    ? `https://linkedin.com/in/${publicProfile.socialMedia.linkedin}`
    : null;
}
