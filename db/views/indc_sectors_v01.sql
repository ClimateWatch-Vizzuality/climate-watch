SELECT
  'wb' || child.id AS id,
  child.name AS name,
  'wb' || parent.id AS parent_id,
  parent.name AS parent_name
FROM wb_indc_sectors child
LEFT JOIN wb_indc_sectors parent ON child.parent_id = parent.id
