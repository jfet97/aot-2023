type RemoveNaughtyChildren<List> = Omit<List, `naughty_${any}`>;
