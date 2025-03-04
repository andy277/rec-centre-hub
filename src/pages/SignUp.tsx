
import { SignUp } from "@clerk/clerk-react";
import { Container } from "@/components/ui/container";

const SignUpPage = () => {
  return (
    <Container className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Your RecFit Account</h1>
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <SignUp signInUrl="/signin" redirectUrl="/" />
        </div>
      </div>
    </Container>
  );
};

export default SignUpPage;
