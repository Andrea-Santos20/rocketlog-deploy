import { Request, Response} from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class DeliveriesController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string(),
        })

        const { user_id, description } = bodySchema.parse(request.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description
            }
        })

        return response.status(201).json()
    }

    async index(request: Request, response: Response) {
        const deliveries = await prisma.delivery.findMany({
            //Para aparecer os dados do id, no banco de dados (nome e e-mail)
            include: {
                user: { select: { name: true, email: true} },
            }
        })

        return response.json(deliveries)
    }
}

export { DeliveriesController }