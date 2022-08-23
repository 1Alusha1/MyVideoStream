export const correctDate = (timestamp) => {
  return String(new Date(timestamp)).split(' ').slice(1, 5).join(' ');
};
