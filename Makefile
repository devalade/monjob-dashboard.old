.PHONY: types

types:
	npx supabase gen types typescript --project-id "sirnjvsagcqlvittmbai" --schema public > src/types/database.types.ts
