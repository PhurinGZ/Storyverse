import React, { useState } from 'react';
import { BookOpen, Users, FileText, Plus, X } from 'lucide-react';

// Import all components (in actual project, these would be separate files)
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {LabeledSelect} from '@/components/form/LabeledSelect';
import {Badge} from '@/components/ui/badge';
import {Avatar} from '@/components/ui/avatar';

// Main Component
const CreateNewProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    genre: '',
    tags: [],
    collaborators: [{id:'',name:'',role:''}]
  });
  
  const [newTag, setNewTag] = useState('');
  const [newCollaborator, setNewCollaborator] = useState({ name: '', role: '' });

  const genreOptions = [
    { value: 'epic-fantasy', label: 'Epic Fantasy' },
    { value: 'urban-fantasy', label: 'Urban Fantasy' },
    { value: 'sci-fi', label: 'Science Fiction' },
    { value: 'romance', label: 'Romance' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'horror', label: 'Horror' },
    { value: 'literary', label: 'Literary Fiction' }
  ];

  const roleOptions = [
    { value: 'co-author', label: 'Co-Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'beta-reader', label: 'Beta Reader' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'illustrator', label: 'Illustrator' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCollaborator = () => {
    if (newCollaborator.name.trim() && newCollaborator.role) {
      setFormData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, { ...newCollaborator, id: Date.now() }]
      }));
      setNewCollaborator({ name: '', role: '' });
    }
  };

  const removeCollaborator = (collaboratorId) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter(collab => collab.id !== collaboratorId)
    }));
  };

  const handleSubmit = () => {
    console.log('Creating project:', formData);
    // Here you would typically send the data to your backend
    alert('Project created successfully!');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <p className="mt-2 text-gray-600">Start your writing journey with a new story project</p>
        </div>

        <div className="space-y-8">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Project Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter your story title"
                required
              />
              
              <Textarea
                label="Story Summary"
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="Describe your story's plot, characters, and setting..."
                rows={5}
                required
              />
              
              <LabeledSelect
                label="Genre"
                value={formData.genre}
                onChange={(value) => handleInputChange('genre', value)}
                options={genreOptions}
                required
              />
            </CardContent>
          </Card>

          {/* Tags Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag (e.g., Magic, Adventure, Dragons)"
                    onKeyPress={(e) => handleKeyPress(e, addTag)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag} disabled={!newTag.trim()}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="blue"
                        onRemove={() => removeTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Collaborators Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Project Members</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Collaborator name"
                    value={newCollaborator.name}
                    onChange={(e) => setNewCollaborator(prev => ({ ...prev, name: e.target.value }))}
                    className="md:col-span-2"
                  />
                  <div className="flex space-x-2">
                    <LabeledSelect
                      value={newCollaborator.role}
                      onChange={(value) => setNewCollaborator(prev => ({ ...prev, role: value }))}
                      options={roleOptions}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={addCollaborator}
                      disabled={!newCollaborator.name.trim() || !newCollaborator.role}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {formData.collaborators.length > 0 && (
                  <div className="space-y-3">
                    {formData.collaborators.map((collaborator) => (
                      <div key={collaborator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <Avatar name={collaborator.name} role={collaborator.role} />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCollaborator(collaborator.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
            <Button type="button" size="lg" onClick={handleSubmit}>
              Create Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewProject;