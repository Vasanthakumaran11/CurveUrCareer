// Shared In-Memory Cache to serve as a self-healing fallback when database/RLS operations fail.
class InMemoryFallbackCache {
  constructor() {
    this.profiles = new Map();
    this.interests = new Map();
    this.behaviorProfiles = new Map();
    this.discoverResults = new Map();
    this.interactionLogs = new Map();
  }

  // Profile Fallback operations
  getProfile(userId) {
    return this.profiles.get(userId) || null;
  }

  setProfile(userId, data) {
    const existing = this.profiles.get(userId) || {};
    const updated = {
      ...existing,
      ...data,
      id: userId,
      updated_at: new Date().toISOString()
    };
    this.profiles.set(userId, updated);
    return updated;
  }

  // Interests Fallback operations
  getInterests(userId) {
    return this.interests.get(userId) || [];
  }

  setInterests(userId, interestsArray) {
    this.interests.set(userId, interestsArray);
    return interestsArray;
  }

  // Behavior Profile operations
  getBehaviorProfile(userId) {
    return this.behaviorProfiles.get(userId) || null;
  }

  setBehaviorProfile(userId, data) {
    const existing = this.behaviorProfiles.get(userId) || {};
    const updated = {
      ...existing,
      ...data,
      user_id: userId,
      updated_at: new Date().toISOString()
    };
    this.behaviorProfiles.set(userId, updated);
    return updated;
  }

  // Discover Results operations
  getDiscoverResults(userId) {
    return this.discoverResults.get(userId) || null;
  }

  setDiscoverResults(userId, data) {
    const updated = {
      ...data,
      user_id: userId,
      completion_timestamp: new Date().toISOString()
    };
    this.discoverResults.set(userId, updated);
    return updated;
  }
}

export const fallbackCache = new InMemoryFallbackCache();
