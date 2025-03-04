
import { SignIn } from "@clerk/clerk-react";
import { Container } from "@/components/ui/container";

const SignInPage = () => {
  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In to RecFit</h1>
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <SignIn signUpUrl="/signup" redirectUrl="/" />
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;
