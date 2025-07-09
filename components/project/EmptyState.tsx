import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No projects found
      </h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your search terms or create a new project.
      </p>
      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
        <Plus className="mr-2 h-4 w-4" />
        Create New Project
      </Button>
    </div>
  );
}