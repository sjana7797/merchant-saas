import { LoginForm } from "@/features/auth/components/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/auth/_auth-layout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
