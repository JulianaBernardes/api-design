import { Router } from "express";
import { body, oneOf, validationResult, check } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createProduct, getOneProduct, getProducts, deleteProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getUpdates, updateUpdate } from "./handlers/update";

const router = Router();

// Product

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', [body('name').isString(), handleInputErrors], (req, res) => {
    
})
router.post('/product', body('name').isString(), handleInputErrors, createProduct, (req, res) => {
    
})
router.delete('/product/:id', deleteProduct)

// Update

router.get('/update', getUpdates)
router.get('/update/:id', getOneProduct)
router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate
  )
router.post('/update', 
    body('title').exists().isString(), 
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
)
router.delete('/update/:id', deleteUpdate)

// update points

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id', 
    body('name').optional().isString,
    body('description').optional().isString,
    () => {}
)
router.post('/updatepoint', 
    body('name').optional().isString,
    body('description').optional().isString,
    body('updateId').exists().isString(),
    () => {}
)
router.delete('/updatepoint/:id', () => {}) 

router.use((err, req, res, next) => {
    console.log(err)
    res.json({
        message: 'oops in router, thats on us...'
    })
})

export default router;