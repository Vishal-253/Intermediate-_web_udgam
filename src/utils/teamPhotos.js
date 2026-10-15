// Member photos live in src/assets/team-photos, named by member id (e.g. sumit-prasad.webp).
// Only files that exist are bundled, so members without a photo keep the silhouette.
const files = import.meta.glob('../assets/team-photos/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const photos = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase(), url])
);

export const teamPhotoFor = (id) => (id ? photos[id.toLowerCase()] : undefined);
