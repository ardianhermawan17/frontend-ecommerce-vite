import { Link } from "react-router"
import { Card, CardHeader, CardTitle, CardContent } from "@shared/components/ui/card"
import { Button } from "@shared/components/ui/button"
import { DarkModeToggle } from "@shared/components/template/dark-mode-toggle"

const Index = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 flex flex-col gap-8">
                <Card className="relative w-full max-w-md p-4">
                    <div className="absolute top-3 right-3">
                        <DarkModeToggle />
                    </div>

                    <CardHeader>
                        <CardTitle>Hasil test</CardTitle>
                    </CardHeader>

                    <CardContent className="mt-4 flex gap-3">
                        <Link to="/promotion">
                            <Button variant="default">Promotion</Button>
                        </Link>
                        <Link to="/product">
                            <Button variant="outline">E-commerce</Button>
                        </Link>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default Index