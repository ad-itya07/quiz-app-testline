"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GithubIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <Card className="max-w-3xl w-full shadow-lg border border-border/40 p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            About Quiz Master
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-muted-foreground">
          <p>
            Quiz Master is a dynamic and interactive quiz application designed to challenge your knowledge across various topics. It fetches real-time quiz data from an external API, ensuring fresh and engaging questions every time you play.
          </p>

          <p>
            Built using Next.js (App Router) and styled with ShadCN UI, Quiz Master offers a seamless and responsive user experience. Whether you&apos;re a casual learner or a trivia enthusiast, this app provides an engaging way to test your skills.
          </p>

          <p>
            This project was created by <span className="font-medium">Aditya Jha</span>. You can explore the source code and contribute to its development on GitHub.
          </p>

          <div className="flex justify-center pt-4 gap-2">
            <Button asChild variant="outline">
              <Link href="https://github.com/ad-itya07/quiz-app-testline.git" target="_blank">
                Visit GitHub Repository
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://github.com/ad-itya07" target="_blank">
                <GithubIcon />My profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
