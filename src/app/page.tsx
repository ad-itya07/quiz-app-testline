import { QuizComponent } from "@/components/quiz";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to QuizMaster
        </h1>
        <div className="max-w-3xl mx-auto">
          <QuizComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
