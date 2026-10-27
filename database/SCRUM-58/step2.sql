INSERT INTO products_info (
  id, category, "namespaceId", name, "capacityAvailable", capacity, 
  "priceRegular", "priceDiscount", "colorsAvailable", color, images, 
  description, screen, resolution, processor, ram, camera, zoom, cell
)
SELECT 
  id, category, "namespaceId", name, "capacityAvailable", capacity, 
  "priceRegular", "priceDiscount", "colorsAvailable", color, images, 
  description, screen, resolution, processor, ram, camera, zoom, cell
FROM phones

UNION ALL

SELECT 
  id, category, "namespaceId", name, "capacityAvailable", capacity, 
  "priceRegular", "priceDiscount", "colorsAvailable", color, images, 
  description, screen, resolution, processor, ram, NULL AS camera, NULL AS zoom, cell
FROM accessories

UNION ALL

SELECT 
  id, category, "namespaceId", name, "capacityAvailable", capacity, 
  "priceRegular", "priceDiscount", "colorsAvailable", color, images, 
  description, screen, resolution, processor, ram, camera, zoom, cell
FROM tablets;