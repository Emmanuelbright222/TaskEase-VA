-- Migration: Convert metrics from text to text[] array
-- Run this if you already have a projects table with metrics as text
-- This allows projects to have multiple metrics instead of a single string

-- Step 1: Add a new column for array metrics
ALTER TABLE projects ADD COLUMN IF NOT EXISTS metrics_new text[];

-- Step 2: Migrate existing data (convert comma-separated or "·" separated strings to arrays)
-- This handles both comma-separated and "·" (middle dot) separated metrics
UPDATE projects 
SET metrics_new = CASE 
  WHEN metrics IS NULL OR metrics = '' THEN NULL
  WHEN metrics LIKE '%,%' THEN string_to_array(replace(metrics, ' ', ''), ',')
  WHEN metrics LIKE '%·%' THEN string_to_array(trim(both ' ' from replace(metrics, '·', ',')), ',')
  ELSE ARRAY[trim(metrics)]
END
WHERE metrics_new IS NULL;

-- Step 3: Drop the old column
ALTER TABLE projects DROP COLUMN IF EXISTS metrics;

-- Step 4: Rename the new column to the original name
ALTER TABLE projects RENAME COLUMN metrics_new TO metrics;

-- Verification: Check the results
-- SELECT id, name, metrics FROM projects;

