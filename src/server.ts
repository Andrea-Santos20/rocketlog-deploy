import { app } from "@/app"
import { env } from "process"

const PORT = env.PORT

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))