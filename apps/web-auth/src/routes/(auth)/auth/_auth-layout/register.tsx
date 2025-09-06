import { RegisterForm } from "@/features/auth/components/register-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/auth/_auth-layout/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}
