
import { auth } from "@/lib/auth"; // Assuming auth is configured at root or lib
import { ManimGenerator } from "@/components/math-tutor/ManimGenerator";
import { redirect } from "next/navigation";
import { getTranslations } from 'next-intl/server';

export default async function VisualizePage() {
    //   const session = await auth();
    //   if (!session) {
    //     redirect("/api/auth/signin");
    //   }

    const t = await getTranslations('Visualize');

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8 text-center space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    AI Math Visualization
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Turn your math concepts into beautiful animations using the power of Python and Manim.
                    Just describe what you want to see.
                </p>
            </div>

            <ManimGenerator />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
                <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Geometry</h3>
                    <p className="text-sm text-muted-foreground">"Draw a triangle with sides 3, 4, 5 and show the angles."</p>
                </div>
                <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Calculus</h3>
                    <p className="text-sm text-muted-foreground">"Plot y = x^2 and show the tangent line at x=2 moving to x=0."</p>
                </div>
                <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Linear Algebra</h3>
                    <p className="text-sm text-muted-foreground">"Show a 2D vector rotation by 90 degrees."</p>
                </div>
            </div>
        </div>
    );
}
