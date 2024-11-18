import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

interface Resource {
  resource_id: string;
  type: string;
  quantity: number;
  location: string;
  last_updated: string;
}

const resourceTypes = ["Water", "Medical Kits", "Food Supplies", "Blankets", "Sanitation Kits"];

const ResourceComponent: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [newResource, setNewResource] = useState<Omit<Resource, 'resource_id'>>({
    type: resourceTypes[0], // Default to the first type to avoid null
    quantity: 0,
    location: '',
    last_updated: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:3000/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewResource({
      ...newResource,
      [name]: name === 'quantity' ? parseInt(value) : value,
    });
  };

  const addResource = async () => {
    try {
      await axios.post('http://localhost:3000/resources', newResource);
      alert('Resource added successfully!');
      setNewResource({
        type: resourceTypes[0], // Reset to default type to avoid null
        quantity: 0,
        location: '',
        last_updated: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error adding resource:', error);
      alert('Failed to add resource.');
    }
  };

  if (loading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add a New Resource</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Resource Type
            </label>
            <select
              id="type"
              name="type"
              value={newResource.type}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
            >
              {resourceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={newResource.quantity}
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <Input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              value={newResource.location}
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>

          <Button type="button" onClick={addResource} className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
            Add Resource
          </Button>
        </form>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Existing Resources</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.resource_id} className="border rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">{resource.type}</h3>
              <p className="font-semibold mb-2">Quantity: {resource.quantity}</p>
              <p className="mb-2">Location: {resource.location}</p>
              <p>Last Updated: {new Date(resource.last_updated).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourceComponent;
