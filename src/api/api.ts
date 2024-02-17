export const baseUrl = "https://api.testvalley.kr";

export const getBannerData = async () => {
  const response = await fetch(`${baseUrl}/main-banner/all`);
  const data = await response.json();
  return data;
};

export const getShortCutsData = async () => {
  const response = await fetch(`${baseUrl}/main-shortcut/all`);
  const data = await response.json();
  return data;
};

export const getStoreItems = async () => {
  const response = await fetch(`${baseUrl}/collections?prearrangedDiscount`);
  const data = await response.json();
  return data;
};
