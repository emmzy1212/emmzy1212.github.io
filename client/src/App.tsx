import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AddProject from "@/pages/AddProject";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/add-project" component={AddProject} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  );
}

export default App;
