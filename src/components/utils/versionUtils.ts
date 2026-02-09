// Version and update utilities

export interface AppVersion {
  major: number;
  minor: number;
  patch: number;
  build?: number;
}

export const parseVersion = (versionString: string): AppVersion => {
  const parts = versionString.split(".");
  return {
    major: parseInt(parts[0] || "0", 10),
    minor: parseInt(parts[1] || "0", 10),
    patch: parseInt(parts[2] || "0", 10),
    build: parts[3] ? parseInt(parts[3], 10) : undefined,
  };
};

export const compareVersions = (v1: string, v2: string): number => {
  const ver1 = parseVersion(v1);
  const ver2 = parseVersion(v2);

  if (ver1.major !== ver2.major) return ver1.major - ver2.major;
  if (ver1.minor !== ver2.minor) return ver1.minor - ver2.minor;
  if (ver1.patch !== ver2.patch) return ver1.patch - ver2.patch;
  if (ver1.build !== undefined && ver2.build !== undefined) {
    return ver1.build - ver2.build;
  }
  return 0;
};

export const isNewerVersion = (current: string, latest: string): boolean => {
  return compareVersions(latest, current) > 0;
};

export const formatVersion = (version: AppVersion): string => {
  const base = `${version.major}.${version.minor}.${version.patch}`;
  return version.build !== undefined ? `${base}.${version.build}` : base;
};

export const getCurrentAppVersion = (): string => {
  return "1.0.0"; // This would typically come from package.json or env
};
