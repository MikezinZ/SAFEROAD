import React, { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem } from '../services/api';

interface Item {
  id: string;
  name: string;
  description: string;
  [key: string]: any;
}

const CrudOperations: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<Item>>({ name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    
    const response = await getItems<Item>();
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setItems(response.data);
    }
    
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const resetForm = () => {
    setCurrentItem({ name: '', description: '' });
    setIsEditing(false);
  };

  const showSuccessMessage = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (!currentItem.name) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    let response;
    
    if (isEditing && currentItem.id) {
      response = await updateItem<Item>(currentItem.id, currentItem);
      
      if (!response.error) {
        setItems(items.map(item => 
          item.id === currentItem.id ? { ...item, ...currentItem } : item
        ));
        showSuccessMessage('Item updated successfully!');
      }
    } else {
      response = await createItem<Item>(currentItem);
      
      if (!response.error && response.data) {
        setItems([...items, response.data]);
        showSuccessMessage('Item created successfully!');
      }
    }
    
    if (response.error) {
      setError(response.error);
    } else {
      resetForm();
    }
    
    setLoading(false);
  };

  const handleEdit = (item: Item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const response = await deleteItem(id);
    
    if (response.error) {
      setError(response.error);
    } else {
      setItems(items.filter(item => item.id !== id));
      showSuccessMessage('Item deleted successfully!');
    }
    
    setLoading(false);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>
        {isEditing ? 'Edit Item' : 'Create New Item'}
      </h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={currentItem.name || ''}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={currentItem.description || ''}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
        
        <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : isEditing ? 'Update' : 'Create'}
          </button>
          
          {isEditing && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <h2 style={{ margin: '30px 0 20px' }}>Items List</h2>
      
      {loading && <p>Loading...</p>}
      
      {items.length === 0 && !loading ? (
        <p>No items found. Create one above!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td className="action-buttons">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudOperations;