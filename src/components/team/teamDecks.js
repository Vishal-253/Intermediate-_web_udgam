import { teamMembers, committeeCategories, committeeMembers } from '../../data/teamData';

// Leadership groups and committee decks for the team page, derived once from teamData.

export const president =
  teamMembers.find((m) => m.role === 'President' || m.badgeType === 'president') || teamMembers[0];

export const vicePresidents = teamMembers.filter((m) => m.role === 'Vice President' || m.badgeType === 'vp');

export const treasurer =
  teamMembers.find((m) => m.role === 'Treasurer' || m.badgeType === 'treasurer') || teamMembers[3];

export const conveners = teamMembers.filter((m) => m.role === 'Convener' || m.badgeType === 'convener');

// Dinesh Saini leads the General Secretary row
const GENSEC_FIRST = 'dinesh-saini';
export const generalSecretaries = teamMembers
  .filter((m) => m.role?.toLowerCase().includes('secretary') || m.badgeType === 'gensec')
  .sort((a, b) => (b.id === GENSEC_FIRST) - (a.id === GENSEC_FIRST));

// The 15 operational wings, starting from Sponsorship
export const operationalDecks = committeeCategories
  .filter((c) => c.id !== 'all')
  .map((cat) => {
    const members = committeeMembers.filter((m) => m.committeeId === cat.id);
    let title = cat.label;
    if (cat.id === 'web-dev') title = 'Web Development';
    if (cat.id === 'publicity') title = 'Public Relations';
    return {
      id: cat.id,
      title,
      subtitle: cat.fullName || `${title} Committee`,
      roleText: `${members.length} PASSES IN DECK`,
      icon: cat.icon || '🎴',
      coverImage: `/assets/images/committees/${cat.id}.webp`,
      members,
    };
  });
