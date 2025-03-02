
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <Container className="py-8 md:py-12">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
          <p className="text-muted-foreground">
            Learn more about RecHub and our mission
          </p>
        </div>
        <Separator />
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg">
            Welcome to RecHub, your go-to resource for discovering recreational centers that match your interests and location. We believe that everyone deserves easy access to activities that enrich their lives, whether it's staying fit, learning new skills, or simply having fun.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to connect you with the perfect recreational center, making it simple to find and engage in activities you love. We aim to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Simplify the search for recreational centers near you.</li>
            <li>Provide personalized recommendations based on your interests.</li>
            <li>Offer up-to-date information on center facilities, programs, and schedules.</li>
            <li>Foster a community of active and engaged individuals.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why We Created RecHub</h2>
          <p>
            We noticed that finding the right recreational center can be a time-consuming and frustrating process. Sifting through countless websites and directories, only to find outdated information, was a common problem. That's why we built RecHub – to streamline your search and make it easier than ever to discover the perfect place for your recreational needs.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>
            We're a team of developers and fitness enthusiasts passionate about promoting active and healthy lifestyles. We're dedicated to continuously improving RecHub and providing you with the best possible user experience.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Get in Touch</h2>
          <p>
            We'd love to hear from you! If you have any questions, feedback, or suggestions, please don't hesitate to contact us.
          </p>
          
          <div className="bg-secondary rounded-lg p-6 mt-8">
            <h3 className="text-xl font-medium mb-4">Contact Information</h3>
            <p className="mb-2"><span className="font-medium">Email:</span> info@rechub.com</p>
            <p className="mb-2"><span className="font-medium">Phone:</span> (555) 123-4567</p>
            <p><span className="font-medium">Address:</span> 123 Recreation Avenue, Fitness City, FC 12345</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
