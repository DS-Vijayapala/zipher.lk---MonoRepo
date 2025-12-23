/* =========================
   STAT CARD
========================= */

import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
    label,
    value,
    tone,
}: {
    label: string;
    value: number;
    tone?: "success" | "warning" | "destructive";
}) {
    const toneMap = {
        success: "text-green-700",
        warning: "text-amber-600",
        destructive: "text-red-600",
    };

    return (
        <Card className="border-green-100">
            <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={`text-2xl font-semibold ${tone ? toneMap[tone] : ""}`}>
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}
