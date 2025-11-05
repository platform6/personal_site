// src/components/GameManager.jsx
import { useState, useEffect } from 'react';
import {
  getGames,
  addGame,
  updateGame,
  deleteGame,
} from '../lib/supabase/games';

export default function GameManager() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [editingGame, setEditingGame] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      setLoading(true);
      const data = await getGames();
      setGames(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddGame(e) {
    e.preventDefault();
    if (!newGameTitle.trim()) return;

    try {
      await addGame(newGameTitle.trim());
      setNewGameTitle('');
      loadGames();
    } catch (err) {
      alert('Error adding game: ' + err.message);
    }
  }

  async function handleDeleteGame(id) {
    if (!window.confirm('Are you sure you want to delete this game?')) return;

    try {
      await deleteGame(id);
      loadGames();
    } catch (err) {
      alert('Error deleting game: ' + err.message);
    }
  }

  async function handleUpdateGame(id, newTitle) {
    try {
      await updateGame(id, { title: newTitle });
      setEditingGame(null);
      loadGames();
    } catch (err) {
      alert('Error updating game: ' + err.message);
    }
  }

  // Drag and drop handlers
  function handleDragStart(e, index) {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e, index) {
    e.preventDefault();

    if (draggedItem === null || draggedItem === index) return;

    // Reorder the array
    const newGames = [...games];
    const draggedGame = newGames[draggedItem];
    newGames.splice(draggedItem, 1);
    newGames.splice(index, 0, draggedGame);

    setGames(newGames);
    setDraggedItem(index);
  }

  async function handleDragEnd() {
    if (draggedItem === null) return;

    try {
      // Update display_order in database
      const updates = games.map((game, index) => ({
        id: game.id,
        display_order: index + 1,
      }));

      await Promise.all(
        updates.map((update) =>
          updateGame(update.id, { display_order: update.display_order })
        )
      );

      setDraggedItem(null);
      loadGames();
    } catch (err) {
      alert('Error reordering games: ' + err.message);
      loadGames(); // Reload to reset order
    }
  }

  if (loading) {
    return <div>Loading games...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '1rem', background: '#fee' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      {/* Add Game Form */}
      <div
        style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <h2>Add New Game</h2>
        <form onSubmit={handleAddGame} style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={newGameTitle}
            onChange={(e) => setNewGameTitle(e.target.value)}
            placeholder="Enter game title..."
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Add Game
          </button>
        </form>
      </div>

      {/* Games List */}
      <div>
        <h2>Games ({games.length})</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Drag and drop to reorder
        </p>

        {games.length === 0 ? (
          <p style={{ color: '#999' }}>No games yet. Add one above!</p>
        ) : (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            {games.map((game, index) => (
              <div
                key={game.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'move',
                  opacity: draggedItem === index ? 0.5 : 1,
                }}
              >
                {/* Drag Handle */}
                <span
                  style={{ fontSize: '1.5rem', color: '#999', cursor: 'grab' }}
                >
                  ☰
                </span>

                {/* Order Number */}
                <span
                  style={{
                    minWidth: '30px',
                    fontWeight: 'bold',
                    color: '#666',
                  }}
                >
                  {index + 1}.
                </span>

                {/* Game Title (editable) */}
                {editingGame === game.id ? (
                  <input
                    type="text"
                    defaultValue={game.title}
                    autoFocus
                    onBlur={(e) => handleUpdateGame(game.id, e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateGame(game.id, e.target.value);
                      }
                      if (e.key === 'Escape') {
                        setEditingGame(null);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      fontSize: '1rem',
                      border: '2px solid #007bff',
                      borderRadius: '4px',
                    }}
                  />
                ) : (
                  <span
                    style={{ flex: 1, cursor: 'text' }}
                    onClick={() => setEditingGame(game.id)}
                  >
                    {game.title}
                  </span>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setEditingGame(game.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGame(game.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
