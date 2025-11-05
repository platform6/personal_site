// src/lib/supabase/games.js
import { supabase } from './supabaseclient';

export async function getGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

export async function addGame(title, metadata = {}) {
  // Get the highest order number
  const { data: games } = await supabase
    .from('games')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1);

  const nextOrder = games && games.length > 0 ? games[0].display_order + 1 : 1;

  const { data, error } = await supabase
    .from('games')
    .insert({
      title,
      metadata,
      display_order: nextOrder,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGame(id, updates) {
  // Add updated_at timestamp
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('games')
    .update(updatedData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGame(id) {
  const { error } = await supabase.from('games').delete().eq('id', id);

  if (error) throw error;
}

export async function reorderGames(games) {
  // Update display_order for multiple games at once
  const updates = games.map((game, index) => ({
    id: game.id,
    display_order: index + 1,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('games')
    .upsert(updates, { onConflict: 'id' });

  if (error) throw error;
}
