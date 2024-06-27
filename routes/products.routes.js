import {Router} from "express"
import {PrismaClient} from '@prisma/client'


const router = Router();
const prisma = new PrismaClient()

router.get("/" ,async(req, res) => {
    try {
        const Products = await prisma.products.findMany();
            res.status(200).json(Products)
        
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})
router.get("/:id",async(req, res) => {
    const id = req.params.id
    try {
        const Products = await prisma.products.findFirst({
            where: {
                id:id
            }
        })
        res.status(200).json(Products)
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }


    
})
router.post("/" ,async(req, res) => {
    try {
        const {productThumbnail,productTitle,productDescription,productCost,onOffer } = req.body
        const newProducts = await prisma.products.create({
            data:{
                productThumbnail: productThumbnail,
                productTitle: productTitle,
                productDescription: productDescription,
                productCost: productCost,
                onOffer: onOffer
            }
        })
        res.status(201).json({ newProducts });
    }
   
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})
router.patch("/:id" ,async(req, res) => {
    const {productThumbnail,productTitle,productDescription,productCost,onOffer } = req.body;
    const id = req.params.id
    try{
        let updatedProduct;
       
        if (productThumbnail) [
            updatedProduct = await prisma.products.update({
                where: {
                    id: id
                },
                data: { productThumbnail: productThumbnail }
               }) 
        ]
        if (productTitle) [
            updatedProduct = await prisma.products.update({
                where: {
                    id: id
                },
                data: {productTitle:productTitle}
               }) 
        ]
        if (productDescription) [
            updatedProduct = await prisma.products.update({
                where: {
                    id: id
                },
                data: { productDescription: productDescription }
               }) 
        ]
        if (productCost) [
            updatedProduct = await prisma.products.update({
                where: {
                    id: id
                },
                data: { productCost:productCost}
               }) 
        ]
        if (onOffer) [
            updatedProduct = await prisma.products.update({
                where: {
                    id: id
                },
                data:{ onOffer: onOffer }
               }) 
        ]
       res.status(200).json({ updatedProduct})
    }

    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})
router.delete("/:id", async(req, res) => {
    const id = req.params.id
    try {
        const deleteProducts = await prisma.products.delete({
            where: {
                id:id
            },
            select: {
                productThumbnail: true,
                productTitle: true,
                productDescription: true,
                productCost: true,
                onOffer: true
            }

        })
        res.status(200).json(deleteProducts)
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

export default router;