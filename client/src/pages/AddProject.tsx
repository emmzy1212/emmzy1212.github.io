import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProjectForm from "@/components/AddProjectForm";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const AddProject = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const addProjectMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // Use our centralized API file for consistency
      return await api.projects.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success",
        description: "Project added successfully!",
        variant: "default",
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    addProjectMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <AddProjectForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>

      <Button 
        variant="outline" 
        className="mt-6"
        onClick={() => navigate("/")}
      >
        Back to Portfolio
      </Button>
    </div>
  );
};

export default AddProject;
