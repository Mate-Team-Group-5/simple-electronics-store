For import use:
FORMAT csv
DELIMITER ';', 
HEADER, 
QUOTE ', 
ESCAPE '

Like: --command " "\\copy public.accessories(id, category, namespaceid, name, capacityavailable, capacity, priceregular, pricediscount, colorsavailable, color, images, description, screen, resolution, processor, ram, cell) FROM 'filepath.CSV' WITH(FORMAT csv, DELIMITER ;, HEADER, QUOTE ', ESCAPE '); ""
