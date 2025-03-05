
import { RecCenterList } from "@/components/RecCenterList";
import { recCenters } from "@/utils/data";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";

const Centers = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Container className="py-8 md:py-12 animate-fade-in">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                Recreation Centers
              </h1>
              <p className="text-muted-foreground max-w-3xl">
                Explore our network of recreation centers offering a variety of amenities and programs for all ages and interests.
              </p>
            </div>
            <Separator className="bg-gradient-to-r from-primary/20 to-primary/5" />
            <RecCenterList centers={recCenters} />
          </div>
        </Container>
      </main>
    </>
  );
};

export default Centers;
