export function mediaUrls(item: {
  images?: string[];
  imageUrl?: string;
}): string[] {
  const listed = (item.images ?? []).map((url) => url.trim()).filter(Boolean);
  if (listed.length > 0) return listed;
  const cover = item.imageUrl?.trim();
  return cover ? [cover] : [];
}
