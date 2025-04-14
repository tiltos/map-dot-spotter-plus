export const getIconForType = (type: string, size: number = 24) => {
  const iconProps = {
    size,
    strokeWidth: 2,
    absoluteStrokeWidth: true,
  };
};

export const getIconOptions = (): {
  id: string;
  name: string;
}[] => {
  return [
    { id: "town", name: "Town" },
    { id: "village", name: "Village" },
    { id: "hamlet", name: "Hamlet" },

    { id: "encounter", name: "Encounter" },
    { id: "delve", name: "Delve" },
    { id: "camp", name: "Threat Camp" },
    { id: "unknown", name: "Unknown" },
    { id: "location", name: "Point of Interest" },

    // { id: "landmark", name: "Landmark" },

    // { id: "mountain", name: "Mountain" },
    // { id: "forest", name: "Forest" },
    // { id: "port", name: "Port" },
    // { id: "settlement", name: "Settlement" },
    // { id: "city", name: "City" },
    // { id: "peaks", name: "Peaks" },
  ];
};
