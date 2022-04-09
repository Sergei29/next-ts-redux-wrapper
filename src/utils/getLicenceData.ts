export const getLicenceData = (objLicense: Record<string, any> | null) => {
  if (!objLicense || !objLicense?.name) return "no information";
  return `${objLicense.name} ${objLicense?.url || ""}`;
};
